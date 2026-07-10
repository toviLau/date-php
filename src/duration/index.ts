/*
 * @Author       : ToviLau 46134256@qq.com
 * @Date         : 2026-07-09 07:45:41
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-09 23:38:55
 */
import { pad } from "../utils";

interface DurationChars {
  [key: string]: () => number | string;
}

const duration = (template: string = "D天h:i:s", timestamp: number = 0, isMs: boolean = true): string | Record<string, any> => {
  const conversion: Record<string, number> = {
    y: 12,
    m: 30.436875,
    d: 24,
    h: 60,
    i: 60,
    s: 1000,
    v: 1000,
  };
  const tChars: DurationChars = {
    y: () => tChars.Y(),
    Y: () => Math.floor(Number(tChars.M()) / conversion.y),

    m: () => pad(tChars.n(), 2),
    n: () => Number(tChars.M()) % conversion.y,
    M: () => Math.floor(Number(tChars.D()) / conversion.m),

    d: () => pad(tChars.j(), 2),
    j: () => Math.floor(Number(tChars.D()) % conversion.m),
    D: () => Math.floor(Number(tChars.H()) / conversion.d),

    h: () => pad(tChars.g(), 2),
    g: () => Math.floor(Number(tChars.H()) % conversion.d),
    H: () => Math.floor(Number(tChars.I()) / conversion.h),

    i: () => pad(Math.floor(Number(tChars.I()) % conversion.h), 2),
    I: () => Math.floor(Number(tChars.S()) / conversion.i),

    s: () => pad(Math.floor(Number(tChars.S()) % conversion.i), 2),
    S: () => Math.floor(Number(tChars.V()) / conversion.s),

    v: () => pad(Math.floor(Number(tChars.V()) % conversion.s), 3),
    V: () => {
      const time = Math.abs(timestamp);
      if (isMs) return time;
      const converted = time * conversion.v;
      return converted <= Number.MAX_SAFE_INTEGER ? converted : Number.MAX_SAFE_INTEGER;
    },
  };

  if (template === "json" || template === "all" || template === "-1") {
    const json: Record<string, any> = {};
    Object.keys(tChars).forEach((res) => (json[res] = tChars[res]()));
    return json;
  }
  return template.replace(/(\\?([a-z]))/gi, (res, key) =>
    res !== key ? key : tChars[key] ? String(tChars[key]()) : key.replace("\\", "")
  );
}

export { duration };
export default { duration };
