"use client";
import { useAdmin } from "../../context/AdminContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { isAdmin, loading, logout } = useAdmin();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Check admin status
  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, loading, router]);

  // Fetch orders
  useEffect(() => {
    if (isAdmin) {
      fetchOrders();
      const interval = setInterval(fetchOrders, 3000); // Refresh every 3 seconds
      return () => clearInterval(interval);
    }
  }, [isAdmin]);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setOrdersLoading(false);
    }
  }

  async function handleMarkComplete(orderId) {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: "COMPLETED" }),
      });

      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error("Failed to update order:", err);
    }
  }

  async function handleCancel(orderId) {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: "CANCELLED" }),
      });

      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error("Failed to cancel order:", err);
    }
  }

  function handleLogout() {
    logout();
    router.push("/admin/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-600">Total Orders</p>
            <p className="text-3xl font-bold">{orders.length}</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-600">Pending</p>
            <p className="text-3xl font-bold text-orange-600">
              {orders.filter((o) => o.status === "PENDING").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-600">Completed</p>
            <p className="text-3xl font-bold text-green-600">
              {orders.filter((o) => o.status === "COMPLETED").length}
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">Orders</h2>
          </div>

          {ordersLoading ? (
            <div className="p-6 text-center text-gray-600">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="p-6 text-center text-gray-600">No orders yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((order) => (
                      <tr
                        key={order.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 text-sm font-mono text-blue-600">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {order.customerName}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {order.customerPhone}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="max-w-xs">
                            {order.items.map((item, i) => (
                              <div key={i} className="text-gray-700">
                                {item.name}{" "}
                                <span className="text-xs text-gray-500">
                                  ({item.quantity})
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded text-white text-xs font-medium ${
                              order.status === "PENDING"
                                ? "bg-orange-500"
                                : order.status === "COMPLETED"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {order.status === "PENDING" && (
                            <div className="space-x-2">
                              <button
                                onClick={() => handleMarkComplete(order.id)}
                                className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                              >
                                Complete
                              </button>
                              <button
                                onClick={() => handleCancel(order.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                          {order.status === "COMPLETED" && (
                            <span className="text-gray-500 text-xs">—</span>
                          )}
                          {order.status === "CANCELLED" && (
                            <span className="text-gray-500 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
