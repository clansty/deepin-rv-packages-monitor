export type Package = {
  package: string;
  source: string;
  version: string;
  versionX86?: string;
  architecture: string;
  maintainer: string;
  size: string;
  installedSize: string;
  homepage: string;
  depends: string;
  recommends: string;
  suggests: string;
  breaks: string;
  priority: string;
  section: string;
  description: string;
}
