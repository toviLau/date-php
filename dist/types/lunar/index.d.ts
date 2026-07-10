import getLunar from "./getLunar";
import { toGanZhiYear, toGanZhi, Gan, Zhi } from "./getGanZhi";
import { getAnimal, Animals } from "./getZodiac";
import { toAstro } from "./getAstro";
import { solarTerm, getTerm } from "./getSolarTerm";
import type { DatePlugin } from "../types";
declare const lunarPlugin: DatePlugin;
export default lunarPlugin;
export { getLunar, toGanZhiYear, toGanZhi, Gan, Zhi, getAnimal, Animals, toAstro, solarTerm, getTerm };
