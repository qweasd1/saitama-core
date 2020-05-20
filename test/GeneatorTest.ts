import {Generator} from "../src/Generator";

it('free test', function () {
  const generator = new Generator({
    indent:"  ",
    newLine:"\n",
    blocks:{

    }
  })

  generator.write("function some() {")
  generator.nextLine()
  generator.indent()
  generator.write("return 1")
  generator.dedent()
  generator.nextLine()
  generator.write("}")
  console.log(generator.toString());
});
