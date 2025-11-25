"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMulter = handleMulter;
function handleMulter(multerFn) {
    return (req, res, next) => {
        multerFn(req, res, (err) => {
            if (err) {
                console.log("🔥 MULTER ERROR:", JSON.stringify(err, null, 2));
                return res.status(400).json({ error: err.message || "Upload error" });
            }
            next();
        });
    };
}
