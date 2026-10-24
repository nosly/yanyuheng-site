#!/usr/bin/env bash
# 生成一个「只有要发布的东西」的文件夹，供 EdgeOne「直接上传」使用。
#
#   ./make-dist.sh          → 生成 dist/
#   然后把 dist/ 整个拖进 EdgeOne 的上传框。
#
# 为什么不用软链接：浏览器上传器通常不跟随符号链接，
# 而且失败是静默的——assets/ 被跳过，站点上线后没样式没图，
# 要过一阵才发现。这里是真拷贝，慢一点，但不会骗人。

set -euo pipefail
cd "$(dirname "$0")"

if [ -e dist ] && [ ! -d dist ]; then
  echo "dist 存在但不是目录，停止。" >&2
  exit 1
fi

rm -rf ./dist
mkdir -p ./dist

cp index.html lun-guojia.html ./dist/
cp -r assets ./dist/

# 只该有这三样
echo "--- dist/ ---"
ls -1 ./dist
echo "--- 体积 ---"
du -sh ./dist
echo
echo "上传方式："
echo "  · 点「选择文件夹」→ 选 dist 本身（dist 就是站点根）。"
echo "  · 拖拽上传     → 拖 dist 里面的三样，别拖 dist 这层。"
echo "上传后确认首页地址是 /index.html，不是 /dist/index.html。"
