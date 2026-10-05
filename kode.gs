function doGet(e) {
  var data = getBeasiswaData();
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getBeasiswaData() {
  try {
    var spreadsheetId = "11udczKSWrmq6w_MsJcYvRjoraq2-r0-APtOvlvfIyzo";
    var ss;
    
    try {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    } catch (e) {}
    
    if (!ss) {
      ss = SpreadsheetApp.openById(spreadsheetId);
    }
    
    var sheet = ss.getSheets()[0];
    var values = sheet.getDataRange().getDisplayValues();
    
    var now = new Date();
    var timeStr = "";
    try {
      var tz = Session.getScriptTimeZone() || "Asia/Makassar";
      timeStr = Utilities.formatDate(now, tz, "hh:mm a d/M/yyyy").toLowerCase();
    } catch(e) {
      timeStr = "";
    }
    
    return {
      success: true,
      rows: values,
      updateTime: timeStr
    };
  } catch (err) {
    return {
      success: false,
      error: err.toString()
    };
  }
}
