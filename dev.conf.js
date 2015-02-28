// Karma configuration
// Generated on Sun Feb 22 2015 01:42:14 GMT+0000 (GMT)

const TEST_DIR = './test'
var fs = require('fs')
var path = require('path')

var files = []
  
function walk(dir, files) {
  fs.readdirSync(dir)
  .forEach(function (item) {
    var full = path.join(dir, item)
    var stat = fs.statSync(full)
    if (stat.isDirectory()) return walk(full, files)
    else if (stat.isFile() && path.extname(full) === '.js')
      files.push(full)
  })
}

if (process.argv.length > 4) {
  process.argv.slice(4)
  .forEach(function (file) {
    var stat = fs.statSync(file)
    if (stat.isDirectory()) walk(file, files)
    else if (stat.isFile()) files.push(file)
    else {
      file = file.split('=')
      if (file.length > 1) configs[file[0]] = file[1]
      else configs[file[0]] = true
    }
  })
} else {
  walk(path.join(__dirname, TEST_DIR), files)
}

console.log('test', files)

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'mocha'],

    // list of files / patterns to load in the browser
    files: files,

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.js': [ 'browserify' ]
    },
    
    browserify: {
      debug: true,
      transform: [ ['reactify', { es6: true, target: 'es5' }] ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
