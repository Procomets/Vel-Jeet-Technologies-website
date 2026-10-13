# Google Sheets Integration Guide for Vel Jeet Technologies

Follow these simple steps (takes ~2 minutes) to start storing all inquiry form submissions directly into your Google Sheet:

---

### Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.new) in your browser.
2. Name the spreadsheet (e.g., **"Vel Jeet Technologies - Inquiries"**).

---

### Step 2: Add the Google Apps Script
1. In your Google Sheet, click **Extensions** in the top menu -> **Apps Script**.
2. Delete any existing code in `Code.gs` and paste the following script:

```javascript
/**
 * Google Apps Script for Vel Jeet Technologies Form Inquiries
 * Handles both POST and GET requests and supports both URLSearchParams and JSON
 */
function doPost(e) {
  return handleData(e);
}

function doGet(e) {
  return handleData(e);
}

function handleData(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Company Name",
        "Work Email",
        "Phone / WhatsApp",
        "Service Required",
        "Hiring Requirements & Details"
      ]);
      // Format header row with brand red style
      sheet.getRange(1, 1, 1, 7)
        .setFontWeight("bold")
        .setBackground("#C41E3A")
        .setFontColor("#FFFFFF");
    }

    var data = {};
    if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      data = e.parameter;
    } else if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = {};
      }
    }

    var timestamp = data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var fullName = data.fullName || "";
    var companyName = data.companyName || "";
    var email = data.email || "";
    var phone = data.phone || "";
    var serviceInterest = data.serviceInterest || "";
    var message = data.message || "";

    // Append new inquiry row
    sheet.appendRow([
      timestamp,
      fullName,
      companyName,
      email,
      phone,
      serviceInterest,
      message
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", row: sheet.getLastRow() })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (disk icon).

---

### Step 3: Deploy as Web App
1. At the top right of the Apps Script editor, click **Deploy** -> **New deployment**.
2. Click the gear icon (**Select type**) -> choose **Web app**.
3. Fill in:
   - **Description**: `Vel Jeet Form Submissions`
   - **Execute as**: **Me** (`your-email@gmail.com`)
   - **Who has access**: **Anyone** *(Important: Choose "Anyone" so submissions from your website work without login)*
4. Click **Deploy**.
5. Google will ask for authorization -> click **Authorize access**, choose your account, click **Advanced** -> **Go to (unsafe)** -> **Allow**.
6. Copy the **Web App URL** provided (it looks like `https://script.google.com/macros/s/AKfycbx.../exec`).

---

### Step 4: Add URL to the Website

Open `src/config.js` and paste your URL:

```javascript
export const GOOGLE_SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYED_ID_HERE/exec';
```

*(Alternatively, you can add it to a `.env` file as `VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/.../exec`)*

---

### Done! 🎉
Every time a client submits the form in the Contact Modal, all fields (Name, Company, Email, Phone, Service, Requirements, and Timestamp) will immediately appear as a new row in your Google Sheet!
