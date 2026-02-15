import { useState, useMemo, useEffect, useRef } from "react";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";

export default function CustomersPage() {

  // Dummy customer data
  const customersData = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", country: "USA", orders: 5 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "234-567-8901", country: "UK", orders: 3 },
    { id: 3, name: "Carlos Ruiz", email: "carlos@example.com", phone: "345-678-9012", country: "Spain", orders: 8 },
    { id: 4, name: "Priya Kumar", email: "priya@example.com", phone: "456-789-0123", country: "India", orders: 2 },
    { id: 5, name: "Liam Brown", email: "liam@example.com", phone: "567-890-1234", country: "Canada", orders: 7 },
    { id: 6, name: "Emma Wilson", email: "emma@example.com", phone: "678-901-2345", country: "Australia", orders: 4 },
  ];

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 🔍 Filter customers by search
  const filteredCustomers = useMemo(() => {
    return customersData.filter((customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const currentCustomers = filteredCustomers.slice(
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
          <h2 className="text-xl font-bold">Customers List</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => alert("Add Customer Clicked")}
          >
            + Add Customer
          </button>
        </div>

        <input
          type="text"
          placeholder="Search customer..."
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
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Country</th>
              <th className="p-3">Orders</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentCustomers.length > 0 ? (
              currentCustomers.map((customer) => (
                <tr key={customer.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{customer.id}</td>
                  <td className="p-3 font-medium">{customer.name}</td>
                  <td className="p-3">{customer.email}</td>
                  <td className="p-3">{customer.phone}</td>
                  <td className="p-3">{customer.country}</td>
                  <td className="p-3">{customer.orders}</td>

                  {/* Actions */}
                  <td className="p-3 text-center relative" ref={menuRef}>
                    {openMenuId === customer.id ? (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 bg-white shadow-lg border rounded-lg p-1 z-20">
                        <button
                          onClick={() => alert("View " + customer.name)}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => alert("Edit " + customer.name)}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => alert("Delete " + customer.name)}
                          className="p-2 hover:bg-red-100 text-red-600 rounded"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === customer.id ? null : customer.id)
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
                  No customers found
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
