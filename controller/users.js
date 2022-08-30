const { Book, User } = require('../models/bookSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const secret = 'kbvliy712iw3rrhrwlfbo727';


exports.signup = async (req, res) => {
    try {
        // console.log(req)
        const { name, email, phone, password, role } = req.body
        let check = await User.exists({ email: email })
        let check1 = await User.exists({ phone: phone })

        if (check || check1) {
            res.json({
                "msg": "User already exist"
            })
        }
        console.log(check);
        console.log(check1);
        let encryptedPassword = await bcrypt.hash(password, 15)
        let Users = new User({
            name: name,
            phone: phone,
            email: email,
            password: encryptedPassword,
            role: role
        })


        let result = await Users.save()
        res.send(result)
        console.log(result)

    }
    catch (e) {
        console.log(e);
    }
}
exports.logIn = async (req, res) => {
    console.log("hey");
    const { email, phone, password } = req.body
    console.log(req.body);
    let finalUser
    if (email) {
        finalUser = await User.findOne({ email: email })
    }
    else {
        finalUser = await User.findOne({ phone: phone })
    }
    if (!finalUser) {
        res.json({
            'msg': 'User not found!'
        })
    }
    else {
        await bcrypt.compare(password, finalUser.password, function (err, isMatch) {
            if (err) {
                throw err
            }
            else {
                if (!isMatch) {
                    res.send("Please enter correct password")
                }
                else if (isMatch) {
                    const token = jwt.sign({
                        email: finalUser.email,
                        phone: finalUser.phone,
                        id: finalUser._id
                    }, secret)
                    res.json({
                        'msg': 'Logged in!',
                        user: finalUser,
                        token: token

                    })
                }
            }
        })
    }
}




exports.allBooks = async (req, res) => {
    let books = await Book.find().select('_id name quantity')
    res.send(books)
}


exports.updateBook = async (req, res) => {
    try {
        let { bookId } = req.body;
        await Book.findByIdAndUpdate(bookId, req.body);
        res.send('Updated')
    }
    catch (e) {

    }
}
exports.deleteBook = async (req, res) => {
    try {
        let { bookId } = req.body;
        await Book.findByIdAndDelete(bookId);
        res.send('Deleted Successfully')
    }
    catch (e) {

    }
}
exports.bookReturn = async (req, res) => {
    try {
        const { bookid, userid } = req.body
        let bookRev = await Book.findOne({ _id: req.body.bookid })
        await Book.findOneAndUpdate({ _id: req.body.bookid }, {
            $set: { quantity: bookRev.quantity + 1 },
            $pull: { assignedTo: req.body.userid }

        })
        await User.findOneAndUpdate({ _id: req.body.userid }, { $pull: { bookIssued: req.body.bookid } })
        res.send("Book returned")
    }
    catch (e) {
        console.log("error", e)

    }
}

exports.addBooks = async (req, res) => {
    try {
        const { name , quantity } = req.body
        let data = new Book({
            quantity: quantity,
            name: name
        })
        await data.save()
        res.send("Book added")
    }
    catch(e){
        console.log(e);
    }
}

exports.assignedTo = async (req, res) => {
    try {

        let book = await Book.findOne({ _id: req.body.bookid })
        await Book.findOneAndUpdate({ _id: req.body.bookid }, {
            $set: { quantity: book.quantity - 1 },
            $push: { assignedTo: req.body.userid }
        })
        await User.findOneAndUpdate({ _id: req.body.userid }, { $push: { bookIssued: req.body.bookid } })
        res.send("Array updated")
    }

    catch (e) {
        console.log("error", e)

    }
}

exports.addUser = async (req, res) => {
    try {
        const { name } = req.body
        let data = new User({
            name: name
        })
        await data.save()
        res.send("User Added")
    }
    catch (e) {
        console.log("error", e)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let { id } = req.body
        await User.findByIdAndDelete(id)
        res.send("User Deleted")
    }
    catch (e) {
        console.log("error", e)

    }

}

exports.updateUser = async (req, res) => {
    try {
        let { id } = req.body
        await User.findByIdAndUpdate(id, req.body)
        res.send("User Updated" + updates)

    }
    catch (e) {
        console.log("error", e)

    }
}