"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if already logged in
  useEffect(() => {
    const stored = localStorage.getItem("adminToken");
    if (stored) {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  function login(token) {
    localStorage.setItem("adminToken", token);
    setIsAdmin(true);
  }

  function logout() {
    localStorage.removeItem("adminToken");
    setIsAdmin(false);
  }

  return (
    <AdminContext.Provider value={{ isAdmin, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
