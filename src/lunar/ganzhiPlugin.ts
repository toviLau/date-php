/*
 * @Author       : ToviLau 46134256@qq.com
 * @Date         : 2026-07-09 07:49:41
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-09 23:26:00
 */
import { toGanZhiYear, toGanZhi, Gan, Zhi } from "./getGanZhi";
import type { DatePlugin, TChars, PluginContext } from "../types";

const ganzhiPlugin: DatePlugin = {
  name: "ganzhi",
  install: (tChars: TChars, ctx: PluginContext) => {
    const dateTime = ctx.dateTime;

    tChars.gzY = () => toGanZhiYear(dateTime.getFullYear());
    tChars.gzM = () => {
      const m = dateTime.getMonth() + 1;
      return toGanZhi(m + 1);
    };
    tChars.gzD = () => {
      const base = new Date(1900, 0, 7);
      const diff = Math.floor((dateTime.getTime() - base.getTime()) / 86400000);
      return toGanZhi(diff);
    };
    tChars.gzH = () => {
      const h = dateTime.getHours();
      const zhiIdx = Math.floor((h + 1) / 2) % 12;
      const dayBase = new Date(1900, 0, 7);
      const dayDiff = Math.floor((dateTime.getTime() - dayBase.getTime()) / 86400000);
      const ganIdx = (dayDiff % 10 * 2 + zhiIdx) % 10;
      return Gan[ganIdx] + Zhi[zhiIdx];
    };
  },
};

export default ganzhiPlugin;
