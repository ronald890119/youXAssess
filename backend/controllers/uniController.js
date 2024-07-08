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

// Add first university to the end
exports.add = async(req, res) => {
    try {
        const newUni = await University.add();

        res.status(200).json({
            error_code: 0,
            university: newUni,
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error_code: 5000, message: "Server error." });
    }
}

exports.getByIndex = async(req, res) => {
    try {
        let result = await University.getByIndex(req.params["index"]);

        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error_code: 5000, message: "Server error." });
    }
}

// controller to update a university
exports.update = async(req, res) => {
    try {
        const {index, 
            alpha_two_code,
            name,
            domains,
            web_pages,
            country,
            state_province} = req.body;

        const newUniversity = await University.update({
            index,
            alpha_two_code,
            name,
            domains,
            web_pages,
            country,
            state_province
        });

        res.status(200).json({
            error_code: 0,
            university: {
                alpha_two_code: newUniversity.alpha_two_code,
                name: newUniversity.name,
                domains: newUniversity.domains,
                web_pages: newUniversity.web_pages,
                country: newUniversity.country,
                "state-province": newUniversity["state-province"]
            }
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error_code: 5000, message: "Server error." });
    }
}

// Delete last item from array
exports.delete = async(req, res) => {
    try {
        const result = await University.delete();
        res.status(200).json({
            error_code: 0,
            message: "Deleted successfully"
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error_code: 5000, message: "Server error." });
    }
}