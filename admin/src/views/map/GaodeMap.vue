<template>
  <div>
    <el-dialog
      top="10%"
      width="62%"
      v-model="visible"
      :show-close="false"
      custom-class="dialog_style"
      title="地图选点"
      @close="close"
      :destroy-on-close="true"
      >
      <div id="container"></div>
      <el-input
        id="search-input"
        v-model="searchValue"
        class="input-with"
        placeholder="请输入地址"
        clearable
        @keyup.enter="handelSearch"
    />
    <el-button
        size="small"
        type="primary"
        @click="handelSearch">搜索</el-button>
        <div id="searchResultPanel" ></div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="visible = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang='ts' setup>
  import { ref , computed , watchEffect , defineProps , defineEmits} from 'vue'
  import { plugin } from './plugin.js'
  const props = defineProps(['visible','lonlat'])
  const emits = defineEmits(['update:visible','update:lonlat'])
  const visible = computed({
    get: () => props.visible,
    set: (val) => emits('update:visible', val),
  })
  const lonlat = computed({
    get: () => props.lonlat,
    set: (val) => emits('update:lonlat', val),
  })

  let map:any = null
  let AMap:any = null

  const startAutoComplete:any  = ref('')
  const startPlaceSearch:any = ref('')

  const mapInit = async() => {
    const res = await plugin()
    AMap = res
    map = new AMap.Map('container', {
      zoom: 18,
      viewMode: '3D',
      center: [120.56447, 27.602587],
      pitch: 50,
      rotation: 35,
    })
    map.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'], () => {
      // 工具条
      const toolbar = new AMap.ToolBar()
      // 比例尺
      const scale = new AMap.Scale()
      // 显示鹰眼
      const overView = new AMap.OverView()
      map.addControl(toolbar)
      map.addControl(scale)
      map.addControl(overView)
    })

    // *添加maker
    setMaker()

    // *添加鼠标单击事件
    addAmapGeocoder()

    // *添加定位
    // addAMapGeolocation()

    // *添加检索提示
    addAMapAutocompletePlaceSearch()
  }


  const formattedAddress = ref('') // 默认地址
  const position = ref({}) // 地址对应的经纬度信息
  const marker:any = ref('') // 地图标记
  const geocoder:any = ref('') // 地址解析
  const setMaker = () => {
    marker.value = new AMap.Marker()
    map.add(marker.value)
    map.plugin('AMap.Geocoder',() => {
      geocoder.value = new AMap.Geocoder({
        radius: 1000 // 范围，默认：500
      })
    })
  }

  const addAmapGeocoder = () => {
    // map.on('click',handleEvent)
    // setMaker()
    map.on('click', e => {
      const lnglat = [e.lnglat.lng, e.lnglat.lat]
      marker.value.setPosition(lnglat)
      // geocoder.value.getAddress(lnglat, (status, result) => {
      //   console.log(status , result)
      //   if (status === 'complete' && result.regeocode) {
      //     const res = result.regeocode
      //     const data = {
      //       adress: res.formattedAddress,  // 地址名称
      //       lat: lnglat[1], // 纬度lat
      //       lng: lnglat[0] // 经度lng
      //     }
      //     console.log(res,'resees')
      //     formattedAddress.value = res.formattedAddress
      //     position.value = data
      //   }
      // })
    })
  }

  const addAMapGeolocation = () => {
    map.plugin('AMap.Geolocation',() => {  
      const geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(200, 200),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: 'RB'
      })
      geolocation.getCurrentPosition()
      console.log(geolocation.getCurrentPosition())
      AMap.event.addListener(
        geolocation,
        'complete',
        onCurrentPositionComplete
      )
    })
  }

  const onCurrentPositionComplete = (res) => {
    setMaker()
    console.log(res)
  }

  const searchValue = ref('')
  const placeSearch = ref('')
  const addAMapAutocompletePlaceSearch = () => {
    map.plugin('AMap.Autocomplete', () => {
      const auto = new AMap.Autocomplete({
        input: 'search-input'
      })
      // 添加检索监听
      AMap.event.addListener(auto, 'select', onSelectAutocomplete)
    })
    AMap.service(['AMap.PlaceSearch'], () => {
      // 构造地点查询类
      placeSearch.value = new AMap.PlaceSearch({
        type: '', // 兴趣点类别
        pageSize: 5, // 单页显示结果条数
        pageIndex: 1, // 页码
        citylimit: false, // 是否强制限制在设置的城市内搜索
        map: map, // 展现结果的地图实例
        panel: 'searchResultPanel', // 结果列表将在此容器中进行展示。
        autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
      })
    })

    AMap.event.addListener(
      placeSearch.value,
      'listElementClick',
      onSelectSearch
    )
  }

  const onSelectSearch = (e) => {
    console.log(e , 'e')
  }

  const onSelectAutocomplete = (e) => {
    console.log(e)
  }









  watchEffect(() => {
    if(visible.value){
      mapInit()
    }
  })

  const handleMarker = (lng,lat) => {
    let marker = new AMap.Marker({
      position: new AMap.LngLat(lng,lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: '北京'
    })
    map.add(marker)
    map.setFitView()
  }

  const handleEvent = (e) => {
    const { lnglat } = e
    handleMarker(lnglat.lng ,lnglat.lat)
  }

  const close = () => {
    map.destroy()
    // map.value = null
    // AMap.value = null
  }
  

</script>

<style scoped>
#container {
  width:100%;
  height: 500px;
  overflow: hidden;
}
</style>