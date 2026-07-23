/**
 * date-php.js v__VERSION__
 */
import {
    pad,
    longDays,
    txt_ordin,
    txt_months,
    ordinal,
    defP,
    textReplace,
    textReplace2,
    weekDay,
    typeOf,
} from "../utils";
import { TIMEZONE_MAP, getOffsetInfo } from "../timezone";
import { duration } from "../duration";
import type { DatePlugin, TChars, PluginContext, DateFunction, iDateOptions } from "../types";
import DateChain from "./dateChain";

const isDate = (d: unknown): boolean => {
    if (d === null || d === undefined) return false;
    // if (d instanceof Date) return !isNaN(d.getTime());
    return new Date(d as string | number).toString() !== "Invalid Date";
};

const getLang = (): string => {
    if (typeof navigator !== "undefined" && navigator.language) return navigator.language;
    const g = globalThis as Record<string, unknown>;
    if (typeof g.process !== "undefined" && g.process && typeof g.process === "object") {
        const env = (g.process as Record<string, Record<string, string>>).env;
        const locale = env?.LANG || env?.LC_ALL;
        if (locale) return locale.split(".")[0].replace("_", "-");
    }
    return "zh-CN";
};

const lang: string = getLang();

const log = (msg: string, type: "warn" | "error" | "info" | "log" = "warn", color?: string): void =>
    typeof console === "undefined"
        ? undefined
        : color
          ? console[type]("%c[date-php] " + msg, color)
          : console[type]("[date-php] " + msg);

