const { updateBook, bookReturn,  allBooks ,deleteBook ,addBooks , addUser ,deleteUser, updateUser, assignedTo , signup,logIn} = require("../controller/users")
const express = require("express")
const {checks} = require("../middleware/checks")
const router = express.Router();

router.post("/addBooks", addBooks)
router.post("/updateBook", updateBook)
router.delete("/deleteBook", deleteBook)
router.post("/assignedTo",checks, assignedTo)
router.post("/booksReturn", bookReturn)
router.get("/allBooks", allBooks)

router.post("/logIn", logIn)
router.post("/addUser",addUser)
router.post("/updateUser",updateUser)
router.delete("/deleteUser",deleteUser)
router.post("/signup", signup)
module.exports = router;