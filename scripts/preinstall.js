// const os = require("os");
// const path = require("path");
const fs = require("fs");
// const HOME = os.homedir();

const ATOM_HOME = require("./atom-home.js")();

if (!fs.existsSync(ATOM_HOME)) {
    throw new Error(`Install Atom please, ${ATOM_HOME} not found.`);
    // TODO: automatic install ?
}
