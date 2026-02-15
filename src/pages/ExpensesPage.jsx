import { useState, useMemo, useEffect, useRef } from "react";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";

export default function ExpensesPage() {

  // Dummy expenses data
  const expensesData = [
    { id: 1, title: "Office Rent", category: "Operations", amount: 1200, date: "2026-02-01" },
    { id: 2, title: "Utilities", category: "Operations", amount: 350, date: "2026-02-03" },
    { id: 3, title: "Supplies", category: "Office", amount: 200, date: "2026-02-05" },
    { id: 4, title: "Software Subscription", category: "IT", amount: 150, date: "2026-02-07" },
    { id: 5, title: "Travel", category: "Operations", amount: 500, date: "2026-02-09" },
    { id: 6, title: "Marketing", category: "Sales", amount: 600, date: "2026-02-11" },
    { id: 7, title: "Maintenance", category: "Office", amount: 300, date: "2026-02-13" },
  ];

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 🔍 Filter expenses by search
  const filteredExpenses = useMemo(() => {
    return expensesData.filter((expense) =>
      expense.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const currentExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  // Hide menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">Expenses List</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => alert("Add Expense Clicked")}
          >
            + Add Expense
          </button>
        </div>

        <input
          type="text"
          placeholder="Search expense..."
          className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Amount ($)</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentExpenses.length > 0 ? (
              currentExpenses.map((expense) => (
                <tr key={expense.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{expense.id}</td>
                  <td className="p-3 font-medium">{expense.title}</td>
                  <td className="p-3">{expense.category}</td>
                  <td className="p-3">{expense.amount}</td>
                  <td className="p-3">{expense.date}</td>

                  {/* Actions */}
                  <td className="p-3 text-center relative" ref={menuRef}>
                    {openMenuId === expense.id ? (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 bg-white shadow-lg border rounded-lg p-1 z-20">
                        <button
                          onClick={() => alert("View " + expense.title)}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => alert("Edit " + expense.title)}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => alert("Delete " + expense.title)}
                          className="p-2 hover:bg-red-100 text-red-600 rounded"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === expense.id ? null : expense.id)
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
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No expenses found
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
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
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
