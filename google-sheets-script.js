/**
 * Google Apps Script for MYSB Registration
 * ============================================================
 * Paste this into: Extensions > Apps Script in your Google Sheet
 * 
 * Columns (in exact order requested):
 * 1. Registration ID
 * 2. Time Stamp
 * 3. Date
 * 4. Name
 * 5. Phone
 * 6. Email
 * 7. Age
 * 8. City/Country
 * 9. Notes
 * 10. Status
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Auto-create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Registration ID",
        "Time Stamp",
        "Date",
        "Name",
        "Phone",
        "Email",
        "Age",
        "City/Country",
        "Notes",
        "Status"
      ]);
      // Bold the header row
      sheet.getRange(1, 1, 1, 10).setFontWeight("bold");
    }
    
    var now = new Date();
    // Time formatted in IST (e.g., 10:45:20 PM)
    var timeStamp = Utilities.formatDate(now, "Asia/Kolkata", "hh:mm:ss a");
    // Date formatted in IST (e.g., 15/10/2026)
    var dateString = Utilities.formatDate(now, "Asia/Kolkata", "dd/MM/yyyy");
    
    var status = data.isWaitlist ? "Waitlist" : "Pending Review";
    
    // Prepend single quote (') so Google Sheets treats "+91..." as text instead of a formula
    var safePhone = data.phone ? ("'" + data.phone.toString().trim()) : "";
    
    // Append the row matching the exact 10 columns
    sheet.appendRow([
      data.id || "",
      timeStamp,
      dateString,
      data.fullName || "",
      safePhone,
      data.email || "",
      data.age || "",
      data.cityCountry || "",
      data.notes || "None",
      status
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
