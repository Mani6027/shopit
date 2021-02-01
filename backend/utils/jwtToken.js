// create and send token and save in the cookie
const sendToken = (user, statusCode, response) => {

    // Create JWT token
    const token = user.jwtToken();

    // Option for cookie
    const options = {
        expires: new Date(
            Date.now + process.env.COOKIE_EXPIRATION_TIME *24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    response.status(statusCode).cookie('token', token, options).json({
        success:true,
        token,
        user,
    })

}

module.exports = sendToken;
