"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
class Generator {
    // currentBlock:RuntimeBlockConfig = null
    constructor(config) {
        this.config = config;
        this.indentLiteral = "";
        this.indentDepth = 0;
        this.currentLine = [];
        this.lines = [];
    }
    write(text) {
        this.currentLine.push(text);
    }
    nextLine() {
        this.lines.push(this.currentLine.join(""));
        this.currentLine = [this.indentLiteral];
    }
    indent() {
        this.write(this.config.indent);
        this.indentDepth++;
        this.indentLiteral = this._buildIndentLiteral();
    }
    dedent() {
        if (this.indentDepth == 0) {
            return;
        }
        this.indentDepth--;
        this.indentLiteral = this._buildIndentLiteral();
    }
    toString() {
        if (this.currentLine.length) {
            this.lines.push(this.currentLine.join(""));
        }
        return this.config.initialIndent + this.lines.join(this.config.baseIndent + this.config.newLine);
    }
    _buildIndentLiteral() {
        const indents = [];
        for (let i = 0; i < this.indentDepth; i++) {
            indents.push(this.config.indent);
        }
        return indents.join("");
    }
}
exports.Generator = Generator;
//# sourceMappingURL=Generator.js.map