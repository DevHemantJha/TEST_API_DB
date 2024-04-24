
const path = require("path")


const upload = async (req, res, next) => {
    // console.log(req.files)
    try {
        const uploadedFile = req.files.document
        const uploadpath = path.join(__dirname, '../uploads', uploadedFile.name)
        uploadedFile.mv(uploadpath, function (err) {
            if (err) {
                console.log(err)
            }
            else {
                next()
            }
        })
    }
    catch {

    }
}
const uploadAutomationRequest = async (req, res, next) => {
    // console.log(req.files)
    try {
        const uploadedFile = req.files.document
        const uploadpath = path.join(__dirname, '../uploads/automationRequest', uploadedFile.name)
        uploadedFile.mv(uploadpath, function (err) {
            if (err) {
                console.log(err)
            }
            else {
                next()
            }
        })
    }
    catch {

    }
}
const uploadContract = async (req, res, next) => {
    try {
        const uploadedFile = req.files.document
        console.log("document", uploadedFile);
        const uploadpath = path.join(__dirname, '../uploads/contractDocument', uploadedFile.name)
        uploadedFile.mv(uploadpath, function (err) {
            if (err) {
                console.log(err)
            }
            else {
                next()
            }
        })
    }
    catch {

    }
}
const uploadFnction = async (req, res, next) => {
    try {

        const uploadedFile = req.files.document
        const uploadpath = path.join(__dirname, '../uploads/functionImages', uploadedFile.name)
        uploadedFile.mv(uploadpath, function (err) {
            if (err) {
                console.log(err)
            }
            else {
                next()
            }
        })
    }
    catch {

    }
}
const uploadMember = async (req, res, next) => {
    try {
        const uploadedFile = req.files.document
       
        const uploadpath = path.join(__dirname, '../uploads/memberImages', uploadedFile.name)
        uploadedFile.mv(uploadpath, function (err) {
            if (err) {
                console.log(err)
            }
            else {
                next()
            }
        })
    }
    catch {

    }
}

const uploadIssueLog = async (req, res, next) => {
    try {
        const uploadedFile = req.files.document
        console.log("document", uploadedFile);
        const uploadpath = path.join(__dirname, '../uploads/issueLogDocument', uploadedFile.name)
        uploadedFile.mv(uploadpath, function (err) {
            if (err) {
                console.log(err)
            }
            else {
                next()
            }
        })
    }
    catch {

    }
}
const uploadChangeRequest = async (req, res, next) => {
    try {
        const uploadedFile = req.files.document
        console.log("document", uploadedFile);
        const uploadpath = path.join(__dirname, '../uploads/changeRequestDocument', uploadedFile.name)
        uploadedFile.mv(uploadpath, function (err) {
            if (err) {
                console.log(err)
            }
            else {
                next()
            }
        })
    }
    catch {

    }
}
const uploadTicketRaised = async (req, res, next) => {
    try {
        const uploadedFile = req.files.document
        const uploadpath = path.join(__dirname, '../uploads/ticketRaisedDocument', uploadedFile.name)
        uploadedFile.mv(uploadpath, function (err) {
            if (err) {
                console.log(err)
            }
            else {
                next()
            }
        })
    }
    catch {

    }
}
// -----------------------------------------------------------------------------------
const uploadAutomationRequestProcessVideo= async (req, res, next) => {
    try {
        const uploadedFile = req.files.document
        const uploadpath = path.join(__dirname, '../uploads/automationProcessVideo', uploadedFile.name)
        uploadedFile.mv(uploadpath, function (err) {
            if (err) {
                console.log(err)
            }
            else {
                next()
            }
        })
    }
    catch {

    }
}
module.exports = {
    upload,
    uploadAutomationRequest,
    uploadContract,
    uploadChangeRequest,
    uploadIssueLog,
    uploadTicketRaised,
    uploadFnction,
    uploadMember,
 uploadAutomationRequestProcessVideo
}