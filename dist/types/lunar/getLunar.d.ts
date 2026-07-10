interface LunarInfo {
    lYear: number;
    lMonth: number;
    lDay: number;
    IMonthCn: string;
    IDayCn: string;
    cYear: number;
    cMonth: number;
    cDay: number;
    isToday: boolean;
    isLeap: boolean;
    nWeek: number;
    ncWeek: string;
    offset: number;
    lcDay?: string;
    lcMonth?: string;
}
declare const calendar: {
    lunarInfo: number[];
    solarMonth: number[];
    nStr1: string[];
    nStr2: string[];
    nStr3: string[];
    lYearDays(Year: number): number;
    leapMonth(Year: number): number;
    leapDays(Year: number): number;
    monthDays(y: number, m: number): number;
    solarDays(y: number, m: number): number;
    toChinaMonth(month: number): string | number;
    toChinaDay(day: number): string;
    solar2lunar(y: number, m: number, d: number): LunarInfo | number;
    lunar2solar(y: number, m: number, d: number, isLeapMonth?: boolean): LunarInfo | number;
};
export default calendar;
export type { LunarInfo };
