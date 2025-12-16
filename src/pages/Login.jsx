import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await login(username, password);
      nav("/dashboard");
    } catch {
      setErr("Invalid username or password");
    }
  }

  return (
    <div style={{ fontFamily: "Arial", maxWidth: 420, margin: "80px auto", padding: 20 }}>
      <h2 style={{ marginBottom: 6 }}>Electronic Sterilization Tracking System</h2>
      <div style={{ opacity: 0.8, marginBottom: 18 }}>
        International Sterilization System — Gulf Region (Phase 1)
      </div>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {err && <div style={{ color: "crimson" }}>{err}</div>}
        <button type="submit">Sign in</button>
      </form>

      <div style={{ marginTop: 18, fontSize: 12, opacity: 0.7 }}>
        © 2025 — IP Registration No. 43177723-12-25
      </div>
    </div>
  );
}
