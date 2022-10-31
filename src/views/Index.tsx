import { defineComponent, ref } from 'vue';
import PackageList from '@/components/PackageList';
import style from './Index.module.sass';
import { RouterLink, RouterView } from 'vue-router';
import packages from '@/data.json';
import { Package } from '@/types';

export default defineComponent({
  setup() {
    const hideDbgsym = ref(true);
    const showDifferentOnly = ref(false);

    return () => <div class={style.container}>
      <h1>Deepin RISC-V Packages (main)</h1>
      <p style={{ marginTop: 0 }}>
        <RouterLink to="missing">Missing packages (compared to x86_64)</RouterLink>
      </p>
      <p>
        {/* @ts-ignore */}
        <input type="checkbox" vModel={hideDbgsym.value} id="hideDbgsym" />
        <label for="hideDbgsym">隐藏 dbgsym</label>
        {/* @ts-ignore */}
        <input type="checkbox" vModel={showDifferentOnly.value} id="showDifferentOnly" />
        <label for="showDifferentOnly">只显示不同版本</label>
      </p>
      <PackageList
        // @ts-ignore
        packages={packages.riscvCompare as Package[]} compare={true}
        arch="RISC-V" compareArch="x86_64"
        hideDbgsym={hideDbgsym.value} showDifferentOnly={showDifferentOnly.value}
      />
      <RouterView />
    </div>;
  },
});
