<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Modal v-model:visible="visible" @ok="handleOk" title="Basic Modal">
      <p>我是弹窗</p>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue'
import { Modal } from '@/components/index'

export default defineComponent({
  name: 'Home',
  components: { Modal },
  setup (props, { attrs }) {
    const visible = ref<boolean>(true)
    async function handleOk () {
      console.log('ok')
    }
    async function handleCancel () {
      console.log('cancel')
    }

    const getBindValue = computed((): any => {
      const attr = {
        ...attrs,
        visible: visible.value
      }
      return attr
    })
    return {
      visible,
      getBindValue,
      handleOk,
      handleCancel
    }
  }
})
</script>
