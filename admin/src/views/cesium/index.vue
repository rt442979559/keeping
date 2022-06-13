<template>
  <div>
    <div id="cesiumContainer" />
  </div>
</template>
<script lang='ts' setup>
import { onMounted , ref } from 'vue';
import { injectCesium } from './main';

  let Cesium:any = null
  let viewer:any = null
  const tiandituTk = `83726763f175b074574beda5bf660af3`
  const defaultAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OWFmYTYyZi1mNDNiLTQ1NDQtODkyZi02ZDU2NTRlNjQwZmEiLCJpZCI6OTcwMTEsImlhdCI6MTY1NDgyODQxMn0.OhiIhiV9gTDGbIbWhyUVqYIPOpdTDoqQM0WwyCWuo50`

  const initCesium = () => {
    injectCesium().then(async(res:any) => {
      Cesium = res
      await initMap()
    })
  }

  const initMap = async() => {
    const clock = new Cesium.Clock({
      startTime: Cesium.JulianDate.now(),
      currentTime: Cesium.JulianDate.now(),
      stopTime:  Cesium.JulianDate.addDays(Cesium.JulianDate.now(), 1, new Cesium.JulianDate()),
      clockRange: Cesium.ClockRange.LOOP_STOP, 
      clockStep: Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
      multiplier: 3000, 
      shouldAnimate: true,
    })
    Cesium.Ion.defaultAccessToken = defaultAccessToken
    viewer = new Cesium.Viewer('cesiumContainer', {
      animation: false,
      homeButton: false, // home键
      geocoder: false, // 地址编码
      baseLayerPicker: false, // 图层选择控件
      timeline: false, // 时间轴
      fullscreenButton: false, // 全屏显示
      infoBox: false, // 点击要素之后浮窗
      sceneModePicker: false, // 投影方式  三维/二维
      navigationInstructionsInitiallyVisible: false, // 导航指令
      navigationHelpButton: false, // 帮助信息
      selectionIndicator: false, // 选择
      shadows: true,
      scene3DOnly: true,
      shouldAnimate: true,
      clockViewModel: new Cesium.ClockViewModel(clock),
      // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
      //   // 影像底图
      //   url: 'https://sznj.zjpy.gov.cn:8080/tianditu-t{s}/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=' + tiandituTk,
      //   subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      //   layer: 'tdtImgLayer',
      //   style: 'default',
      //   format: 'image/jpeg',
      //   tileMatrixSetID: 'GoogleMapsCompatible', // 使用谷歌的瓦片切片方式
      //   show: true
      // })

    })
    viewer.cesiumWidget.creditContainer.style.display = 'none' // 隐藏cesium ion

    viewer.scene.globe.enableLighting = true;
    setScene()
    loadEntities()
  }

  const setScene = () => {
    let homeCameraView = {
      destination : Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 15000.0)
    }
    viewer.scene.camera.flyTo(homeCameraView);
  }

  const loadEntities = () => {
    let polygon = viewer.entities.add({
      name: "正方形",
      id: "square",
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
          -117.16,
          32.71,
          -118.16,
          33.71,
          -119.16,
          33.71,
          -120.16,
          36.71
        ]),
        height: 0,
        material: Cesium.Color.RED.withAlpha(0.5),
        outline: true,
        outlineColor: Cesium.Color.BLACK,
      },
    });
    viewer.zoomTo(polygon);
  }

  onMounted(() => {
    initCesium()
  })
</script>

<style lang='scss' scoped>

</style>