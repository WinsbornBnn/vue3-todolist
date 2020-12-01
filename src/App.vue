<template>
  <div class="container">
    <div class="app-content">
      <NavHeader @change="changePage" :page="currentPage"></NavHeader>
      <Todo v-show="currentPage == 'todo'"></Todo>
      <Recycle v-show="currentPage == 'recycle'"></Recycle>
    </div>
  </div>
</template>

<script>
import NavHeader from '@/components/navheader.vue'
import Todo from '@/views/todo.vue'
import Recycle from '@/views/recycle.vue'
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    NavHeader,
    Todo,
    Recycle
  },
  setup (props) {
    const currentPage = ref('todo')
    function changePage (params) {
      currentPage.value = params
    }
    return {
      currentPage,
      changePage
    }
  }
}
</script>

<style lang="less">
body {
  margin: 0;
}
#app {
  color: #2c3e50;
  background: linear-gradient(180deg, #2ebf91, #8360c3);
  height: 100vh;
  display: flex;
  align-items: center;
}
.container{
  padding: 0 10px;
  flex-grow: 1;/* 弹性值撑满高度*/
  margin: 0 auto;
  position: relative;
}
.app-content{
  background: #ededed;
  padding: 16px;
  padding-top: 0;
  border-radius: 5px;
  box-shadow: 0 0 30px -5px #2c3050;
  margin: 16px auto;
  min-height: 300px;
  min-width: 300px;
}

</style>
