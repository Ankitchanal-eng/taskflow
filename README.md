## 🚀 MERN TaskFlow – Secure & Dynamic Task Management System

> A full-stack task management application built with the **MERN Stack** (MongoDB, Express, React, Node.js). This project showcases professional-grade skills in secure **JWT authentication**, **user data isolation**, full **CRUD API design**, and dynamic state management.

## 🎯 Project Goal

The primary objective of TaskFlow is to serve as a **feature-rich, production-ready portfolio piece** that demonstrates a strong command over building secure, scalable, and responsive full-stack applications.

## ✨ Key Features & Technical Highlights

This application implements critical modern web development features:

### 🔒 Security and Data Integrity

  * **JWT Authentication:** Implemented a robust, **stateless authentication system** using **JSON Web Tokens (JWT)** for secure user sessions.
  * **Password Security:** Protects user credentials using **bcryptjs** for industry-standard hashing before storage.
  * **Strict Data Isolation:** Enforces **data scoping** via Express middleware and Mongoose queries to guarantee users can only access, modify, or delete tasks that belong to their specific account, preventing cross-user data exposure.
  * **Private Routing:** Frontend utilizes **React Router** to implement guarded routes, restricting dashboard access exclusively to authenticated users.

### ⚙️ Core Application Functionality

  * **Task CRUD API:** Full **Create, Read, Update, and Delete** (CRUD) functionality for tasks, secured entirely at the API level.
  * **Dynamic State Management:** Tasks track key properties like title, description, and status (`Pending`, `In Progress`, `Complete`).
  * **Filtering and Sorting:** Allows users to filter tasks by status and sort them by creation date or due date for effective workflow management.

### 💻 User Interface (UI/UX)

  * **Responsive Design:** Built with modern CSS/UI libraries (e.g., Tailwind CSS or styled-components) to ensure a clean, intuitive interface that adapts seamlessly across **mobile, tablet, and desktop** screen sizes.

## 💻 Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React, React Router DOM, Axios | Dynamic, component-based UI and client-side routing/API requests. |
| **Backend** | Node.js, Express.js | Fast, scalable server environment and robust API handling. |
| **Database** | MongoDB Atlas, Mongoose | Cloud-hosted NoSQL data storage and Object Data Modeling (ODM). |
| **Security** | JWT, bcryptjs | Token creation/verification and secure password hashing. |
| **Testing** | Postman/Thunder Client | API testing and validation. |

## 🛠️ Getting Started (Local Development)

This section details how a developer can get your project running locally.

### Prerequisites

  * Node.js (v18+)
  * MongoDB Atlas Account
  * API Testing tool (Postman or Thunder Client)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone YOUR_REPO_URL mern-taskflow
    cd mern-taskflow
    ```

2.  **Setup Backend:**

    ```bash
    cd backend
    npm install
    # Create a .env file with your MONGO_URI and JWT_SECRET
    node server.js
    ```

3.  **Setup Frontend:**

    ```bash
    cd ../frontend
    npm install
    npm run dev 
    ```

-----

**Next Steps:** Full-stack development, deployment preparation, and feature refinement.