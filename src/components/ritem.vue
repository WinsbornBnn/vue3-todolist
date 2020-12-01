<template>
  <div class="recycle-item" :class="{ completed: item.isCompleted}">
    <div class="item-checkbox">
      <input type="checkbox" class="checkbox" disabled="disabled" />
    </div>
    <div class="item-content">
      <div class="break-all">{{item.content}}</div>
    </div>
    <div class="item-revert" title="恢复" @click="$emit('revert',item)"></div>
  </div>
</template>

<script>
export default {
  name: 'ritem',
  props: {
    item: {
      type: Object
    }
  }
}
</script>

<style lang="less">
.recycle-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  .item-content {
    flex: 1;
    padding-left: 10px;
    padding-right: 30px;
  }
  .item-revert {
    cursor: pointer;
    width: 25px;
    height: 25px;
    background-image: url('../assets/revert.png');
    background-size: 60% 60%;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
    position: absolute;
    right: 11px;
    &:hover {
      background-color: #dbdbdb;
    }
  }
}
.recycle-item.completed {
    text-decoration: line-through;
    opacity: 0.5;
  }
</style>
