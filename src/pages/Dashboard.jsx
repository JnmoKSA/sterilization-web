import { useEffect, useState } from "react";
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

  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
      <Card title="Instruments Received" value={data.instrumentsReceived} />
      <Card title="Sterilized" value={data.sterilized} />
      <Card title="Failed Cycles" value={data.failedCycles} />
      <Card title="Region" value={data.region} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 14 }}>
      <div style={{ opacity: 0.8, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: "bold" }}>{value}</div>
    </div>
  );
}
