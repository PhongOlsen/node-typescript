"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const global_exception_handler_1 = require("./middleware/global-exception-handler");
const routers_1 = __importDefault(require("./routers"));
const db_config_1 = __importDefault(require("./configs/db.config"));
dotenv.config();
const mongooseConnect = new db_config_1.default(`${process.env.MONGO_HOST}${process.env.MONGO_PORT}/${process.env.MONGO_DB}`);
mongooseConnect.connect(() => {
    console.log('------------------ MongoDb Connected! ------------------');
});
const app = express();
const port = process.env.PORT || 3001;
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(global_exception_handler_1.GlobalExceptionHandler.exceptionHandle);
app.use('/api', routers_1.default);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map