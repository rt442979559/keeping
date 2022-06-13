<template>
  <div>
    <avue-crud 
      ref="crudRef"
      class="avue-crud"
      :data="avueData" 
      :page="page"
      :option="option" 
      @row-save="rowSave"  
      @row-update="rowUpdate"
      @row-del="rowDel"
      @refresh-change="refreshChange"
      @on-load="changePage"
      @sort-change="sortChange"
      @search-change="searchChange"
      :upload-before="uploadBefore"
      >
    </avue-crud>
  </div>
</template>
<script lang='ts' setup>
  import { ref , onMounted } from 'vue'
  import { ElMessageBox ,ElMessage } from 'element-plus';
  import { episodeList , episodeCreate  , episodeUpdata , episodeRemove , episodeOption } from '@/api/episode'

  const crudRef = ref()
  const avueData = ref([])
  const option = ref({})
  const page:any = ref({
    total: 10,
    pageSize: 10, 
    pageSizes:[5,10,20,50]
  })
  const params:any = {
    query:{
      limit:10, // 每页条数
      page:1, // 当前页
      sort:Object,
      where:''
    }
  }
  // *翻页
  const changePage = async(page:any) => {
    params.query.page = page.currentPage
    params.query.limit = page.pageSize
    fetch()
  }  
  // *排序
  const sortChange = async(val) => {
    if(!val.order){
      params.query.sort = null
    }else{
      params.query.sort = {
        [val.prop]: val.order === 'ascending' ? 1 : -1
      }
    }
    fetch()
  }
  // *搜索
  const searchChange = async(where,done) => {
    where.name = { $regex : where.name }
    params.query.where = where
    fetch()
    done()
  } 


  const fetchOption = async() => {
    const data = await episodeOption()
    option.value = data
  }

  const fetch = async() => {
    const data = await episodeList(params)
    avueData.value = data.data
    page.value.total = data.total
  }

  const rowSave = async(row , done , loading) => {
    loading()
    await episodeCreate(row)
    ElMessage.success('创建成功')
    fetch()
    done()
  }

  const rowUpdate = async(row , index , done , loading) => {
    loading()
    const data = { ...row }
    delete data.$index

    await episodeUpdata(row['_id'],data)
    ElMessage.success('更新成功')
    fetch()
    done()
  }

  const uploadBefore = (file,done) => {
    console.log(file)
    done()
  }

  const rowDel = async(row) => {
    try {
      await ElMessageBox.confirm('是否确认删除','提示', 
        {confirmButtonText: '确认',cancelButtonText: '取消',type: 'warning'}
      )
    } catch (error) {
      ElMessage.info('取消删除')
      return 
    }
    await episodeRemove(row['_id'])
    ElMessage.success('删除成功')
    fetch()
  }

  const refreshChange = async() => {
    fetch()
  }

  onMounted(async() => {
    fetchOption()
    fetch()
  })
  
</script>

<style scoped>
.avue-crud >>> .avue-form__group{
  flex-wrap: nowrap;
}
</style>