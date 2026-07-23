# Changelog
## [2.0.0-alpha.3] - 2026-07-23

- 优化时区检测兼容性:
  - 优先使用 `Intl.DateTimeFormat().resolvedOptions().timeZone` 获取时区
  - 提供回退方案:通过 `getTimezoneOffset()` 获取偏移量并推断时区
  - 在不支持 `Intl` API 的环境中自动降级为 UTC 偏移量格式

- 修正节假日中英文规范翻译

## [2.0.0-alpha.2] - 2026-07-19

### Bug Fixes

- **修复 `ms === false` 时时间计算偏差**：将秒级时间戳→毫秒的转换逻辑移至时区转换之前执行，并增加 `typeof dateTime === "number"` 类型检查，避免对 Date 对象误操作。同时兼容 `isMs = false` 和 `isMs = 0` 两种写法（`[false, 0].includes(isMs)`）。

### Features

- **新增 `DateChain` 链式调用类**（`date.chain(dateTime)`）：支持链式操作日期，包含以下方法：
  - `add()` / `sub()` — 日期加减计算
  - `prev()` / `next()` — 上一个/下一个相关日期（自动取绝对值）
  - `startOfDay()` / `endOfDay()` — 当天起止时间
  - `startOfWeek()` / `endOfWeek()` — 本周起止时间
  - `startOfMonth()` / `endOfMonth()` — 本月起止时间
  - `startOfYear()` / `endOfYear()` — 本年起止时间
  - `isBefore()` / `isAfter()` — 日期比较
  - `isSame()` / `isSameMonth()` / `isSameYear()` — 日期相同判断
  - `format()` — 格式化输出
  - `toDate()` / `toString()` — 类型转换

- **新增 `date.countTime()` 方法**：`date.duration` 的语法糖，用于计算两个时间戳之间的差值。

### Type Definitions

- 新增 `RowUnitConf` 接口 — 相对时间配置的精确类型
- 新增 `DurationFormatResult` 接口 — duration 返回值类型
- 新增 `TimeUnit` 联合类型 — 时间单位类型
- 新增 `AddObject` 接口 — add 方法的对象参数类型
- 新增 `DateChain` 类声明及 `date.chain()` 方法签名

### Build

- 替换 `uglify` 为 `terser` 压缩插件

### Example

- `example/index.html` 全面重构：
  - Vue 2 → Vue 3 Composition API
  - 新增 `date()` 和 `date.duration()` 交互式表单
  - 新增 `parseBool()` 工具函数支持 `!false`、`!1` 等非运算语法
  - 修复 Vue 3 `reactive()` 包装 Date 对象导致的 Proxy 报错
  - 修复 Vue 3 模板中 `this` 被代理导致的 `date.bind(null)` 问题
