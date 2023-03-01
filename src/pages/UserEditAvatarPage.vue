<template>
  <van-form @submit="onSubmit">
    <div style="text-align: center">
      <img style="height: 100px" :src="editUser.currentValue" ><br/>
      <van-uploader v-model="fileList" multiple :max-count="1" preview-size="100px"/>

    </div>
    <div style="margin: 16px;" >
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const fileList = ref([]);

const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})




const onSubmit = async () => {
  var data = new FormData();
  console.log(fileList);
  console.log(fileList.value[0]);
  data.append('file', fileList.value[0].file);
  let config = {
    headers: { //添加请求头
      "Content-Type": "multipart/form-data"
    }
  };
  //上传图片
  myAxios.post("/uploadImage", data, config).then(res => {
    console.log(data)
    console.log("res", res);
    if (res.code === 0 && res.data > 0) {
      Toast.success('修改成功')
      router.back();
    } else {
      Toast.fail('修改错误')
    }
  })
};

</script>

<style scoped>

</style>
