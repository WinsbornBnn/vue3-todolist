<template>
  <div class="nav-header">
    <a @click="changePage('todo')" :class="{active:page == 'todo'}">待办事项</a> |
    <a @click="changePage('recycle')"  :class="{active:page == 'recycle'}">回收站</a>
    <span class="clear" @click="clear">清空</span>
  </div>
</template>

<script>
import dataUtils from '@/utils/dataUtils.js'
export default {
  name: 'navheader',
  props: {
    page: {
      trye: String
    }
  },
  setup (props, context) {
    function changePage (params) {
      context.emit('change', params)
    }
    function clear () {
      dataUtils.clearAllitem()
      window.location.reload()
    }
    return {
      changePage,
      clear
    }
  }
}
</script>

<style lang="less">
.nav-header {
  padding: 20px;
  text-align: center;
  a {
    font-weight: 700;
    color: #2e3e50;
    cursor: pointer;
  }
   a.active {
      color: #42b983;
    }
  .clear {
    position: absolute;
    right: 21px;
    top: 35px;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
