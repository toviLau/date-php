type DateTimeInput = string | number | Date;
type AllFormatResult = Record<string, string>;

interface RowUnitConf {
    threshold: number;
    Year: string;
    Month: string;
    Week: string;
    Day: string;
    Hour: string;
    Minute: string;
    Second: string;
    justNow: string;
    before: string;
    after: string;
}

interface DurationFormatResult {
    y: string;
    Y: number;
    m: string;
    n: number;
    M: number;
    d: string;
    j: number;
    D: number;
    h: string;
    g: number;
    H: number;
    i: string;
    I: number;
    s: string;
    S: number;
    v: string;
    V: number;
}

/**
 * 格式化日期时间，类似 PHP 的 date() 函数
 * @param tplChars - 格式化模板，默认 'Y-m-d'；传入 'all' 返回所有模板字符值
 * @param dateTime - 日期时间对象，可以是 Date、时间戳或日期字符串，默认 new Date()
 * @param isMs - 时间戳是否为毫秒，默认 true
 * @returns 格式化后的日期字符串，或当 tplChars 为 'all' 时返回完整配置对象
 */
declare function date_php(tplChars?: string, dateTime?: DateTimeInput, isMs?: boolean): string | AllFormatResult;

type TimeUnit = "year" | "month" | "week" | "day" | "hour" | "minute" | "second" | "millisecond";

interface AddObject {
    year?: number;
    month?: number;
    week?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
}

declare class DateChain {
    constructor(dateTime?: DateTimeInput);
    add(obj: AddObject): this;
    add(num: number, unit: TimeUnit): this;
    add(unit: TimeUnit): this;
    sub(num: number, unit: TimeUnit): this;
    prev(num: number, unit: TimeUnit): this;
    next(num: number, unit: TimeUnit): this;
    startOfDay(): this;
    endOfDay(): this;
    startOfWeek(): this;
    endOfWeek(): this;
    startOfMonth(): this;
    endOfMonth(): this;
    startOfYear(): this;
    endOfYear(): this;
    isBefore(dateTime: DateTimeInput): boolean;
    isAfter(dateTime: DateTimeInput): boolean;
    isSame(dateTime: DateTimeInput, unit?: TimeUnit | "millisecond"): boolean;
    isSameMonth(dateTime: DateTimeInput): boolean;
    isSameYear(dateTime: DateTimeInput): boolean;
    format(tplChars?: string): string;
    toDate(): Date;
    valueOf(): number;
    toString(): string;
}

declare namespace date_php {
    /**
     * 当前库版本号
     */
    const version: `${number}.${number}.${number}`;

    /**
     * 在控制台输出所有模板字符说明（已废弃）
     * @deprecated 自 1.3.2 版本起已移除
     */
    function description(): void;

    /**
     * @deprecated 自 v1.5.0 起已废弃，请使用 `duration` 替代。将在 v2.0 中移除。
     */
    function countTime(tplChars?: string, startDatetime?: number, endDatetime?: number, isMs?: boolean): string;

    /**
     * 格式化持续时间/倒计时
     * @param tplChars - 格式化模板，默认 'D天h:i:s'；传入 'all' 返回所有模板字符值
     * @param duration - 持续时间（毫秒或秒），默认 0
     * @param isMs - 是否毫秒，默认 true
     * @returns 格式化后的持续时间字符串，或当 tplChars 为 'all' 时返回完整配置对象
     */
    function duration(tplChars?: string, duration?: number, isMs?: boolean): string | DurationFormatResult;

    /**
     * 创建链式调用对象
     * @param dateTime - 日期时间，默认当前时间
     * @returns DateChain 实例，支持 add/sub/format 链式调用
     */
    function chain(dateTime?: DateTimeInput): DateChain;
}

export default date_php;
