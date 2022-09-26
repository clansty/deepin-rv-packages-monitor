import { defineComponent } from 'vue';
import PackageList from '@/components/PackageList';
import style from './Index.module.sass'

export default defineComponent({
  render() {
    return <div class={style.container}>
      <h1>Deepin RISC-V Packages (main)</h1>
      <PackageList />
    </div>;
  },
});
