<template>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空"></van-empty>
</template>

<script setup lang="ts">
import {ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {UserType} from "../model/user";
import {useRoute} from "vue-router";
import UserCardList from "../components/UserCardList.vue";
import qs from 'qs';


const route = useRoute();
const ids = JSON.parse(route.query.joinTeamUsersId);
const userList = ref([]);
const loading = ref(true);

const loadData = async () => {
  let userListData;
  loading.value = true;
  userListData = await myAxios.get('/user/searchByIds', {
    params: {
      ids,
    },
    paramsSerializer: {
      serialize: function (params) {
        return qs.stringify(params, {arrayFormat: 'repeat'})
      }
    }
  })
      .then(function (response) {
        console.log('/user/searchByIds', response);
        Toast.success('请求成功');
        return response.data;
      })
      .catch(function (error) {
        console.error('/user/searchByIds', error);
        Toast.fail('请求失败');
      })
  if (userListData) {
    userListData.forEach((user: UserType) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

watchEffect(() => {
  loadData();
})


</script>

<style scoped>

</style>
