<template>
  <div>
    <div id="cesiumContainer" />
  </div>
</template>
<script lang='ts' setup async>
import { onMounted , ref } from 'vue';
import { useCesium } from '@/hooks/useCesium'

  const { init , Cesium } = useCesium()
  init()

</script>

<style lang='scss' scoped>

</style>