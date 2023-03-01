<template>
  <van-form @submit="onSubmit">

    <van-cell-group inset>
      <van-field
          v-model="newTag"
          center
          clearable
          label="增加标签"
          placeholder="请输入标签"
      >
        <template #button >
          <van-button size="small" type="primary" @click="add">增加</van-button>
        </template>
      </van-field>
    </van-cell-group>


    <van-checkbox shape="square" name="tag" v-model="tag.checked" v-for="(tag, index) in tagsList" style="margin: 10px">
        {{ tag.tagName }} + {{ index }} + {{tag.checked}}
      </van-checkbox>



    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交111
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";

const route = useRoute();
const router = useRouter();

const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
  tagList: [],
})


const tagsList = ref([])
const newTag = ref('')

class Obj{
  tagName: string | undefined
  checked: boolean | undefined
  constructor(tagName: string, checked: boolean) {
    this.tagName = tagName;
    this.checked = checked;
  }
}

if (route.query.currentValue) {
  let list = JSON.parse(route.query.currentValue);
  list.forEach(t=>{
    let o = new Obj(t,true)
    tagsList.value.push(o);
  })
}
const add = ()=>{
  addTags();
}

const addTags = ()=>{
  if (newTag.value.length === 0){
    return
  } else {
    let obj = new Obj(newTag.value, true);
    tagsList.value.unshift(obj);
  }
}


const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    Toast.fail('用户未登录')
  }
  tagsList.value = tagsList.value.filter(tag=>{
    return tag.checked;
  })
  const res = await myAxios.post('/user/update', {
    'id': currentUser.id,
    [editUser.value.editKey as string]: JSON.stringify(tagsList.value.map(tag => {
      return tag.tagName;
    })),
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
