/*
 * @Author       : ToviLau 46134256@qq.com
 * @Date         : 2026-07-09 07:45:41
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-09 09:16:24
 */
import { toAstro } from "./getAstro";
import type { DatePlugin, TChars, PluginContext } from "../types";

const astroPlugin: DatePlugin = {
  name: "astro",
  install: (tChars: TChars, ctx: PluginContext) => {
    tChars.astro = () => toAstro(tChars.n(), tChars.j());
  },
};

export default astroPlugin;
