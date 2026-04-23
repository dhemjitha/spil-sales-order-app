# Sales Order Management System

A full-stack web application for managing sales orders, built with **.NET Core** backend and **React** frontend.

---

## 📌 Project Overview

The Sales Order Management System allows users to:

- View all sales orders in a clean, sortable table
- Create new sales orders with multiple line items
- Auto-fill customer address by selecting a customer
- Auto-calculate Excl Amount, Tax Amount, and Incl Amount per line
- Edit existing orders by double-clicking a row
- Delete orders with instant feedback
- Navigate between Home and Sales Order screens seamlessly

---

## 🏗️ Client-Server Architecture

<img width="1239" height="642" alt="image" src="https://github.com/user-attachments/assets/62420a51-bc02-4db0-a428-d797e79522d5" />

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| .NET Core Web API | REST API framework |
| Entity Framework Core | ORM / Database access |
| SQL Server | Primary database |
| AutoMapper | Entity to DTO mapping |
| Swashbuckle (Swagger) | API documentation |

### Frontend
| Technology | Purpose |
|-----------|---------|
| React + Vite | UI framework |
| Redux Toolkit | State management |
| React Router | Client-side navigation |
| shadcn/ui | UI component library |
| Tailwind CSS | Utility-first styling |
| Fetch API | HTTP communication |
| Sonner | Toast notifications |
| date-fns | Date formatting |

---

## 📁 Folder Structure

### Backend
```
SalesOrderApp/
├── API/
│   ├── Controllers/
│   │   ├── ClientsController.cs
│   │   ├── ItemsController.cs
│   │   ├── SalesOrdersController.cs
│   │   └── WeatherForecastController.cs
│   ├── Mappings/
│   │   └── MappingProfile.cs
│   ├── Models/
│   │   ├── ClientDto.cs
│   │   ├── CreateSalesOrderDto.cs
│   │   ├── CreateSalesOrderLineDto.cs
│   │   ├── ItemDto.cs
│   │   ├── SalesOrderDto.cs
│   │   └── SalesOrderLineDto.cs
│   ├── Program.cs
│   └── appsettings.json
├── Application/
│   └── Interfaces/
│       ├── IClientRepository.cs
│       ├── IItemRepository.cs
│       └── ISalesOrderRepository.cs
├── Domain/
│   └── Entities/
│       ├── Client.cs
│       ├── Item.cs
│       ├── SalesOrder.cs
│       └── SalesOrderLine.cs
└── Infrastructure/
    ├── Data/
    │   └── AppDbContext.cs
    ├── Migrations/
    │   ├── 20260422150604_InitialCreate.cs
    │   ├── 20260422150604_InitialCreate.Designer.cs
    │   └── AppDbContextModelSnapshot.cs
    ├── Repositories/
    │   ├── ClientRepository.cs
    │   ├── ItemRepository.cs
    │   └── SalesOrderRepository.cs
```

### Frontend
```
sales-order-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── shared/
│   │   │   ├── DataTable.jsx
│   │   │   ├── PageHeader.jsx
│   │   │   └── OrderForm/
│   │   │       ├── OrderHeader.jsx
│   │   │       ├── OrderLines.jsx
│   │   │       └── OrderTotals.jsx
│   │   └── ui/
│   │       ├── button.jsx
│   │       ├── calendar.jsx
│   │       ├── dialog.jsx
│   │       ├── input.jsx
│   │       ├── label.jsx
│   │       ├── popover.jsx
│   │       ├── select.jsx
│   │       ├── sonner.jsx
│   │       └── table.jsx
│   ├── layouts/
│   │   └── root-layout.layout.jsx
│   ├── lib/
│   │   ├── features/
│   │   │   └── salesOrderSlice.js
│   │   ├── services/
│   │   │   └── api/
│   │   │       └── api.js
│   │   ├── store.js
│   │   └── utils.js
│   ├── pages/
│   │   ├── home.page.jsx
│   │   └── sales-order.page.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
└── package.json
```

---

## 🗄️ Database Schema

