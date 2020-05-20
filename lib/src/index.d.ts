import { BuilderInterface, PotentialPromise } from "./Builder";
import { GeneratorConfig } from "./Generator";
export declare const generatorConfigs: {
    [key: string]: GeneratorConfig;
};
export declare function registerDeaultConfig(name: string): void;
export declare function generate(config: GeneratorConfig, codes: (builder: BuilderInterface, context: BuilderInterface) => PotentialPromise<void>): PotentialPromise<string>;
