#!/usr/bin/env bash
rm tools/convert/Packages*
wget https://community-packages.deepin.com/beige/dists/beige/main/binary-amd64/Packages -O tools/convert/Packages-x86
wget https://mirror.iscas.ac.cn/deepin-riscv/deepin-stage1/dists/beige/main/binary-riscv64/Packages -O tools/convert/Packages-riscv
wget http://deb.debian.org/debian/dists/sid/main/binary-amd64/Packages.xz -O tools/convert/Packages-sid.xz
unxz tools/convert/Packages-sid.xz

yarn convert
yarn build

