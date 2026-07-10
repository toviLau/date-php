import type { DateFunction } from "../types";
interface FestivalList {
    cn: string[];
    en: string[];
}
declare const getFestival: (dateObj: string, date: DateFunction) => FestivalList;
export default getFestival;
