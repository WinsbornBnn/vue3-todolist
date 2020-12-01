!<template>
  <div class="todo-item" :class="{ completed: state.isCompleted }">
    <div class="item-checkbox">
      <input type="checkbox" class="checkbox" v-model="state.isCompleted" />
    </div>
    <div class="item-content">{{ item.content }}</div>
    <div class="item-edit" title="编辑" @Edit="editItem"></div>
    <div class="item-delete" title="删除" @click="deleteItem"></div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
export default {
  name: 'titem',
  props: {
    item: {
      type: Object
    }
  },
  setup (props, { emit }) {
    const state = reactive({
      item: props.item,
      isCompleted: props.item.isCompleted || false
    })
    // 删除
    function deleteItem () {
      emit('delete', state.item)
    }
    // 编辑
    function editItem () {
      emit('edit', state.item)
    }
    watch(
      () => state.isCompleted,
      (val, oldVal) => {
        state.item.isCompleted = val
        emit('complete', state.item)
      }
    )
    return {
      state,
      deleteItem,
      editItem,
      location
    }
  }
}
</script>

<style lang="less">
.todo-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  .item-checkbox {
    .checkbox {
      cursor: pointer;
    }
  }
  .item-content {
    flex: 1;
    padding-left: 10px;
    padding-right: 30px;
  }

  .item-delete {
    cursor: pointer;
    width: 25px;
    height: 25px;
    background-image: url('../assets/delete.png');
    background-size: 60% 60%;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
    position: absolute;
    right: 11px;
  }
  .item-edit {
    cursor: pointer;
    width: 25px;
    height: 25px;
    background-image: url('../assets/edit.png');
    background-size: 60% 60%;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
    position: absolute;
    right: 35px;
  }

  .item-delete:hover,
  .item-edit:hover {
    background-color: #dbdbdb;
  }
}
.todo-item.completed {
    text-decoration: line-through;
    opacity: 0.5;
  }
</style>
