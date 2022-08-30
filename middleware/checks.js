const { User } = require("../models/bookSchema")
exports.checks = async (req, res, next) => {
    let user = await User.findOne({ _id: req.body.userid })
    console.log(user)
    if (user.bookIssued.includes(req.body.bookid)) {
        res.send("you already have that book")
    }
    else {
        next()
    }
}