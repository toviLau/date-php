/*
 * @Author       : ToviLau 46134256@qq.com
 * @Date         : 2026-07-09 07:45:41
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-10 01:11:45
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

interface DateFunction {
  (options?: iDateOptions): string;
  (template?: string, dateTime?: tDateTime, isMs?: boolean): string | Record<string, any>;
  _plugins: DatePlugin[];
  use: (plugin: DatePlugin | DatePlugin[]) => DateFunction;
  timeZone: string;
  rowUnitConf: Record<string, any>;
  replaceHolidayConf?: Record<string, any>;
  editHolidayConf?: Record<string, any>;
  version: string;
  duration: any;
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

export type { tDateTime, iDateOptions, TChars, DateFunction, PluginContext, DatePlugin };
