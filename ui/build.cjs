const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const projectRoot = path.resolve(__dirname, '..');  // Goes up one level to the root
const output = fs.createWriteStream(path.join(projectRoot, 'auto-blog-poster.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`✅ Zipped ${archive.pointer()} bytes`);
});

archive.on('error', err => { throw err; });

archive.pipe(output);

// Include specific files/folders from the project root
archive.directory(path.join(projectRoot, 'dist'), 'dist');  // Adjust path to 'dist'
archive.file(path.join(projectRoot, 'auto-blog-poster.php'), { name: 'auto-blog-poster.php' });
archive.file(path.join(projectRoot, 'readme.txt'), { name: 'readme.txt' });

archive.finalize();