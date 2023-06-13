const {route} = require("express/lib/application.js");

module.exports = app => {

    const events = require("../controllers/event.controllers.js");
    var router = require("express").Router();
    router.post("/", events.create);
    router.get("/", events.findAll);
    router.get("/:id", events.findOne);
    router.get("/user/:id", events.findAllUserEvents);
    router.put("/:id", events.update);
    router.delete("/:id", events.delete);
    router.delete("/", events.deleteAll);
    app.use('/api/events', router);
    

};
