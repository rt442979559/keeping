<template>
  <div>
    {{address}}
    <GaodeMap v-model:visible="showMap" v-model:lonlat="lonlat"  @getAddress="(val) => address = val" />
  </div>
</template>
<script lang='ts' setup>
  import GaodeMap from './GaodeMap.vue'
  import { ref } from 'vue'

  const showMap = ref(false)
  const lonlat = ref('')
  const address = ref('')

</script>
