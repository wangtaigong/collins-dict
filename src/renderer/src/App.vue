<script setup lang="ts">
import debounce from 'lodash.debounce';
import { ref, watch } from 'vue'

const dict = ref('')
const collinsHtml = ref('')
watch(dict, () => {
  collinsHtml.value = ''
  debounce(fetchDict, 200)()
})

async function fetchDict() {
  const word = dict.value.trim()
  if (!word) return
  const res = await window.electron.ipcRenderer.invoke('fetchDict', word)
  collinsHtml.value = res || `没有找到该单词：${word}`
}
</script>

<template>
  <div class="container">
    <div class="content">
      <Form ref="formInline" style="padding: 0 10px" @submit.prevent>
        <FormItem prop="user">
          <Input v-model="dict" type="text" search placeholder="请输入要查询的英文单词"></Input>
        </FormItem>
      </Form>
      <div class="result customizeScroll">
        <div v-html="collinsHtml"></div>
      </div>
    </div>
  </div>
</template>
<style lang="postcss">
.container {
  display: flex;
  justify-content: center;
  height: 100vh;
  padding: 10px 0px;
  padding-top: 30px;
  .content {
    width: 600px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .result {
    padding: 0 10px;
    flex-grow: 1;
    overflow-y: auto;
  }
}

.ol {
  margin-top: 7px;
}
.collinsToggle h4 .title {
  color: #eb6100;
}
.star {
  height: 14px;
  width: 5px;
  display: inline-block;
}
b {
  color: #47a75f;
}
.collinsMajorTrans {
  background: #eff5f8;
  padding: 5px 5px 5px 5px;
  border-radius: 4px;
  .collinsOrder {
    float: left;
  }
}
.exampleLists {
  margin: 10px 0 10px 20px;
  color: #626262;
  .collinsOrder {
    float: left;
  }
}
</style>
