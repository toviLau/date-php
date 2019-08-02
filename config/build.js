const path = require('path');
const resolve = dir => {
    console.log(__dirname, dir);
    return path.join(__dirname, dir);
};

const fs = require('fs');
const zlib = require('zlib');
const rollup = require('rollup');
const config = require(resolve('./config.js'));
const rollupConf = config.rollupConf;
const buildList = config.dists;
// const uglify = require('uglify-js');

if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

const build = res => {
    const conf = rollupConf(res);
    const { output } = conf;
    const { banner, file } = output;
    return rollup.rollup(conf)
        .then(bundle => bundle.generate(output))
        .then(res => {
            const code = res.output[0].code;
            return write(file, code, true);
        });
};

function write(dest, code, zip) {
    return new Promise((resolve, reject) => {
        function report(extra) {
            console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''));
            resolve();
        }

        fs.writeFile(dest, code, err => {
            if (err) return reject(err);
            if (zip) {
                zlib.gzip(code, (err, zipped) => {
                    if (err) return reject(err);
                    report(' (gzipped: ' + getSize(zipped) + ')');
                });
            } else {
                report();
            }
        });
    });
}

function getSize(code) {
    return (code.length / 1024).toFixed(2) + 'kb';
}

function blue(str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}

Object.keys(buildList).forEach(res => {
    build(res)
});
