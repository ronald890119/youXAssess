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

// Get university by index
UniversitySchema.statics.getByIndex = async function(index) {
    const allUniversity = await this.find();
    if(index >= 0 && index < allUniversity.length) {
        return allUniversity[index];
    } else {
        return null;
    }
}

// Update a new university
UniversitySchema.statics.update = async function({
    index,
    alpha_two_code,
    name,
    domains,
    web_pages,
    country,
    state_province
}) {
    const allUniversity = await this.find();
    console.log(allUniversity[index]["_id"]);
    return this.findOneAndUpdate({
        _id: allUniversity[index]["_id"]
    }, {
        alpha_two_code: alpha_two_code,
        name: name, 
        domains: domains,
        web_pages: web_pages,
        country: country,
        "state-province": state_province
    });
}

// Delete last item from array
UniversitySchema.statics.delete = async function() {
    const allUniversity = await this.find();
    return this.findByIdAndDelete(allUniversity[allUniversity.length - 1]["_id"]);
}

const University = mongoose.model("Universities", UniversitySchema, "universityList");
module.exports = University;