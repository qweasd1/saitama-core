import {GeneratorConfig} from "../src/Generator";
import {generate} from "../src";
import exp = require("constants");

const ts:GeneratorConfig = {
  newLine:"\n",
  indent:"  ",
  blocks:{
    "":{
      prefix:"{",
      suffix:"}"
    },
    "(":{
      prefix:"(",
      suffix:")",
      seperator:", "
    },
    "{":{
      prefix:"{",
      suffix:"}",
      seperator:", "
    },
    "[":{
      prefix:"[",
      suffix:"]",
      seperator:", "
    }
  }
}

const py:GeneratorConfig = {
  indent:"  ",
  blocks:{
    "":{
      prefix:":",
      suffix:""
    },
    "(":{
      prefix:"(",
      suffix:")",
      seperator:", "
    },
    "{":{
      prefix:"{",
      suffix:"}",
      seperator:", "
    },
    "[":{
      prefix:"[",
      suffix:"]",
      seperator:", "
    }
  }
}

it('try python', function () {
  const code = generate(py,({line,newline,expr},context)=>{
    line("import some.module")
    line("import some.module")
    newline()
    expr("def test").ib("(",()=>{
      expr("p1")
      expr("p2")
      expr("p3")
    }).body(()=>{


      line("let t = ").ib("[",()=>{
        if(false){
          expr("test1")
        }
        // expr().when(false,"tes1")
        expr("test2")
        expr("test3")
      }).append(".map(x=>x+1)")
      line("return 4")
    })

    line("def another_function()").body(()=>{
      line("return 1")
    })

    line("class ")
  })

  console.log(code);
});


it('try typescript', function () {
  const code = generate(ts,({line,newline,expr},context)=>{
    line("function test").b("(",()=>{
      line("p1")
      line("p2")
      line("p3")
    }).body(()=>{
      line("return 1")
      line("return 2")
      line("return 3")
      line("return 4")
      line("let t = ").ib("[",()=>{
        if(false){
          expr("test1")
        }
        // expr().when(false,"tes1")
        expr("test2")
        expr("test3")
      }).append(".map(x=>x+1)")
    })
  })

  console.log(code);
});
