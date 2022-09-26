export const getProp = (pkg: string, prop: string) => {
  const pkgLines = pkg.split('\n');
  for (const pkgLine of pkgLines) {
    if (pkgLine.toUpperCase().startsWith(prop.toUpperCase() + ': ')) {
      return pkgLine.substring(prop.length + 2);
    }
  }
};
