/*
 * @Author       : ToviLau 46134256@qq.com
 * @Date         : 2026-07-09 07:45:41
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-09 23:36:02
 */
import { lunarTime, lunarKe } from "../utils";
import type { DatePlugin, TChars, PluginContext } from "../types";

const shiKePlugin: DatePlugin = {
  name: "shike",
  install: (tChars: TChars, ctx: PluginContext) => {
    const dateTime = ctx.dateTime;

    tChars.shi = () => {
      let hour = dateTime.getHours();
      let idx = Math.floor((hour + 1) / 2);
      idx = idx >= 12 ? 0 : idx;
      return lunarTime[idx];
    };
    tChars.ke = () => {
      const hour = dateTime.getHours();
      const ke = Math.floor(dateTime.getMinutes() / 15);
      let geng = Math.floor((hour + 1) / 2);
      if (hour === 23) geng = 0;
      const safeGeng = geng % 8;
      return (lunarKe[safeGeng] ?? safeGeng) + "\u66f4" + (lunarKe[ke] ?? ke) + "\u523b";
    };
    tChars.geng = () => {
      const hour = dateTime.getHours();
      let geng = Math.floor((hour + 1) / 2);
      if (hour === 23) geng = 0;
      return geng + 1;
    };
  },
};

export default shiKePlugin;
