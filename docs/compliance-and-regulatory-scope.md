# Regulatory Applicability, ISO Alignment & Non-AI Scope-Out Assessment
# 全球法規適用性、ISO 標準對齊與「非 AI 系統豁免邊界」合規評估報告

> **Document Control / 文件控制**  
> **System / 系統名稱:** `EnterpriseDemo-SpeakUp-Mediation`  
> **Architecture Type / 架構定性:** Deterministic Rule-Based Low-Code Workflow (Non-AI) / 確定性規則引擎低代碼工作流（非人工智能系統）  
> **Author / 架構設計:** 羅子淇 (Jacky Law)  

---

## 1. Executive Summary: Deterministic Non-AI Boundary (實事求是之「非 AI」定性)

This system is engineered strictly on **deterministic conditional logic (`If / Else` string matching)** and **authenticated human-in-the-loop (HITL) governance**. It does **not** utilize Large Language Models (LLMs), machine learning (ML), automated sentiment scoring, predictive profiling, or algorithmic decision-making.

本系統完全基於**確定性條件規則（`If / Else` 精確字串比對）**與**獲授權人員實質介入（Human-in-the-Loop）**運作，**絕無導入任何大型語言模型（LLM）、機器學習（ML）、情緒分析演算法或自動化人員畫像（Profiling）**。

In corporate governance and legal risk management, explicitly documenting **why certain AI regulations do NOT apply (Scope-Out)** prevents regulatory over-engineering and protects the system architect from unwarranted compliance liabilities.

在企業管治與法律風險管理實務中，清晰界定並記錄**「特定 AI 法規為何不適用於本系統（Scope-Out）」**，能避免過度合規（Over-engineering），並從架構源頭釐清系統設計者的法律與合規責任邊界。

---

## 2. Global Regulatory & ISO Standards Applicability Matrix (全球法規與 ISO 標準適用性矩陣)

