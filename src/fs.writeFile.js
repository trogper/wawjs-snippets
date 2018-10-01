// writeFile
// wawjs - writing file

// fs.writeFile(file, data[, options], callback)
// replacing the file if it already exists.
// data can be a string or a buffer.
// It is unsafe to use fs.writeFile() multiple times
// 	on the same file, without waiting for the callback

fs.writeFile(outPath, outData, (err) => {
    if (err) throw err;
    console.error('written:', outPath);
});
