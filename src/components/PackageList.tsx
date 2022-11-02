import { defineComponent, PropType, computed } from 'vue';
import style from './PackageList.module.sass';
import { Package } from '@/types';
import { useClipboard } from '@vueuse/core';
import { RouterLink } from 'vue-router';

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
    const { copy, copied } = useClipboard();

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

    const CopyText = defineComponent({
      props: {
        text: String,
      },
      setup(props) {
        return () =>
          // @ts-ignore
          <span style="cursor: pointer" onClick={() => copy(props.text)}>
        {props.text}
      </span>;
      },
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
          <tr>
            <td><CopyText text={pkg.package} /></td>
            <td><CopyText text={pkg.source} /></td>
            <td><CopyText text={pkg.architecture} /></td>
            {props.compare && <td align="right">
              <CopyText text={pkg[`version${props.compare}`]} />
            </td>}
            <td align="right" style={isVersionSame ? {} : { color: 'red' }}>
              <CopyText text={pkg.version} />
            </td>
            {props.arch === 'RISC-V' && <td style={{ paddingLeft: '10px' }}>
              <RouterLink to={'/' + pkg.package}>Details</RouterLink>
            </td>}
          </tr>
        );
      })}
    </table>;
  },
});
