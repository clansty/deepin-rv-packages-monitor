import { defineComponent } from 'vue';
import { getProp } from '@/utils/packageFuns';
import style from './PackageList.module.sass';
import packages from '@/stores/packages';

export default defineComponent({
  render() {
    return <table class={style.pkgList}>
      <tr>
        <th>Package</th>
        <th>Source</th>
        <th>Architecture</th>
        <th style="text-align: right">Version</th>
      </tr>
      {packages.map(pkg => (
        <tr onClick={() => window.open(`/${getProp(pkg, 'Package')}`)}>
          <td>{getProp(pkg, 'Package')}</td>
          <td>{getProp(pkg, 'Source')}</td>
          <td>{getProp(pkg, 'Architecture')}</td>
          <td align="right">{getProp(pkg, 'Version')}</td>
        </tr>
      ))}
    </table>;
  },
});
