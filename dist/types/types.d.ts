interface TChars {
    [key: string]: () => any;
}
interface DateFunction {
    (fmt?: string, now?: Date | string | number, ms?: boolean): string | Record<string, any>;
    _plugins: DatePlugin[];
    use: (plugin: DatePlugin | DatePlugin[]) => DateFunction;
    timeZone: string;
    rowUnitConf: Record<string, any>;
    replaceHolidayConf?: Record<string, any>;
    editHolidayConf?: Record<string, any>;
    version: string;
    duration: any;
    countTime: any;
}
interface PluginContext {
    now: Date;
    tChars: TChars;
    date: DateFunction;
    pad: (str: string | number, len: number, placeholder?: string) => string;
    _now: Date;
    ms: boolean;
}
interface DatePlugin {
    name: string;
    install: (tChars: TChars, ctx: PluginContext) => void;
}
declare global {
    interface Date {
        format(fmt?: string, ms?: boolean): string | Record<string, any>;
    }
}
export type { TChars, DateFunction, PluginContext, DatePlugin };
