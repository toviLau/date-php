/*
 * @Author       : ToviLau 46134256@qq.com
 * @Date         : 2026-07-09 07:45:41
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-19 04:24:22
 */
type tDateTime = Date | string | number;

interface iDateOptions {
  template?: string;
  dateTime?: tDateTime;
  isMs?: boolean;
}

interface TChars {
  [key: string]: () => any;
}

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

interface DateFunction {
  (options?: iDateOptions): string;
  (template?: string, dateTime?: tDateTime, isMs?: boolean): string | Record<string, any>;
  _plugins: DatePlugin[];
  use: (plugin: DatePlugin | DatePlugin[]) => DateFunction;
  timeZone: string;
  rowUnitConf: RowUnitConf;
  replaceHolidayConf?: Record<string, any>;
  editHolidayConf?: Record<string, any>;
  version: string;
  duration: any;
  chain: (dateTime?: tDateTime) => import("./core/dateChain").default;
}

interface PluginContext {
  dateTime: Date;
  tChars: TChars;
  date: DateFunction;
  pad: (str: string | number, len: number, placeholder?: string) => string;
  _now: Date;
  isMs: boolean;
}

interface DatePlugin {
  name: string;
  install: (tChars: TChars, ctx: PluginContext) => void;
}

declare global {
  interface Date {
    format(options?: iDateOptions): string;
    format(template?: string, dateTime?: tDateTime, isMs?: boolean): string | Record<string, any>;
  }
}

export type { tDateTime, iDateOptions, TChars, DateFunction, PluginContext, DatePlugin, TimeUnit, AddObject, RowUnitConf, DurationFormatResult };
