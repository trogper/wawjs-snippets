// readFile
// wawjs - read text file

// path is relative to CWD
// if path is fd it will not be closed
fs.readFile(inPath, "UTF-8", (err, data) => {
    if (err) throw err;

});