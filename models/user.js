const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	// prime focus on users name,email,password
	name: { type: String, required: true },
	email: { type: String, unique: true, required: true },// email should be unique
	// username proporsal
	password: { type: String, required: true },
	likedSongs: { type: [String], default: [] },
	playlists: { type: [String], default: [] },
	isAdmin: { type: Boolean, default: false },
});
// generating authentication Token
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, name: this.name, isAdmin: this.isAdmin },
		process.env.JWTPRIVATEKEY, // defined in .env file
		{ expiresIn: "7d" }
	);
	return token;
};
// Joi module validation
const validate = (user) => {
	const schema = Joi.object({
		name: Joi.string().min(5).max(15).required(),// checks for name
		email: Joi.string().email().required(),
		password: passwordComplexity().required(),
		 
	});
	return schema.validate(user);
};

const User = mongoose.model("user", userSchema);

module.exports = { User, validate };