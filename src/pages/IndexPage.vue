<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const session = localStorage.getItem('apo@session');
    window.location.replace(session ? '#/' : '#/login');
  },
});
</script>
