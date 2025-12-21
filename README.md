# Invoice & Analytics API

A robust backend API designed to manage invoice processing, image scanning, and analytics visualization. This service handles the lifecycle of invoices from scanning to data visualization.

## 📚 Table of Contents
- [Features](#features)
- [API Documentation](#api-documentation)
  - [Invoices Management](#invoices-management)
  - [Analytics & Dashboard](#analytics--dashboard)
  - [Scan & Images](#scan--images)
  - [System](#system)
- [Installation](#installation)

## ✨ Features
* **Invoice Management:** Full CRUD capabilities for searching, listing, and downloading invoices.
* **Smart Analytics:** Endpoints dedicated to providing data for graphs, pie charts, and future predictions.
* **Image Processing:** Handle image uploads (scans) and serve static image files.

---

## 🚀 API Documentation

### Invoices Management
*Search, List, and Download Invoices*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/invoices` | List all invoices available in the system. |
| `GET` | `/api/invoices/search` | Search for specific invoices based on query parameters. |
| `GET` | `/api/invoices/download/{id}` | Download a specific invoice as an HTML file. |
| `DELETE` | `/api/invoices/{id}` | Permanently delete an invoice by its ID. |

### Analytics & Dashboard
*Data for Graphs, Pie Charts, and Predictions*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/analytics/dashboard` | Retrieve main dashboard statistics and summary data. |
| `GET` | `/api/analytics/recent-activity` | Get a feed of the most recent system activities. |
| `GET` | `/api/analytics/predict` | Fetch data points for prediction graphs. |
| `GET` | `/api/analytics/pie-chart-data` | Retrieve data formatted for pie chart visualization. |

### Scan & Images
*Handle Image Uploads and Image Serving*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/scan` | Upload a box image/scan for processing. |
| `GET` | `/api/scans` | Retrieve a list of all performed scans. |
| `GET` | `/api/images/{filename}` | View or serve a specific image file. |

### System
*Health Checks and Root*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Hello World / Health Check. |

---

## 🛠 Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    pip install -r requirements.txt
    ```

3.  **Run the server**
    ```bash
    npm start
    # or
    python app.py
    ```

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).
