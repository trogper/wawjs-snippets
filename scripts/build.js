const fs = require("fs-extra");
const os = require("os");
const path = require("path");
const CSON = require('cson');
const readline = require("readline");


const SRC_DIR = path.resolve("./src/");
const OUT_DIR = path.resolve("./out/atom/");
const OUT_FILE = path.resolve(OUT_DIR, "snippets.cson")


const snippets = {'.source.js' : {}};

fs.readdir(SRC_DIR, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        const from = path.resolve(SRC_DIR, file);

        let txtData = fs.readFileSync(from, "UTF-8");

        let [tabTrigger, description, ...content] = txtData.split(/\r\n|\n|\r/);

        tabTrigger = tabTrigger.replace(/^\/\/\s+/,"");
        description = description.replace(/^\/\/\s+/,"");

        if (!content[0].trim())
          content.shift();

        if (!content[content.length-1].trim())
          content.pop();

        let snippet = {
            isWawjs: true,
            prefix: tabTrigger,
            body: content.join(os.EOL)
        };

        snippets['.source.js'][description] = snippet;

    });

    let csonData = CSON.stringify(snippets);

    fs.writeFile(OUT_FILE, csonData, (err) => {
        if (err) throw err;
        console.error("generated snippets.cson");
    });
});
