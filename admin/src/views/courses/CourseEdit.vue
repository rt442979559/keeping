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
        class="ruleForm"
      >
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="课程封面图" prop="cover">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3000/upload/"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
          >
            <img v-if="ruleForm.cover" :src="ruleForm.cover" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
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
import { Plus } from '@element-plus/icons-vue'
import { coursesCreate , coursesInfo , coursesUpdata } from '@/api/index.ts'
import { defineProps , computed , reactive , ref , onMounted } from 'vue'
import type { UploadProps } from 'element-plus'
  const router = useRouter()
  const props = defineProps({
    id: {
      type: String,
      default: '',
    },
  })
  const handleAvatarSuccess: UploadProps['onSuccess'] = (response :any,uploadFile :any) => {
    ruleForm.value.cover = URL.createObjectURL(uploadFile.raw!)
  }

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
    router.go(-1)
  }

  const info = async(id) => {
    const data = await coursesInfo(id)
    ruleForm.value = {...data}
  }

  onMounted(async() => {
    props.id ? info(props.id) : ''
  })

</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>