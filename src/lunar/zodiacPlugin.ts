/*
 * @Author       : ToviLau 46134256@qq.com
 * @Date         : 2026-07-09 07:45:41
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-09 23:26:15
 */
import { getAnimal, Animals } from "./getZodiac";
import type { DatePlugin, TChars, PluginContext } from "../types";

const zodiacPlugin: DatePlugin = {
  name: "zodiac",
  install: (tChars: TChars, ctx: PluginContext) => {
    const dateTime = ctx.dateTime;

    tChars.zz = () => getAnimal(dateTime.getFullYear());
    tChars.zzEn = () => {
      const animal = getAnimal(dateTime.getFullYear());
      const zodiacMap: Record<string, string> = {
        '\u9f20': 'Rat', '\u725b': 'Ox', '\u864e': 'Tiger', '\u5154': 'Rabbit',
        '\u9f99': 'Dragon', '\u86c7': 'Snake', '\u9a6c': 'Horse', '\u7f8a': 'Sheep',
        '\u7334': 'Monkey', '\u9e21': 'Rooster', '\u72d7': 'Dog', '\u732a': 'Pig',
      };
      return zodiacMap[animal] || animal;
    };
  },
};

export default zodiacPlugin;
