"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
require("express-async-errors");
var routes_1 = __importDefault(require("./routes"));
var upload_1 = __importDefault(require("@config/upload"));
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
require("@shared/infra/typeorm");
require("@shared/container");
var app = express_1.default();
app.use(cors_1.default());
//aceitar inputs json no servidor
app.use(express_1.default.json());
//accept the index of routes
app.use(routes_1.default);
app.use('/files', express_1.default.static(upload_1.default.uploadsFolder));
app.use(function (err, request, response, next) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }
    console.log(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});
//run the server on localhost port
app.listen(3333, function () {
    console.log('Server started on 3333');
});
