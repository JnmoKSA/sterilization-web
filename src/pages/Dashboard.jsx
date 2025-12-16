import "./../styles/dashboard.css";
import { useLang } from "../i18n/LangContext";

export default function Dashboard() {
  const { isAR, tr } = useLang();

  // مؤقتًا بيانات ثابتة مثل الصورة، لاحقًا نربطها بالـ API
  const kpis = [
    { label: tr.kpiFailed, value: 0, hint: "3%-", icon: "!" },
    { label: tr.kpiSuccess, value: "0.0%", hint: "2.1%+", icon: "↗" },
    { label: tr.kpiSterilized, value: 0, hint: "8%+", icon: "∿" },
    { label: tr.kpiReceived, value: 5, hint: "12%+", icon: "□" },
  ];

  const steam1 = 0;
  const steam2 = 0;

  return (
    <div className="page" dir={isAR ? "rtl" : "ltr"}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brandLogo">S</div>
          <div>
            <div className="brandTitle">{isAR ? "نظام التعقيم" : "Sterilization System"}</div>
            <div style={{ opacity: 0.7, fontSize: 12 }}>{isAR ? "الطبي" : "Medical"}</div>
          </div>
        </div>

        <div className="navItem navItemActive">{tr.dashboard}</div>
        <div className="navItem">{tr.intake}</div>
        <div className="navItem">{tr.cycles}</div>
        <div className="navItem">{tr.reports}</div>
        <div className="navItem">{tr.users}</div>
        <div className="navItem">{tr.orgs}</div>
        <div className="navItem">{tr.settings}</div>
      </aside>

      <main className="content">
        <div className="topTitle">
          <div>
            <h1 className="h1">{tr.dashboard}</h1>
            <div className="sub">{tr.overview}</div>
          </div>
        </div>

        <section className="kpis">
          {kpis.map((k, idx) => (
            <div className="card" key={idx}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "#0f172a", opacity: 0.8, fontSize: 12 }}>{k.hint}</div>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: idx === 0 ? "#ffe7e7" : idx === 3 ? "#e8f0ff" : "#eef2ff",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                  }}
                >
                  {k.icon}
                </div>
              </div>
              <div className="kpiValue">{k.value}</div>
              <div className="kpiLabel">{k.label}</div>
            </div>
          ))}
        </section>

        <section className="row2">
          <div className="card">
            <div className="sectionTitle">
              <h3>{tr.topTools}</h3>
              <div style={{ opacity: 0.7, fontSize: 12 }}>{tr.topToolsSub}</div>
            </div>

            <div style={{ height: 220, display: "grid", placeItems: "center", opacity: 0.6 }}>
              {tr.noData}
            </div>
          </div>

          <div className="card">
            <div className="sectionTitle">
              <h3>{tr.devicePerf}</h3>
              <div style={{ opacity: 0.7, fontSize: 12 }}>{tr.devicePerfSub}</div>
            </div>

            <div className="progressWrap">
              <div className="progressRow">
                <div style={{ minWidth: 70, opacity: 0.8 }}>
                  {steam1} {isAR ? "دورة" : "cycles"}
                </div>
                <div className="bar">
                  <div className="barFill" style={{ width: `${Math.min(100, steam1)}%` }} />
                </div>
                <div style={{ minWidth: 80, fontWeight: 700 }}>STEAM 1</div>
              </div>

              <div className="progressRow">
                <div style={{ minWidth: 70, opacity: 0.8 }}>
                  {steam2} {isAR ? "دورة" : "cycles"}
                </div>
                <div className="bar">
                  <div className="barFill barFill2" style={{ width: `${Math.min(100, steam2)}%` }} />
                </div>
                <div style={{ minWidth: 80, fontWeight: 700 }}>STEAM 2</div>
              </div>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="sectionTitle">
            <h3>{tr.quick}</h3>
            <div style={{ opacity: 0.7, fontSize: 12 }}>{tr.quickSub}</div>
          </div>

          <div className="quick">
            <button className="quickBtn">{tr.startCycle}</button>
            <button className="quickBtn">{tr.newIntake}</button>
            <button className="quickBtn quickBtnPrimary">{tr.exportDaily}</button>
          </div>
        </section>
      </main>
    </div>
  );
}
