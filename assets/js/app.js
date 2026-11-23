"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const simTrack = document.getElementById("simTrack");
  const simCoi = document.getElementById("simCoi");
  const simCategory = document.getElementById("simCategory");
  const simSummary = document.getElementById("simSummary");
  const simRunBtn = document.getElementById("simRunBtn");
  const tabHr = document.getElementById("tabHr");
  const tabBoss = document.getElementById("tabBoss");
  const langBtn = document.getElementById("langBtn");

  const teamsPreview = document.getElementById("teamsPreview");
  const cardTitle = document.getElementById("cardTitle");
  const cardDesc = document.getElementById("cardDesc");
  const cardMeta = document.getElementById("cardMeta");
  const permList1 = document.getElementById("permList1");
  const permList2 = document.getElementById("permList2");
  const permList3 = document.getElementById("permList3");

  let currentRole = "HR";
  let caseSeq = 101;

  const isEnglish = () => document.body.classList.contains("lang-en");

  function syncLanguageControls() {
    const en = isEnglish();
    document.documentElement.lang = en ? "en" : "zh-HK";
    document.title = en
      ? "EnterpriseDemo-SpeakUp-Mediation | Zero-License Whistleblowing & Mediation Portal"
      : "企業保密舉報與員工調解雙軌治理平台 EnterpriseDemo-SpeakUp-Mediation | Governance-as-Code Demo";

    simTrack.options[0].text = en
      ? "Demo-Form-01: Confidential Whistleblowing (Anonymous)"
      : "Demo-Form-01：保密舉報與意見反映（匿名）";
    simTrack.options[1].text = en
      ? "Demo-Form-02: Workplace Mediation Booking (Authenticated)"
      : "Demo-Form-02：保密員工調解預約（實名）";

    simCoi.options[0].text = en
      ? "No — Standard handling by HR Head / Accredited Mediator"
      : "否 — 由 HR Head / 認可調解員保密跟進";
    simCoi.options[1].text = en
      ? "Yes — Trigger COI Bypass, isolate from HR & escalate to MD"
      : "是 — 啟動利益衝突迴避，繞過 HR 直達最高管理層";

    simCategory.options[0].text = en ? "Conflict of Interest / Ethics Breach" : "利益衝突 / 違反專業操守";
    simCategory.options[1].text = en ? "Workplace Bullying / Harassment" : "職場欺凌 / 騷擾 / 歧視";
    simCategory.options[2].text = en ? "Cross-Department Collaboration Dispute" : "跨部門協作或職責界定爭議";

    if (en && simSummary.value === "反映部門採購報價審批流程存在利益衝突疑慮") {
      simSummary.value = "Potential conflict of interest in vendor quotation review";
    } else if (!en && simSummary.value === "Potential conflict of interest in vendor quotation review") {
      simSummary.value = "反映部門採購報價審批流程存在利益衝突疑慮";
    }
  }

  function renderSimulation() {
    const en = isEnglish();
    const track = simTrack.value;
    const isBossEscalated = simCoi.value === "YES";
    const catText = simCategory.options[simCategory.selectedIndex].text;
    const summaryText = simSummary.value.trim() || (en ? "(No summary provided)" : "（未填寫簡述）");

    if (currentRole === "HR") {
      tabHr.className = "role-tab active-hr";
      tabBoss.className = "role-tab";
      permList1.className = "status-ok";
      permList1.textContent = en ? "✅ Read / Edit" : "✅ 可讀取 / 編輯";
      permList2.className = "status-locked";
      permList2.textContent = en ? "🔒 Inheritance Broken (Invisible)" : "🔒 停止繼承權限（完全隱形）";
      permList3.className = "status-ok";
      permList3.textContent = en ? "✅ Read / Edit" : "✅ 可讀取 / 編輯";
    } else {
      tabHr.className = "role-tab";
      tabBoss.className = "role-tab active-boss";
      permList1.className = "status-ok";
      permList1.textContent = en ? "✅ Full Control" : "✅ 完全控制";
      permList2.className = "status-ok";
      permList2.textContent = en ? "✅ Full Control (Exclusive)" : "✅ 完全控制（高層專屬）";
      permList3.className = "status-ok";
      permList3.textContent = en ? "✅ Full Control" : "✅ 完全控制";
    }

    if (isBossEscalated) {
      const prefix = track === "WB" ? "WB-BOSS-" : "MED-BOSS-";
      if (currentRole === "HR") {
        teamsPreview.className = "adaptive-card-preview";
        cardTitle.textContent = en
          ? "🔕 No Notification Sent to HR Head (COI Bypass Active)"
          : "🔕 HR Head 端無任何通知（已啟動利益衝突自動隔離）";
        cardDesc.textContent = en
          ? "Because the submission implicated HR leadership, Power Automate bypassed HR and routed the case directly to Boss_Only_Cases."
          : "由於該申請涉及人力資源部，系統已自動繞過 HR 並鎖定權限，HR 端不會收到任何通知亦無法查閱紀錄。";
        cardMeta.textContent = en
          ? "Governance Rule: ISO 37002 Impartiality Control"
          : "合規規則：ISO 37002 利益衝突迴避與獨立性控制";
      } else {
        teamsPreview.className = "adaptive-card-preview boss-alert";
        cardTitle.textContent = en
          ? `🚨 Executive Escalation Alert (${prefix}${caseSeq})`
          : `🚨 高層機密升級通知（${prefix}${caseSeq} — 已隔離 HR）`;
        cardDesc.textContent = `[${catText}] ${summaryText}`;
        cardMeta.textContent = en
          ? "Target List: Boss_Only_Cases | Recipient: md@companydemo.com"
          : "寫入清單：Boss_Only_Cases（高層機密舉報）｜收件人：老闆";
      }
    } else if (track === "WB") {
      teamsPreview.className = "adaptive-card-preview";
      cardTitle.textContent = en
        ? `📋 New Confidential Report (WB-HR-${caseSeq})`
        : `📋 新保密舉報通知（WB-HR-${caseSeq} — HR 專責跟進）`;
      cardDesc.textContent = `[${catText}] ${summaryText}`;
      cardMeta.textContent = en
        ? "Target List: HR_Cases | Recipient: hr.head@companydemo.com"
        : "寫入清單：HR_Cases（一般舉報）｜收件人：HR Head";
    } else {
      teamsPreview.className = "adaptive-card-preview med-alert";
      cardTitle.textContent = en
        ? `🤝 New Workplace Mediation Request (MED-${caseSeq})`
        : `🤝 新保密員工調解預約通知（MED-${caseSeq}）`;
      cardDesc.textContent = `[${catText}] ${summaryText}`;
      cardMeta.textContent = en
        ? "Target List: Mediation_Cases | Cap. 620 Confidentiality Confirmed"
        : "寫入清單：Mediation_Cases（員工調解預約）｜已確認第620章保密原則";
    }
  }

  langBtn.addEventListener("click", () => {
    document.body.classList.toggle("lang-en");
    syncLanguageControls();
    renderSimulation();
  });

  simRunBtn.addEventListener("click", () => {
    caseSeq += 1;
    currentRole = simCoi.value === "YES" ? "BOSS" : "HR";
    renderSimulation();
  });

  tabHr.addEventListener("click", () => {
    currentRole = "HR";
    renderSimulation();
  });

  tabBoss.addEventListener("click", () => {
    currentRole = "BOSS";
    renderSimulation();
  });

  syncLanguageControls();
  renderSimulation();
});
