import "./../styles/dashboard.css";

export default function Dashboard() {
  // مؤقتًا بيانات ثابتة مثل الصورة، لاحقًا نربطها بالـ API
  const kpis = [
    { label: "الدورات الفاشلة", value: 0, hint: "3%-", icon: "!" },
    { label: "معدل النجاح", value: "0.0%", hint: "2.1%+", icon: "↗" },
    { label: "الأدوات المعقمة", value: 0, hint: "8%+", icon: "∿" },
    { label: "الأدوات المستلمة", value: 5, hint: "12%+", icon: "□" },
  ];

  const steam1 = 0;
  const steam2 = 0;

  return (
    <div className="page" dir="rtl">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandLogo">S</div>
          <div>
            <div className="brandTitle">نظام التعقيم</div>
            <div style={{ opacity: 0.7, fontSize: 12 }}>الطبي</div>
          </div>
        </div>

        <div className="navItem navItemActive">لوحة التحكم</div>
        <div className="navItem">استلام الأدوات</div>
        <div className="navItem">دورات التعقيم</div>
        <div className="navItem">التقارير</div>
        <div className="navItem">المستخدمين</div>
        <div className="navItem">المنشآت</div>
        <div className="navItem">الإعدادات</div>
      </aside>

      <main className="content">
        <div className="topTitle">
          <div>
            <h1 className="h1">لوحة التحكم</h1>
            <div className="sub">نظرة عامة على أداء نظام التعقيم</div>
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
              <h3>الأدوات الأكثر استخدامًا</h3>
              <div style={{ opacity: 0.7, fontSize: 12 }}>أكثر 5 أدوات من حيث عدد مرات التعقيم</div>
            </div>
            <div style={{ height: 220, display: "grid", placeItems: "center", opacity: 0.6 }}>
              لا توجد بيانات متاحة
            </div>
          </div>

          <div className="card">
            <div className="sectionTitle">
              <h3>أداء الأجهزة</h3>
              <div style={{ opacity: 0.7, fontSize: 12 }}>عدد الدورات الناجحة لكل جهاز</div>
            </div>

            <div className="progressWrap">
              <div className="progressRow">
                <div style={{ minWidth: 70, opacity: 0.8 }}>{steam1} دورة</div>
                <div className="bar">
                  <div className="barFill" style={{ width: `${Math.min(100, steam1)}%` }} />
                </div>
                <div style={{ minWidth: 80, fontWeight: 700 }}>STEAM 1</div>
              </div>

              <div className="progressRow">
                <div style={{ minWidth: 70, opacity: 0.8 }}>{steam2} دورة</div>
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
            <h3>إجراءات سريعة</h3>
            <div style={{ opacity: 0.7, fontSize: 12 }}>الوصول السريع للوظائف الشائعة</div>
          </div>

          <div className="quick">
            <button className="quickBtn">بدء دورة تعقيم</button>
            <button className="quickBtn">استلام أدوات جديدة</button>
            <button className="quickBtn quickBtnPrimary">تصدير التقرير اليومي</button>
          </div>
        </section>
      </main>
    </div>
  );
}
