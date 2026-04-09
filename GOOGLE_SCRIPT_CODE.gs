/**
 * Google Apps Script for Saasfactor Lead Capture
 * Sheet: https://docs.google.com/spreadsheets/d/1OebqJNcRCHf5kAb8fmYhh4vzQDPo5I9wZTBkQYrHXgY/edit
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Delete the default code and paste ALL of this
 * 4. Click Save (floppy disk icon) - name it "Lead Capture"
 * 5. Click Deploy → New deployment
 * 6. Type: Web app
 * 7. Execute as: Me
 * 8. Who has access: Anyone  
 * 9. Click Deploy and authorize
 * 10. Copy the Web App URL (ends in /exec)
 * 11. Add to Vercel as VITE_GOOGLE_SCRIPT_URL
 */

function doPost(e) {
  try {
    // Get the active sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Add headers if first row is empty
    var firstRow = sheet.getRange(1, 1, 1, 5).getValues()[0];
    if (!firstRow[0]) {
      sheet.getRange(1, 1, 1, 5).setValues([[
        "Timestamp", "Name", "Email", "Location", "Source"
      ]]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold");
    }
    
    // Append the lead data row
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.location || "",
      data.source || "Sales Valuation Calculator"
    ]);
    
    // Return success with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok", message: "Lead saved" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      });
      
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      });
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: "API is working", 
      message: "Send POST request with lead data" 
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      "Access-Control-Allow-Origin": "*"
    });
}

// Handle CORS preflight
function doOptions(e) {
  return ContentService
    .createTextOutput("")
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
}
