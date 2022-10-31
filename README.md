# Deepin RISC-V Packages Monitor

## 功能

构建时会自动下载 Deepin 的 [RISC-V](https://community-packages.deepin.com/beige/dists/beige/main/binary-amd64/Packages) 和 [x86_64](https://community-packages.deepin.com/beige/dists/beige/main/binary-amd64/Packages) 的 Packages，并分析比对生成 Deepin RISC-V 于 x86_64 的包对比列表以及缺少的包列表

## 部署

1. 确保安装好 Node.JS 和 yarn
2. `yarn install`
3. 执行 `./generate.sh`，构建的网页将在 `dist` 文件夹内
