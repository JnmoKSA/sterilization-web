import { HashRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cycles from "./pages/Cycles";

function Protected({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function Layout({ children }) {
  const { user, logout } = useAuth();
  return (
    <div style={{ fontFamily: "Arial", padding: 18, maxWidth: 1100, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0 }}>Electronic Sterilization Tracking System</h2>
          <div style={{ opacity: 0.8 }}>International Sterilization System — Gulf Region (Phase 1)</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ opacity: 0.8 }}>{user?.username} ({user?.role})</span>
          <button onClick={logout}>Sign out</button>
        </div>
      </header>

      <nav style={{ marginTop: 14, display: "flex", gap: 10 }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/cycles">Sterilization Cycles</Link>
      </nav>

      <main style={{ marginTop: 16 }}>{children}</main>

      <footer style={{ marginTop: 24, opacity: 0.7, fontSize: 12 }}>
        © 2025 — IP Registration No. 43177723-12-25
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <Protected>
                <Layout><Dashboard /></Layout>
              </Protected>
            }
          />
          <Route
            path="/cycles"
            element={
              <Protected>
                <Layout><Cycles /></Layout>
              </Protected>
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
