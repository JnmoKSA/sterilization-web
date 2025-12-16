import { useEffect, useMemo, useState } from "react";
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

  const failedCount = useMemo(
    () => cycles.filter((c) => String(c.status).toUpperCase() === "FAILED").length,
    [cycles]
  );

  return (
    <div>
      {failedCount > 0 && (
        <div
          style={{
            border: "1px solid #f1c0c0",
            background: "#fff2f2",
            padding: 12,
            borderRadius: 12,
            marginBottom: 14,
            fontWeight: 600,
          }}
        >
          Alert: {failedCount} failed cycle(s) require supervisor review.
        </div>
      )}

      <div style={{ border: "1px solid #ddd", borderRadius: 12, overflow: "hidden" }}>
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
                <td style={td}>
                  <StatusBadge status={c.status} />
                </td>
              </tr>
            ))}

            {cycles.length === 0 && (
              <tr>
                <td style={td} colSpan={3}>
                  No cycles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const s = String(status || "").toUpperCase();
  const isFailed = s === "FAILED";

  const style = isFailed
    ? { border: "1px solid #f1c0c0", background: "#fff2f2" }
    : { border: "1px solid #cfe9d6", background: "#f3fbf5" };

  return (
    <span style={{ ...style, padding: "4px 10px", borderRadius: 999, fontWeight: 600, fontSize: 12 }}>
      {s || "—"}
    </span>
  );
}

const th = { textAlign: "left", padding: 12, borderBottom: "1px solid #ddd" };
const td = { padding: 12, borderBottom: "1px solid #eee" };
