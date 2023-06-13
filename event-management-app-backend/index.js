const express = require('express');
const db = require("./models");
const cors = require('cors');


const app = express();

var corsOptions = {
    origin: ['*', 'http://localhost:8081', 'http://localhost:8000', 'http://localhost:3000', 'https://arborswap-launchpad.vercel.app', 'http://54.242.172.198'],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
};

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch(err => {
        console.log('Cannot connect to the database!', err);
        process.exit();
    }
    );


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());



// Our very first api route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the server.'
    });
}
);

require("./routes/user.routes")(app);
require("./routes/event.routes")(app);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
}
);


