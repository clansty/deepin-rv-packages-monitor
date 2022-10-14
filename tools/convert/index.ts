const fs = require('fs');
const { getDescription, getProp, hSize } = require('./packageFuns');

const packagesText = {
  x86: fs.readFileSync('./tools/convert/Packages-x86', 'utf-8').split('\n\n'),
  riscV: fs.readFileSync('./tools/convert/Packages-riscv', 'utf-8').split('\n\n'),
};

console.log('Parsing Packages');
const packages = Object.fromEntries(Object.entries(packagesText).map(([key, value]) =>
  [key, value.map(pkg => ({
    package: getProp(pkg, 'Package'),
    source: getProp(pkg, 'Source'),
    version: getProp(pkg, 'Version'),
    architecture: getProp(pkg, 'Architecture'),
    maintainer: getProp(pkg, 'Maintainer'),
    size: hSize(Number(getProp(pkg, 'Size'))),
    installedSize: hSize(Number(getProp(pkg, 'Installed-Size'))),
    homepage: getProp(pkg, 'Homepage'),
    depends: getProp(pkg, 'Depends'),
    recommends: getProp(pkg, 'Recommends'),
    suggests: getProp(pkg, 'Suggests'),
    breaks: getProp(pkg, 'Breaks'),
    priority: getProp(pkg, 'Priority'),
    section: getProp(pkg, 'Section'),
    description: getDescription(pkg),
  }))]));

console.log('Comparing Versions');
const riscvCompare = packages.riscV.map(pkg => {
  const pkgCompare = packages.x86.find(it => it.package === pkg.package);
  return {
    ...pkg,
    versionX86: pkgCompare?.version,
  };
});

const pkgsMissing = packages.x86.filter(pkg => !packages.riscV.find(it => it.package === pkg.package));

fs.writeFileSync('./src/data.json', JSON.stringify({ riscvCompare, pkgsMissing }));
