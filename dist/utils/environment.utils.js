"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentUtils = void 0;
class EnvironmentUtils {
    constructor() {
        this.environment = process.env.NODE_ENV || 'development';
    }
    isProduction() {
        return this.environment.toLowerCase() === 'production';
    }
    getEnvironment() {
        return this.environment;
    }
}
exports.EnvironmentUtils = EnvironmentUtils;
//# sourceMappingURL=environment.utils.js.map