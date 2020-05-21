export default date_php;

declare function date_php(tplChars: string, timeObj: string | number | object, ms?: boolean): string;

declare namespace date_php {
    const version: string;
    function description(): any;

    function countTime(tplChars?: string, timestamp1?: number, timestamp2?: number, ms?: boolean): string;

    function duration(tplChars?: string, timestamp?: number, ms?: boolean): string;
}

