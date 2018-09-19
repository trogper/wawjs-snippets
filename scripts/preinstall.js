const os = require("os");
const path = require("path");
const fs = require("fs");
const HOME = os.homedir();

const SUBLIME_HOME = require("./sublime-home.js")();

if (!fs.existsSync(SUBLIME_HOME)) {
    throw new Error(`Install Sublime Text 3 please, ${SUBLIME_HOME} not found.`);
    // TODO: automatic install ?
}