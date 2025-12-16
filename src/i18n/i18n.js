export const LANGS = { AR: "AR", EN: "EN" };

export const t = (lang) => ({
  // Global
  systemName: lang === "AR" ? "نظام تتبع التعقيم الإلكتروني" : "Electronic Sterilization Tracking System",
  systemSub:  lang === "AR" ? "نظام التعقيم الدولي — منطقة الخليج (المرحلة 1)" : "International Sterilization System — Gulf Region (Phase 1)",
  signOut:    lang === "AR" ? "تسجيل الخروج" : "Sign out",
  dashboard:  lang === "AR" ? "لوحة التحكم" : "Dashboard",
  cycles:     lang === "AR" ? "دورات التعقيم" : "Sterilization Cycles",
  orgs:       lang === "AR" ? "المنشآت" : "Organizations",
  users:      lang === "AR" ? "المستخدمين" : "Users",
  reports:    lang === "AR" ? "التقارير" : "Reports",
  settings:   lang === "AR" ? "الإعدادات" : "Settings",
  intake:     lang === "AR" ? "استلام الأدوات" : "Instrument Intake",

  // Dashboard blocks
  overview:   lang === "AR" ? "نظرة عامة على أداء نظام التعقيم" : "Overview of sterilization performance",
  quick:      lang === "AR" ? "إجراءات سريعة" : "Quick actions",
  quickSub:   lang === "AR" ? "الوصول السريع للوظائف الشائعة" : "Quick access to common actions",
  topTools:   lang === "AR" ? "الأدوات الأكثر استخدامًا" : "Most used instruments",
  topToolsSub:lang === "AR" ? "أكثر 5 أدوات من حيث عدد مرات التعقيم" : "Top 5 instruments by sterilization frequency",
  devicePerf: lang === "AR" ? "أداء الأجهزة" : "Device performance",
  devicePerfSub: lang === "AR" ? "عدد الدورات الناجحة لكل جهاز" : "Successful cycles per sterilizer",
  noData:     lang === "AR" ? "لا توجد بيانات متاحة" : "No data available",

  // KPI labels
  kpiFailed:  lang === "AR" ? "الدورات الفاشلة" : "Failed cycles",
  kpiSuccess: lang === "AR" ? "معدل النجاح" : "Success rate",
  kpiSterilized: lang === "AR" ? "الأدوات المعقمة" : "Sterilized instruments",
  kpiReceived:   lang === "AR" ? "الأدوات المستلمة" : "Received instruments",

  startCycle: lang === "AR" ? "بدء دورة تعقيم" : "Start cycle",
  newIntake:  lang === "AR" ? "استلام أدوات جديدة" : "New intake",
  exportDaily:lang === "AR" ? "تصدير التقرير اليومي" : "Export daily report",
});
