const os = require("os");
const path = require("path");
const fs = require("fs");
const CSON = require('cson'); // TODO cson vs season (viac pouziti, issues), nasledne vysvetlit
const ATOM_HOME = require("./atom-home.js")();

const INSTALL_FILE = path.resolve(ATOM_HOME, "snippets.cson");
const SRC_FILE = path.resolve("./out/atom/snippets.cson"); //what is "." in preinstall scripts ?


fs.readFile(INSTALL_FILE, "UTF-8", (err, txtData) => {
    if (err) throw err;

    // TODO transform stream na extract comments a remove comments
    let comments = txtData
        .split(/\r\n|\n|\r/)
        .filter(l => l.indexOf('#') === 0);

    let snippets = CSON.parse(txtData);

    Object.keys(snippets).forEach(snipName => {
        if (snippets[snipName].isWawjs)
            delete snippets[snipName];
    });

    fs.readFile(SRC_FILE, "UTF-8", (err, newData) => {
        if (err) throw err;

        let newSnippets = CSON.parse(newData);

        Object.entries(newSnippets).forEach(snip => {
          snippets[snip[0]] = snip[1];
        });

        let csonData = CSON.stringify(snippets);

        let data = comments.join('\n') + '\n\n' + csonData;

        fs.writeFile(INSTALL_FILE, data, (err) => {
            if (err) throw err;
            console.error("snippets installed");
        });
    });
});
