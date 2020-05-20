"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseBuilder = exports.BuilderController = void 0;
const Generator_1 = require("./Generator");
class BuilderController {
    constructor(config) {
        this.config = config;
        this.expr = (text) => {
            if (!text) {
                return this.baseBuilder;
            }
            if (this.baseBuilder.state.isFirst) {
                this.baseBuilder.state.isFirst = false;
            }
            else {
                if (this.baseBuilder.state.block && this.baseBuilder.state.block.seperator) {
                    this.generator.write(this.baseBuilder.state.block.seperator);
                }
            }
            if (this.baseBuilder.state.isLine) {
                this.generator.nextLine();
            }
            this.baseBuilder.state.isLine = false;
            this.baseBuilder.append(text);
            return this.baseBuilder;
        };
        this.line = (text) => {
            if (!text) {
                return this.baseBuilder;
            }
            if (this.baseBuilder.state.isFirst) {
                this.baseBuilder.state.isFirst = false;
            }
            else {
                if (this.baseBuilder.state.block && this.baseBuilder.state.block.seperator) {
                    this.generator.write(this.baseBuilder.state.block.seperator);
                }
            }
            if (this.baseBuilder.state.isLine) {
                this.generator.nextLine();
            }
            this.baseBuilder.state.isLine = true;
            this.baseBuilder.append(text);
            return this.baseBuilder;
        };
        this.newline = (n = 1) => {
            if (this.baseBuilder.state.isLine) {
                this.generator.nextLine();
            }
            for (let i = 0; i < n; i++) {
                this.generator.nextLine();
            }
            this.baseBuilder.state.isLine = false;
            return this.baseBuilder;
        };
        this.generator = new Generator_1.Generator(config);
        this.baseBuilder = new BaseBuilder(this.generator);
    }
}
exports.BuilderController = BuilderController;
class BaseBuilder {
    constructor(generator) {
        this.generator = generator;
        this.state = this.createBlockState(null);
    }
    createBlockState(block) {
        return {
            block: block,
            isFirst: true,
            isIfSuccess: null,
            isLine: false
        };
    }
    append(code) {
        this.generator.write(code);
        return this;
    }
    when(condition, code) {
        this.state.isIfSuccess = null;
        if (condition) {
            this.state.isIfSuccess = true;
            this.generator.write(code);
        }
        else {
            this.state.isIfSuccess = false;
        }
        return this;
    }
    else(code) {
        if (this.state.isIfSuccess === false) {
            this.generator.write(code);
            this.state.isIfSuccess = null;
        }
        return this;
    }
    _block(config, body) {
        this.generator.write(config.block.prefix);
        if (!config.isInline) {
            this.generator.nextLine();
            this.generator.indent();
        }
        if (config.block.beforeBlock) {
            config.block.beforeBlock(this.generator);
        }
        const previousState = this.state;
        this.state = this.createBlockState(config.block);
        body();
        this.state = previousState;
        if (config.block.afterBlock) {
            config.block.afterBlock(this.generator);
        }
        if (!config.isInline) {
            this.generator.dedent();
            this.generator.nextLine();
        }
        this.generator.write(config.block.suffix);
        return this;
    }
    b(prefix, body) {
        if (!(prefix in this.generator.config.blocks)) {
            throw Error(`can't find prefix: ${prefix} in block configuration`);
        }
        this._block({ isInline: false, block: this.generator.config.blocks[prefix] }, body);
        return this;
    }
    ib(prefix, body) {
        if (!(prefix in this.generator.config.blocks)) {
            throw Error(`can't find prefix: ${prefix} in block configuration`);
        }
        this._block({ isInline: true, block: this.generator.config.blocks[prefix] }, body);
        return this;
    }
    body(body) {
        if (!("" in this.generator.config.blocks)) {
            throw Error(`can't find default prefix in block configuration`);
        }
        this._block({ isInline: false, block: this.generator.config.blocks[""] }, body);
        return this;
    }
    ibody(body) {
        if (!("" in this.generator.config.blocks)) {
            throw Error(`can't find default prefix in block configuration`);
        }
        this._block({ isInline: true, block: this.generator.config.blocks[""] }, body);
        return this;
    }
}
exports.BaseBuilder = BaseBuilder;
//# sourceMappingURL=Builder.js.map