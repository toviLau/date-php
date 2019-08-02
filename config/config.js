const path = require('path');
// const fs = require('fs');
// const rollup = require('rollup');
const cjs = require('rollup-plugin-commonjs');
const node = require('rollup-plugin-node-resolve');
const flow = require('rollup-plugin-flow-no-whitespace');
const replace = require('rollup-plugin-replace');
const buble = require('rollup-plugin-buble');
const { uglify } = require('rollup-plugin-uglify');


const resolve = dir => {
    return path.join(__dirname, `../${ dir }`);
};

const {
    name: oName,
    description,
    author,
    version,
    repository,
    license,
} = require(resolve('./package.json'));

const banner =
    '/**\n' +
    ` * ${ oName }.js v${ version }\n` +
    ` *   ${ description } repository ${ repository.url.substr(4) }\n` +
    ` *   (c) ${ new Date().getFullYear() } ${ author }. Released under the ${ license } License. \n` +
    ' **/';

const input = resolve('./src/date.js');

const dists = {
    full: {
        output: resolve('./dist/date.js'),
        env: 'development',
    },
    min: {
        output: resolve('./dist/date.min.js'),
        env: 'production',
        plugins: [
            uglify({
                output: {
                    comments: /Released under the MIT License/,
                    quote_style: 1, // 使用单引号
                },
                compress: {
                    properties: true, // 用 . 来重写属性引用
                    dead_code: true, // 移除没被引用的代码
                    drop_debugger: true, // 移除debugger
                    unused: true, // 移除没有引用的变量
                    // passes: 3, // 运行压缩的次数
                },
                ie8: true,
            }),
        ],
    },
};

function rollupConf(name) {
    const opts = dists[name];
    let { plugins } = opts;

    const conf = {
        input,
        plugins: [
            buble(),
            flow(),
            node(),
            cjs(),
            ...plugins || '',
        ],
        output: {
            banner,
            indent: '    ',
            file: opts.output,
            format: 'umd',
            name: 'date',
        },
    };
    if (opts.env) {
        conf.plugins.push(replace({
            'process.env.NODE_ENV': JSON.stringify(opts.env),
            '__VERSION__': version,
        }));
    }
    return conf;
}

if (process.env.TARGET) {
    module.exports = rollupConf(process.env.TARGET);
} else {
    module.exports = {
        oName,
        description,
        author,
        version,
        repository,
        license,
        banner,
        dists,
        rollupConf,
    };
}
