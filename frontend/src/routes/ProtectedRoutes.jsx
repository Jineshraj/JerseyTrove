import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import { toast } from "sonner";

const ProtectedRoutes = () => {
  //if user is not logged in he shouldnt be able to navigate to My orders, Profiles e.t.c...
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      toast.warning("Please Login first to view this page");
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
