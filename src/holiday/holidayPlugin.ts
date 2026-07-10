/*
 * @Author       : ToviLau 46134256@qq.com
 * @Date         : 2026-07-09 07:45:41
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-09 09:15:43
 */
import getFestival from "./getFestival";
import type { DatePlugin, TChars, PluginContext } from "../types";

const holidayPlugin: DatePlugin = {
  name: "holiday",
  install: (tChars: TChars, ctx: PluginContext) => {
    const date = ctx.date;

    tChars.fh = () => (getFestival(tChars.Y() + tChars.m() + tChars.d(), date).cn || []).join();
    tChars.lh = () => (getFestival(tChars.Y() + tChars.m() + tChars.d(), date).en || []).join();
  },
};

export default holidayPlugin;
