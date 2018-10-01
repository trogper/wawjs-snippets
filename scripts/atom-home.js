const os = require("os");
const path = require("path");

const osRelative = {
    Linux: ".atom/",
    Darwin: ".Atom/",
    Windows_NT: ".atom/"
}

module.exports = () => {
    if (process.env["ATOM_HOME"])
        return process.env["ATOM_HOME"];

    if (osRelative[os.type()])
        return path.resolve(os.homedir(), osRelative[os.type()]);

    throw new Error('Unknown install path, set ATOM_HOME');
}
