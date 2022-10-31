import { defineComponent } from 'vue';
import PackageList from '@/components/PackageList';
import style from './Index.module.sass';
import { RouterView } from 'vue-router';
import packages from '@/data.json';
import { Package } from '@/types';

export default defineComponent({
  render() {
    return <div class={style.container}>
      <h1>Deepin RISC-V Missing Packages (main)</h1>
      {/** @ts-ignore **/}
      <PackageList packages={packages.pkgsMissing as Package[]} arch="x86_64" />
      <RouterView />
    </div>;
  },
});
