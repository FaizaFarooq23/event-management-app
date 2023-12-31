const db = require("../models");
const User = db.user;

exports.create = (req, res) => {
    console.log("req.body", req.body);
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const user = new User({
        username: req.body.username,
        password: req.body.password,

    });

    user.save(user).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });

}



exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
    User.find(condition)
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found User with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with id=" + id });
        });
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    User.findByIdandUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                });
            } else res.send({ message: "User was updated successfully." });

        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
}
exports.delete = (req, res) => {
    const _id = req.params.id;
    console.log("id", _id);
    User.findByIdandRemove(_id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${_id}. Maybe User was not found!`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}
exports.deleteAll = (req, res) => {
    User.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Users were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Users."
            });
        });
}

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username: username, password: password })
        .then(data => {
            if (data) {
                res.send(data);
            }
            else {
                res.status(404).send({ message: "Not found User with username " + username });
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with username=" + username });
        });
}
