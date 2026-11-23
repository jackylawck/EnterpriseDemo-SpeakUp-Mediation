# Security, Privacy & Legal Disclaimer Policy
# 資安政策、隱私保護與法律免責聲明

## 1. Scope & Demonstration Boundary (專案性質與示範邊界)

`EnterpriseDemo-SpeakUp-Mediation` is an **architectural reference implementation and open-source governance demonstration** authored by **羅子淇 (Jacky Law)**. 

`EnterpriseDemo-SpeakUp-Mediation` 為 **羅子淇 (Jacky Law)** 設計之**企業管治架構參考實作與開源示範專案**。

* **Sanitized Artifacts (全面脫敏):** All Tenant IDs, Form GUIDs, SharePoint URLs, and email addresses (`md@companydemo.com`, `hr.head@companydemo.com`) in this repository are synthetic placeholders.
* **No Real PII (零真實個資):** No real employee records, whistleblowing reports, or mediation transcripts are stored in or transmitted through this GitHub repository or its GitHub Pages interactive simulator.

## 2. Technical Security Controls (技術資安防禦控制)

1. **Strict Content Security Policy (Zero `'unsafe-inline'`):**  
   The web portal enforces `default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'none'; form-action 'none'; frame-ancestors 'none'`, eliminating inline script execution and Cross-Site Scripting (XSS) vectors.
2. **DOM XSS Prevention:**  
   All interactive simulator inputs are rendered strictly via `textContent` rather than `innerHTML`.
3. **M365 Tenant Isolation Recommendations (企業部署資安基準):**  
   * **Broken Permission Inheritance:** `Boss_Only_Cases` must break inheritance from the parent SharePoint site and explicitly exclude HR personnel.
   * **Log Redaction:** Enable `Secure Outputs` on the Power Automate `Get response details` action to prevent plaintext whistleblowing payloads from appearing in run history logs.
   * **Anonymous Ingress:** Disable "Record name" and restrict access appropriately on the whistleblowing intake form to prevent metadata leakage.

## 3. Legal & Professional Disclaimer (法律與專業責任免責聲明)

* **No Legal Advice (非法律意見):** The compliance mappings (ISO 37002, ISO 27001/27701, Hong Kong PDPO Cap. 486, and Hong Kong Mediation Ordinance Cap. 620) provided in this repository are for **informational and architectural governance reference only** and do not constitute formal legal advice. Organizations adopting this architecture must consult qualified legal counsel and their Data Protection Officer (DPO) prior to production deployment.
* **Limitation of Liability (責任限制):** Released under the **MIT License**, the software and templates are provided *"AS IS"*, without warranty of any kind. The author assumes no liability for operational misconfigurations, permission inheritance errors, or regulatory non-compliance arising from third-party deployments.

## 4. Reporting Security Issues (資安漏洞回報)

If you identify any security vulnerability in the static web demonstration or schema templates, please open a confidential issue or contact the repository maintainer via GitHub (`@jackylawck`).
