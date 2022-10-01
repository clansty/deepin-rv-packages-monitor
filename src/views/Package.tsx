import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import packages from '@/stores/packages';
import { getDescription, getProp, hSize } from '@/utils/packageFuns';

export default defineComponent({
  render() {
    const route = useRoute();
    const packageInfo = packages.find(it => getProp(it, 'Package') === route.params.package) as string;
    return <div>
      <h1>{getProp(packageInfo, 'Package')} {getProp(packageInfo, 'Version')}</h1>
      <table>
        <tbody>
        <tr>
          <td>Architecture:</td>
          <td>{getProp(packageInfo, 'Architecture')}</td>
        </tr>
        <tr>
          <td>Maintainer:</td>
          <td>{getProp(packageInfo, 'Maintainer')}</td>
        </tr>
        <tr>
          <td>Size:</td>
          <td>{hSize(Number(getProp(packageInfo, 'Size')))}</td>
        </tr>
        <tr>
          <td>Installed Size:</td>
          <td>{hSize(Number(getProp(packageInfo, 'Installed-Size')))}</td>
        </tr>
        <tr>
          <td>HomePage:</td>
          <td><a href={getProp(packageInfo, 'Homepage')}>{getProp(packageInfo, 'Homepage')}</a></td>
        </tr>
        <tr>
          <td>Depends:</td>
          <td>{getProp(packageInfo, 'Depends')}</td>
        </tr>
        <tr>
          <td>Recommends:</td>
          <td>{getProp(packageInfo, 'Recommends')}</td>
        </tr>
        <tr>
          <td>Suggests:</td>
          <td>{getProp(packageInfo, 'Suggests')}</td>
        </tr>
        <tr>
          <td>Breaks:</td>
          <td>{getProp(packageInfo, 'Breaks')}</td>
        </tr>
        <tr>
          <td>Priority:</td>
          <td>{getProp(packageInfo, 'Priority')}</td>
        </tr>
        <tr>
          <td>Section:</td>
          <td>{getProp(packageInfo, 'Section')}</td>
        </tr>
        </tbody>
      </table>
      <p>
        Description:
      </p>
      <pre>{getDescription(packageInfo)}</pre>
    </div>;
  },
});
