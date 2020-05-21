export default date_php;

declare function date_php(tplChars: string, dateTime: string | number | object, isMs?: boolean): string;

declare namespace date_php {

    const version: string;
    function description(): any;

    function countTime(tplChars?: string, startDatetime?: number, endDatetime?: number, isMs?: boolean): string;

    function duration(tplChars?: string, duration?: number, isMs?: boolean): string;
}
