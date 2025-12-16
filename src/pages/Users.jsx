import { useMemo, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { ROLES } from "../data/roles";

// مبدئيًا قائمة منشآت ثابتة للعرض.
// لاحقًا سنقرأها من Organizations/Backend.
const DEFAULT_FACILITIES = [
  { id: 1, name: "Primary Health Center Al-Zahra (KSA / Riyadh)" },
  { id: 2, name: "Central CSSD – Dubai (UAE / Dubai)" },
];

export default function Users() {
  const { user } = useAuth();

  const canManage = user?.role === "admin";
  const canView = user?.role === "admin" || user?.role === "manager";

  const [facilities] = useState(DEFAULT_FACILITIES);

  const [items, setItems] = useState([
    { id: 1, username: "admin", role: "admin", facilityId: 1, active: true },
    { id: 2, username: "manager", role: "manager", facilityId: 1, active: true },
    { id: 3, username: "supervisor", role: "supervisor", facilityId: 2, active: true },
    { id: 4, username: "tech", role: "technician", facilityId: 2, active: true },
  ]);

  const [form, setForm] = useState({
    username: "",
    role: "technician",
    facilityId: facilities[0]?.id || 1,
  });

  const facilityName = useMemo(() => {
    const map = new Map(facilities.map(f => [f.id, f.name]));
    return (id) => map.get(id) || "—";
  }, [facilities]);

  function addUser(e) {
    e.preventDefault();
    if (!canManage) return;

    const username = form.username.trim();
    if (!username) return;

    // منع تكرار اسم المستخدم (للواجهة فقط)
    if (items.some(u => u.username.toLowerCase() === username.toLowerCase())) return;

    const next = {
      id: Date.now(),
      username,
      role: form.role,
      facilityId: Number(form.facilityId),
      active: true,
    };

    setItems(arr => [next, ...arr]);
    setForm(f => ({ ...f, username: "" }));
  }

  function toggleActive(id) {
    if (!canManage) return;
    setItems(arr =>
      arr.map(u => (u.id === id ? { ...u, active: !u.active } : u))
    );
  }

  if (!canView) {
    return (
      <div style={{ border: "1px solid #f3d", borderRadius: 12, padding: 14 }}>
        Access denied. Please contact Admin.
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: 16 }}>
      <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 14 }}>
        <h3 style={{ marginTop: 0 }}>User Management</h3>

        {!canManage && (
          <div style={{ padding: 10, border: "1px solid #f3d", borderRadius: 10, marginBottom: 10 }}>
            You have read-only access. Admin can create/disable users.
          </div>
        )}

        <form onSubmit={addUser} style={{ display: "grid", gap: 10 }}>
          <label>Username</label>
          <input
            value={form.username}
            onChange={(e) => setForm(f => ({ ...f, username: e.target.value }))}
            disabled={!canManage}
            placeholder="e.g., tech2"
          />

          <label>Role</label>
          <select
            value={form.role}
            onChange={(e) => setForm(f => ({ ...f, role: e.target.value }))}
            disabled={!canManage}
          >
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>

          <label>Facility</label>
          <select
            value={form.facilityId}
            onChange={(e) => setForm(f => ({ ...f, facilityId: e.target.value }))}
            disabled={!canManage}
          >
            {facilities.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>

          <button type="submit" disabled={!canManage}>Create User</button>
        </form>
      </div>

      <div style={{ border: "1px solid #ddd", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: 12, background: "#f7f7f7", fontWeight: "bold" }}>
          Users
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={th}>Username</th>
              <th style={th}>Role</th>
              <th style={th}>Facility</th>
              <th style={th}>Status</th>
              <th style={th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(u => (
              <tr key={u.id}>
                <td style={td}>{u.username}</td>
                <td style={td}>{u.role}</td>
                <td style={td}>{facilityName(u.facilityId)}</td>
                <td style={td}>{u.active ? "Active" : "Disabled"}</td>
                <td style={td}>
                  <button onClick={() => toggleActive(u.id)} disabled={!canManage}>
                    {u.active ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td style={td} colSpan={5}>No users.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th = { textAlign: "left", padding: 12, borderBottom: "1px solid #ddd" };
const td = { padding: 12, borderBottom: "1px solid #eee" };
