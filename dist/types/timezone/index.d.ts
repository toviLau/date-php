declare const TIMEZONE_MAP: Record<string, string>;
interface OffsetInfo {
    sign: string;
    hours: number;
    minutes: number;
    offsetStr: string;
    O: string;
    P: string;
}
declare const getOffsetInfo: (d: Date, tz: string) => OffsetInfo;
export { TIMEZONE_MAP, getOffsetInfo };
export type { OffsetInfo };
