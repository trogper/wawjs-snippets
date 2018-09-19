const os = require("os");
const path = require("path");

const osRelative = {
    Linux: ".config/sublime-text-3/",
    Darwin: "Library/Application Support/Sublime Text 3/",
    Windows_NT: "AppData/Roaming/Sublime Text 3/"
}

module.exports = () => {
    if (process.env["SUBLIME_HOME"])
        return process.env["SUBLIME_HOME"];

    if (osRelative[os.type()])
        return path.resolve(os.homedir(), osRelative[os.type()]);

    throw new Error('Unknown install path, set SUBLIME_HOME');
}
