import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AppContext";
import { useEffect } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";

export const useUser = () => {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const res = await axiosConfig.get(API_ENDPOINTS.GET_USER_INFO);
        if (isMounted && res.data) {
          setUser(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        if (isMounted) {
          logout();
          navigate("/login");
        }
      }
    }

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [setUser, logout, navigate]);
};