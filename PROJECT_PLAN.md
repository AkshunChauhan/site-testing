# Project Plan: Tasks Application

This document outlines the Work Breakdown Structure (WBS), critical path, and a high-level project timeline for the development of the full-stack Tasks Application.

---

### **Work Breakdown Structure (WBS)**

The WBS is a hierarchical breakdown of the total work to be done.

**1. Primary Work Parts:**

1.  **Project Setup & Planning:** This foundational phase involves creating the project structure, initializing repositories, and configuring the development environments for both the frontend and backend.
2.  **Backend (API) Development:** This part covers the creation of the entire server-side application, including the REST API, business logic, and data access layers.
3.  **Frontend (UI) Development:** This involves building the user interface and all client-side logic, allowing users to interact with the backend API.
4.  **Database Management:** This includes designing the database schema, setting up the PostgreSQL database, and managing any changes to the data structure.
5.  **Integration, Testing & Deployment:** This final phase involves connecting the frontend and backend, implementing security, performing comprehensive testing, and deploying the application to a live environment.

**2. Main Subtasks:**

1.  **Design REST API Endpoints:** Define the specific URLs, HTTP methods (GET, POST, PUT, DELETE), and data structures (JSON) for `TaskList` and `Task` CRUD (Create, Read, Update, Delete) operations.
2.  **Implement User Authentication:** Set up Firebase Authentication on the frontend for the login/signup flow and configure the Spring Boot backend to validate Firebase ID tokens to secure the API.
3.  **Create Core React Components:** Develop the main UI components, such as `TaskList`, `TaskItem`, `Header`, and the forms for creating/editing tasks and lists.
4.  **Develop Database Schema:** Write the SQL or use JPA entities to define the `task_lists` and `tasks` tables, including their columns, data types, and the relationships between them.
5.  **Implement Frontend State Management:** Configure and use React's Context API to manage global state for user authentication and the dark/light mode theme.

**3. What specific goals does building this achieve?**
Building this project achieves the goal of creating a complete, full-stack application that solves a real-world problem—disorganized task management. It delivers a secure, multi-user platform with a modern, responsive user interface and a robust backend API.

**4. How will success be measured?**
Success will be measured by the complete implementation and functionality of all 10 planned features. Key metrics include:
*   Users can successfully register, log in, and manage their own private task lists.
*   The backend API is fully functional and passes all Postman tests for every endpoint.
*   The frontend application is responsive, user-friendly, and free of major bugs.
*   The application is successfully deployed and publicly accessible.

**5. What is the expected benefit?**
The primary benefit is a practical, portfolio-ready project that demonstrates a wide range of in-demand skills, including Spring Boot, React, TypeScript, database management, and cloud authentication. It provides a scalable and reusable codebase that can be extended for future learning or product development.

---

### **Critical Path**

The critical path is the sequence of dependent tasks that determines the project's minimum duration. For this project, the path involves building the system from the backend foundation up to the integrated frontend.

1.  **Setup Backend & Database Schema:** The project cannot begin without the core Spring Boot application structure and a database schema for `TaskList` and `Task` entities.
2.  **Implement Core Backend API (CRUD for Tasks):** The frontend is entirely dependent on a functional API. Building the endpoints to create, read, update, and delete tasks and lists is the most critical development step.
3.  **Implement User Authentication (Backend & Frontend):** Securing the API and creating the frontend login/signup flows is essential. Most features are blocked until the application can identify the user.
4.  **Develop Core Frontend UI & API Integration:** With the backend API and authentication in place, the frontend can be developed to fetch, display, and manage the user's data by connecting to the API endpoints.
5.  **End-to-End Testing & Deployment:** This final step must happen last. It involves verifying that the integrated system works as expected before making the application live for users.

---

### **Gantt Chart (Timeline, Durations, & Dependencies)**

This table outlines a possible timeline and the dependencies for each major task.

| ID | Task Name | Duration (Days) | Dependencies |
|:---|:---|:---|:---|
| 1 | **Phase 1: Foundation & Setup** | **3** | - |
| 1.1| Setup Backend & Frontend Projects | 1 | - |
| 1.2| Design & Setup Database Schema | 2 | 1.1 |
| 2 | **Phase 2: Backend Development** | **7** | 1.2 |
| 2.1| Implement Entities & Repositories | 2 | 1.2 |
| 2.2| Develop Core CRUD API (TaskList, Task) | 3 | 2.1 |
| 2.3| Implement Firebase Auth & Secure Endpoints | 2 | 2.2 |
| 3 | **Phase 3: Frontend Development** | **8** | 2.3 |
| 3.1| Implement Firebase Auth UI (Login/Signup) | 2 | 2.3 |
| 3.2| Build Components for TaskLists & Tasks | 3 | 3.1 |
| 3.3| Connect UI to Backend API | 2 | 3.2 |
| 3.4| Implement Dark/Light Mode & Progress Bars | 1 | 3.2 |
| 4 | **Phase 4: Testing & Deployment** | **4** | 3.3, 3.4 |
| 4.1| Backend API End-to-End Testing (Postman) | 2 | 2.3 |
| 4.2| Frontend Manual & Responsiveness Testing | 2 | 3.3, 3.4|
| 4.3| Deploy Backend and Frontend | 1 | 4.1, 4.2 |
