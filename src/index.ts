import {BuilderInterface, BuilderController, PotentialPromise} from "./Builder";

import {GeneratorConfig} from "./Generator";
import {EOL} from 'os';



let defaultConfig:GeneratorConfig = null

export const generatorConfigs:{[key:string]:GeneratorConfig} = {}


function resolveConfig(config:string|GeneratorConfig){
  if(config){
    if(typeof config === "string"){
      return generatorConfigs[config]
    }
    else {
      return config
    }
  }
}


export function registerDeaultConfig(name:string) {
  defaultConfig = generatorConfigs[name]
}



export function generate(config:GeneratorConfig, codes:(builder:BuilderInterface,context:BuilderInterface)=>PotentialPromise<void>):PotentialPromise<string>{
  if(!config.newLine){
    config.newLine = EOL
  }

  if(!config.initialIndent){
    config.initialIndent = ""
  }

  if(!config.baseIndent){
    config.baseIndent = ""
  }
  const builderController = new BuilderController(config)
  const result = codes(builderController,builderController)
  if(result){
    return result["then"](()=>{return builderController.generator.toString()})
  }
  else {
    return builderController.generator.toString()
  }
}




