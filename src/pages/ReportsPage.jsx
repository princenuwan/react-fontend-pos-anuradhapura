import { useState, useMemo, useEffect, useRef } from "react";
import { Eye, Download, MoreVertical } from "lucide-react";

export default function ReportsPage() {
  // Dummy report data
  const reportsData = [
    { id: 1, date: "2026-02-01", customer: "John Doe", type: "Sale", amount: 500, status: "Completed" },
    { id: 2, date: "2026-02-02", customer: "Jane Smith", type: "Sale", amount: 1200, status: "Pending" },
    { id: 3, date: "2026-02-03", customer: "Acme Corp", type: "Purchase", amount: 800, status: "Completed" },
    { id: 4, date: "2026-02-04", customer: "John Doe", type: "Sale", amount: 300, status: "Completed" },
    { id: 5, date: "2026-02-05", customer: "Jane Smith", type: "Sale", amount: 1500, status: "Pending" },
    { id: 6, date: "2026-02-06", customer: "Acme Corp", type: "Purchase", amount: 600, status: "Completed" },
    { id: 7, date: "2026-02-07", customer: "John Doe", type: "Sale", amount: 700, status: "Completed" },
    { id: 8, date: "2026-02-08", customer: "Jane Smith", type: "Sale", amount: 900, status: "Pending" },
    { id: 9, date: "2026-02-09", customer: "Acme Corp", type: "Purchase", amount: 400, status: "Completed" },
    { id: 10, date: "2026-02-10", customer: "John Doe", type: "Sale", amount: 1000, status: "Completed" },
  ];

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const itemsPerPage = 5;

  // Filter reports based on search
  const filteredReports = useMemo(() => {
    return reportsData.filter((report) =>
      report.customer.toLowerCase().includes(search.toLowerCase()) ||
      report.type.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Pagination
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const currentReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Click outside to close action menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Summary cards
  const totalRevenue = reportsData.reduce((sum, r) => r.type === "Sale" ? sum + r.amount : sum, 0);
  const totalExpenses = reportsData.reduce((sum, r) => r.type === "Purchase" ? sum + r.amount : sum, 0);
  const pendingReports = reportsData.filter(r => r.status === "Pending").length;
  const completedReports = reportsData.filter(r => r.status === "Completed").length;

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Reports</h2>
        <input
          type="text"
          placeholder="Search reports..."
          className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DashboardCard title="Total Revenue" value={`$${totalRevenue}`} />
        <DashboardCard title="Total Expenses" value={`$${totalExpenses}`} />
        <DashboardCard title="Pending Reports" value={pendingReports} />
        <DashboardCard title="Completed Reports" value={completedReports} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Type</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentReports.length > 0 ? (
              currentReports.map((report) => (
                <tr key={report.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{report.id}</td>
                  <td className="p-3">{report.date}</td>
                  <td className="p-3 font-medium">{report.customer}</td>
                  <td className="p-3">{report.type}</td>
                  <td className="p-3">${report.amount}</td>
                  <td className="p-3">{report.status}</td>

                  {/* Actions */}
                  <td className="p-3 text-center relative" ref={menuRef}>
                    {openMenuId === report.id ? (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 bg-white shadow-lg border rounded-lg p-1 z-20">
                        <button
                          onClick={() => alert("View " + report.id)}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => alert("Download " + report.id)}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <Download size={18} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === report.id ? null : report.id)
                        }
                        className="p-2 hover:bg-gray-200 rounded-full"
                      >
                        <MoreVertical size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// Reusable summary card
function DashboardCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
