const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define a schema
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    picture: String,
    email: { type: String, required: true, unique: true },
    contact: { type: Number, required: true },
    description: { type: String },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    timeOfBirth: { type: Date, required: true },
    address: String,
    city: { type: String, required: true },
    country: { type: String, required: true },
    qulification: { type: String, required: true },
    professionalQualification: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    post: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    adPost: [{ type: Schema.Types.ObjectId, ref: "adPost" }],
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Hash the password
userSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

/**
 * Verifies the passwords
 * @param {string}
 * @returns {Boolean}
 */

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Create user instace
const User = mongoose.model("User", userSchema);

// Export the user model
module.exports = User;
