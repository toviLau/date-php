import type { tDateTime, TimeUnit, AddObject, DateFunction } from "../types";

const VALID_UNITS: TimeUnit[] = ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"];

const _throwError = (msg: string): never => {
    throw new Error("[date-php] " + msg);
};

const _hasUnit = (unit: string): unit is TimeUnit => VALID_UNITS.includes(unit as TimeUnit);

class DateChain {
    private _date: Date;

    constructor(dateTime?: tDateTime) {
        this._date = new Date(dateTime === undefined ? Date.now() : dateTime);
        const _dateString = this._date.toLocaleString();
        Object.defineProperty(this, "valueOf", {
            get: () => {
                return () => (_dateString === "Invalid Date" ? new Date() : this._date);
            },
            set: (val: Date) => new Date(val),
        });
    }

    add(num: AddObject): this;
    add(num: number, unit: TimeUnit): this;
    add(unit: TimeUnit): this;
    add(numOrObj: number | AddObject | TimeUnit, unit?: TimeUnit): this {
        if (numOrObj !== null && typeof numOrObj === "object") {
            Object.entries(numOrObj).forEach(([key, value]) => {
                if (_hasUnit(key)) this.add(value as number, key);
            });
            return this;
        }
        let num: number;
        let resolvedUnit: TimeUnit = unit!;
        if (typeof numOrObj === "string" && _hasUnit(numOrObj)) {
            resolvedUnit = numOrObj;
            num = 1;
        } else {
            num = numOrObj as number;
        }
        if (num === null || num === undefined || isNaN(num)) {
            _throwError("add 方法参数错误: num 必须是有效数字");
        }
        const d = this._date;
        const Y = d.getFullYear();
        const n = d.getMonth();
        const j = d.getDate();
        switch (resolvedUnit) {
            case "year": {
                const targetY = Y + num;
                const maxDay = new Date(targetY, n + 1, 0).getDate();
                d.setFullYear(targetY, n, Math.min(j, maxDay));
                break;
            }
            case "month": {
                const targetN = n + num;
                const maxDay = new Date(Y, targetN + 1, 0).getDate();
                d.setFullYear(Y, targetN, Math.min(j, maxDay));
                break;
            }
            case "week":
                d.setDate(j + num * 7);
                break;
            case "day":
                d.setDate(j + num);
                break;
            case "hour":
                d.setHours(d.getHours() + num);
                break;
            case "minute":
                d.setMinutes(d.getMinutes() + num);
                break;
            case "second":
                d.setSeconds(d.getSeconds() + num);
                break;
            case "millisecond":
                d.setMilliseconds(d.getMilliseconds() + num);
                break;
        }
        return this;
    }

    sub(num: number, unit: TimeUnit): this {
        return this.add(-num, unit);
    }

    prev(num: number, unit: TimeUnit): this {
        if (typeof num !== "number") _throwError("prev 方法参数 num 必须为数字");
        if (typeof unit === "string" && !_hasUnit(unit)) _throwError("prev 方法参数 unit 必须为有效的时间单位");
        return this.add(-Math.abs(num), unit);
    }

    next(num: number, unit: TimeUnit): this {
        if (typeof num !== "number") _throwError("next 方法参数 num 必须为数字");
        if (typeof unit === "string" && !_hasUnit(unit)) _throwError("next 方法参数 unit 必须为有效的时间单位");
        return this.add(Math.abs(num), unit);
    }

    startOfDay(): this {
        const d = this._date;
        d.setHours(0, 0, 0, 0);
        return this;
    }

    endOfDay(): this {
        const d = this._date;
        d.setHours(23, 59, 59, 999);
        return this;
    }

    startOfWeek(): this {
        const d = this._date;
        const day = d.getDay();
        d.setDate(d.getDate() - day);
        d.setHours(0, 0, 0, 0);
        return this;
    }

    endOfWeek(): this {
        const d = this._date;
        const day = d.getDay();
        d.setDate(d.getDate() + (6 - day));
        d.setHours(23, 59, 59, 999);
        return this;
    }

    startOfMonth(): this {
        const d = this._date;
        d.setDate(1);
        d.setHours(0, 0, 0, 0);
        return this;
    }

    endOfMonth(): this {
        const d = this._date;
        d.setMonth(d.getMonth() + 1, 0);
        d.setHours(23, 59, 59, 999);
        return this;
    }

    startOfYear(): this {
        const d = this._date;
        d.setMonth(0, 1);
        d.setHours(0, 0, 0, 0);
        return this;
    }

    endOfYear(): this {
        const d = this._date;
        d.setMonth(11, 31);
        d.setHours(23, 59, 59, 999);
        return this;
    }

    isBefore(dateTime: tDateTime): boolean {
        return this._date.getTime() < new Date(dateTime).getTime();
    }

    isAfter(dateTime: tDateTime): boolean {
        return this._date.getTime() > new Date(dateTime).getTime();
    }

    isSame(dateTime: tDateTime, unit: TimeUnit | "millisecond" = "day"): boolean {
        const date = (this.constructor as typeof DateChain)._dateFn;
        const a = date("all", this._date) as Record<string, any>;
        const b = date("all", new Date(dateTime)) as Record<string, any>;
        switch (unit) {
            case "year":
                return a.Y === b.Y;
            case "month":
                return a.Y === b.Y && a.n === b.n;
            case "week": {
                const aStart = new Date(this._date);
                aStart.setDate(aStart.getDate() - aStart.getDay());
                aStart.setHours(0, 0, 0, 0);
                const bStart = new Date(dateTime);
                bStart.setDate(bStart.getDate() - bStart.getDay());
                bStart.setHours(0, 0, 0, 0);
                return aStart.getTime() === bStart.getTime();
            }
            case "day":
                return a.Y === b.Y && a.n === b.n && a.j === b.j;
            case "hour":
                return a.Y === b.Y && a.n === b.n && a.j === b.j && a.G === b.G;
            case "minute":
                return a.Y === b.Y && a.n === b.n && a.j === b.j && a.G === b.G && a.i === b.i;
            case "second":
                return a.Y === b.Y && a.n === b.n && a.j === b.j && a.G === b.G && a.i === b.i && a.s === b.s;
            default:
                return this._date.getTime() === new Date(dateTime).getTime();
        }
    }

    isSameMonth(dateTime: tDateTime): boolean {
        return this.isSame(dateTime, "month");
    }

    isSameYear(dateTime: tDateTime): boolean {
        return this.isSame(dateTime, "year");
    }

    format(tplChars: string = "Y-m-d"): string {
        const date = (this.constructor as typeof DateChain)._dateFn;
        return date(tplChars, this._date) as string;
    }

    toDate(): Date {
        return new Date(this._date);
    }

    toString(): string {
        return (this.valueOf() as Date).toString();
    }

    static _dateFn: DateFunction;
}

export default DateChain;
