"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator_1 = require("../src/Generator");
it('free test', function () {
    const generator = new Generator_1.Generator({
        indent: "  ",
        newLine: "\n",
        blocks: {}
    });
    generator.write("function some() {");
    generator.nextLine();
    generator.indent();
    generator.write("return 1");
    generator.dedent();
    generator.nextLine();
    generator.write("}");
    console.log(generator.toString());
});
//# sourceMappingURL=GeneatorTest.js.map