| Regulation / Standard<br>法規或國際標準 | Applicability Status<br>適用性定性 | Legal & Technical Justification (No Over-Engineering)<br>法理與技術依據（實事求是界定） |
| :--- | :--- | :--- |
| **ISO 37002:2021**<br>*(Whistleblowing Management Systems / 吹哨管理系統指引)* | **APPLICABLE (Core)<br>核心適用** | Directly governs whistleblowing intake, impartiality, and anti-retaliation. Implemented via anonymous intake (Record Name disabled) and automated Conflict-of-Interest (COI) bypass routing HR-implicated reports directly to `Boss_Only_Cases`.<br>直接規範舉報受理、公正性與防報復。透過匿名填報及利益衝突自動繞過 HR（直達高層隔離清單）全面落實。 |
| **Hong Kong PDPO (Cap. 486)**<br>*(香港《個人資料（私隱）條例》)* | **APPLICABLE (Core)<br>核心適用** | Directly governs employee personal data collected in Hong Kong. Enforced via upfront Personal Information Collection Statement (PICS / DPP1), Power Automate `Secure Outputs` log redaction (DPP4), and broken-inheritance SharePoint list isolation.<br>直接規管香港境內收集之僱員個人資料。透過前端《收集個人資料聲明》、Flow 安全輸出遮罩日誌及清單獨立權限鎖定落實保障原則。 |
| **Hong Kong Mediation Ordinance (Cap. 620)**<br>*(香港《調解條例》第 620 章)* | **APPLICABLE (Core)<br>核心適用** | Sets the statutory confidentiality and "without prejudice" framework for workplace mediation. Enforced via a mandatory dual-checkbox agreement gate on Form-02 and strict institutional separation from HR personnel files.<br>確立職場調解之保密與「無損權利」原則。透過預約表單強制雙重確認閘門，並以制度確保調解紀錄不寫入 HR 人事檔案。 |
| **ISO/IEC 27001 & ISO/IEC 27701**<br>*(InfoSec & Privacy Management / 資安與隱私管理)* | **APPLICABLE (Baseline)<br>基準適用** | Provides the technical security baseline: Role-Based Access Control (RBAC), least privilege across 3 isolated lists, data minimization (optional contact fields), and Strict CSP (zero `'unsafe-inline'`) on the web portal.<br>提供技術保安基準：三清單最小權限隔離（RBAC）、資料最小化（聯絡方式選填）及展示門戶零內聯嚴格 CSP 防禦。 |
| **EU AI Act (Regulation (EU) 2024/1689)**<br>*(歐盟人工智能法案)* | **NOT APPLICABLE (Scoped Out)<br>不適用（依法豁免）** | **Reason:** Does not meet the definition of an "AI System" under Art. 3(1), nor does it perform automated HR evaluation/termination profiling under Annex III. All triage uses transparent, deterministic `If/Else` rules reviewed by human officers.<br>**豁免依據：** 本系統不具備自主推論能力，不構成歐盟 AI 法案第 3(1) 條之「AI 系統」，亦不涉及附件三之自動化人事評核或解僱決策。所有分流均為確定性規則並由專人實質處理。 |
| **ISO/IEC 42001:2023**<br>*(AI Management System / 人工智能管理系統)* | **NOT APPLICABLE (Scoped Out)<br>不適用（無 AI 模型）** | **Reason:** No AI models are trained, fine-tuned, deployed, or monitored. Applying ISO 42001 model drift or training data governance controls would be redundant.<br>**豁免依據：** 系統無任何 AI 模型訓練、微調或部署生命週期，強行套用模型漂移或訓練數據治理條款屬畫蛇添足。 |
| **CAC Regulations (China)**<br>*(國家網信辦《生成式人工智能服務管理暫行辦法》等)* | **NOT APPLICABLE (Scoped Out)<br>不適用（非生成式/跨境）** | **Reason:** (1) The system contains zero generative AI or deep synthesis algorithms; (2) Designed for Hong Kong enterprise tenancy with data resident in local/designated M365 tenant boundaries without Mainland China public internet service provision.<br>**豁免依據：** （一）系統不含任何生成式 AI 或深度合成演算法；（二）架構針對香港企業租戶設計，數據留存於企業專屬 M365 租戶邊界內，不涉及中國內地公眾網信服務。 |
| **EU GDPR (Regulation (EU) 2016/679)**<br>*(歐盟一般資料保護規則)* | **CONDITIONALLY APPLICABLE<br>條件性適用（視乎僱員所在地）** | **Scope Note:** Not triggered if the enterprise operates solely in Hong Kong with no EU/EEA employees or establishments (Art. 3). However, the system's Privacy-by-Design controls (data minimization, PICS, access isolation) inherently satisfy GDPR Art. 5 & Art. 32 standards if extended to EU subsidiaries.<br>**適用說明：** 若企業僅於香港營運且無歐盟境內僱員（第 3 條），GDPR 並不直接適用；惟本系統內建之資料最小化與權限隔離設計已先天符合 GDPR 第 5 及 32 條標準，可無縫擴展至歐盟分支機構。 |

---

## 3. Architectural Safeguards Protecting the System Designer (架構師合規與免責保障設計)

1. **Zero Data Custody (零數據託管原則):**  
   The open-source repository contains **zero production data, zero real employee PII, and zero tenant credentials**. All organizational deployments reside exclusively within the adopting enterprise's own Microsoft 365 tenant under their internal Data Protection Officer (DPO) governance.  
   本開源專案**不託管任何真實企業數據、個人資料或租戶憑證**。所有實際部署均完全運行於採用企業自家之 Microsoft 365 租戶內，並受該企業內部私隱專員（DPO）管轄。

2. **Deterministic Auditability (確定性可稽核性):**  
   Every routing decision (`HR_Cases` vs. `Boss_Only_Cases` vs. `Mediation_Cases`) is 100% deterministic, reproducible, and free of algorithmic "black-box" opacity.  
   每一次分流決策（`一般舉報`、`高層機密舉報` 或 `員工調解預約`）均為 100% 確定性邏輯，完全可重現、可稽核，不存在演算法「黑盒」不透明風險。
