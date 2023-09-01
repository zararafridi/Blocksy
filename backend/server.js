    const express = require("express");
    const dbConnection = require("./database/index");
    const { port } = require("./config/index");
    const router = require("./routes/index");
    const errorHandler = require("./middleware/errorHandler");
    const bodyParser = require("body-parser");
    const cookieParser = require('cookie-parser')
    const cors = require('cors')


    const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    
}
    
    const app = express();
    app.use(cors(corsOptions))
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json({limit : '50mb'}));

    app.use(router);

    dbConnection();

    app.use('/storage', express.static('storage'))

    app.use(errorHandler);
    app.listen(port, () => {
    console.log(`backend server is running at PORT:${port} `);
    });
