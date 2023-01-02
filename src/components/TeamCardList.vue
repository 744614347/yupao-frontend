<template>
  <div
      id="teamCardList"
  >
    <van-card
        v-for="team in props.teamList"
        :thumb="group"
        :desc="team.description"
        :title="`${team.name}`"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ '最大人数：' + team.maxNum }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间：' + team.expireTime }}
        </div>
        <div v-if="team.expireTime">
          {{ '创建时间：' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button size="small" type="primary" plain @click="doJoinTeam(team.id)">加入队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small"  plain @click="doUpdateTeam(team.id)">更新队伍</van-button>
      </template>
    </van-card>
  </div>


</template>

<script setup lang="ts">
import {TeamType} from "../model/team";
import {teamStatusEnum} from "../constants/team";
import group from '../assets/group.png'
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUserState} from "../states/user";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";


interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
})

const currentUser = ref();

onMounted(async () => {
  currentUser.value = await getCurrentUser();

})

/**
 * 加入队伍
 * @param id
 */
const doJoinTeam = async (id: number) => {
  const res = await myAxios.post('/team/join', {
    teamId: id
  });
  if (res?.code === 0) {
    Toast.success('加入成功');
  } else {
     Toast.fail('加入失败' + (res.description ? `，${res.description}` : ''));
  }
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>