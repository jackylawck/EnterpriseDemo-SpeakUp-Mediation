# Dual-Form Intake Design & Conflict-of-Interest (COI) Routing Logic
# 雙問卷前端設計與利益衝突（COI）分流閘門邏輯

> **Document Control / 文件控制**  
> **System / 系統名稱:** `EnterpriseDemo-SpeakUp-Mediation`  
> **Form Identifiers / 表單代號:** `Demo-Form-01` (Whistleblowing) & `Demo-Form-02` (Mediation)  
> **Author / 架構設計:** 羅子淇 (Jacky Law)  

---

## 1. Architectural Overview: Two Front Doors, Unified Governance (雙入口分流架構)

To avoid conflating high-risk misconduct reporting with non-adversarial workplace conflict resolution, the portal deploys two specialized Microsoft Forms front-ends under a unified SharePoint landing hub:

為避免將「嚴重違規舉報」與「一般職場摩擦調解」混為一談，系統在統一的 SharePoint 門戶首頁下設置兩份獨立功能的 Microsoft Forms 表單：

| Form ID<br>表單代號 | Title<br>表單名稱 | Identity Mode<br>身份驗證模式 | Statutory & ISO Alignment<br>合規基準 | Primary Routing Target<br>預設路由目標 |
| :--- | :--- | :--- | :--- | :--- |
| **Demo-Form-01** | Confidential Whistleblowing & Speak-Up Form<br>《保密舉報與意見反映》 | **Anonymous**<br>(`Record name` = Off)<br>完全匿名（不記錄姓名） | ISO 37002:2021<br>HK PDPO (Cap. 486) | `HR_Cases` (Default)<br>`Boss_Only_Cases` (If HR implicated) |
| **Demo-Form-02** | Confidential Workplace Mediation Booking<br>《保密員工調解預約》 | **Authenticated**<br>(`Only people in my org`)<br>實名認證（記錄申請人電郵） | HK Mediation Ord. (Cap. 620)<br>ISO/IEC 27701 | `Mediation_Cases` (Default)<br>`Boss_Only_Cases` (If HR implicated) |

---

## 2. Demo-Form-01: Whistleblowing Form Specification (保密舉報表單設計)

### 2.1 Privacy & Anti-Self-Identification Header (私隱聲明與防自我暴露提示)
* **PDPO DPP1 Notice (收集個人資料聲明):** Explicitly informs the whistleblower that data is used solely for compliance investigation and anti-retaliation protection.
* **Anti-Self-Identification Prompt (防身份暴露提醒):** Reminds anonymous submitters to avoid including their own employee ID, workstation details, or unique phrasing in the narrative text if they wish to remain strictly anonymous.

### 2.2 Question Schema & Routing Logic (題目結構與路由邏輯)

| Q# | Question Title (Bilingual)<br>題目名稱 | Field Type<br>題型 | Required<br>必填 | Governance & Routing Role<br>治理與路由作用 |
| :--- | :--- | :--- | :--- | :--- |
| **Q01** | Preferred Submission Mode<br>您希望以哪種身份方式提交？ | Choice (`完全匿名` / `實名提交`) | Yes | Determines follow-up protocol and anonymity handling. |
| **Q02** | **[COI Gate]** Does this matter implicate the HR Head or HR leadership?<br>【利益衝突迴避】本次反映的事件，是否涉及人力資源主管或其直接利益衝突？ | Choice (`否` / `是`) | Yes | **Master Routing Switch:** If `包含 "是"`, Power Automate bypasses HR completely and writes to `Boss_Only_Cases`. |
| **Q03** | Incident Category<br>事件性質分類 | Choice (Corruption, Harassment, Safety, Policy Breach, Other) | Yes | Categorizes case taxonomy for board-level compliance reporting. |
| **Q04** | Urgency & Risk Level<br>緊急與風險程度評估 | Choice (`高（即時風險）` / `中` / `低`) | Yes | Highlights immediate safety or legal exposure in Teams Adaptive Cards. |
| **Q05** | Detailed Description of Incident<br>事件詳細經過 | Long Text | Yes | Captures Who, What, When, Where, and How. |
| **Q06** | Supporting Evidence Reference<br>相關佐證資料（如適用） | Text | No | Records document names or locations without risking unencrypted file upload leaks. |
| **Q07** | Optional Contact Channel<br>聯絡方式（選填，可用匿名電郵） | Text | No | Enables two-way investigator follow-up while preserving whistleblower anonymity (ISO 27701 Data Minimization). |

---

## 3. Demo-Form-02: Workplace Mediation Form Specification (員工調解預約表單設計)

### 3.1 Statutory Confidentiality Gate (法定調解原則確認閘門)
Before submitting a mediation request, the applicant must explicitly acknowledge two core principles aligned with the **Hong Kong Mediation Ordinance (Cap. 620)**:
1. **Voluntary & Without Prejudice (自願與無損權利):** Mediation is voluntary, neutral, and discussions cannot be used as disciplinary evidence.
2. **HR File Exclusion (不入人事檔案承諾):** Mediation records are stored in an isolated repository and **never** placed in the employee's HR personnel file.

### 3.2 Question Schema & Cross-Track Escalation Logic (題目結構與跨軌升級邏輯)

| Q# | Question Title (Bilingual)<br>題目名稱 | Field Type<br>題型 | Required<br>必填 | Governance & Routing Role<br>治理與路由作用 |
| :--- | :--- | :--- | :--- | :--- |
| **Q01** | **[Statutory Gate]** Do you acknowledge the Mediation Confidentiality & HR-File Exclusion Principles?<br>在提交申請前，請確認您明白並同意以下調解基本原則： | Choice (`我已閱讀、明白並同意以上調解基本原則`) | Yes | Enforces informed consent prior to intake. |
| **Q02** | **[COI Gate]** Does the mediation involve HR personnel?<br>【利益衝突迴避】調解對象或事件是否涉及人力資源組？ | Choice (`否` / `是`) | Yes | **Cross-Track Escalation Switch:** If `包含 "是"`, intercepts the mediation request and escalates it to `Boss_Only_Cases` (`MED-BOSS-{ID}`). |
| **Q03** | Safety & Statutory Risk Screening<br>【安全與風險篩查】本次事件是否涉及性騷擾、暴力或違法行為？ | Choice (`不涉及上述情況` / `涉及性騷擾、暴力或違法行為`) | Yes | Flags cases unsuitable for standard peer mediation so management can intervene directly. |
| **Q04** | Workplace Dispute Category<br>您希望透過調解解決哪類職場問題？ | Choice (Cross-dept communication, Role clarity, Supervisor-staff friction, Other) | Yes | Helps the accredited mediator prepare the initial 1-on-1 Caucus agenda. |
| **Q05** | Brief Summary & Desired Outcome<br>事件簡述及您期望達致的結果 | Long Text | Yes | Captures neutral context for pre-mediation assessment. |
| **Q06** | Preferred Time Slot for 1-on-1 Caucus<br>您方便進行首次「一對一單獨面談」的時段偏好 | Choice (`上午 10:00–12:00` / `下午 14:30–17:00` / `彈性安排`) | Yes | Streamlines confidential scheduling without back-and-forth email trails. |
