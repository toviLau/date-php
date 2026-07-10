/*
 * @Author       : ToviLau 46134256@qq.com
 * @Date         : 2026-07-09 07:45:41
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-09 10:15:33
 * @Description  : 获取星座
 */
const toAstro = (cMonth: number, cDay: number): string => {
  const s = '\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf';
  const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
  // return s.slice(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0) + 2) + '\u5ea7';
  const start = cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0);
  return s.slice(start, start + 2) + '\u5ea7';
};

export { toAstro };
