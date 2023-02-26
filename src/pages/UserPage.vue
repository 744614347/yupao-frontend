<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username"/>
    <van-cell title="修改信息" is-link to="/user/update"/>
    <van-cell title="我创建的队伍" is-link to="/user/team/create"/>
    <van-cell title="我加入的队伍" is-link to="/user/team/join"/>
    <van-button class="logout-button" type="danger" block plain @click="logout">退出登录</van-button>

  </template>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";

const user = ref();
const fileList = ref([]);

console.log(fileList);

onMounted(async () => {
  user.value = await getCurrentUser();

})

const router = useRouter();


const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

const logout = async () => {
  const res = await myAxios.post('/user/logout',{})
  console.log(res,'用户退出');
  if (res.code === 0 && res.data){
    Toast.success('退出成功');
    location.reload();
  } else {
    Toast.fail('退出失败');
  }
}




</script>

<style scoped>

</style>