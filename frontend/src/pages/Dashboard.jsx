import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editData, setEditData] = useState({ title: '', status: '' });

  const [newTaskData, setNewTaskData] = useState({
    title: '',
    status: 'pending',
  });

  const [statusFilter, setStatusFilter] = useState('All');

  // 🔑 Auth state from token
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);      // user is now logged out
    setTasks([]);                   // optional: clear tasks
    navigate('/login');
  };

  // --- AUTH ERROR HELPER ---
  const checkAuthError = (err) => {
    if (err.response && err.response.status === 401) {
      handleLogout();
      return true;
    }
    return false;
  };
  // -------------------------

  const fetchTasks = async () => {
    try {
      const res = await api.get('/api/tasks');
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      if (checkAuthError(err)) return;
      setError('Failed to fetch tasks.');
      setLoading(false);
    }
  };

  useEffect(() => {
    // When Dashboard mounts or when token changes, refresh auth state
    const hasToken = !!localStorage.getItem('token');
    setIsAuthenticated(hasToken);
    if (hasToken) {
      fetchTasks();
    } else {
      setLoading(false);
      setTasks([]);
    }
  }, []);

  const onNewTaskChange = (e) => {
    setNewTaskData({ ...newTaskData, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskData.title.trim()) return;

    try {
      const res = await api.post('/api/tasks', {
        title: newTaskData.title,
        status: newTaskData.status,
      });

      setTasks([res.data, ...tasks]);
      setNewTaskData({ title: '', status: 'pending' });
      setError('');
    } catch (err) {
      if (checkAuthError(err)) return;
      console.error('Task creation error:', err);
      setError('Failed to create task.');
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditData({ title: task.title, status: task.status });
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditData({ title: '', status: '' });
  };

  const handleUpdateTask = async (taskId) => {
    if (!editData.title.trim()) {
      setError('Task title cannot be empty.');
      return;
    }

    try {
      const res = await api.put(`/api/tasks/${taskId}`, {
        title: editData.title,
        status: editData.status,
      });

      setTasks(tasks.map((task) => (task._id === taskId ? res.data : task)));

      setEditingTaskId(null);
      setEditData({ title: '', status: '' });
      setError('');
    } catch (err) {
      if (checkAuthError(err)) return;
      console.error('Task update error:', err);
      setError('Failed to update task.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await api.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
      setError('');
    } catch (err) {
      if (checkAuthError(err)) return;
      console.error('Task deletion error:', err);
      setError('Failed to delete task.');
    }
  };

  const formatStatus = (str) => str.replace(/\b\w/g, (c) => c.toUpperCase());

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ffc107';
      case 'in progress':
        return '#17a2b8';
      case 'completed':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  // --- FILTERING LOGIC ---
  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === 'All') {
      return true;
    }
    return task.status === statusFilter.toLowerCase();
  });
  // -----------------------

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: '#f8f9fa',
          margin: 0,
          padding: 0,
        }}
      >
        <h1 style={{ color: '#333' }}>Loading Tasks...</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#f8f9fa',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '20px 5%',
          marginBottom: '30px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px',
          }}
        >
          <h1
            style={{
              color: '#333',
              margin: 0,
              fontSize: 'clamp(20px, 4vw, 28px)',
              fontWeight: '600',
            }}
          >
            📋 Task Dashboard
          </h1>

          {/* Auth-aware buttons */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {!isAuthenticated && (
              <>
                <button
                  onClick={() => navigate('/register')}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = '#218838')
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = '#28a745')
                  }
                >
                  Register
                </button>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = '#0056b3')
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = '#007bff')
                  }
                >
                  Login
                </button>
              </>
            )}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = '#c82333')
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = '#dc3545')
                }
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          width: '100%',
          padding: '0 5%',
          boxSizing: 'border-box',
        }}
      >
        {/* Error Message */}
        {error && (
          <div
            style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '12px 20px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid #f5c6cb',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* If not authenticated, show a simple message instead of task UI */}
        {!isAuthenticated ? (
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '40px 30px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <h2 style={{ marginBottom: '10px', color: '#333' }}>
              Welcome to TaskFlow
            </h2>
            <p style={{ color: '#666' }}>
              Please register or log in using the buttons above to manage your
              tasks.
            </p>
          </div>
        ) : (
          <>
          </>
        )}
      </div>
    </div>
  );
}
