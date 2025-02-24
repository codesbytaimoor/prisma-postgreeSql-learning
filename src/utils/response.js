const sendResponse = (res, status = 500, message = "Something went wrong", data = null) => {
    if (!status || typeof status !== "number") {
        console.error("Invalid status code provided:", status);
        status = 500;
    }
    console.log(status, message, data, "here")
    return res.status(status).json({ message, data });
};

module.exports = sendResponse;
