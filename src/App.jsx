import { HashRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cycles from "./pages/Cycles";
import Organizations from "./pages/Organizations";
import Users from "./pages/Users";

import { LangProvider, useLang } from "./i18n/LangContext";
import { LANGS } from "./i18n/i18n";

function Protected({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function Layout({ children }) {
  const { user, logout } = useAuth();
  const { lang, setLang, isAR, tr } = useLang();

  const canSeeOrganizations = user?.role === "admin" || user?.role === "manager";
  const canSeeUsers = user?.role === "admin" || user?.role === "manager";

  return (
    <div
      dir={isAR ? "rtl" : "ltr"}
      style={{ fontFamily: "Arial", padding: 18, maxWidth: 1100, margin: "0 auto" }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 26, letterSpacing: 0.3 }}>
            {tr.systemName}
          </h1>
          <div style={{ opacity: 0.85, fontSize: 14, marginTop: 2 }}>
            {tr.systemSub}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <button
              onClick={() => setLang(LANGS.AR)}
              style={{ fontWeight: lang === LANGS.AR ? 800 : 500 }}
            >
              AR
            </button>
            <button
              onClick={() => setLang(LANGS.EN)}
              style={{ fontWeight: lang === LANGS.EN ? 800 : 500 }}
            >
              EN
            </button>
          </div>

          <span style={{ opacity: 0.8 }}>
            {user?.username} ({user?.role})
          </span>

          <button onClick={logout}>{tr.signOut}</button>
        </div>
      </header>

      <nav
        style={{
          marginTop: 18,
          display: "flex",
          gap: 16,
          paddingBottom: 12,
          borderBottom: "1px solid #eee",
        }}
      >
        <Link to="/dashboard">{tr.dashboard}</Link>
        <Link to="/cycles">{tr.cycles}</Link>
        {canSeeOrganizations && <Link to="/organizations">{tr.orgs}</Link>}
        {canSeeUsers && <Link to="/users">{tr.users}</Link>}
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
      <LangProvider>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <Protected>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </Protected>
              }
            />

            <Route
              path="/cycles"
              element={
                <Protected>
                  <Layout>
                    <Cycles />
                  </Layout>
                </Protected>
              }
            />

            <Route
              path="/organizations"
              element={
                <Protected>
                  <Layout>
                    <Organizations />
                  </Layout>
                </Protected>
              }
            />

            <Route
              path="/users"
              element={
                <Protected>
                  <Layout>
                    <Users />
                  </Layout>
                </Protected>
              }
            />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </HashRouter>
      </LangProvider>
    </AuthProvider>
  );
}
