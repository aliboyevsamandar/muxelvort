import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { $api } from "../utils"; // ⚠️ Bu faylni aniqligini tekshiring
import Swal from "sweetalert2";

export default function Admin() {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({
    image: "",
    name: "",
    category: "",
    price: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const res = await $api.get("/products");
      setFoods(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image || !form.name || !form.category || !form.price) {
      Swal.fire({
        icon: "info",
        title: "Please fill in all fields!!!",
      });
      return;
    }

    const preparedForm = { ...form, price: Number(form.price) };

    try {
      if (editingId) {
        await $api.put(`/products/${editingId}`, preparedForm, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        Swal.fire({
          icon: "success",
          title: "Successfully Updated!",
          text: `${form.name} has been updated.`,
        });
      } else {
        await $api.post("/products", preparedForm, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        Swal.fire({
          icon: "success",
          title: "Successfully Added!",
          text: `${form.name} has been added.`,
        });
      }

      setForm({ image: "", name: "", category: "", price: "" });
      setEditingId(null);
      fetchFoods();
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  const handleEdit = (item) => {
    setForm({
      image: item.image,
      name: item.name,
      category: item.category,
      price: item.price,
    });
    setEditingId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await $api.delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        Swal.fire({
          title: "Deleted!",
          text: "Your item has been deleted.",
          icon: "success",
        });

        fetchFoods();
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete item. Please try again.",
        });
      }
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6">
      <h1 className="text-5xl text-center font-extrabold mb-12 tracking-wide">
        Admin Panel
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl mb-14"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          {editingId ? "Edit Food Item" : "Add New Food"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="p-4 rounded-lg bg-slate-700/60 text-white"
          />
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-4 rounded-lg bg-slate-700/60 text-white"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="p-4 py-4 rounded-lg bg-slate-700/60 text-white"
          >
            <option value="">Choose</option>
            <option value="foods">Foods</option>
            <option value="drinks">Drinks</option>
            <option value="sweets">Sweets</option>
            <option value="fruits">Fruits</option>
          </select>
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="p-4 rounded-lg bg-slate-700/60 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 rounded-xl text-2xl font-bold tracking-wide shadow-lg"
        >
          {editingId ? "Update Food" : "Add Food"}
        </button>
      </form>

      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 justify-center">
          {foods.map((item) => (
            <div
              key={item._id}
              className="w-[270px] bg-slate-900 rounded-xl hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.02] flex flex-col"
            >
              <img
                className="p-4 w-full h-48 object-cover rounded-t-lg"
                src={item.image}
                alt={item.name}
              />
              <div className="px-5 pb-5 flex flex-col justify-between flex-grow">
                <h5 className="text-2xl text-center font-semibold text-white ">
                  {item.name}
                </h5>
                <div className="flex items-center justify-between">
                  <p className="text-gray-500 text-lg">{item.category}</p>
                  <span className="text-2xl font-bold text-blue-500">
                    ${item.price}
                  </span>
                </div>
                <div className="flex gap-3 mt-6 justify-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-5 py-1 bg-yellow-500 hover:bg-yellow-600 rounded-lg font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-5 py-1 bg-red-500 hover:bg-red-600 rounded-lg font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
