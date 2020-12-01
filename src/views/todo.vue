<template>
  <div class="todo">
    <div class="title">事项列表</div>
    <div class="add-item">
      <input
        type="text"
        class="input"
        placeholder="请输入事项"
        name="new_todo"
        v-model="state.newTodoContent"
        @keyup.enter.prevent="saveTodo"
      />
    </div>
    <div>
      <titem
        v-for="item in state.todoItems"
        :key="item.id"
        :item="item"
        @delete="deleteItem"
      ></titem>
    </div>
  </div>
</template>
<script>
import titem from '@/components/titem.vue'
import { reactive, watch, onMounted } from 'vue'
import dataUtils from '@/utils/dataUtils.js'
export default {
  name: 'todo',
  components: {
    titem
  },
  setup () {
    const state = reactive({
      newTodoContent: '', // 输入框的内容
      todoItems: [], // 代办事项列表
      editlist: []
    })
    // 获取数据
    function fetchData () {
      state.todoItems = dataUtils.getItem('todolist') || []
    }
    // 创建事项
    function saveTodo () {
      if (!state.newTodoContent) return
      const array = []
      // 复制数组原有内容
      state.todoItems.forEach((item) => {
        array.push(item)
      })
      // 将创建的事项存入列表
      array.push({
        id: Math.random().toString(36).substr(2, 5), // 随机ID
        content: state.newTodoContent // 内容
      })
      state.todoItems = array
      // 清空输入框
      state.newTodoContent = ''
    }
    // 存储事项列表
    function storeItem (array) {
      dataUtils.setItem('todolist', array)
    }
    // 删除
    function deleteItem (obj) {
      // 根据id删除
      const newArray = []
      state.todoItems.forEach((item) => {
        if (item.id !== obj.id) {
          newArray.push(item)
        }
      })
      state.todoItems = newArray
      // 更新数据
      window.mitt.emit('addDelete', obj)
    }
    // 修改
    function completeItem (obj) {
      // console.log(obj)
      const newArray = []
      state.todoItems.forEach((item) => {
        if (item.id === obj.id) {
          newArray.push(obj)
        } else {
          newArray.push(item)
        }
      })
      state.todoItems = newArray
      window.mitt.emit('edit', obj)
    }
    // 监听存储事项，一旦改动。立即更新
    watch(
      () => state.todoItems, (val, oldVal) => {
        storeItem(val)
      }
    )
    onMounted(() => {
      window.mitt.on('addRevert', (obj) => {
        const array = []
        // 复制原有数组的内容
        state.todoItems.forEach((item) => {
          array.push(item)
        })
        array.push(obj)
        state.todoItems = array
      })
      // 获取数据
      fetchData()
    })
    return {
      state,
      saveTodo,
      deleteItem,
      completeItem
    }
  }
}
</script>
<style lang="less">
.todo {
  .title {
    font-size: 24px;
    font-weight: 700;
    line-height: 27px;
    margin-bottom: 24px;
    text-align: center;
  }
  .add-item {
    margin-bottom: 10px;
    .input {
      box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10 0.05);
      width: 100%;
      height: 40px;
      padding: 4px;
      font-size: 16px;
      color: #363636;
      background-color: #fff;
      border-color: transparent;
      border-radius: 5px;
      box-sizing: border-box;
    }
  }
}
</style>
