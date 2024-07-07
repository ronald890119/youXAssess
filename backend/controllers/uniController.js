const University = require("../models/university");

// controller to load all universities
exports.load = async(req, res) => {
    try {
        let result = await University.load();
        res.send(result);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Server error." })
    }
}