/*
 * @Author       : ToviLau 46134256@qq.com
 * @Date         : 2026-07-09 07:45:41
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-09 09:16:15
 */
import { solarTerm, getTerm } from "./getSolarTerm";
import { solar } from "../utils";
import type { DatePlugin, TChars, PluginContext } from "../types";

const solarTermPlugin: DatePlugin = {
  name: "solarterm",
  install: (tChars: TChars, ctx: PluginContext) => {
    tChars.term = () => {
      const month = tChars.n();
      let termDay = getTerm(tChars.Y(), month * 2 - 1);
      if (tChars.j() === termDay) return solarTerm[(month - 1) * 2];
      termDay = getTerm(tChars.Y(), month * 2);
      if (tChars.j() === termDay) return solarTerm[(month - 1) * 2 + 1];
      return "";
    };
    tChars.termEn = () => solar[tChars.term()] || "";
    tChars.termDay = () => {
      const month = tChars.n();
      const idx = month * 2 - 1;
      const day1 = getTerm(tChars.Y(), idx);
      const day2 = getTerm(tChars.Y(), idx + 1);
      if (tChars.j() === day1) return { term: solarTerm[(month - 1) * 2], day: day1 };
      if (tChars.j() === day2) return { term: solarTerm[(month - 1) * 2 + 1], day: day2 };
      return null;
    };
  },
};

export default solarTermPlugin;
