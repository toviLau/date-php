export = date_php;

declare function date_php(fmt: string, now: any, ms: boolean): string;

declare namespace date_php {
    const version: string;
    function description(): any;

    function countTime(fmt: string, timestamp1: number, timestamp2: number, ms: boolean): string;

    function duration(fmt: string, timestamp: number, ms: boolean): string;
}

