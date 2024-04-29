<script>
import { defineComponent } from 'vue';
import NavBar from './components/NavBar.vue';

export default defineComponent({
  name: "App",
  components: { NavBar },
  setup() {

    return {

    }
  }

})
</script>

<template>
  <div id="app">
    <div class="_header">
      <NavBar />
    </div>
    <div class="_body">
      <RouterView />
    </div>
  </div>
</template>