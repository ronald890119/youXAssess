const mongoose = require("./db");

// Schema for university data
const UniversitySchema = new mongoose.Schema({
    alpha_two_code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    domains: {
        type: [String],
        required: true,
    },
    web_pages: {
        type: [String],
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    "state-province": {
        type: String,
        required: false,
    },
});

// Load all university data
UniversitySchema.statics.load = function() {
    return this.find();
}

// Add first university to the end
UniversitySchema.statics.add = async function() {
    const allUniversity = await this.find();
    if(allUniversity.length > 0) {
        const temp = allUniversity[0];
        const uni = new University({
            alpha_two_code: temp["alpha_two_code"],
            name: temp["name"],
            domains: temp["domains"],
            web_pages: temp["web_pages"],
            country: temp["country"],
            "state-province": temp["state-province"]
        });

        return uni.save();
    }
}

// Create a new university
UniversitySchema.statics.create = async function({
    alpha_two_code,
    name,
    domains,
    web_pages,
    country,
    state_province
}) {
    const newUniversity = new University({
        alpha_two_code,
        name,
        domains,
        web_pages,
        country,
        "state-province": state_province
    });

    return newUniversity.save();
}

// Delete last item from array
UniversitySchema.statics.delete = async function() {
    const allUniversity = await this.find();
    return this.findByIdAndDelete(allUniversity[allUniversity.length - 1]["_id"]);
}

const University = mongoose.model("Universities", UniversitySchema, "universityList");
module.exports = University;