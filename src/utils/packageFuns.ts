export const getProp = (pkg: string, prop: string) => {
  const pkgLines = pkg.split('\n');
  for (const pkgLine of pkgLines) {
    if (pkgLine.toUpperCase().startsWith(prop.toUpperCase() + ': ')) {
      return pkgLine.substring(prop.length + 2);
    }
  }
};

export const hSize = (size: number) => {
  const BYTE = 1024;

  if (size < BYTE)
    return size + 'B';
  if (size < Math.pow(BYTE, 2))
    return (size / BYTE).toFixed(1) + 'KiB';
  if (size < Math.pow(BYTE, 3))
    return (size / Math.pow(BYTE, 2)).toFixed(1) + 'MiB';
  if (size < Math.pow(BYTE, 4))
    return (size / Math.pow(BYTE, 3)).toFixed(1) + 'GiB';
  return (size / Math.pow(BYTE, 4)).toFixed(1) + 'TiB';
};

export const getDescription = (pkg: string) => {
  let result = '';
  let started = false;
  for (const line of pkg.split('\n')) {
    if (!line.startsWith('Description: ') && !started)
      continue;
    if (line.startsWith('Description: ')) {
      result = line.substring('Description: '.length);
      started = true;
    }
    if (line.startsWith(' ') && started) {
      result += '\n' + line.substring(1);
    }
  }
  return result;
};
