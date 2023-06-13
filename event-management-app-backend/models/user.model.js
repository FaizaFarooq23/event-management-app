const mongoose = require('mongoose');

module.exports = mongoose => {
    const User = mongoose.model(
        "User",
        mongoose.Schema(
            {
                username : String,
                password : String,
            },
            { timestamps: true }
        )
    );
    return User;
};

