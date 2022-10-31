import { defineComponent } from 'vue';
import PackageList from '@/components/PackageList';
import style from './Index.module.sass';
import { RouterLink, RouterView } from 'vue-router';
import packages from '@/data.json';
import { Package } from '@/types';

export default defineComponent({
  render() {
    return <div class={style.container}>
      <h1>Deepin RISC-V Packages (main)</h1>
      <p style={{ marginTop: 0 }}>
        <RouterLink to="missing">Missing packages (compared to x86_64)</RouterLink>
      </p>
      <PackageList
        // @ts-ignore
        packages={packages.riscvCompare as Package[]} compare={true}
        arch="RISC-V" compareArch="x86_64"
      />
      <RouterView />
    </div>;
  },
});
