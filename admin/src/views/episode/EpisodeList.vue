<template>
  <div>
    <avue-crud 
      :data="avueData" 
      :option="option" 
      @row-save="rowSave"  
      @row-update="rowUpdate"
      @row-del="rowDel"
      @refresh-change="refreshChange">
    </avue-crud>
  </div>
</template>
<script lang='ts' setup>
  import { ref , onMounted } from 'vue'
  import { ElMessageBox ,ElMessage } from 'element-plus';
  import { episodeList , episodeCreate , episodeUpdata , episodeRemove } from '@/api/episode'

  const avueData = ref([])
  const option = ref(
    {
      rowKey:'_id',
      column:[
          {
          label:'课时名称',
          prop:'name'
        }, {
          label:'课时链接',
          prop:'url'
        }
      ]
    }
  )
  const fetch = async() => {
    const data = await episodeList()
    avueData.value = data.data
  }

  const rowSave = async(form , done , loading) => {
    loading()
    await episodeCreate(form)
    done(form)
  }

  const rowUpdate = async(form , index , done , loading) => {
    loading()
    const data = {
      name:form.name,
      url:form.url,
    }
    await episodeUpdata(form['_id'],data)
    done(form)
  }

  const rowDel = async(form) => {
    try {
      await ElMessageBox.confirm('是否确认删除','提示', 
        {confirmButtonText: '确认',cancelButtonText: '取消',type: 'warning'}
      )
    } catch (error) {
      ElMessage.info('取消删除')
      return 
    }
    await episodeRemove(form['_id'])
    ElMessage.success('删除成功')
    fetch()
  }

  const refreshChange = async() => {
    fetch()
  }

  onMounted(async() => {
    fetch()
  })
  
</script>

<style lang='scss' scoped>

</style>