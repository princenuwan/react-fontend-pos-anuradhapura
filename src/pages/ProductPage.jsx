import { useState } from "react";

export default function CreateProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    supplier: "",
    price: "",
    quantity: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", product);
    // Send to backend API here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Create New Product
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Category
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Groceries">Groceries</option>
              <option value="Clothing">Clothing</option>
            </select>
          </div>

          {/* Supplier */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Supplier
            </label>
            <select
              name="supplier"
              value={product.supplier}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select Supplier</option>
              <option value="ABC Traders">ABC Traders</option>
              <option value="XYZ Distributors">XYZ Distributors</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          {/* Description (Full Width) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
            >
              Save Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