```
Clients
├── ClientId (PK)
├── CustomerName
├── Address1
├── Address2
├── Address3
├── Suburb
├── State
└── PostCode

Items
├── ItemId (PK)
├── ItemCode
├── Description
└── Price

SalesOrders
├── OrderId (PK)
├── ClientId (FK → Clients)
├── InvoiceNo
├── InvoiceDate
├── ReferenceNo
├── Address1-3, Suburb, State, PostCode
├── TotalExcl
├── TotalTax
├── TotalIncl
└── CreatedAt

SalesOrderLines
├── LineId (PK)
├── OrderId (FK → SalesOrders)
├── ItemId (FK → Items)
├── Note
├── Quantity
├── Price
├── TaxRate
├── ExclAmount
├── TaxAmount
└── InclAmount
```

---

## 🖥️ Screens

### Screen 1 — Home
<img width="1890" height="564" alt="Screenshot 2026-04-23 191442" src="https://github.com/user-attachments/assets/11099af1-5c3a-4df2-92a6-49cf46fd0806" />

- Displays all sales orders in a table
- **Add New** button to create a new order
- **Edit** button to open an existing order
- **Delete** button to remove an order
- **Double-click** any row to open it in edit mode

### Screen 2 — Sales Order
<img width="1877" height="896" alt="Screenshot 2026-04-23 191510" src="https://github.com/user-attachments/assets/19c3a374-ab4a-4bfc-b220-a0c5b3aa7b64" />

- **Customer Name** dropdown — auto-fills address fields
- **Invoice No, Invoice Date, Reference No** fields
- **Item Code & Description** dropdowns — linked together
- **Auto-calculations per line:**
  - Excl Amount = Quantity × Price
  - Tax Amount = Excl Amount × Tax Rate / 100
  - Incl Amount = Excl Amount + Tax Amount
- **Order Totals** — Total Excl, Total Tax, Total Incl
- **Save Order** button with validation and toast feedback

---

## 🚀 Getting Started

### Prerequisites
- .NET 8 SDK
- SQL Server / SQL Server Express
- Node.js 18+
- Visual Studio 2022 or VS Code

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/dhemjitha/spil-sales-order-app
```

2. Update connection string in `API/appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=SalesOrderDB;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

3. Run migrations to create the database:
```bash
dotnet ef migrations add InitialCreate --project Infrastructure --startup-project API
dotnet ef database update --project Infrastructure --startup-project API
```

4. Run the API:
```bash
cd API
dotnet run
```

API will be available at: `https://localhost:7266`
Swagger UI at: `https://localhost:7266/swagger`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd sales-order-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

App will be available at: `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/Clients` | Get all clients |
| GET | `/api/Clients/{id}` | Get client by ID |
| GET | `/api/Items` | Get all items |
| GET | `/api/Items/{id}` | Get item by ID |
| GET | `/api/SalesOrders` | Get all sales orders |
| GET | `/api/SalesOrders/{id}` | Get order by ID |
| POST | `/api/SalesOrders` | Create new order |
| PUT | `/api/SalesOrders/{id}` | Update existing order |
| DELETE | `/api/SalesOrders/{id}` | Delete order |

---

## 📸 Screenshots
- <img width="1890" height="564" alt="Screenshot 2026-04-23 191442" src="https://github.com/user-attachments/assets/11099af1-5c3a-4df2-92a6-49cf46fd0806" />

- <img width="1877" height="896" alt="Screenshot 2026-04-23 191510" src="https://github.com/user-attachments/assets/19c3a374-ab4a-4bfc-b220-a0c5b3aa7b64" />

- <img width="1883" height="390" alt="Screenshot 2026-04-23 191656" src="https://github.com/user-attachments/assets/5814de46-5073-42cb-b2cb-403f65883422" />

- <img width="1877" height="895" alt="Screenshot 2026-04-23 191632" src="https://github.com/user-attachments/assets/e6180f5d-da23-4ee6-a095-8b85ad8f67da" />

---

## 👤 Author

Developed as part of SPIL Labs (Pvt) Ltd By DulranDev. Web Application Development Assessment.
