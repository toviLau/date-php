/*
 * @Author       : ToviLau 46134256@qq.com
 * @Date         : 2026-07-09 07:45:57
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-09 08:59:20
 */
const Gan: string[] = ['\u7532', '\u4e59', '\u4e19', '\u4e01', '\u620a', '\u5df1', '\u5e9a', '\u8f9b', '\u58ec', '\u7678'];

const Zhi: string[] = ['\u5b50', '\u4e11', '\u5bc5', '\u536f', '\u8fb0', '\u5df3', '\u5348', '\u672a', '\u7533', '\u9149', '\u620c', '\u4ea5'];

const toGanZhiYear = (lYear: number): string => {
  const ganKey = (lYear - 3) % 10 || 10;
  const zhiKey = (lYear - 3) % 12 || 12;
  return Gan[ganKey - 1] + Zhi[zhiKey - 1];
}

const toGanZhi = (offset: number): string => Gan[offset % 10] + Zhi[offset % 12];

export { Gan, Zhi, toGanZhiYear, toGanZhi };
