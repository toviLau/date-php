/*
 * @Author       : ToviLau 46134256@qq.com
 * @Date         : 2026-07-09 07:45:41
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-09 09:17:58
 */
import date from "./core/date";
import lunarPlugin from "./lunar";
import holidayPlugin from "./holiday";

date.use([lunarPlugin, holidayPlugin]);

export default date;
