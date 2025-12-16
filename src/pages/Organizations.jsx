import { useMemo, useState } from "react";
import { GCC_COUNTRIES, GCC_CITIES } from "../data/geo";
import { useAuth } from "../auth/AuthContext";

export default function Organizations() {
  const { user } = useAuth();

  // RBAC (عرض/تعديل)
  const canManage = user?.role === "admin" || user?.role === "manager";

  const [items, setItems] = useState([
    { id: 1, name: "Primary Health Center Al-Zahra", country: "KSA", city: "Riyadh", region: "Gulf Region" },
    { id: 2, name: "Central CSSD – Demo Facility", country: "UAE", city: "Dubai", region: "Gulf Region" },
  ]);

  const [form, setForm] = useState({
    name: "",
    country: "KSA",
    city: "Riyadh",
    region: "Gulf Region",
  });

  const cities = useMemo(() => GCC_CITIES[form.country] || [], [form.country]);

  function onCountryChange(country) {
    const nextCities = GCC_CITIES[country] || [];
    setForm((f) => ({
      ...f,
      country,
      city: nextCities[0] || "",
    }));
  }

  function addOrg(e) {
    e.preventDefault();
    if (!canManage) return;

    const next = {
      id: Date.now(),
      name: form.name.trim(),
      country: form.country,
      city: form.city,
      region: form.region,
    };
    if (!next.name) return;

    setItems((arr) => [next, ...arr]);
    setForm((f) => ({ ...f, name: "" }));
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: 16 }}>
      <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 14 }}>
        <h3 style={{ marginTop: 0 }}>Add Organization / Facility</h3>

        {!canManage && (
          <div style={{ padding: 10, border: "1px solid #f3d", borderRadius: 10, marginBottom: 10 }}>
            You have read-only access. Please contact Admin/Manager.
          </div>
        )}

        <form onSubmit={addOrg} style={{ display: "grid", gap: 10 }}>
          <label>Facility Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            disabled={!canManage}
            placeholder="Enter facility name"
          />

          <label>Country</label>
          <select
            value={form.country}
            onChange={(e) => onCountryChange(e.target.value)}
            disabled={!canManage}
          >
            {GCC_COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label>City</label>
          <select
            value={form.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            disabled={!canManage}
          >
            {cities.map((ct) => (
              <option key={ct} value={ct}>{ct}</option>
            ))}
          </select>

          <label>Region</label>
          <input value={form.region} disabled />

          <button type="submit" disabled={!canManage}>Save</button>
        </form>
      </div>

      <div style={{ border: "1px solid #ddd", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: 12, background: "#f7f7f7", fontWeight: "bold" }}>
          Organizations / Facilities
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={th}>Facility</th>
              <th style={th}>Country</th>
              <th style={th}>City</th>
              <th style={th}>Region</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td style={td}>{it.name}</td>
                <td style={td}>{it.country}</td>
                <td style={td}>{it.city}</td>
                <td style={td}>{it.region}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td style={td} colSpan={4}>No facilities yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th = { textAlign: "left", padding: 12, borderBottom: "1px solid #ddd" };
const td = { padding: 12, borderBottom: "1px solid #eee" };
