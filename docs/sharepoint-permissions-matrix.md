# SharePoint Online List Architecture & Broken-Inheritance RBAC Matrix
# SharePoint Online 三清單架構與停止繼承權限隔離矩陣

> **Document Control / 文件控制**  
> **Site Collection / 網站集:** `https://demo-tenant.sharepoint.com/sites/SpeakUp-Mediation-Portal`  
> **Security Baseline / 安全基準:** ISO/IEC 27001 (A.5.15 Access Control), ISO/IEC 27701, HK PDPO DPP4  
> **Author / 架構設計:** 羅子淇 (Jacky Law)  

---

## 1. Zero-License Isolation Architecture (零額外授權權限隔離原理)

Instead of purchasing third-party whistleblowing SaaS or Power Apps Per-User licenses, this architecture leverages **SharePoint Online List-Level Broken Permission Inheritance (停止繼承權限)** within a private M365 team/communication site.

本架構無需購買第三方昂貴吹哨 SaaS 或額外 Power Apps 授權，而是直接運用企業現有 SharePoint Online 私密網站內的**「清單級停止繼承權限（Broken Permission Inheritance）」**實現嚴格的角色隔離（RBAC）：

1. **Site-Level Lockdown (網站層級鎖定):** All general employees (`Everyone except external users`) are removed from the backend SharePoint site's `Visitors` and `Members` groups. Employees interact **exclusively** via Microsoft Forms links.
2. **List-Level Compartmentalization (清單層級分艙隔離):** Each of the three backend SharePoint lists breaks permission inheritance from the parent site and maintains its own explicit Access Control List (ACL).

---

## 2. Role-Based Access Control (RBAC) Matrix (三清單存取權限控制矩陣)

| Role / Persona<br>角色定位 | Demo Account<br>示範帳號 | `HR_Cases`<br>(一般舉報清單) | `Boss_Only_Cases`<br>(高層機密隔離清單) | `Mediation_Cases`<br>(員工調解預約清單) |
| :--- | :--- | :---: | :---: | :---: |
| **Managing Director / System Admin**<br>最高管理層 / 系統管理員 | `md@companydemo.com` | **Full Control**<br>完全控制 | **Full Control (Exclusive)**<br>完全控制（高層專屬） | **Full Control**<br>完全控制 |
| **HR Head / Accredited Mediator**<br>人力資源主管 / 認可調解員 | `hr.head@companydemo.com` | **Edit / Contribute**<br>可讀取與編輯 | **NO ACCESS (Hidden)**<br>🚫 完全無權限（清單不可見） | **Edit / Contribute**<br>可讀取與編輯 |
| **General Employees**<br>全體一般員工 | `staff@companydemo.com` | **NO ACCESS**<br>🚫 僅透過 Forms 寫入 | **NO ACCESS**<br>🚫 僅透過 Forms 寫入 | **NO ACCESS**<br>🚫 僅透過 Forms 寫入 |

---

## 3. List Schema Specifications (三張清單欄位結構規範)

### 3.1 List 1: `HR_Cases` (一般舉報清單)
* **URL:** `https://demo-tenant.sharepoint.com/sites/SpeakUp-Mediation-Portal/Lists/HR_Cases/AllItems.aspx`
* **Case ID Format:** `WB-HR-{ResponseId}`
* **Columns:** `Title` (Single line), `SubmissionMode` (Single line), `Category` (Single line), `Urgency` (Single line), `IncidentDetails` (Multiple lines), `EvidenceNote` (Multiple lines), `ContactInfo` (Single line), `CaseStatus` (Choice: `Pending`, `Under Investigation`, `Closed`).

### 3.2 List 2: `Boss_Only_Cases` (高層機密舉報與跨軌升級清單)
* **URL:** `https://demo-tenant.sharepoint.com/sites/SpeakUp-Mediation-Portal/Lists/Boss_Only_Cases/AllItems.aspx`
* **Case ID Format:** `WB-BOSS-{ResponseId}` (from Whistleblowing) or `MED-BOSS-{ResponseId}` (from HR-implicated Mediation)
* **Security Configuration:**
  * Navigate to **List Settings $\rightarrow$ Permissions for this list $\rightarrow$ Stop Inheriting Permissions**.
  * Remove all HR groups and individual HR accounts (`hr.head@companydemo.com`).
  * Retain **only** `md@companydemo.com` (Managing Director / Owner).
  * In **Advanced Settings $\rightarrow$ Search**, set *"Allow items from this list to appear in search results?"* to **No** (prevents Delve / Microsoft Search metadata leakage).

### 3.3 List 3: `Mediation_Cases` (員工調解預約清單)
* **URL:** `https://demo-tenant.sharepoint.com/sites/SpeakUp-Mediation-Portal/Lists/Mediation_Cases/AllItems.aspx`
* **Case ID Format:** `MED-{ResponseId}`
* **Columns:** `Title` (Single line), `ApplicantEmail` (Single line), `PrinciplesConfirmed` (Single line), `ImplicatesHR` (Single line), `SafetyScreening` (Single line), `DisputeCategory` (Single line), `Summary` (Multiple lines), `PreferredTimeSlot` (Single line).
* **Data Retention Policy (PDPO DPP2):** Closed mediation intake records are purged after 90 days once the 1-on-1 Caucus concludes, leaving zero footprint in HR personnel files.
