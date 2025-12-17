import { useMemo, useState } from "react";
import { useLang } from "../i18n/LangContext";

export default function Cycles() {
  const { isAR } = useLang();

  // UI State (Demo for presentation)
  const [sterilizer, setSterilizer] = useState("STEAM 1");
  const [cycleNo, setCycleNo] = useState(17);
  const [status, setStatus] = useState(isAR ? "متوقفة" : "Stopped");

  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [bdResult, setBdResult] = useState(""); // PASSED / FAILED
  const [instrumentsCount, setInstrumentsCount] = useState(0);

  const t = useMemo(() => {
    const AR = {
      title: "إدارة دورات التعقيم",
      subtitle: "تسجيل دورات التعقيم ونتائج الاختبارات",
      sterilizer: "جهاز التعقيم",
      steam1: "STEAM 1",
      steam2: "STEAM 2",
      cycleNo: "رقم الدورة",
      state: "الحالة",
      control: "التحكم",
      start: "بدء",
      stop: "إنهاء",
      startAt: "وقت البدء",
      endAt: "وقت الانتهاء",
      bdTitle: "اختبار Bowie-Dick",
      pass: "ناجح",
      fail: "فاشل",
      instCount: "عدد الأدوات المعقمة *",
      save: "حفظ الدورة",
      saved: "تم حفظ الدورة (عرض فقط)",
    };
    const EN = {
      title: "Sterilization Cycle Management",
      subtitle: "Record sterilization cycles and test results",
      sterilizer: "Sterilizer",
      steam1: "STEAM 1",
      steam2: "STEAM 2",
      cycleNo: "Cycle No.",
      state: "Status",
      control: "Control",
      start: "Start",
      stop: "End",
      startAt: "Start time",
      endAt: "End time",
      bdTitle: "Bowie-Dick Test",
      pass: "Passed",
      fail: "Failed",
      instCount: "No. of instruments *",
      save: "Save cycle",
      saved: "Saved (presentation mode)",
    };
    return isAR ? AR : EN;
  }, [isAR]);

  function nowHHMM() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  function onStart() {
    setRunning(true);
    setStatus(isAR ? "قيد التشغيل" : "Running");
    setStartTime(nowHHMM());
    setEndTime("");
  }

  function onStop() {
    setRunning(false);
    setStatus(isAR ? "منتهية" : "Ended");
    setEndTime(nowHHMM());
  }

  function onSave() {
    // عرض فقط — لاحقًا نربطها بالـ API
    alert(t.saved);
    setCycleNo((n) => n + 1);
    setBdResult("");
    setInstrumentsCount(0);
    setStartTime("");
    setEndTime("");
    setRunning(false);
    setStatus(isAR ? "متوقفة" : "Stopped");
  }

  return (
    <div dir={isAR ? "rtl" : "ltr"} style={{ paddingTop: 6 }}>
      {/* Page header */}
      <div
        style={{
          border: "1px solid #eee",
          borderRadius: 16,
          overflow: "hidden",
          background: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ padding: 18, background: "#eef9f2" }}>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{t.title}</div>
          <div style={{ opacity: 0.75, marginTop: 4 }}>{t.subtitle}</div>
        </div>

        <div style={{ padding: 18 }}>
          {/* Sterilizer selector */}
          <div style={{ marginBottom: 10, fontWeight: 700 }}>{t.sterilizer}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <button
              onClick={() => setSterilizer("STEAM 2")}
              style={pill(sterilizer === "STEAM 2")}
            >
              {t.steam2}
            </button>
            <button
              onClick={() => setSterilizer("STEAM 1")}
              style={pill(sterilizer === "STEAM 1")}
            >
              {t.steam1}
            </button>
          </div>

          {/* Cycle info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
            <Field label={t.cycleNo} value={`#${cycleNo}`} />
            <Field label={t.state} value={status} muted />
          </div>

          {/* Control + times */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 14 }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>{t.control}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <button
                  onClick={onStop}
                  disabled={!running}
                  style={{
                    ...btnBase,
                    background: running ? "#ef4444" : "#f3f4f6",
                    color: running ? "#fff" : "#9ca3af",
                    borderColor: running ? "#ef4444" : "#e5e7eb",
                  }}
                >
                  {t.stop}
                </button>
                <button
                  onClick={onStart}
                  disabled={running}
                  style={{
                    ...btnBase,
                    background: !running ? "#111827" : "#f3f4f6",
                    color: !running ? "#fff" : "#9ca3af",
                    borderColor: !running ? "#111827" : "#e5e7eb",
                  }}
                >
                  {t.start}
                </button>
              </div>
            </div>

            <Field label={t.endAt} value={endTime || "—:—"} muted />
            <Field label={t.startAt} value={startTime || "—:—"} muted />
          </div>

          {/* Bowie-Dick */}
          <div
            style={{
              marginTop: 14,
              borderRadius: 14,
              background: "#fbf6d9",
              padding: 14,
              border: "1px solid #f3e6a6",
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 10, textAlign: isAR ? "left" : "right" }}>
              {t.bdTitle}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button
                onClick={() => setBdResult("PASSED")}
                style={toggle(bdResult === "PASSED")}
              >
                {t.pass}
              </button>
              <button
                onClick={() => setBdResult("FAILED")}
                style={toggle(bdResult === "FAILED")}
              >
                {t.fail}
              </button>
            </div>
          </div>

          {/* Instruments count */}
          <div style={{ marginTop: 14 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>{t.instCount}</div>
            <input
              type="number"
              min="0"
              value={instrumentsCount}
              onChange={(e) => setInstrumentsCount(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "14px 12px",
                borderRadius: 12,
                border: "2px solid #111",
                fontSize: 16,
                outline: "none",
              }}
            />
          </div>

          {/* Save */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
            <button
              onClick={onSave}
              style={{
                ...btnBase,
                padding: "12px 18px",
                background: "#111827",
                color: "#fff",
                borderColor: "#111827",
                minWidth: 220,
              }}
            >
              {t.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* UI helpers */

function Field({ label, value, muted }) {
  return (
    <div>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{label}</div>
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: "12px 12px",
          background: muted ? "#f3f4f6" : "#fff",
          fontWeight: 700,
          minHeight: 44,
          display: "flex",
          alignItems: "center",
        }}
      >
        {value}
      </div>
    </div>
  );
}

const btnBase = {
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  fontWeight: 800,
  cursor: "pointer",
};

function pill(active) {
  return {
    ...btnBase,
    background: active ? "#111827" : "#fff",
    color: active ? "#fff" : "#111827",
  };
}

function toggle(active) {
  return {
    ...btnBase,
    background: "#fff",
    border: active ? "2px solid #111827" : "1px solid #e5e7eb",
    fontWeight: 800,
  };
}
