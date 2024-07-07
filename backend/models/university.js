const mongoose = require("./db");

// Schema for university data
const UniversitySchema = new mongoose.Schema({
    user_id: { _id: {type: mongoose.Schema.Types.ObjectId, ref: "Users"} },
    characters: [String],
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
    state_province: {
        type: String,
        required: false,
    },
});

// Load all university data
UniversitySchema.statics.load = function() {
    return this.find();
}

const University = mongoose.model("Universities", UniversitySchema, "universityList");
module.exports = University;