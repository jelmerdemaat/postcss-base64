var fs = require('fs'),
    postcss = require('postcss'),
    Promise = require('promise');

function getUrl(value) {
    var reg = /url\((\s*)(['"]?)(.+?)\2(\s*)\)/g,
        match = reg.exec(value),
        url = match[3];
    return url;
}

function checkFile(string) {
    return new Promise(function(resolve, reject) {
        fs.stat(string, function(err, stats) {
            if(stats && stats.isFile()) {
                // Assume it's a file
                return resolve(true);
            } else {
                // Assume it's not a file
                return resolve(false);
            }
        });
    });
}

function replaceFiles(string) {
    file = getUrl(string);
    ext = file.split('.')[1];

    if(ext === 'svg') ext = ext + '+xml';

    fileContents = fs.readFileSync(file);
    output = 'data:image/' + ext + ';base64,' + fileContents.toString('base64');

    return string.replace(file, output);
}

function replaceInline(string) {
    output = new Buffer(string).toString('base64');
    return output;
}

module.exports = postcss.plugin('postcss-base64', function (opts) {
    return function (css, result) {
        opts = opts || {};

        var exts,
            ext,
            search,
            file,
            fileContents,
            output;

        if(opts.extensions) {
            exts = '\\' + opts.extensions.join('|\\');
            search = new RegExp('url\\(.*(' + exts + ').*\\)', 'i');

            css.replaceValues(search, function (string) {
                return replaceFiles(string);
            });
        }

        if(opts.pattern) {
            if(!opts.pattern instanceof RegExp) {
                throw new Error('Given search pattern is not a (valid) regular expression.');
            }

            search = opts.pattern;

            css.replaceValues(search, function (string) {
                checkFile(string).then(function(isFile) {
                    if(isFile) {
                        return resolve(replaceFiles(string));
                    } else {
                        return resolve('kaas');
                    }
                });
            });
        }
    };
});
