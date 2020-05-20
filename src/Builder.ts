import {BlockConfig, Generator, GeneratorConfig, RuntimeBlockConfig} from "./Generator";

export type BodyFunction = () => (void | Promise<void>)
export type PotentialPromise<T> = ( Promise<T> | T)

export interface BuilderInterface {
  line(text?: string): BaseBuilder

  expr(text?: string): BaseBuilder

  newline(n?: number):BaseBuilder

  generator: Generator
}


export class BuilderController implements BuilderInterface{
  public generator: Generator;
  private baseBuilder: BaseBuilder;

  constructor(private config:GeneratorConfig) {
    this.generator = new Generator(config)
    this.baseBuilder = new BaseBuilder(this.generator)
  }


  expr = (text?: string): BaseBuilder => {
    if(!text){
      return this.baseBuilder
    }
    if(this.baseBuilder.state.isFirst){
      this.baseBuilder.state.isFirst = false
    }
    else {
      if(this.baseBuilder.state.block && this.baseBuilder.state.block.seperator){
        this.generator.write(this.baseBuilder.state.block.seperator)
      }
    }

    if(this.baseBuilder.state.isLine){
      this.generator.nextLine()
    }
    this.baseBuilder.state.isLine = false
    this.baseBuilder.append(text)


    return this.baseBuilder
  }

  line = (text?: string): BaseBuilder => {
    if(!text){
      return this.baseBuilder
    }
    if(this.baseBuilder.state.isFirst){
      this.baseBuilder.state.isFirst = false
    }
    else {
      if(this.baseBuilder.state.block && this.baseBuilder.state.block.seperator){
        this.generator.write(this.baseBuilder.state.block.seperator)
      }
    }

    if(this.baseBuilder.state.isLine){
      this.generator.nextLine()
    }
    this.baseBuilder.state.isLine = true
    this.baseBuilder.append(text)

    return this.baseBuilder
  }

  newline = (n: number = 1): BaseBuilder=> {
    if(this.baseBuilder.state.isLine){
      this.generator.nextLine()
    }

    for (let i = 0; i < n; i++) {
      this.generator.nextLine()
    }
    this.baseBuilder.state.isLine = false

    return this.baseBuilder
  }

}

export class BaseBuilder {
  // private isIfSuccess: boolean = null
  // public isLine:boolean = false
  public state:BaseBuilderState

  private createBlockState(block:BlockConfig){
    return {
      block:block,
      isFirst:true,
      isIfSuccess:null,
      isLine:false
    }
  }

  constructor(private generator: Generator) {
   this.state = this.createBlockState(null)
  }

  public append(code: string): BaseBuilder {
    this.generator.write(code)
    return this
  }

  public when(condition: boolean, code: string): BaseBuilder {
    this.state.isIfSuccess = null
    if (condition) {
      this.state.isIfSuccess = true
      this.generator.write(code)
    } else {
      this.state.isIfSuccess = false
    }
    return this
  }

  public else(code: string):BaseBuilder {
    if (this.state.isIfSuccess === false) {
      this.generator.write(code)
      this.state.isIfSuccess = null
    }
    return this
  }

  private  _block(config: RuntimeBlockConfig, body: BodyFunction): BaseBuilder {
    this.generator.write(config.block.prefix)
    if(!config.isInline){
      this.generator.nextLine()
      this.generator.indent()
    }
    if(config.block.beforeBlock){
      config.block.beforeBlock(this.generator)
    }
    const previousState = this.state
    this.state = this.createBlockState(config.block)
    body()
    this.state = previousState
    if(config.block.afterBlock){
      config.block.afterBlock(this.generator)
    }
    if(!config.isInline){
      this.generator.dedent()
      this.generator.nextLine()
    }
    this.generator.write(config.block.suffix)
    return this
  }

  b(prefix: string, body: BodyFunction): BaseBuilder {
    if(!(prefix in this.generator.config.blocks)){
      throw Error(`can't find prefix: ${prefix} in block configuration`)
    }
    this._block({isInline:false,block:this.generator.config.blocks[prefix]},body)
    return this
  }

  ib(prefix: string, body: BodyFunction):BaseBuilder {
    if(!(prefix in this.generator.config.blocks)){
      throw Error(`can't find prefix: ${prefix} in block configuration`)
    }
    this._block({isInline:true,block:this.generator.config.blocks[prefix]},body)
    return this
  }

  body(body: BodyFunction):BaseBuilder {
    if(!("" in this.generator.config.blocks)){
      throw Error(`can't find default prefix in block configuration`)
    }
    this._block({isInline:false,block:this.generator.config.blocks[""]},body)
    return this
  }

  ibody(body: BodyFunction):BaseBuilder {
    if(!("" in this.generator.config.blocks)){
      throw Error(`can't find default prefix in block configuration`)
    }
    this._block({isInline:true,block:this.generator.config.blocks[""]},body)
    return this
  }

}


interface BaseBuilderState {
  block:BlockConfig,
  isFirst:boolean
  isIfSuccess:boolean
  isLine:boolean
}




