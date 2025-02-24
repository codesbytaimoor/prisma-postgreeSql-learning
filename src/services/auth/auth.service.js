// Services for Authentication, Service Use For Database Operations

const prisma = require("../../config/prisma.config");
const bcrypt = require("bcryptjs");
const createHttpError = require("http-errors");
const httpStatus = require("http-status");

const registerUser = async (name, email, password, role) => {

    const exsistingEmail = await prisma.user.findUnique({
        where: { email }
    })

    if (exsistingEmail) {
        throw createHttpError(httpStatus.status.CONFLICT, "User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword, role }
    });
    return user;
}

module.exports = { registerUser }; 