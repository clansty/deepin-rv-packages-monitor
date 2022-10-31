import { defineComponent, ref } from 'vue';
import PackageList from '@/components/PackageList';
import style from './Index.module.sass';
import { RouterView } from 'vue-router';
import packages from '@/data.json';
import { Package } from '@/types';

export default defineComponent({
  setup() {
    const hideDbgsym = ref(true);

    return () => <div class={style.container}>
      <h1>Deepin RISC-V Missing Packages (main)</h1>
      <p>
        {/* @ts-ignore */}
        <input type="checkbox" vModel={hideDbgsym.value} id="hideDbgsym" />
        <label for="hideDbgsym">隐藏 dbgsym</label>
      </p>
      <PackageList
        // @ts-ignore
        packages={packages.pkgsMissing as Package[]} arch="x86_64"
        hideDbgsym={hideDbgsym.value}
      />
      <RouterView />
    </div>;
  },
});
