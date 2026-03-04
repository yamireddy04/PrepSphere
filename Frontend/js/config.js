// js/config.js
const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

export const API_BASE_URL = isLocal
    ? "http://localhost:5000"
    : "https://prepsphere-o7wh.onrender.com";