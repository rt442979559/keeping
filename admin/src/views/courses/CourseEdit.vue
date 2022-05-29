<template>
  <div>
    <h3>编辑课程</h3>
    
  </div>
</template>

<script lang="ts">
// import { coursesList } from '@/api/index'
import { Options, Vue  } from "vue-class-component";
@Options({
  components: {},
  Prop:{
    id:String
  }
})

export default class CoursesEdit extends Vue {


  created(){
  }

}
</script>

<style>

</style>