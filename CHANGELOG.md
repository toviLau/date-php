# Changelog

All notable changes to this project will be documented in this file.

## [1.8.2] - 2026-07-23

- 优化时区检测兼容性:
  - 优先使用 `Intl.DateTimeFormat().resolvedOptions().timeZone` 获取时区
  - 提供回退方案:通过 `getTimezoneOffset()` 获取偏移量并推断时区
  - 在不支持 `Intl` API 的环境中自动降级为 UTC 偏移量格式

- 修正节假日中英文规范翻译

## Previous Versions
See [GitHub Releases](https://github.com/toviLau/date-php/releases) for previous version changelog.