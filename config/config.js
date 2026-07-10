const path = require('path');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser').default;


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
                    tmpLen = tmpLen - 2;
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
    ` *     -- repository ${ repository.url.slice(4) }\n` +
    ' *\n' +
    ` *   (c) 2019-${ new Date().getFullYear() } ${ author }. Released under the ${ license } License. \n` +
    ' **/';

const input = resolve('./src/index.ts');

const plugins = [
    { name: 'lunarPlugin', dir: 'lunar' },
    { name: 'ganzhiPlugin', dir: 'lunar' },
    { name: 'zodiacPlugin', dir: 'lunar' },
    { name: 'shiKePlugin', dir: 'lunar' },
    { name: 'solarTermPlugin', dir: 'lunar' },
    { name: 'astroPlugin', dir: 'lunar' },
    { name: 'holidayPlugin', dir: 'holiday' },
];
const libraries = [
    { name: 'getGanZhi', dir: 'lunar' },
    { name: 'getZodiac', dir: 'lunar' },
    { name: 'getAstro', dir: 'lunar' },
    { name: 'getSolarTerm', dir: 'lunar' },
    { name: 'getLunar', dir: 'lunar' },
    { name: 'chineseUtils', dir: 'utils' },
    { name: 'timezone', dir: 'timezone' },
    { name: 'duration', dir: 'duration' },
];

const dists = {
    full: {
        output: resolve('./dist/date.js'),
        env: 'development',
    },
    esm: {
        output: resolve('./dist/date.esm.js'),
        env: 'production',
    },
    min: {
        output: resolve('./dist/date.min.js'),
        env: 'production',
        plugins: [
            terser({
                output: {
                    comments: /Released under the MIT License/,
                    quote_style: 1,
                },
                compress: {
                    properties: true,
                    dead_code: true,
                    drop_debugger: true,
                    unused: true,
                },
                ie8: true,
            }),
        ],
    },
    core: {
        input: resolve('./src/core/date.ts'),
        output: resolve('./dist/date.core.js'),
        env: 'production',
    },
    coreEsm: {
        input: resolve('./src/core/date.ts'),
        output: resolve('./dist/date.core.esm.js'),
        env: 'production',
    },
    coreMin: {
        input: resolve('./src/core/date.ts'),
        output: resolve('./dist/date.core.min.js'),
        env: 'production',
        plugins: [
            terser({
                output: {
                    comments: /Released under the MIT License/,
                    quote_style: 1,
                },
                compress: {
                    properties: true,
                    dead_code: true,
                    drop_debugger: true,
                    unused: true,
                },
                ie8: true,
            }),
        ],
    },
};

plugins.forEach(function (p) {
    dists['plugin_' + p.name] = {
        input: resolve('./src/' + p.dir + '/' + p.name + '.ts'),
        output: resolve('./dist/plugins/' + p.name + '.js'),
        env: 'production',
        sub: true,
    };
    dists['plugin_' + p.name + '_esm'] = {
        input: resolve('./src/' + p.dir + '/' + p.name + '.ts'),
        output: resolve('./dist/plugins/' + p.name + '.esm.js'),
        env: 'production',
        sub: true,
        esm: true,
    };
});

libraries.forEach(function (l) {
    dists['lib_' + l.name] = {
        input: resolve('./src/' + l.dir + '/' + l.name + '.ts'),
        output: resolve('./dist/library/' + l.name + '.js'),
        env: 'production',
        sub: true,
    };
    dists['lib_' + l.name + '_esm'] = {
        input: resolve('./src/' + l.dir + '/' + l.name + '.ts'),
        output: resolve('./dist/library/' + l.name + '.esm.js'),
        env: 'production',
        sub: true,
        esm: true,
    };
});

function rollupConf(name) {
    const opts = dists[name];
    let { plugins } = opts;

    const isEsm = name === 'esm' || name === 'coreEsm' || opts.esm;
    const isCore = name === 'core' || name === 'coreEsm' || name === 'coreMin';
    const isSub = opts.sub;
    const rollupInput = (isCore || isSub) ? opts.input : input;

    const conf = {
        input: rollupInput,
        treeshake: {
            moduleSideEffects: false,
            preset: 'recommended',
        },
        plugins: [
            typescript({
                tsconfig: resolve('./tsconfig.json'),
                declaration: false,
                outDir: undefined,
            }),
            nodeResolve(),
            commonjs(),
            ...plugins || [],
        ],
        output: {
            banner,
            indent: '    ',
            file: opts.output,
            format: isEsm ? 'es' : 'umd',
            name: isEsm ? undefined : 'date',
            exports: 'auto',
        },
    };
    if (opts.env) {
        conf.plugins.push(replace({
            'process.env.NODE_ENV': JSON.stringify(opts.env),
            '__VERSION__': version,
            preventAssignment: true,
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
