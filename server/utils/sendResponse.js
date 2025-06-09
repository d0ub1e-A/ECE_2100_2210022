export function sendResponse(res, statusCode, payload) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.statusCode = statusCode;
  res.end(JSON.stringify(payload));
}