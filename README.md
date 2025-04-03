# 🔍 Network Vulnerability Scanner

This project is a **React.js (Frontend) + Flask (Backend)** application that scans a given **IP Address or Domain** to check for open ports and security vulnerabilities.

## 📌 Features
✔️ Scan open ports on a given target  
✔️ Display **risk level (High/Medium/Low)**  
✔️ Show **scan start time, end time, and duration**  
✔️ Fully responsive **UI with Bootstrap**  
✔️ Backend using **Flask & Nmap API**  

---

## 🚀 Setup and Running the Project

### 🔹 **1. Clone the Repository**
Open your terminal and run:
```sh
git clone https://github.com/your-username/network-scanner.git
cd network-scanner

## ⚙️ **Backend Setup (Python + Flask)**
1. Navigate to the `backend/` folder: 
```
cd backend
```
2. Create a **virtual environment** to manage dependencies: 
```
python -m venv venv
```
3. Activate the virtual environment:
- **For macOS/Linux**:
  ```
  source venv/bin/activate
  ```
- **For Windows**:
  ```
  venv\Scripts\activate
  ```
4. Install the required dependencies: 
```
pip install -r requirements.txt
```
5. Start the Flask server:
```
python app.py
```

✅ The Flask server will run at: `http://127.0.0.1:5000`

---

## 🌐 **Frontend Setup (React)**
1. Open a new terminal and navigate to the `frontend/` folder:
```
cd ../frontend
```
2. Install frontend dependencies:
```
npm install
```
3. Start the React application:
```
npm start
```



