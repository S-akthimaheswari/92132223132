const Logger = (message, data = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = { timestamp, message, ...data };
  const existingLogs = JSON.parse(sessionStorage.getItem("logs") || "[]");
  existingLogs.push(logEntry);
  sessionStorage.setItem("logs", JSON.stringify(existingLogs));
};

export default Logger;