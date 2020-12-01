<template>
  <div class="recycle">
    <div class="title">回收站</div>
    <div class="no-data" v-if="state.recycleItems.length == 0">
      暂无已删除事项
    </div>
    <ritem
      v-for="item in state.recycleItems"
      :key="item.id"
      :item="item"
      @revert="revertItem"
    ></ritem>
  </div>
</template>
<script>
import ritem from '../components/ritem.vue'
import { reactive, watch, onMounted } from 'vue'
import dataUtils from '@/utils/dataUtils.js'
export default {
  name: 'recycle',
  components: {
    ritem
  },
  setup () {
    const state = reactive({
      recycleItems: [] // 已删除事项列表
    })
    // 获取存储器已删除的事项
    function fetchData () {
      state.recycleItems = dataUtils.getItem('recycleList') || []
    }
    // 恢复
    function revertItem (obj) {
      const newArray = []
      state.recycleItems.forEach((item) => {
        if (item.id !== obj.id) {
          newArray.push(item)
        }
      })
      state.recycleItems = newArray
      window.mitt.emit('addRevert', obj)
    }
    // 存储删除事项
    function storeItems (array) {
      dataUtils.setItem('recycleList', array)
    }
    // 监听存储事项，一旦改动，立即更新
    watch(
      () => state.recycleItems,
      (val, oldVal) => {
        storeItems(val)
      }
    )
    onMounted(() => {
      window.mitt.on('addDelete', (obj) => {
        const array = []
        // 复制原有数组的内容
        state.recycleItems.forEach((item) => {
          array.push(item)
        })
        array.push(obj)
        state.recycleItems = array
      })
      fetchData()
    })
    return {
      state,
      revertItem
    }
  }
}
</script>

<style lang="less">
.recycle {
  .title {
    font-size: 24px;
    font-weight: 600;
    line-height: 27px;
    margin-bottom: 24px;
    text-align: center;
  }
  .no-data {
    text-align: center;
  }
}
</style>
