import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import packages from '@/data.json';
import { Package } from '@/types';

export default defineComponent({
  render() {
    const route = useRoute();
    // @ts-ignore
    const pkg: Package = packages.riscvCompare.find(it => it.package === route.params.package);
    return <div>
      <h1>{pkg.package} {pkg.version}</h1>
      <table>
        <tbody>
        <tr>
          <td>Architecture:</td>
          <td>{pkg.architecture}</td>
        </tr>
        <tr>
          <td>Maintainer:</td>
          <td>{pkg.maintainer}</td>
        </tr>
        <tr>
          <td>Size:</td>
          <td>{pkg.size}</td>
        </tr>
        <tr>
          <td>Installed Size:</td>
          <td>{pkg.installedSize}</td>
        </tr>
        <tr>
          <td>HomePage:</td>
          <td><a href={pkg.homepage}>{pkg.homepage}</a></td>
        </tr>
        <tr>
          <td>Depends:</td>
          <td>{pkg.depends}</td>
        </tr>
        <tr>
          <td>Recommends:</td>
          <td>{pkg.recommends}</td>
        </tr>
        <tr>
          <td>Suggests:</td>
          <td>{pkg.suggests}</td>
        </tr>
        <tr>
          <td>Breaks:</td>
          <td>{pkg.breaks}</td>
        </tr>
        <tr>
          <td>Priority:</td>
          <td>{pkg.priority}</td>
        </tr>
        <tr>
          <td>Section:</td>
          <td>{pkg.section}</td>
        </tr>
        </tbody>
      </table>
      <p>
        Description:
      </p>
      <pre>{pkg.description}</pre>
    </div>;
  },
});
