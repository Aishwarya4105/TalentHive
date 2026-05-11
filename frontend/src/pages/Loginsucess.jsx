import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function LoginSuccess() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        return navigate("/login");
      }

      try {
        //  Save token first
        localStorage.setItem("token", token);

        //  Fetch user from backend
        const res = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const userData = {
          token,
          user: res.data
        };

        //  Use same login logic
        login(userData);

        const role = res.data.role;

        if (role === "admin") navigate("/admin-dashboard");
        else if (role === "employer") navigate("/recruiter/dashboard");
        else navigate("/jobseeker/dashboard");

      } catch (err) {
        console.log("Google login error:", err);
        navigate("/login");
      }
    };

    handleGoogleLogin();
  }, []);

  return <h2>Logging you in...</h2>;
}

export default LoginSuccess;