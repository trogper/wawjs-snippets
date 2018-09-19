const os = require("os");
const path = require("path");
const fs = require("fs");
const SUBLIME_HOME = require("./sublime-home.js")();

const INSTALL_DIR = path.resolve(SUBLIME_HOME, "Packages/User/wawjs/");
const SRC_DIR = path.resolve("./out/"); //what is "." in preinstall scripts ?

fs.mkdir(INSTALL_DIR, (err) => {
    if (err && err.code !== "EEXIST") throw err;
    if (err && err.code === "EEXIST") {
        fs.readdirSync(INSTALL_DIR)
            .map((file) => path.resolve(INSTALL_DIR, file))
            .forEach((file) => {
                fs.unlinkSync(file);
                console.error("deleted snippet:", file);
            });

    }
    fs.readdir(SRC_DIR, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
            const from = path.resolve(SRC_DIR, file);
            const to = path.resolve(INSTALL_DIR, file);
            fs.copyFile(from, to, (err) => {
                if (err) throw err;
                console.error("copied snippet:", to);
            });
        });
    });
});