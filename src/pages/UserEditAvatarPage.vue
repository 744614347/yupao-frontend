<template>
  <van-form @submit="onSubmit">
    <img style="height: 48px" :src="editUser.currentValue">
    <van-uploader v-model="fileList" multiple :max-count="1" :after-read="afterRead"/>
<!--    <van-field-->
<!--        v-model="editUser.currentValue"-->
<!--        :name="editUser.editKey"-->
<!--        :label="editUser.editName"-->
<!--        :placeholder="`请输入${editUser.editName}`"-->
<!--    />-->



    <div style="margin: 16px;">
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

const afterRead = (file)=>{
  var data = new FormData();
  console.log(file);
  console.log(fileList.value[0]);
  data.append('file', file.file);
  let config = {
    headers: { //添加请求头
      "Content-Type": "multipart/form-data"
    }
  };
  //上传图片
  axios.post("/api/bill/UploadImage", data, config).then(res => {
    console.log("res", res);
    if (res.data.status == 200) {
      this.fileList.push(res.data.data);
    } else {
      this.$dialog.alert({
        title: "提示",
        message: res.msg,
      });
    }
  })
  console.log("aaaaaaaa")
}


const onSubmit = async () => {
  // const currentUser = await  getCurrentUser();
  // if (!currentUser){
  //   Toast.fail('用户未登录')
  // }
  // if (editUser.value.currentValue === '男'){
  //   editUser.value.currentValue = '0';
  // }
  // if (editUser.value.currentValue === '女'){
  //   editUser.value.currentValue = '1';
  // }
  //
  // console.log("###########",fileList.value)
  //
  // const res = await myAxios.post('/user/update', {
  //   'id': currentUser.id,
  //   [editUser.value.editKey as string]: editUser.value.currentValue,
  // })
  //
  // console.log(res, '更新请求');
  // if (res.code === 0 && res.data > 0) {
  //   Toast.success('修改成功')
  //   router.back();
  // } else {
  //   Toast.fail('修改错误')
  // }
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
  myAxios.post("https://imgtg.com/json", data, config).then(res => {
    console.log(data)
    console.log("res", res);
    if (res.data.status == 200) {
      this.fileList.push(res.data.data);
    } else {
      this.$dialog.alert({
        title: "提示",
        message: res.msg,
      });
    }
  })
};

</script>

<style scoped>

</style>