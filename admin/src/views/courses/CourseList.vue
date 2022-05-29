<template>
  <div>
    <h3>课程列表</h3>
    <el-table :data="list" border stripe>
      <el-table-column v-for="(field,name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="field.width">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { coursesList } from '@/api/index'
import { Options, Vue } from "vue-class-component";
@Options({
  components: {},
})
export default class CoursesList extends Vue {
  list = [];
  fields = {
    _id:{ label : 'ID' , width:'auto'},
    name:{ label : '课程名称' , width:'auto'},
    cover:{ label : '封面图' , width:'auto'},
  }

  async fetch(){
    const res = await coursesList()
    this.list = res.data.data
  }

  created(){
    this.fetch()
  }

}
</script>

<style>

</style>