function getTimezone() {
    if (typeof Intl !== "undefined" && Intl.DateTimeFormat) {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    // 回退方案:通过偏移量推断
    const offset = -new Date().getTimezoneOffset() / 60;
    const sign = offset >= 0 ? "+" : "-";
    const absOffset = Math.abs(offset);

    return TIMEZONE_MAP[`GMT${sign}${absOffset}`] || `Etc/GMT${sign}${absOffset}`;
}
const date = function (
    this: Date | string | number,
    templateOrOptions?: string | iDateOptions,
    dateTime: Date | string | number = new Date(),
    isMs: boolean = true,
): string | Record<string, any> {
    let template: string = "Y-m-d";
    if (templateOrOptions !== undefined && typeof templateOrOptions === "object") {
        template = templateOrOptions.template ?? "Y-m-d";
        dateTime = templateOrOptions.dateTime ?? new Date();
        isMs = templateOrOptions.isMs ?? true;
    } else {
        template = (templateOrOptions as string) ?? "Y-m-d";
    }
    if (typeof template !== "string") {
        log("参数1必须为字符串类型/Param 1 must be string.");
        template = "Y-m-d H:i:s";
    }

    const currentTimeZone: string = TIMEZONE_MAP[date.timeZone] || date.timeZone || getTimezone();

    if (!isDate(dateTime)) {
        let receivedType = typeOf(dateTime);
        dateTime = new Date();

        log(
            ((D: Date, type: string) =>
                "" +
                "参数2有误请传入/Invalid parameter 2.\n" +
                "预期类型/Expected: Date | string | number (timestamp)\n" +
                `接到类型/Received: ${type}\n` +
                "参考值/Examples:\n" +
                `  1. "${D}"\n` +
                `  2. "${D.toUTCString()}"\n` +
                `  3. "${date("Y-m-d H:i", Date.now())}"\n` +
                `  3. "${date("Y-m-d", Date.now())}"\n` +
                `  4. "new Date()"\n` +
                `  5. ${D.getTime()}\n`)(new Date(), receivedType),
        );
    }
    if ([false, 0].includes(isMs) && typeof dateTime === "number") dateTime = dateTime * 1000;
    const _now = isDate(this) ? (this as Date) : isDate(dateTime) ? new Date(dateTime) : new Date();
    dateTime = new Date(
        new Date(_now).toLocaleString(lang, {
            timeZone: TIMEZONE_MAP[date.timeZone] || date.timeZone,
        }),
    );

    const _nowDate = dateTime as Date;
    const _year = _nowDate.getFullYear();
    const _month = _nowDate.getMonth() + 1;
    const _yearStart = new Date(_year, 0, 1);
    const _janOffset = getOffsetInfo(new Date(_year, 0, 1), currentTimeZone);
    const _julOffset = getOffsetInfo(new Date(_year, 6, 1), currentTimeZone);

    const tChars: TChars = {
        d: () => pad(tChars.j(), 2),
        k: () => textReplace(tChars.j()),
        D: () => tChars.l().slice(0, 3),
        j: () => (dateTime as Date).getDate(),
        l: () => longDays[tChars.w()],
        N: () => (tChars.w() === 0 ? 7 : tChars.w()),
        S: () => (txt_ordin[tChars.j()] ? txt_ordin[tChars.j()] : "th"),
        w: () => (dateTime as Date).getDay(),
        K: () => weekDay[tChars.w()],
        z: () => Math.ceil((_nowDate.getTime() - _yearStart.getTime()) / (60 * 60 * 24 * 1e3)),

        W: () => {
            const d = new Date(_nowDate);
            d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
            const jan4 = new Date(d.getFullYear(), 0, 4);
            return 1 + Math.round(((d.getTime() - jan4.getTime()) / 864e5 - 3 + ((jan4.getDay() + 6) % 7)) / 7);
        },

        F: () => txt_months[tChars.n()],
        f: () => textReplace(tChars.n()),
        M: () => tChars.F().slice(0, 3),
        m: () => pad(tChars.n(), 2),
        n: () => _month,
        t: () => {
            const date = new Date(_year, _month, 0);
            return date.getDate();
        },
        L: () => Number(tChars.Y() % 400 === 0 || (tChars.Y() % 100 !== 0 && tChars.Y() % 4 === 0)),
        o: () => {
            const d = new Date(_nowDate);
            d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
            return d.getFullYear();
        },
        Y: () => _year,
        y: () => (tChars.Y() + "").slice(2),
        C: () => textReplace2(tChars.Y()),

        a: () => (tChars.G() > 11 ? "pm" : "am"),
        A: () => tChars.a().toUpperCase(),
        B: () => {
            const SECONDS_PER_BEAT = 86.4;
            const BEATS_PER_DAY = 1000;
            const bmtOffsetMinutes = (dateTime as Date).getTimezoneOffset() + 60;
            const totalSeconds =
                tChars.G() * 3600 +
                (dateTime as Date).getMinutes() * 60 +
                (dateTime as Date).getSeconds() +
                bmtOffsetMinutes * 60;
            let beat = Math.floor(totalSeconds / SECONDS_PER_BEAT);
            beat = ((beat % BEATS_PER_DAY) + BEATS_PER_DAY) % BEATS_PER_DAY;
            return pad(beat, 3);
        },
        g: () => tChars.G() % 12 || 12,
        G: () => (dateTime as Date).getHours(),
        h: () => pad(tChars.g(), 2),
        H: () => pad(tChars.G(), 2),
        i: () => pad((dateTime as Date).getMinutes(), 2),
        s: () => pad((dateTime as Date).getSeconds(), 2),
        u: () =>
            tChars.v() * 1e3 + ~~(((typeof performance !== "undefined" ? performance.now() : Date.now()) % 1) * 1e3),
        v: () => Number((_now.getTime() + "").slice(-3)) - 0,

        e: () => TIMEZONE_MAP[date.timeZone] || date.timeZone || getTimezone(),
        O: () => getOffsetInfo(dateTime as Date, currentTimeZone).O,
        P: () => getOffsetInfo(dateTime as Date, currentTimeZone).P,
        I: () => {
            if (_janOffset.O !== _julOffset.O) {
                const infoNow = getOffsetInfo(_nowDate, currentTimeZone);
                return infoNow.O === _julOffset.O ? 1 : 0;
            }
            return 0;
        },
        T: () => {
            const parts = new Intl.DateTimeFormat(lang, {
                timeZoneName: "short",
                timeZone: TIMEZONE_MAP[date.timeZone] || date.timeZone,
            })
                .formatToParts(dateTime as Date)
                .find((part) => part.type === "timeZoneName");
            return parts ? parts.value : "";
        },
        Z: () => {
            const info = getOffsetInfo(dateTime as Date, currentTimeZone);
            const totalMinutes = info.hours * 60 + info.minutes;
            return (info.sign === "+" ? 1 : -1) * totalMinutes * 60;
        },

        c: () =>
            tChars.Y() +
            "-" +
            tChars.m() +
            "-" +
            tChars.d() +
            "T" +
            tChars.h() +
            ":" +
            tChars.i() +
            ":" +
            tChars.s() +
            "." +
            tChars.v() +
            tChars.P(),
        r: () => (dateTime as Date).toString(),
        U: () => Math.round((dateTime as Date).getTime() / 1e3),
        R: () => {
            const nowTs = Date.now();
            const baseTs = tChars.U() * 1e3;
            const diff = isMs ? nowTs - baseTs : ~~((nowTs - baseTs) / 1e3);
            const absDiff = Math.abs(diff);
            const intervals: Record<string, number> = {
                [date.rowUnitConf.Year]: 31536e6,
                [date.rowUnitConf.Month]: 2592e6,
                [date.rowUnitConf.Week]: 6048e5,
                [date.rowUnitConf.Day]: 864e5,
                [date.rowUnitConf.Hour]: 36e5,
                [date.rowUnitConf.Minute]: 6e4,
                [date.rowUnitConf.Second]: 1e3,
            };

            if (diff > 0 && absDiff <= (isMs ? date.rowUnitConf.threshold : date.rowUnitConf.threshold / 1e3))
                return date.rowUnitConf.justNow;

            const suffix = diff > 0 ? date.rowUnitConf.before : date.rowUnitConf.after;

            for (const unit in intervals) {
                const _ms = isMs ? intervals[unit] : ~~(intervals[unit] / 1e3);
                if (absDiff >= _ms) {
                    return Math.floor(absDiff / _ms) + unit + suffix;
                }
            }
            return "";
        },
    };

    const ctx: PluginContext = { dateTime: dateTime as Date, tChars, date, pad, _now, isMs };

    date._plugins.forEach((plugin) => {
        plugin.install(tChars, ctx);
    });

    if (template === "json" || template === "all" || template === "-1") {
        const json: Record<string, any> = {};
        Object.keys(tChars).forEach((res) => (json[res] = tChars[res]()));
        return json;
    }
    return template.replace(/\\?(([lf][a-z])|([a-z]))/gi, (res, key) =>
        res !== key ? key : tChars[key] ? String(tChars[key]()) : key.replace("\\", ""),
    );
} as DateFunction;

date._plugins = [];

date.use = (plugin: DatePlugin | DatePlugin[]): DateFunction => {
    if (Array.isArray(plugin)) {
        plugin.forEach((p) => {
            date._plugins.push(p);
        });
    } else {
        date._plugins.push(plugin);
    }
    return date;
};

date.timeZone = getTimezone();

date.rowUnitConf = Object.assign(
    {
        threshold: 3e4,
        Year: "\u5e74",
        Month: "\u6708",
        Week: "\u5468",
        Day: "\u5929",
        Hour: "\u5c0f\u65f6",
        Minute: "\u5206\u949f",
        Second: "\u79d2",
        justNow: "\u521a\u521a",
        before: "\u524d",
        after: "\u540e",
    },
    date.rowUnitConf || {},
);
defP(Date.prototype, "format", date);

defP(date, "version", "__VERSION__");
defP(date, "description", () =>
    log(
        "\u6b64 API \u5df2\u7ecf\u5e9f\u5f03\uff0c\u67e5\u770b\u4f7f\u7528\u8bf4\u660e\u8bf7\u79fb\u6b65\u8fd9\u91cc\nhttps://github.com/toviLau/date-php/blob/master/README.md",
        "warn",
        "color:#c30",
    ),
);

const _apiMap: Record<string, any> = { duration };
Object.keys(_apiMap).forEach((res) => {
    defP(date, res, _apiMap[res]);
});

DateChain._dateFn = date;
date.chain = (dateTime?: Date | string | number): DateChain => new DateChain(dateTime);

export default date;
