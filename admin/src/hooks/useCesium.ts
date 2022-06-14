import { ref , nextTick } from 'vue'
import { injectCesium } from '../views/cesium/main.js';

let Cesium:any = null
let viewer:any = null
const tiandituTk = `83726763f175b074574beda5bf660af3`
const defaultAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OWFmYTYyZi1mNDNiLTQ1NDQtODkyZi02ZDU2NTRlNjQwZmEiLCJpZCI6OTcwMTEsImlhdCI6MTY1NDgyODQxMn0.OhiIhiV9gTDGbIbWhyUVqYIPOpdTDoqQM0WwyCWuo50`

export const useCesium = () => {
  // *初始化 Cesium
  const init = async() => {
    const data = await injectCesium()
    Cesium = data
    option()
    handle()
  }

  // *基本配置项
  const option = () => {
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
      clockViewModel: new Cesium.ClockViewModel(clock()),
    })
    Cesium.Ion.defaultAccessToken = defaultAccessToken
    viewer.scene.globe.enableLighting = true; // 启用照明
    viewer.cesiumWidget.creditContainer.style.display = 'none' // 隐藏cesium ion
  }

  // *时间轴变化
  const clock = () => new Cesium.Clock({
    startTime: Cesium.JulianDate.now(),
    currentTime: Cesium.JulianDate.now(),
    stopTime:  Cesium.JulianDate.addDays(Cesium.JulianDate.now(), 1, new Cesium.JulianDate()),
    clockRange: Cesium.ClockRange.LOOP_STOP, 
    clockStep: Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
    multiplier: 3000, 
    shouldAnimate: true,
  })

  // *点击事件
  const handle = () => {
    const handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handle.setInputAction(function (evt:any) {
      console.log(viewer);
      console.log(evt);
    // let pickRay = viewer.camera.getPickRay(evt.position);
    // let layers = viewer.imageryLayers.pickImageryLayers(pickRay, viewer.scene)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }


  return {
    init,
    Cesium,
  }
}



