<template>
  <div>
    <h3>{{isEdit}}</h3>
      <el-form
        label-position="right"
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="课程封面图" prop="cover">
          <el-input v-model="ruleForm.cover" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { coursesCreate , coursesInfo , coursesUpdata } from '@/api/index.ts'
import { defineProps , computed , reactive , ref , onMounted } from 'vue'
  const router = useRouter()
  const props = defineProps({
    id: {
      type: String,
      default: '',
    },
  })

  const isEdit = computed(() => props.id ? '编辑课程' : '创建课程')
  
  const form = {
    name: '',
    cover:''
  }

  const ruleForm = ref(JSON.parse(JSON.stringify(form)))

  const rules = reactive({
    name: [{ required: true, message: 'Please input Activity name', trigger: 'blur' },],
    cover: [{ required: true, message: 'Please input Activity name', trigger: 'blur' },],
  })
  
  const submitForm = async() => {
    props.id ? await coursesUpdata(props.id , ruleForm.value) : await coursesCreate(ruleForm.value)
    ElMessage.success('保存成功')
    ruleForm.value = form
    console.log(ruleForm.value);
    router.go(-1)
  }

  const info = async(id) => {
    const data = await coursesInfo(id)
    ruleForm.value = {...data.data}
  }

  onMounted(async() => {
    props.id ? info(props.id) : ''
  })

</script>

<style>

</style>