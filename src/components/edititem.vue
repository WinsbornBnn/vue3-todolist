<template>
<div class="edit-item"  @click="editItem">
  我是编辑框
</div>
</template>
<script>
import { reactive } from 'vue'
export default {
  name: 'edititem',
  props: {
    item: {
      type: Object
    }
  },
  setup (props, { emit }) {
    const state = reactive({
      isEditItem: false
    })
    function editItem (item) {
      console.log(this.item)
      emit('complete', this.item)
      state.isEditItem = true
    }
    return {
      state,
      editItem
    }
  }
}
</script>

<style lang="less">
.edit-item{
  background: #ededed;
  padding: 16px;
  padding-top: 0;
  border-radius: 5px;
  box-shadow: 0 0 30px -5px #2c3050;
  margin: 16px auto;
  height: 300px;
  width: 300px;
}
</style>
