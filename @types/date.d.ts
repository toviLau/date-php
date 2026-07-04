type DateTimeInput = string | number | Date;
type AllFormatResult = Record<string, string>;

/**
 * 格式化日期时间，类似 PHP 的 date() 函数
 * @param tplChars - 格式化模板，默认 'Y-m-d'；传入 'all' 返回所有模板字符值
 * @param dateTime - 日期时间对象，可以是 Date、时间戳或日期字符串，默认 new Date()
 * @param isMs - 时间戳是否为毫秒，默认 true
 * @returns 格式化后的日期字符串，或当 tplChars 为 'all' 时返回完整配置对象
 */
declare function date_php(tplChars?: string, dateTime?: DateTimeInput, isMs?: boolean): string | AllFormatResult;

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
    function duration(tplChars?: string, duration?: number, isMs?: boolean): string | AllFormatResult;
}

export default date_php;
