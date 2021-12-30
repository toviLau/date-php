module.exports = process.env.NODE_ENV === 'production'
    ? require('./dist/date.min')
    : require('./dist/date');
