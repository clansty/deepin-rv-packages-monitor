import { defineComponent, PropType, computed } from 'vue';
import style from './PackageList.module.sass';
import { Package } from '@/types';

export default defineComponent({
  props: {
    packages: { type: Array as PropType<Package[]>, required: true },
    compare: String as PropType<'X86' | 'Sid' | 'SidRv'>,
    arch: String,
    compareArch: String,
    hideDbgsym: Boolean,
    showDifferentOnly: Boolean,
  },
  setup(props) {
    const packagesDisplay = computed(() => {
      let res = props.packages;
      if (props.hideDbgsym) {
        res = res.filter(pkg => !pkg.package?.endsWith?.('-dbgsym'));
      }
      if (props.showDifferentOnly) {
        res = res.filter(pkg => pkg.versionX86 !== pkg.version);
      }
      return res;
    });

    return () => <table class={style.pkgList}>
      <tr>
        <th>Package</th>
        <th>Source</th>
        <th>Architecture</th>
        {props.compare && <th style="text-align: right">Version ({props.compareArch})</th>}
        <th style="text-align: right">Version ({props.arch})</th>
      </tr>
      {packagesDisplay.value.map(pkg => {
        const isVersionSame = !pkg[`version${props.compare}`] || pkg[`version${props.compare}`] === pkg.version;
        return (
          // @ts-ignore
          <tr onClick={() => props.arch === 'RISC-V' && window.open(`/${pkg.package}`)}>
            <td>{pkg.package}</td>
            <td>{pkg.source}</td>
            <td>{pkg.architecture}</td>
            {props.compare && <td align="right">
              {pkg[`version${props.compare}`]}
            </td>}
            <td align="right" style={isVersionSame ? {} : { color: 'red' }}>
              {pkg.version}
            </td>
          </tr>
        );
      })}
    </table>;
  },
});
