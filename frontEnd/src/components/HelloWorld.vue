<template>
    <div>
        {{ helloWorldStr.name }}
    </div>
</template>

<script>
import { helloWorldStore } from '@/stores/helloWorld';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "HelloWorld",
  setup() {

    const helloWorldStr = helloWorldStore()
    return {
        helloWorldStr
    }
  }

})
</script>