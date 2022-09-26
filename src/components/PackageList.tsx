import { defineComponent } from 'vue';
import packagesText from '../Packages?raw';
import { getProp } from '@/utils/packageFuns';
import style from './PackageList.module.sass'

const packages = packagesText.split('\n\n');

export default defineComponent({
  render() {
    return <table class={style.pkgList}>
      <tr>
        <th>Package</th>
        <th>Architecture</th>
        <th style="text-align: right">Version</th>
      </tr>
      {packages.map(pkg => (
        <tr>
          <td>{getProp(pkg, 'Package')}</td>
          <td>{getProp(pkg, 'Architecture')}</td>
          <td align="right">{getProp(pkg, 'Version')}</td>
        </tr>
      ))}
    </table>;
  },
});
