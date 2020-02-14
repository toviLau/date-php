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

/**
 * 头注释文本换行计算;
 */
const bannerBescription = () => {
    // 注释换行字符长度
    let splitLen = 110;
    let desc = '';
    const cPunctuation = /[^\x00-\xff]/ig;
    description.split(/\n/).forEach(res => {
        let tmpLen = 0;
        res.match(/./g).forEach((str, idx) => {
            tmpLen += /[^\x00-\xff]/.test(str) ? 2 : 1;
            desc += str;
            if (tmpLen % splitLen === 0) {
                if (cPunctuation.test(res[idx + 1])) {
                    tmpLen = tmpLen - 2; // : tmpLen;
                } else if (/[a-z\-]/ig.test(res[idx])) {
                    let i = 0;
                    while (/\s/g.test(res[idx - i])) {
                        i--;
                    }
                    tmpLen = tmpLen - (i + 1);
                } else {
                    desc += '\n';
                }
            }
        });
        desc = desc.replace(/^[\s]/gm, '');
        desc += '\n';
    });
    let bannerDesc = '';
    desc.split(/\n/).forEach(res => {
        bannerDesc += ` *   ${ res }\n`;
    });
    return bannerDesc;
};


let banner =
    '/**\n' +
    ` * ${ oName }.js v${ version }\n` +
    `${ bannerBescription() }` +
    ` *     -- repository ${ repository.url.substr(4) }\n` +
    ' *\n' +
    ` *   (c) 2019-${ new Date().getFullYear() } ${ author }. Released under the ${ license } License. \n` +
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
