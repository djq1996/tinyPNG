const tinify = require('tinify');
const fs = require('fs');
const path = require('path');
tinify.key = 'DkKk7x3KzH1frY307rP459RjBh3VHxGh';

const root = './',
  exts = ['.jpg', '.png'],
  max = 5200000; // 5MB == 5242848.754299136

const imgUrl = path.resolve(__dirname, 'images');
const imgTiny = path.resolve(__dirname, 'images-tiny');
// console.log(imgUrl);

fileList(imgUrl);
// 获取文件列表
function fileList(folder) {
  fs.readdir(folder, (err, files) => {
    if (err) console.error(err);
    console.log(files);
    files.forEach(file => {
      fileFilter(path.resolve(folder, file));
    });
  });
}
// 过滤文件格式，返回所有jpg,png图片
function fileFilter(file) {
  fs.stat(file, (err, stats) => {
    if (err) return console.error(err);
    if (
      // 必须是文件，小于5MB，后缀 jpg||png
      stats.size <= max &&
      stats.isFile() &&
      exts.includes(path.extname(file))
    ) {
      tinyPng(file); // console.log('可以压缩：' + file);
    }
  });
}
function tinyPng(item) {
  const source = tinify.fromFile(item);
  source.toFile(path.resolve(imgTiny, path.basename(item)));
  console.log('tinyPng', item);
}
let compressionsThisMonth = tinify.compressionCount;
console.log('本月已经压缩', tinify, '剩余');
exports.tinyPng = fileList;
