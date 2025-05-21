const logout = (req, res) => {
    const tokenOption = {
        httpOnly : true,
        secure : true,
        sameSite : "None",
    }

    res.clearCookie("token",tokenOption);
    res.json({
        message : 'Logout Successfully',
        success : true,
        error : false
    });
}

module.exports = logout;