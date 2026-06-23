"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Power, X, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentVendor, setCurrentVendor] = useState(null);

  const backendUrl = `http://localhost:4000/api`;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    shopename: "",
    ownername: "",
    ownerphone: "",
    owneraddress: "",
    owneremail: "",
    commissionrate: 10,
  });

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/vendors`);
      const data = await res.json();

      if (data.success) {
        setVendors(data.vendors);
      } else {
        toast.error("Failed to fetch vendors");
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
      toast.error("Error loading vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddNew = () => {
    setEditMode(false);
    setCurrentVendor(null);
    setFormData({
      username: "",
      email: "",
      password: "",
      shopename: "",
      ownername: "",
      ownerphone: "",
      owneraddress: "",
      owneremail: "",
      commissionrate: 10,
    });
    setShowModal(true);
  };

  const handleEdit = (vendor) => {
    setEditMode(true);
    setCurrentVendor(vendor);
    setFormData({
      username: vendor.username,
      email: vendor.email,
      password: "",
      shopename: vendor.shopename || "",
      ownername: vendor.ownername || "",
      ownerphone: vendor.ownerphone || "",
      owneraddress: vendor.owneraddress || "",
      owneremail: vendor.owneremail || "",
      commissionrate: vendor.commissionrate || 10,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.email) {
      toast.error("Please fill required fields");
      return;
    }

    if (!editMode && !formData.password) {
      toast.error("Password is required for new vendor");
      return;
    }

    setLoading(true);

    try {
      const url = editMode
        ? `${backendUrl}/vendors/${currentVendor._id}`
        : `${backendUrl}/vendors`;

      const method = editMode ? "PUT" : "POST";

      const body =
        editMode && !formData.password
          ? { ...formData, password: undefined }
          : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(editMode ? "Vendor updated!" : "Vendor created!");
        setShowModal(false);
        fetchVendors();
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this vendor?")) return;

    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/vendors/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Vendor deleted!");
        fetchVendors();
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/vendors/${id}/toggle-status`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`Status changed to ${data.status}`);
        fetchVendors();
      } else {
        toast.error(data.message || "Status change failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Status change failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Vendor Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage all your vendors</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex cursor-pointer items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus size={18} />
          Add Vendor
        </button>
      </div>

      {loading && vendors.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : vendors.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">
            No vendors found. Add your first vendor!
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Vendor Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Shop Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Commission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vendors.map((vendor) => (
                  <tr key={vendor._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {vendor.username}
                        </p>
                        <p className="text-sm text-gray-500">{vendor.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {vendor.shopName || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {vendor.ownerName || "N/A"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900">
                          {vendor.ownerphone || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {vendor.owneraddress || "N/A"}
                        </p>

                        <p className="text-sm text-gray-500">
                          {vendor.owneremail || "N/A"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {vendor.commissionrate || 0}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          vendor.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {vendor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(vendor)}
                          className="p-2 cursor-pointer text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(vendor._id)}
                          className="p-2 cursor-pointer text-orange-600 hover:bg-orange-50 rounded-lg transition"
                          title="Toggle Status"
                        >
                          <Power size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(vendor._id)}
                          className="p-2 cursor-pointer text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {editMode ? "Edit Vendor" : "Add New Vendor"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 cursor-pointer hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password {!editMode && "*"}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={
                        editMode ? "Leave blank to keep current" : ""
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shop Name *
                  </label>
                  <input
                    type="text"
                    name="shopename"
                    value={formData.shopename}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    name="ownername"
                    value={formData.ownername}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="ownerphone"
                    value={formData.ownerphone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="owneraddress"
                    value={formData.owneraddress}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner Email
                  </label>
                  <input
                    type="email"
                    name="owneremail"
                    value={formData.owneremail}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Commission Rate (%)
                  </label>
                  <input
                    type="number"
                    name="commissionrate"
                    value={formData.commissionrate}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : editMode
                    ? "Update Vendor"
                    : "Create Vendor"}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorManagement;
