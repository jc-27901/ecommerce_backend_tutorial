"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = errorLogger;
function errorLogger(err, req, res, next) {
    console.log("🔥 GLOBAL ERROR LOGGER:", JSON.stringify(err, null, 2));
    next(err);
}
