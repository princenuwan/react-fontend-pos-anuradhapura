import { useState, useMemo, useEffect, useRef } from "react";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";


export default function ProductPage() {

  // Dummy product data
  const productsData = [
    { id: 1, name: "Laptop", category: "Electronics", price: 800, stock: 12 },
    { id: 2, name: "Phone", category: "Electronics", price: 500, stock: 25 },
    { id: 3, name: "Headphones", category: "Accessories", price: 120, stock: 40 },
    { id: 4, name: "Shoes", category: "Fashion", price: 90, stock: 15 },
    { id: 5, name: "Watch", category: "Accessories", price: 150, stock: 10 },
    { id: 6, name: "Tablet", category: "Electronics", price: 400, stock: 8 },
    { id: 7, name: "Backpack", category: "Fashion", price: 60, stock: 30 },
    { id: 8, name: "Camera", category: "Electronics", price: 900, stock: 5 },
    { id: 9, name: "Keyboard", category: "Accessories", price: 70, stock: 20 },
    { id: 10, name: "Mouse", category: "Accessories", price: 40, stock: 50 },
    { id: 11, name: "Monitor", category: "Electronics", price: 300, stock: 18 },
  ];

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // 🔍 Filter products by search
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [openMenuId, setOpenMenuId] = useState(null);

  const menuRef = useRef(null);  

useEffect(() => {             
  function handleClickOutside(event) {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenuId(null);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">

  {/* Left side: Title + Add Button */}
  <div className="flex items-center gap-4">
    <h2 className="text-xl font-bold">Product List</h2>

    <button
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      onClick={() => alert("Add Product Clicked")}
    >
      + Add Product
    </button>
  </div>

  {/* Right side: Search */}
  <input
    type="text"
    placeholder="Search product..."
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
        <th className="p-3">Category</th>
        <th className="p-3">Price</th>
        <th className="p-3">Stock</th>
        <th className="p-3 text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      {currentProducts.length > 0 ? (
        currentProducts.map((product) => (
          <tr key={product.id} className="border-t hover:bg-gray-50">
            <td className="p-3">{product.id}</td>
            <td className="p-3 font-medium">{product.name}</td>
            <td className="p-3">{product.category}</td>
            <td className="p-3">{product.price}</td>
            <td className="p-3">{product.stock}</td>

            {/* Actions Column */}
            <td className="p-3 text-center relative" ref={menuRef}>
  {openMenuId === product.id ? (
    // Horizontal icons menu
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 bg-white shadow-lg border rounded-lg p-1 z-20">
      <button
        onClick={() => alert("View " + product.name)}
        className="p-2 hover:bg-gray-100 rounded"
      >
        <Eye size={18} />
      </button>
      <button
        onClick={() => alert("Edit " + product.name)}
        className="p-2 hover:bg-gray-100 rounded"
      >
        <Pencil size={18} />
      </button>
      <button
        onClick={() => alert("Delete " + product.name)}
        className="p-2 hover:bg-red-100 text-red-600 rounded"
      >
        <Trash2 size={18} />
      </button>
    </div>
  ) : (
    // Three dots button
    <button
      onClick={() =>
        setOpenMenuId(openMenuId === product.id ? null : product.id)
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
            No products found
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
