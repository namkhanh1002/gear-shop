// Entry point cho Vercel: export Express app để chạy như Serverless Function.
// Vercel nhận diện framework Express từ file này (root/server.js).
require('express');
const app = require('./backend/src/server');

module.exports = app;
