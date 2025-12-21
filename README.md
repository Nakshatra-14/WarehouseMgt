# 📦 AI-Driven Warehouse Management System (Backend)

## 📖 Overview
This is the backend for a **Smart Warehouse Receiving System**. It automates the process of receiving inventory by analyzing box images for damage using AI, generating digital invoices, and providing predictive analytics for demand forecasting.

The system is built with **Spring Boot (Java)** and uses **SQLite** for a lightweight, zero-configuration database. It simulates a real-world enterprise environment with real-time processing logs, professional HTML invoice generation, and a "Big Data" dashboard seeded with 500+ past records.

---

## 🚀 Key Features

### 1. 🔍 **AI Damage Detection**
* **Upload:** Takes an image of a box via API.
* **Analyze:** Sends the image to an external AI model to check for physical damage.
* **Result:** Returns `APPROVED` (if normal) or `REJECTED` (if damaged).
* **Real-Time Simulation:** Provides step-by-step processing logs for frontend animations.

### 2. 🧾 **Smart Invoicing**
* **Auto-Generation:** Automatically creates a commercial invoice with Vendor, PO Number, Weight, and Tracking ID.
* **Format:** Generates a professional **HTML Invoice** that can be downloaded.
* **Management:** APIs to Search, List, and Delete invoices.

### 3. 📊 **Predictive Analytics & Dashboard**
* **Demand Forecasting:** Simulates AI prediction for upcoming festivals (e.g., "Big Billion Sale").
* **Load Graph:** Provides data points to plot a 7-day load forecast graph.
* **Inventory Health:** Identifies "Critical Shortage", "Low Stock", and "In Stock" items.
* **Visuals:** API endpoints for Pie Charts (Vendor Share, Damaged vs. Normal).

### 4. 🗄️ **Huge Data Simulation**
* **Auto-Seeding:** On the first run, the system automatically fills the database with **500 fake historical records** to simulate a busy warehouse history.

---

## 🛠️ Tech Stack
* **Language:** Java 21
* **Framework:** Spring Boot 3.x
* **Database:** SQLite (Stored locally as `warehouse.db`)
* **ORM:** Spring Data JPA (Hibernate)
* **Documentation:** Swagger UI / OpenAPI

---

## ⚙️ Setup & Installation

### Prerequisites
* Java Development Kit (JDK) 21 or higher.
* Maven (Optional, as `mvnw` is included).

### Steps to Run
1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Nakshatra-14/WarehouseMgt.git
    cd WarehouseMgt
    ```

2.  **Run the Application**
    * **Windows:**
        ```cmd
        mvnw spring-boot:run
        ```
    * **Mac/Linux:**
        ```bash
        ./mvnw spring-boot:run
        ```

3.  **Access the System**
    * **Server URL:** `http://localhost:8080`
    * **API Docs (Swagger):** `http://localhost:8080/docs`

---

## 📡 API Documentation (Quick Reference)

### **1. AI Scanning (Main Feature)**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/scan` | Upload image (form-data). Returns logs & analysis. |
| `GET` | `/api/scans` | List all scanned images history. |
| `GET` | `/api/images/{filename}` | View the uploaded image in browser. |

### **2. Analytics & Dashboard**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/analytics/dashboard` | Main counters (Total, Rejected, Efficiency). |
| `GET` | `/api/analytics/pie-chart-data` | Data for Status & Vendor distribution charts. |
| `GET` | `/api/analytics/recent-activity` | Live feed of recent actions. |
| `GET` | `/api/analytics/predict` | Future load forecast & critical inventory alerts. |

### **3. Invoice Management**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/invoices` | List all generated invoices. |
| `GET` | `/api/invoices/search?query=...` | Search by PO Number or Vendor. |
| `GET` | `/api/invoices/download/{id}` | Download invoice as HTML file. |
| `DELETE` | `/api/invoices/{id}` | Delete an invoice. |

---
### **Demo Flow Script**
1.  **Open Dashboard:** Show the "Big Data" (500 records) and the "Critical Shortage" alerts.
2.  **Scan Box:** Upload a "Damaged" image. Watch the "AI logs" appear one by one.
3.  **Check Result:** See the status turn **RED (REJECTED)**.
4.  **Download Invoice:** Go to the Invoice list and download the HTML bill for the rejected item.

---

## 📂 Project Structure
src/main/java/com/example/warehouse/demo/ <br>
├── Component/ <br>
│ ├── AnalyticsController.java # Dashboard & Predictions <br>
│ └── DataSeeder.java # Generates 500 fake records on startup <br>
├── Controller/ <br>
│ ├── ScanController.java # Image Upload & AI Handling <br>
│ └── InvoiceController.java # Invoice Search & Download <br>
├── Model/ │ ├── Scan.java # Database Table for Images <br>
│ └── Invoice.java # Database Table for Bills <br>
├── Repo/ <br>
│ ├── ScanRepository.java # DB Access <br>
│ └── InvoiceRepository.java # DB Access <br>
├── Service/ <br>
│ └── ScanService.java # Core Logic (AI, Files, Logic) <br>
└── DemoApplication.java # Main Entry Point <br>
