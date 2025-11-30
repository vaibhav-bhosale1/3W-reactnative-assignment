# Bank Information Management System (User Panel)

A full‑stack mobile application built with **React Native CLI (Android)** and **Node.js/MongoDB**, allowing users to efficiently manage their bank account details.

> **Note:** This project provides the **User Panel** with full CRUD operations for bank records.

---

## 📱 Features

* **Add Bank Account:** Input details like Bank Name, Branch, Account Number, and IFSC Code.
* **View Accounts:** See a detailed list of saved bank accounts.
* **Edit Details:** Update existing bank account information.
* **Delete Account:** Remove bank accounts from the database.
* **Real-time Data:** Fully connected to MongoDB through a Node.js REST API.

---

## 🛠️ Technology Stack

* **Frontend:** React Native CLI (Android)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Networking:** Axios

---

## 🚀 Installation & Setup

To run this project locally, set up both the **Backend Server** and the **Mobile App**.

### **1. Backend Setup**

```bash
cd backend
npm install
```

* Update the MongoDB URL in `server.js` if needed (`mongodb://127.0.0.1:27017/bankDB`).
* Start the server:

```bash
node server.js
```

Server runs at: **[http://localhost:5000](http://localhost:5000)**

### **2. Frontend Setup**

```bash
npm install
```

* For Android Emulator, the base URL is: **[http://10.0.2.2:5000](http://10.0.2.2:5000)**
* If backend is deployed, update the API URL inside `src/screens/` files.

Start Metro Bundler:

```bash
npm start
```

Run the App:

```bash
npm run android
```

---

## 📡 API Endpoints

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | /banks           | Retrieve all bank accounts   |
| POST   | /add-bank        | Add a new bank account       |
| PUT    | /update-bank/:id | Update specific bank account |
| DELETE | /delete-bank/:id | Delete specific bank account |

---

## 📱 Screenshots

**Bank List**

<img width="300" height="300" alt="W1" src="https://github.com/user-attachments/assets/d9df247b-179b-4e71-82df-dfef616e1243" />


**Add Bank**

<img width="300" height="300" alt="W2" src="https://github.com/user-attachments/assets/191a821f-6760-450a-8482-d5af3d88f03e" />

**Edit Bank**

<img width="300" height="300" alt="W4" src="https://github.com/user-attachments/assets/0d463bbf-5adb-4c1b-b8e7-e72a694ec270" />




---

## 📦 Download APK

Download the latest signed APK from the **Releases** section.

---

## 📝 License

This project was created for the **Bank Information Management System** assessment task.

---

> Replace the screenshot placeholders with your actual images for submission.
