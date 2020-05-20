import { BlockConfig, Generator, GeneratorConfig } from "./Generator";
export declare type BodyFunction = () => (void | Promise<void>);
export declare type PotentialPromise<T> = (Promise<T> | T);
export interface BuilderInterface {
    line(text?: string): BaseBuilder;
    expr(text?: string): BaseBuilder;
    newline(n?: number): BaseBuilder;
    generator: Generator;
}
export declare class BuilderController implements BuilderInterface {
    private config;
    generator: Generator;
    private baseBuilder;
    constructor(config: GeneratorConfig);
    expr: (text?: string) => BaseBuilder;
    line: (text?: string) => BaseBuilder;
    newline: (n?: number) => BaseBuilder;
}
export declare class BaseBuilder {
    private generator;
    state: BaseBuilderState;
    private createBlockState;
    constructor(generator: Generator);
    append(code: string): BaseBuilder;
    when(condition: boolean, code: string): BaseBuilder;
    else(code: string): BaseBuilder;
    private _block;
    b(prefix: string, body: BodyFunction): BaseBuilder;
    ib(prefix: string, body: BodyFunction): BaseBuilder;
    body(body: BodyFunction): BaseBuilder;
    ibody(body: BodyFunction): BaseBuilder;
}
interface BaseBuilderState {
    block: BlockConfig;
    isFirst: boolean;
    isIfSuccess: boolean;
    isLine: boolean;
}
export {};
