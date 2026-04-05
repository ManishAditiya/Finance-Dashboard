# 💰 FinanceApp — Personal Finance Dashboard

A modern, responsive personal finance dashboard built with React, TypeScript, and Tailwind CSS. Manage your transactions, visualize spending patterns, and gain financial insights — all in one place.

---

## 📸 Features at a Glance

- **Dashboard** with summary cards, balance trend chart, and spending breakdown
- **Transactions** page with filtering, sorting, search, and CRUD operations
- **Insights** page with smart observations, savings rate, and category breakdowns
- **Role-Based UI** — Admin can add, edit, delete; Viewer is read-only
- **Dark / Light Mode** toggle
- **Fully Responsive** — mobile-first with hamburger sidebar navigation
- **Data Persistence** — transactions saved to localStorage across sessions

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| State Management | Zustand (with persist middleware) |
| Charts | Recharts |
| Routing | React Router DOM v6 |
| Icons | Lucide React |
| Date Handling | date-fns |

---

## 🚀 Setup Instructions

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher — download from [nodejs.org](https://nodejs.org)
- **npm** v9 or higher (comes with Node.js)

Verify your installation:

```bash
node --version   # Should print v18.x.x or higher
npm --version    # Should print 9.x.x or higher
```

---

### Installation

**1. Clone or download the project**

```bash
git clone <your-repo-url>
cd finance-dashboard
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

**4. Open in browser**

Visit [http://localhost:5173](http://localhost:5173)

---

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready to deploy on any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

---

## 📁 Folder Structure

```
finance-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── SummaryCards.tsx        # Total Balance, Income, Expenses cards
│   │   │   ├── BalanceTrendChart.tsx   # Line chart — monthly trend
│   │   │   └── SpendingPieChart.tsx    # Donut chart — category breakdown
│   │   ├── transactions/
│   │   │   ├── TransactionFilters.tsx  # Search, filter, sort controls
│   │   │   ├── TransactionRow.tsx      # Individual transaction row
│   │   │   ├── TransactionTable.tsx    # Full transactions table
│   │   │   └── AddTransactionModal.tsx # Add / Edit modal form
│   │   ├── insights/
│   │   │   ├── InsightCard.tsx         # Individual insight stat card
│   │   │   ├── MonthlyComparisonChart  # Bar chart — monthly comparison
│   │   │   ├── SavingsRateBar.tsx      # Savings rate progress bar
│   │   │   └── TopCategoriesTable.tsx  # Top 5 spending categories
│   │   └── layout/
│   │       ├── AppLayout.tsx           # Root layout wrapper
│   │       ├── Navbar.tsx              # Top navigation bar
│   │       ├── Sidebar.tsx             # Side navigation (with mobile support)
│   │       ├── RoleSwitcher.tsx        # Admin / Viewer toggle
│   │       └── ThemeToggle.tsx         # Dark / Light mode toggle
│   ├── pages/
│   │   ├── DashboardPage.tsx           # Main dashboard view
│   │   ├── TransactionsPage.tsx        # Transactions list view
│   │   └── InsightsPage.tsx            # Financial insights view
│   ├── store/
│   │   ├── useTransactionStore.ts      # Zustand — transactions + filters
│   │   ├── useRoleStore.ts             # Zustand — current role
│   │   └── useThemeStore.ts            # Zustand — dark/light mode
│   ├── hooks/
│   │   ├── useFilteredTransactions.ts  # Memoized filtered/sorted transactions
│   │   └── useInsights.ts             # Computed financial insights
│   ├── data/
│   │   └── mockTransactions.ts         # Seed data for demo
│   ├── types/
│   │   └── index.ts                    # TypeScript interfaces & types
│   └── utils/
│       ├── formatCurrency.ts           # INR currency formatter
│       └── computeInsights.ts          # Financial computation helpers
├── .vscode/
│   └── settings.json                   # VS Code workspace settings
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🎯 Feature Explanation

### 1. Dashboard Overview

The main dashboard provides a high-level financial summary:

- **Summary Cards** — Total Balance, Total Income, and Total Expenses computed in real time from all transactions
- **Balance Trend Chart** — A line chart showing Income, Expenses, and Balance grouped by month using Recharts
- **Spending Breakdown** — A donut chart showing the proportion of spending across categories like Food, Shopping, Health, etc.

### 2. Transactions Section

A full-featured transaction management interface:

- **Transaction Table** — Displays all transactions with Date, Description, Category, Type (income/expense), and Amount
- **Search** — Filter transactions by description or category name in real time
- **Filters** — Filter by transaction type (income/expense) and category
- **Sorting** — Sort by date or amount in ascending or descending order
- **Reset** — One-click reset of all active filters
- **Empty State** — Friendly message when no transactions match the filters
- **Add Transaction** (Admin only) — Modal form to add new transactions with description, amount, type, category, and date
- **Edit Transaction** (Admin only) — Edit any existing transaction via the pencil icon
- **Delete Transaction** (Admin only) — Remove any transaction via the trash icon

### 3. Role-Based UI (RBAC Simulation)

The app simulates two roles on the frontend without any backend:

- **Viewer** — Can browse the dashboard, view transactions, and see insights. No write access.
- **Admin** — Has full access including adding, editing, and deleting transactions.

Switch roles using the **Viewer / Admin toggle** in the top navbar. The UI updates instantly — the Add Transaction button and row action buttons appear only in Admin mode.

### 4. Insights Section

Smart financial observations derived from transaction data:

- **Insight Cards** — Highest spending category, best savings month, highest expense month, and average monthly expense
- **Savings Rate Bar** — A color-coded progress bar (green/yellow/red) showing what percentage of income was saved
- **Monthly Comparison Chart** — A grouped bar chart comparing Income, Expenses, and Savings month by month
- **Top Spending Categories** — A ranked list of the top 5 expense categories with progress bars showing their share of total spending

### 5. State Management

Built with **Zustand** for lightweight and scalable state management:

- `useTransactionStore` — Holds all transactions and filter state. Uses the `persist` middleware to save transactions to `localStorage`, so data survives page refreshes.
- `useRoleStore` — Tracks the currently selected role (admin or viewer).
- `useThemeStore` — Tracks dark/light mode preference and applies the `dark` class to the HTML element.

### 6. Dark / Light Mode

A smooth toggle switch in the navbar switches between light and dark themes. The theme is applied using Tailwind's class-based dark mode strategy — adding or removing the `dark` class on the root `<html>` element.

### 7. Responsive Design

The app is fully mobile-friendly:

- On **desktop** — a persistent sidebar shows on the left with full navigation
- On **mobile** — the sidebar is hidden by default and slides in from the left when the hamburger menu (☰) is tapped
- A dark overlay appears behind the open sidebar on mobile; tapping it closes the sidebar
- Cards, charts, and tables all reflow and resize for smaller screens
- The Role Switcher shows only icons on small screens and full labels on larger screens

---

## 📊 Sample Data

The app comes pre-loaded with 15 mock transactions across March and April 2025 covering categories like Salary, Freelance, Food, Transport, Shopping, Entertainment, Health, Utilities, and Investment — giving all charts and insights meaningful data to display out of the box.

---

## 🔧 VS Code Recommended Extensions

For the best development experience, install these extensions:

- **Tailwind CSS IntelliSense** by Tailwind Labs
- **ESLint** by Microsoft
- **Prettier - Code Formatter** by Prettier

---




