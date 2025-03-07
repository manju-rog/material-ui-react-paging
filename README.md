<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
# Enhanced Paginated Data

This project implements a **cursor-based pagination system** using **Spring Boot**, **JPA**, and a **responsive UI** with hover effects to show additional data.

## 📌 Features
- **Cursor-based Pagination**: Uses `anchorId` instead of offset-based pagination for better efficiency.
- **Dynamic Page Size**: User can change the number of records displayed per page.
- **Hover Effect on UI**: Displays `ID`, `Created At`, and `Payload` when hovered.
- **Search by Name (Optional)**: If a name is provided, the query fetches related records.
- **REST API with Postman Support**.

---
## 🔥 UI Preview

### **Pagination UI**
![Pagination UI](https://github.com/manju-rog/paging-jpa/issues/1#issue-2821636029)


🔹 Each **Entity card** shows the `name` field.  
🔹 **Hovering over a card** displays extra details (`ID`, `Created At`, `Payload`).  
🔹 Buttons allow navigation with **previous and next** pagination.

---
## 🚀 Setup & Installation

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/manju-rog/paging-jpa.git
cd paging-jpa
```

### **2️⃣ Configure Database**
Modify `src/main/resources/application.properties` with your database details:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
```

### **3️⃣ Build & Run the Application**
```bash
mvn spring-boot:run
```
**OR** (if using Gradle)
```bash
gradle bootRun
```

The server starts at: `http://localhost:8080`

---
## 📌 API Documentation
### **GET /api/entities (Pagination API)**
#### ✅ Fetch Data Normally (First Page)
```http
GET http://localhost:8080/api/entities?anchorId=0&limit=10
```
**Response:**
```json
{
  "data": [
    { "id": 1, "name": "John Doe", "createdAt": "2025-01-29 10:11:09", "payload": "Sample payload 1" },
    { "id": 2, "name": "Jane Smith", "createdAt": "2025-01-29 10:15:09", "payload": "Sample payload 2" }
  ],
  "nextAnchor": 10,
  "currentLimit": 10
}
```

### **🔍 Fetch with Name Filter (Optional)**
```http
GET http://localhost:8080/api/entities?name=John&anchorId=0&limit=10
```
Response will contain **only records where name contains 'John'**.

### **📌 POSTMAN Example (Cursor-Based Pagination)**
✅ **Fetching 10 records after ID 50**
```http
GET http://localhost:8080/api/entities?anchorId=50&limit=10
```

---
## 📌 Database Schema
```sql
CREATE TABLE smart_entities (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payload VARCHAR(255) NOT NULL
);
```
✅ **Adding Data Using Sequence (`smart_seq`)** (For Oracle)
```sql
INSERT INTO smart_entities (id, name, created_at, payload)
VALUES (smart_seq.NEXTVAL, 'John Doe', TIMESTAMP '2025-01-29 10:11:09', 'Sample payload 1');
```

---
## 📌 How to Push Changes to GitHub
```bash![image](https://github.com/user-attachments/assets/d4ab0588-fdf5-4bb1-a85a-28ccbd3e1ae4)

git add .
git commit -m "Added pagination and UI updates"
git push origin master
```

---
## 🚀 Contributors
- **Manjunath** ([@manju-rog](https://github.com/manju-rog))

---
## 📌 License
This project is licensed under the MIT License.

>>>>>>> e2be94a (paging backend)
