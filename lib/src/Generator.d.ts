export declare class Generator {
    config: GeneratorConfig;
    indentLiteral: string;
    indentDepth: number;
    constructor(config: GeneratorConfig);
    currentLine: string[];
    lines: string[];
    write(text: string): void;
    nextLine(): void;
    indent(): void;
    dedent(): void;
    toString(): string;
    private _buildIndentLiteral;
}
export declare type BlockHook = (generator: Generator) => void;
export interface GeneratorConfig {
    indent: string;
    blocks: {
        [key: string]: BlockConfig;
    };
    newLine?: string;
    baseIndent?: string;
    initialIndent?: string;
}
export interface BlockConfig {
    prefix: string;
    suffix: string;
    seperator?: string;
    beforeBlock?: BlockHook;
    afterBlock?: BlockHook;
}
export interface RuntimeBlockConfig {
    block: BlockConfig;
    isInline: boolean;
}
