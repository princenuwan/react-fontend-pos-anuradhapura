import { useState } from "react";
import ProductPage from "./ProductsPage";
import CategoriesPage from "./CategoriesPage";
import CustomersPage from "./CustomersPage";
import ExpensesPage from "./ExpensesPage";
import ReportsPage from "./ReportsPage";
import SettingsPage from "./SettingsPage";
import SuppliersPage from "./SuppliersPage";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import {
  Home,
  Package,
  Truck,
  Users,
  BarChart3,
  Wallet,
  Tags,
  Settings,
  Menu,
  X,
} from "lucide-react";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen w-full bg-gray-100">

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h1 className={`text-xl font-bold ${!sidebarOpen && "hidden"}`}>
            Admin
          </h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-4">
          <SidebarItem icon={<Home />} text="Dashboard" open={sidebarOpen} to="/" />
          <SidebarItem icon={<Package />} text="Products" open={sidebarOpen} to="/product" />
          <SidebarItem icon={<Truck />} text="Suppliers" open={sidebarOpen} to="/suppliers" />
          <SidebarItem icon={<Users />} text="Customers" open={sidebarOpen} to="/customers" />
          <SidebarItem icon={<Tags />} text="Categories" open={sidebarOpen} to="/categories" />
          <SidebarItem icon={<Wallet />} text="Expenses" open={sidebarOpen} to="/expenses" />
          <SidebarItem icon={<BarChart3 />} text="Reports" open={sidebarOpen} to="/reports" />
          <SidebarItem icon={<Settings />} text="Settings" open={sidebarOpen} to="/settings" />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Admin User</span>
            <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
          </div>
        </header>

        {/* ROUTES CONTROL CONTENT */}
        <div className="flex-1 p-6">
          <Routes>

            {/* Dashboard Home */}
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <DashboardCard title="Total Users" value="1,245" />
                  <DashboardCard title="Total Products" value="320" />
                  <DashboardCard title="Orders Today" value="54" />
                  <DashboardCard title="Revenue" value="$12,430" />
                  <DashboardCard title="Pending Orders" value="8" />
                  <DashboardCard title="Low Stock Items" value="5" />
                </div>
              }
            />

            {/* Product Page */}
            <Route path="/product" element={<ProductPage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}

/* Sidebar Item as LINK */
function SidebarItem({ icon, text, open, to }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-4 p-3 rounded-lg transition
        ${isActive ? "bg-slate-800" : "hover:bg-slate-800"}`}
    >
      {icon}
      {open && <span>{text}</span>}
    </Link>
  );
}

/* Dashboard Card */
function DashboardCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
