<template>

  <van-form @submit="onRegister">
    <van-cell-group inset>

      <!-- 通过 pattern 进行正则校验 -->
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="帐号"
          placeholder="请输入帐号"
          :rules="[{pattern:/\w{4}/, message: '请输入4位以上帐号' }]"
      />
      <!-- 通过 validator 进行函数校验 -->
      <van-field
          v-model="userPassword"
          name="userPassword"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ pattern:/\w{8}/, message: '请输入8位以上密码' }]"
      />
      <van-field
          v-model="checkPassword"
          name="userPassword"
          type="password"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="[{ validator:doCheck, message: '请输入相同密码' }]"
      />

    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>


</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";


const router = useRouter();
const route = useRoute();

const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const doCheck= () => {
  return checkPassword.value === userPassword.value;
}


const onRegister = async () => {
  const res = await myAxios.post('/user/register', {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value,
  })
  console.log(res, '用户注册');
  if (res.code === 0 && res.data) {
    Toast.success('注册成功');
    // 跳转到之前的页面
    const redirectUrl = route.query?.redirectUrl as string ?? '/user/login';
    window.location.href = redirectUrl;
  } else {
    Toast.fail('注册失败');
  }
};


</script>

<style scoped>

</style>