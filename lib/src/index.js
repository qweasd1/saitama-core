"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = exports.registerDeaultConfig = exports.generatorConfigs = void 0;
const Builder_1 = require("./Builder");
const os_1 = require("os");
let defaultConfig = null;
exports.generatorConfigs = {};
function resolveConfig(config) {
    if (config) {
        if (typeof config === "string") {
            return exports.generatorConfigs[config];
        }
        else {
            return config;
        }
    }
}
function registerDeaultConfig(name) {
    defaultConfig = exports.generatorConfigs[name];
}
exports.registerDeaultConfig = registerDeaultConfig;
function generate(config, codes) {
    if (!config.newLine) {
        config.newLine = os_1.EOL;
    }
    if (!config.initialIndent) {
        config.initialIndent = "";
    }
    if (!config.baseIndent) {
        config.baseIndent = "";
    }
    const builderController = new Builder_1.BuilderController(config);
    const result = codes(builderController, builderController);
    if (result) {
        return result["then"](() => { return builderController.generator.toString(); });
    }
    else {
        return builderController.generator.toString();
    }
}
exports.generate = generate;
//# sourceMappingURL=index.js.map