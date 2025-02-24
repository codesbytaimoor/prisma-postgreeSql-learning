const sendResponse = require("../utils/response");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const auth = (roles = []) => (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return sendResponse(res, httpStatus.UNAUTHORIZED, "Unauthorized")

    try {
        const decodedUserInfo = jwt.verify(token, JWT_SECRET);
        if (!roles.includes(decodedUserInfo.role)) return sendResponse(res, httpStatus.FORBIDDEN, "Forbidden! You are not allowed to access this route, beacuse your role is " + decodedUserInfo.role);

        req.user = decodedUserInfo;

        next();
    } catch (error) {
        sendResponse(res, httpStatus.UNAUTHORIZED, "Unauthorized")
    }
}