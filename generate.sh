#!/usr/bin/env bash
wget https://community-packages.deepin.com/beige/dists/beige/main/binary-amd64/Packages -O tools/convert/Packages-x86
wget https://mirror.iscas.ac.cn/deepin-riscv/deepin-stage1/dists/beige/main/binary-riscv64/Packages -O tools/convert/Packages-riscv

yarn convert
yarn build

