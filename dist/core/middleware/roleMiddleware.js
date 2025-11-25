"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedRoles = allowedRoles;
function allowedRoles(...roles) {
    return (req, res, next) => {
        const user = req.user;
        if (!roles.includes(user.role))
            return res.status(403).json({ error: 'Access denied' });
        next();
    };
}
