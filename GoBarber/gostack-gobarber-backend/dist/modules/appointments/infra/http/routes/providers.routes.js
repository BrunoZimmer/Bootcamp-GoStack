"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var ProvidersController_1 = __importDefault(require("../controllers/ProvidersController"));
var ProviderMonthAvailabilityController_1 = __importDefault(require("../controllers/ProviderMonthAvailabilityController"));
var ProviderDayAvailabilityController_1 = __importDefault(require("../controllers/ProviderDayAvailabilityController"));
var providersRouter = express_1.Router();
var providersController = new ProvidersController_1.default();
var providerMonthAvailabilityController = new ProviderMonthAvailabilityController_1.default();
var providerDayAvailabilityController = new ProviderDayAvailabilityController_1.default();
providersRouter.use(ensureAuthenticated_1.default);
providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', providerMonthAvailabilityController.index);
providersRouter.get('/:provider_id/day-availability', providerDayAvailabilityController.index);
exports.default = providersRouter;
