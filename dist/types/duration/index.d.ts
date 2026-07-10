declare const duration: (fmt?: string, timestamp?: number, ms?: boolean) => string | Record<string, any>;
declare const countTime: (templateChars?: string, timestamp1?: number, timestamp2?: number, isMs?: boolean) => string | Record<string, any>;
export { duration, countTime };
declare const _default: {
    duration: (fmt?: string, timestamp?: number, ms?: boolean) => string | Record<string, any>;
    countTime: (templateChars?: string, timestamp1?: number, timestamp2?: number, isMs?: boolean) => string | Record<string, any>;
};
export default _default;
