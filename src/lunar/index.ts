/*
 * @Author       : ToviLau 46134256@qq.com
 * @Date         : 2026-07-09 07:45:41
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-09 23:25:47
 */
import getLunar, { LunarInfo } from "./getLunar";
import { toGanZhiYear, toGanZhi, Gan, Zhi } from "./getGanZhi";
import { getAnimal, Animals } from "./getZodiac";
import { toAstro } from "./getAstro";
import { solarTerm, getTerm } from "./getSolarTerm";
import { textReplace, textReplace2, lMonth, lunarTime, lunarKe, zodiac, solar, baseFigure } from "../utils";
import type { DatePlugin, TChars, PluginContext } from "../types";

const lunarPlugin: DatePlugin = {
  name: "lunar",
  install: (tChars: TChars, ctx: PluginContext) => {
    const dateTime = ctx.dateTime;

    const EMPTY_LUNAR: LunarInfo = { lYear: 0, lMonth: 0, lDay: 0, IMonthCn: "", IDayCn: "", cYear: 0, cMonth: 0, cDay: 0, isToday: false, isLeap: false, nWeek: 0, ncWeek: "", offset: 0 };

    const lunarResult = getLunar.solar2lunar(tChars.Y(), tChars.n(), tChars.j());
    const lunarInfo: LunarInfo = typeof lunarResult === "number" ? EMPTY_LUNAR : lunarResult;

    tChars.ly = () => toGanZhiYear(lunarInfo.lYear);
    tChars.lf = () => toGanZhi(lunarInfo.lMonth + 1);
    tChars.lj = () => {
      const base = new Date(1900, 0, 7);
      const diff = Math.floor((dateTime.getTime() - base.getTime()) / 86400000);
      return toGanZhi(diff);
    };
    tChars.lz = () => getAnimal(lunarInfo.lYear);
    tChars.lZ = () => zodiac[getAnimal(lunarInfo.lYear)];
    tChars.lc = () => lunarInfo.lYear;
    tChars.lC = () => textReplace2(lunarInfo.lYear);
    tChars.lm = () => lMonth[lunarInfo.lMonth];
    tChars.lM = () => lunarInfo.lMonth;
    tChars.ld = () => lunarInfo.IDayCn;
    tChars.lF = () => lunarInfo.IMonthCn;
    tChars.la = () => toAstro(tChars.n(), tChars.j());
    tChars.lt = () => lunarTime[Math.floor((tChars.G() >= 23 ? 0 : tChars.G() + 1) / 2)];
    tChars.lg = () => {
      const G = tChars.G();
      return G > 18 || G < 5
        ? Math.ceil((G < 19 ? G + 24 : G) / 2) - 9
        : "";
    };
    tChars.lG = () => tChars.lg() ? baseFigure[tChars.lg()] + "\u66f4" : "";
    tChars.lk = () => lunarKe[Math.floor(((tChars.U() + 60 * 60) % (60 * 60 * 2)) / 60 / 15)];
    tChars.ls = () => {
      const month = tChars.n();
      let termDay = getTerm(tChars.Y(), month * 2 - 1);
      if (tChars.j() === termDay) return solarTerm[(month - 1) * 2];
      termDay = getTerm(tChars.Y(), month * 2);
      if (tChars.j() === termDay) return solarTerm[(month - 1) * 2 + 1];
      return "";
    };
    tChars.lS = () => solar[tChars.ls()] || "";
    tChars.lq = () => Math.ceil((tChars.n() - 0) / 3);
    tChars.lQ = () => baseFigure[tChars.lq()];
  },
};

export default lunarPlugin;
export { getLunar, toGanZhiYear, toGanZhi, Gan, Zhi, getAnimal, Animals, toAstro, solarTerm, getTerm };
