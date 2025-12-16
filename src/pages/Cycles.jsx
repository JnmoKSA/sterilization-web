import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const API = import.meta.env.VITE_API_BASE;

export default function Cycles() {
  const { token } = useAuth();
  const [cycles, setCycles] = useState([]);

  useEffect(() => {
    fetch(`${API}/cycles`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setCycles);
  }, [token]);

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ padding: 12, background: "#f7f7f7", fontWeight: "bold" }}>Recent Cycles</div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Sterilizer</th>
            <th style={th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {cycles.map((c) => (
            <tr key={c.id}>
              <td style={td}>{c.id}</td>
              <td style={td}>{c.sterilizer}</td>
              <td style={td}>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = { textAlign: "left", padding: 12, borderBottom: "1px solid #ddd" };
const td = { padding: 12, borderBottom: "1px solid #eee" };
