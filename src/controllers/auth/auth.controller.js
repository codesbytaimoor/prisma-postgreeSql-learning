// Controllers for Authentication, Controller Use For Business Logics

const expressAsyncHandler = require("express-async-handler");
const sendResponse = require("../../utils/response");
const httpStatus = require("http-status");
const { registerUser } = require("../../services/auth/auth.service");

const register = expressAsyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!email || !password) {
        return sendResponse(res, httpStatus.BAD_REQUEST, "Email and password required");
    }
    const user = await registerUser(name, email, password, role);
    sendResponse(res, httpStatus.status.CREATED, "User created", user);
})
module.exports = { register };