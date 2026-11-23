# Microsoft Teams Adaptive Cards JSON Templates (v1.4)
# Microsoft Teams 三色調適型卡片範本庫

> **Connector / 連接器:** Microsoft Teams Standard (`Post card in a chat or channel` — Zero Premium License Required)  
> **Schema Version / 卡片版本:** Adaptive Card `v1.4`  
> **Author / 架構設計:** 羅子淇 (Jacky Law)  

---

## 1. Card Design Philosophy (三色風險視覺分級設計)

To eliminate alert fatigue and ensure immediate situational awareness on desktop and mobile Microsoft Teams clients, Power Automate dispatches color-coded Adaptive Cards based on governance routing:

為避免通知疲勞並確保管理層在桌面及手機版 Teams 一眼辨識風險等級，系統依分流結果推送三種視覺語意卡片：
* **🔴 Attention (Red Header):** Executive Escalation (`Boss_Only_Cases` — HR-implicated whistleblowing or mediation).
* **🔵 Accent (Blue Header):** Standard Whistleblowing (`HR_Cases` — Assigned to HR Head).
* **🟢 Good (Green Header):** Confidential Workplace Mediation (`Mediation_Cases` — Cap. 620 Caucus scheduling).

---

## 2. Template A: Executive COI Escalation Card (🔴 高層機密升級卡片)

```json
{
  "$schema": "[http://adaptivecards.io/schemas/adaptive-card.json](http://adaptivecards.io/schemas/adaptive-card.json)",
  "type": "AdaptiveCard",
  "version": "1.4",
  "body": [
    {
      "type": "TextBlock",
      "text": "🚨 Executive Confidential Alert (COI Bypass Active)",
      "weight": "Bolder",
      "size": "Medium",
      "color": "Attention"
    },
    {
      "type": "TextBlock",
      "text": "This matter implicates HR leadership or triggered high-risk escalation. HR access has been automatically isolated.",
      "wrap": true,
      "isSubtle": true,
      "size": "Small"
    },
    {
      "type": "FactSet",
      "facts": [
        { "title": "Case ID:", "value": "${Title}" },
        { "title": "Urgency / Risk:", "value": "${Urgency}" },
        { "title": "Category:", "value": "${Category}" },
        { "title": "Submission Mode:", "value": "${SubmissionMode}" },
        { "title": "Contact:", "value": "${ContactInfo}" }
      ]
    },
    {
      "type": "TextBlock",
      "text": "Incident Summary:",
      "weight": "Bolder",
      "spacing": "Medium"
    },
    {
      "type": "TextBlock",
      "text": "${IncidentDetails}",
      "wrap": true
    }
  ],
  "actions": [
    {
      "type": "Action.OpenUrl",
      "title": "Open Isolated Executive List",
      "url": "[https://demo-tenant.sharepoint.com/sites/SpeakUp-Mediation-Portal/Lists/Boss_Only_Cases/AllItems.aspx](https://demo-tenant.sharepoint.com/sites/SpeakUp-Mediation-Portal/Lists/Boss_Only_Cases/AllItems.aspx)"
    }
  ]
}
