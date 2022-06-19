<template>
  <div>
    <el-button @click="showMap = true">地图选点</el-button>
    <GaodeMap v-model:visible="showMap" ref="GaodeMapRef" v-model:lonlat="lonlat"  />
  </div>
</template>
<script lang='ts' setup>
  import GaodeMap from './GaodeMap.vue'
  import { ref } from 'vue'

  const showMap = ref(false)

</script>
