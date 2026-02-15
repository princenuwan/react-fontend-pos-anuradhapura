import { useState, useMemo, useEffect, useRef } from "react";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";

export default function SuppliersPage() {

  // Dummy suppliers data
  const suppliersData = [
    { id: 1, name: "Tech Supplies Ltd", email: "tech@supplies.com", phone: "123-456-7890", country: "USA", productsSupplied: 12 },
    { id: 2, name: "Fashion Co", email: "fashion@co.com", phone: "234-567-8901", country: "UK", productsSupplied: 8 },
    { id: 3, name: "ElectroWorld", email: "info@electroworld.com", phone: "345-678-9012", country: "Germany", productsSupplied: 15 },
    { id: 4, name: "Home Needs", email: "contact@homeneeds.com", phone: "456-789-0123", country: "India", productsSupplied: 20 },
    { id: 5, name: "Office Supplies", email: "sales@office.com", phone: "567-890-1234", country: "Canada", productsSupplied: 10 },
    { id: 6, name: "Fashion Trends", email: "fashion@trends.com", phone: "678-901-2345", country: "France", productsSupplied: 7 },
  ];

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 🔍 Filter suppliers by search
  const filteredSuppliers = useMemo(() => {
    return suppliersData.filter((supplier) =>
      supplier.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const currentSuppliers = filteredSuppliers.slice(
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
          <h2 className="text-xl font-bold">Suppliers List</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => alert("Add Supplier Clicked")}
          >
            + Add Supplier
          </button>
        </div>

        <input
          type="text"
          placeholder="Search supplier..."
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
              <th className="p-3">Products Supplied</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentSuppliers.length > 0 ? (
              currentSuppliers.map((supplier) => (
                <tr key={supplier.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{supplier.id}</td>
                  <td className="p-3 font-medium">{supplier.name}</td>
                  <td className="p-3">{supplier.email}</td>
                  <td className="p-3">{supplier.phone}</td>
                  <td className="p-3">{supplier.country}</td>
                  <td className="p-3">{supplier.productsSupplied}</td>

                  {/* Actions */}
                  <td className="p-3 text-center relative" ref={menuRef}>
                    {openMenuId === supplier.id ? (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 bg-white shadow-lg border rounded-lg p-1 z-20">
                        <button
                          onClick={() => alert("View " + supplier.name)}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => alert("Edit " + supplier.name)}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => alert("Delete " + supplier.name)}
                          className="p-2 hover:bg-red-100 text-red-600 rounded"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === supplier.id ? null : supplier.id)
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
                  No suppliers found
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
