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
    const compareWith = ref<'X86' | 'Sid'>('X86');

    return () => <div class={style.container}>
      <h1>Deepin RISC-V Packages (main)</h1>
      <p style={{ marginTop: 0 }}>
        <RouterLink to="missing">Missing packages (compared to x86_64)</RouterLink>
      </p>
      <p>
        {/* @ts-ignore */}
        <input type="checkbox" vModel={hideDbgsym.value} id="hideDbgsym" />
        <label for="hideDbgsym">Hide dbgsym</label>
        {/* @ts-ignore */}
        <input type="checkbox" vModel={showDifferentOnly.value} id="showDifferentOnly" />
        <label for="showDifferentOnly">Show only differences</label>

        <span style={{ marginLeft: '10px' }}>
          Compare with:
          {/* @ts-ignore */}
          <input type="radio" id="x86" value="X86" vModel={compareWith.value} />
          <label for="x86">Deepin x86_64</label>

          {/* @ts-ignore */}
          <input type="radio" id="sid" value="Sid" vModel={compareWith.value} />
          <label for="sid">Debian Sid</label>
        </span>
      </p>
      <PackageList
        // @ts-ignore
        packages={packages.riscvCompare as Package[]} compare={compareWith.value}
        arch="RISC-V" compareArch="x86_64"
        hideDbgsym={hideDbgsym.value} showDifferentOnly={showDifferentOnly.value}
      />
      <RouterView />
    </div>;
  },
});
