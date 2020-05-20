
export class Generator {
  indentLiteral:string = ""
  indentDepth:number = 0

  // currentBlock:RuntimeBlockConfig = null

  constructor(public config:GeneratorConfig) {

  }

  currentLine:string[] = []
  lines:string[] = []

  write(text:string){
    this.currentLine.push(text)
  }

  nextLine() {
    this.lines.push(this.currentLine.join(""))
    this.currentLine = [this.indentLiteral]
  }

  indent(){
    this.write(this.config.indent)
    this.indentDepth++
    this.indentLiteral = this._buildIndentLiteral()

  }

  dedent(){
    if(this.indentDepth == 0){
      return
    }
    this.indentDepth--
    this.indentLiteral = this._buildIndentLiteral()
  }

  toString(){
    if(this.currentLine.length){
      this.lines.push(this.currentLine.join(""))
    }

    return this.config.initialIndent + this.lines.join(this.config.baseIndent + this.config.newLine)
  }

  private _buildIndentLiteral(){
    const indents = []
    for (let i = 0; i < this.indentDepth; i++) {
      indents.push(this.config.indent)
    }
    return indents.join("")
  }
}

export type BlockHook = (generator:Generator)=>void

export interface GeneratorConfig {
  indent:string
  blocks:{
    [key:string]:BlockConfig
  }
  newLine?:string,
  baseIndent?:string,
  initialIndent?:string
}

export interface BlockConfig {
  prefix:string
  suffix:string
  seperator?:string
  beforeBlock?:BlockHook
  afterBlock?:BlockHook
}

export interface RuntimeBlockConfig{
  block:BlockConfig
  isInline:boolean
}
