import { defineComponent, PropType, computed, ref } from 'vue';
import style from './PackageList.module.sass';
import { Package } from '@/types';
import { useClipboard } from '@vueuse/core';
import { RouterLink } from 'vue-router';
import _ from 'lodash';

const Pagination = defineComponent({
  props: {
    count: { type: Number, required: true },
    current: { type: Number, required: true },
    set: { type: Function as PropType<(Number) => any>, required: true },
  },
  setup(props) {
    const buttonStyle = { margin: '0px 5px', color: 'blue', cursor: 'pointer', display: 'inline-block' };
    return () => (<div style={{ width: '80vw', textAlign: 'center' }}>
      {/* @ts-ignore */}
      {props.current !== 1 && <div style={buttonStyle} onClick={() => props.set(props.current - 1)}>&lt;</div>}
      {[...Array(props.count).keys()].map(i => Number(i) + 1).map(i => (
        <div
          style={{ ...buttonStyle, color: i === props.current ? 'black' : 'blue' }}
          // @ts-ignore
          onClick={() => props.set(i)}
        >{i}</div>
      ))}
      {props.current !== props.count &&
        // @ts-ignore
        <div style={buttonStyle} onClick={() => props.set(props.current + 1)}>&gt;</div>}
    </div>);
  },
});

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
    const page = ref(1);

    const packagesDisplay = computed(() => {
      let res = props.packages;
      if (props.hideDbgsym) {
        res = res.filter(pkg => !pkg.package?.endsWith?.('-dbgsym'));
      }
      if (props.showDifferentOnly) {
        res = res.filter(pkg => pkg.versionX86 !== pkg.version);
      }
      return _.chunk(res, 200);
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

    return () => <div>
      <table class={style.pkgList}>
        <tr>
          <th>Package</th>
          <th>Source</th>
          <th>Architecture</th>
          {props.compare && <th style="text-align: right">Version ({props.compareArch})</th>}
          <th style="text-align: right">Version ({props.arch})</th>
        </tr>
        {packagesDisplay.value[page.value].map(pkg => {
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
      </table>
      <Pagination current={page.value} count={packagesDisplay.value.length} set={i => page.value = i} />
    </div>;
  },
});
