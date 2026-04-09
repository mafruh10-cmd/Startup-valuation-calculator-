/**
 * Google Apps Script for Saasfactor Lead Capture
 * Sheet: https://docs.google.com/spreadsheets/d/1OebqJNcRCHf5kAb8fmYhh4vzQDPo5I9wZTBkQYrHXgY/edit
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
    
    // Create success response
    var output = ContentService.createTextOutput(JSON.stringify({ status: "ok", message: "Lead saved" }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
      
  } catch(err) {
    // Create error response
    var output = ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.message }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  var output = ContentService.createTextOutput(JSON.stringify({ 
    status: "API is working", 
    message: "Send POST request with lead data"
  }));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
