import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const API = import.meta.env.VITE_API_BASE;

export default function Dashboard() {
  const { token } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API}/dashboard`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setData);
  }, [token]);

  const compliance = useMemo(() => {
    if (!data) return { ok: true, label: "—" };
    const ok = Number(data.instrumentsReceived) === Number(data.sterilized);
    return { ok, label: ok ? "OK" : "Mismatch" };
  }, [data]);

  if (!data) return <div>Loading...</div>;

  const hasFailures = Number(data.failedCycles) > 0;

  return (
    <div>
      {hasFailures && (
        <div
          style={{
            border: "1px solid #f1c0c0",
            background: "#fff2f2",
            padding: 12,
            borderRadius: 12,
            marginBottom: 16,
            fontWeight: 600,
          }}
        >
          Alert: Failed sterilization cycles detected. Immediate review required.
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18,
        }}
      >
        <Card title="Instruments Received" value={data.instrumentsReceived} tone="neutral" />
        <Card title="Sterilized" value={data.sterilized} tone="success" />
        <Card title="Failed Cycles" value={data.failedCycles} tone={hasFailures ? "danger" : "neutral"} />
        <Card title="Compliance (Received = Sterilized)" value={compliance.label} tone={compliance.ok ? "success" : "danger"} />
        <Card title="Region" value={data.region} tone="neutral" />
        <Card title="Role" value={data.role} tone="neutral" />
      </div>
    </div>
  );
}

function Card({ title, value, tone = "neutral" }) {
  const toneStyle =
    tone === "success"
      ? { border: "1px solid #cfe9d6", background: "#f3fbf5" }
      : tone === "danger"
      ? { border: "1px solid #f1c0c0", background: "#fff2f2" }
      : { border: "1px solid #e0e0e0", background: "#ffffff" };

  return (
    <div
      style={{
        ...toneStyle,
        borderRadius: 14,
        padding: 18,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 34, fontWeight: 600 }}>{value}</div>
    </div>
  );
}
