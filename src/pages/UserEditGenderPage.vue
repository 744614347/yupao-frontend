<template>
  <van-form @submit="onSubmit">
    <van-field
        v-model="editUser.currentValue"
        :name="editUser.editKey"
        :label="editUser.editName"
        :placeholder="`请输入${editUser.editName}`"
        readonly = true
    />
    <van-radio-group v-model="editUser.currentValue">
      <van-cell-group inset>
        <van-cell title="男" clickable >
          <template #right-icon>
            <van-radio name="男"/>
          </template>
        </van-cell>
        <van-cell title="女" clickable >
          <template #right-icon>
            <van-radio name="女"/>
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";

const route = useRoute();
const router = useRouter();

const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})


const checked = ref(1);


const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    Toast.fail('用户未登录')
  }

  const res = await myAxios.post('/user/update', {
    'id': currentUser.id,
    [editUser.value.editKey as string]: editUser.value.currentValue === '男'? '0':'1',
  })

  console.log(res, '更新请求');
  if (res.code === 0 && res.data > 0) {
    Toast.success('修改成功')
    router.back();
  } else {
    Toast.fail('修改错误')
  }
};

</script>

<style scoped>

</style>
