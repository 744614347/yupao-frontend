<template>
  <van-skeleton title avatar :row="3" :loading="props.loading"  v-for="user in props.userList">
  <van-card
      :desc="user.profile"
      :title="`${user.username} (${user.planetCode})`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini" @click="contextMe(user)">联系我</van-button>
    </template>
  </van-card>
  </van-skeleton>

</template>

<script setup lang="ts">
import {UserType} from "../model/user";
import {Dialog} from "vant";

interface UserCardListProps {
  loading: boolean;
  userList: UserType[];
}

const props =  withDefaults(defineProps<UserCardListProps>(),{
  loading: true,
  // @ts-ignore
  userList: [] as UserType[],
})

const contextMe = (user:UserType)=>{
  Dialog.alert({
    title: '联系我',
    message: `邮箱：${user.email}
    电话：${user.phone}`,
  }).then(() => {
    // on close
  });
}

</script>

<style scoped>

</style>