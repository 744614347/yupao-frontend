<template>

  <user-card-list :user-list = "userList"/>
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空"></van-empty>

</template>

<script setup >
import {useRoute} from 'vue-router';
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const {tags} = route.query;

const userList = ref([]);


onMounted(async () => {
  // Optionally the request above could also be done as
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList:tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
      .then(function (response) {
        console.log('/user/search/tags success',response);
        Toast.success('请求成功');
        return response?.data;
      })
      .catch(function (error) {
        console.error('/user/search/tags error',error);
        Toast.fail('请求失败');

      })
    if (userListData){
      userListData.forEach(user => {
        if (user.tags){
          user.tags = JSON.parse(user.tags)
        }
      })
      userList.value = userListData;
    }
})



//   const mockUser = {
//   id: 12345,
//   username: 'wjj',
//   userAccount: '12345',
//   profile: '一名精神小伙，目前还有头发，阿爸阿爸阿爸吧',
//   avatarUrl: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/logo.png',
//   gender: 0,
//   phone: '13111311',
//   email: 'wdawdww@qq.com',
//   userRole: 0,
//   planetCode: '1234',
//   tags: ['java', 'emo', '打工', '打工中'],
//   createTime: new Date(),
//
// }


</script>

<style scoped>

</style>