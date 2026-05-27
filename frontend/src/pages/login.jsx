import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      login(data);

      const role = data.user.role;

      if (role === "admin") navigate("/admin-dashboard");
      else if (role === "employer") navigate("/recruiter/dashboard");
      else navigate("/jobseeker/dashboard");

    } catch (err) {
      setError(err.message || "Login failed");
    }

    setLoading(false);
  };

  //  Google login (frontend trigger)
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* LOGO */}
        <h1 className="logo">Talent</h1>

        <h2>Sign in</h2>
        <p className="sub">Access your account</p>

        {error && <div className="error">{error}</div>}

        {/* GOOGLE BUTTON */}
        <button className="google-btn" onClick={handleGoogleLogin}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
          />
          Continue with Google
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>

        <p className="footer-text">
          New here? <span onClick={() => navigate("/register")}>Join now</span>
        </p>

      </div>
    </div>
  );
}

export default Login;