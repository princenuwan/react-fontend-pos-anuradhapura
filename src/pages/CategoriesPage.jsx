import { useState, useMemo, useEffect, useRef } from "react";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";

export default function CategoriesPage() {

  // Dummy category data
  const categoriesData = [
    { id: 1, name: "Electronics", description: "Gadgets and devices", products: 12 },
    { id: 2, name: "Fashion", description: "Clothing and accessories", products: 20 },
    { id: 3, name: "Home & Kitchen", description: "Household items", products: 15 },
    { id: 4, name: "Sports", description: "Sports equipment", products: 8 },
    { id: 5, name: "Books", description: "All kinds of books", products: 10 },
    { id: 6, name: "Toys", description: "Kids toys", products: 6 },
  ];

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 🔍 Filter categories by search
  const filteredCategories = useMemo(() => {
    return categoriesData.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const currentCategories = filteredCategories.slice(
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
          <h2 className="text-xl font-bold">Categories List</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => alert("Add Category Clicked")}
          >
            + Add Category
          </button>
        </div>

        <input
          type="text"
          placeholder="Search category..."
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
              <th className="p-3">Description</th>
              <th className="p-3">Products</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentCategories.length > 0 ? (
              currentCategories.map((category) => (
                <tr key={category.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{category.id}</td>
                  <td className="p-3 font-medium">{category.name}</td>
                  <td className="p-3">{category.description}</td>
                  <td className="p-3">{category.products}</td>

                  {/* Actions */}
                  <td className="p-3 text-center relative" ref={menuRef}>
                    {openMenuId === category.id ? (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 bg-white shadow-lg border rounded-lg p-1 z-20">
                        <button
                          onClick={() => alert("View " + category.name)}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => alert("Edit " + category.name)}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => alert("Delete " + category.name)}
                          className="p-2 hover:bg-red-100 text-red-600 rounded"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === category.id ? null : category.id)
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
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No categories found
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
