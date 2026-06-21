const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

async function getMessages(req, res) {
    const messages = await db.getAllMessages();
    res.render("index", {
        title: "Mini Message Board",
        messages
    });
}

function createMessageGet(req, res) {
    res.render("form", {
        title: "New Message",
        errors: []
    });
}

const createMessagePost = [
    body("username").trim()
        .isLength({ min: 2, max: 30}).withMessage("Username must be 2-30 characters."),
    
    body("message").trim()
        .isLength({ min: 1, max: 500 }).withMessage("Message must be between 1 and 500 characters."),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("form", {
                title: "New Message",
                errors: errors.array()
            });
        }

        const { username, message } = req.body;

        await db.createMessage(username, message);

        res.redirect("/");
    }
]

async function getMessage(req, res) {
    const message = await db.getMessageById(req.params.id);
    res.render("message", {
        title: "Message Details",
        message
    });
}

module.exports = {
    getMessages,
    createMessageGet,
    createMessagePost,
    getMessage
}