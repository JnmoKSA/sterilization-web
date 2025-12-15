import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_BASE;

export default function App() {
  const [dashboard, setDashboard] = useState(null);
  const [cycles, setCycles] = useState([]);
  const [tab, setTab] = useState("dashboard");
  const [lang, setLang] = useState("EN");
  const [loading, setLoading] = useState(false);

  const isAR = lang === "AR";

  async function loadDashboard() {
    setLoading(true);
    const res = await fetch(`${API}/dashboard`);
    setDashboard(await res.json());
    setLoading(false);
  }

  async function loadCycles() {
    setLoading(true);
    const res = await fetch(`${API}/cycles`);
    setCycles(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    tab === "dashboard" ? loadDashboard() : loadCycles();
  }, [tab]);

  return (
    <div dir={isAR ? "rtl" : "ltr"} style={{ fontFamily: "Arial", padding: 20 }}>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2>Electronic Sterilization Tracking System</h2>
          <small>International Sterilization System – Gulf Region (Phase 1)</small>
        </div>
        <div>
          <button onClick={() => setLang("EN")}>EN</button>
          <button onClick={() => setLang("AR")}>AR</button>
        </div>
      </header>

      <nav style={{ marginTop: 20 }}>
        <button onClick={() => setTab("dashboard")}>
          {isAR ? "لوحة التحكم" : "Dashboard"}
        </button>
        <button onClick={() => setTab("cycles")}>
          {isAR ? "دورات التعقيم" : "Sterilization Cycles"}
        </button>
      </nav>

      {loading && <p>{isAR ? "جاري التحميل..." : "Loading..."}</p>}

      {!loading && tab === "dashboard" && dashboard && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginTop: 20 }}>
          <Card title={isAR ? "الأدوات المستلمة" : "Received"} value={dashboard.instrumentsReceived} />
          <Card title={isAR ? "المعقمة" : "Sterilized"} value={dashboard.sterilized} />
          <Card title={isAR ? "الفاشلة" : "Failed"} value={dashboard.failedCycles} />
          <Card title={isAR ? "المنطقة" : "Region"} value={dashboard.region} />
        </div>
      )}

      {!loading && tab === "cycles" && (
        <table border="1" cellPadding="8" style={{ marginTop: 20, width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>{isAR ? "الجهاز" : "Sterilizer"}</th>
              <th>{isAR ? "الحالة" : "Status"}</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.sterilizer}</td>
                <td>{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <footer style={{ marginTop: 30 }}>
        © 2025 — IP Registration No. 43177723-12-25
      </footer>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 15 }}>
      <strong>{title}</strong>
      <div style={{ fontSize: 24 }}>{value}</div>
    </div>
  );
}
