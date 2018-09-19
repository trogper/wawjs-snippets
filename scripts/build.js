const fs = require("fs-extra");
const path = require("path");
const readline = require("readline");


const SRC_DIR = path.resolve("./src/");
const OUT_DIR = path.resolve("./out/");

// fs.remove(OUT_DIR, function(err) {
//if (err) throw err;
fs.readdir(SRC_DIR, (err, files) => {
    if (err) throw err;
    files.forEach(file => {

        const from = path.resolve(SRC_DIR, file);
        const to = path.resolve(OUT_DIR, path.basename(file, ".js") + ".sublime-snippet");

        // using readFile, writeFile, niot expecting large data 
        // in snippets
        fs.readFile(from, "UTF-8", (err, txtData) => {
            if (err) throw err;
            
            let [tabTrigger, description, ...content] = txtData.split(/\r\n|\n|\r/);
            
            tabTrigger=tabTrigger.replace(/^\/\/\s+/,"");
            description=description.replace(/^\/\/\s+/,"");

            let xmlData = `<snippet>
                <tabTrigger>${tabTrigger}</tabTrigger>
                <scope>source.js</scope>
                <description>${description}</description>
                <content><![CDATA[${content.join("\n")}]]></content>
            \r</snippet>`

            fs.writeFile(to, xmlData, (err) => {
                if (err) throw err;
                console.error("generated:", to);
            });
        });
    });
});

