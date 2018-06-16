const fs = require('fs');
const path = require('path');
const paths = require('./paths');

function isDirectory(source) {
    return fs.lstatSync(source).isDirectory();
}

const aliases = fs
    .readdirSync(paths.src)
    .reduce((acc, item) => {
        const itemPath = `${paths.src}/${item}`;

        if (isDirectory(itemPath)) {
            acc[item] = itemPath;
        }

        return acc;
    }, {});

module.exports = aliases;
