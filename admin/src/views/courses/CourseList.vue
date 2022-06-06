<template>
  <div>
    <h3>课程列表</h3>
    <div>
      <el-button style="margin-bottom:20px" size="small" @click="$router.push('/courses/create')">创建课程</el-button>
    </div>
    <el-table :data="list" border stripe>
      <el-table-column v-for="(field,name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="field.width"
        :formatter="field.formatter"
        >
      </el-table-column>
      <el-table-column label="操作" :width="200">
        <template #default="scope">
          <el-button size="mini" @click="$router.push(`/courses/edit/${scope.row._id}`)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleRemove(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref , onMounted } from 'vue'
import { ElMessage , ElMessageBox } from 'element-plus'
import { coursesList , coursesRemove } from '@/api/index'

  const list = ref([]);
  const fields = ref({
    _id:{ label : 'ID' , width:'auto'},
    name:{ label : '课程名称' , width:'auto'},
    cover:{ label : '封面图' , width:'200' , formatter: (row) => {
      return <el-image src={row.cover} preview-src-list={[row.cover]} fit="fill" style="width:180px" />
    }}
  })

  const fetch = async() => {
    const res = await coursesList()
    list.value = res.data
  }

  const handleRemove = async(id) => {
    try {
      await ElMessageBox.confirm('是否确认删除','提示', 
        {confirmButtonText: '确认',cancelButtonText: '取消',type: 'warning'}
      )
    } catch (error) {
      ElMessage.info('取消删除')
      return 
    }
    await coursesRemove(id)
    ElMessage.success('删除成功')
    fetch()
  }
  
  onMounted(() => {
    fetch()
  })
</script>

<style>

</style>