import { Modal } from 'ant-design-vue'
import { defineComponent, unref, toRefs } from 'vue'
import { basicProps } from './props'
import { useAttrs } from '@/hooks/core/useAttrs'
import { useModalDragMove } from '../hooks/useModalDrag'

export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  props: basicProps,
  emits: ['cancel'],
  setup (props, { attrs, slots }) {
    const { visible, draggable, destroyOnClose } = toRefs(props)
    // const attrs = useAttrs()
    useModalDragMove({
      visible,
      destroyOnClose,
      draggable
    })
    return () => {
      const propsData = { ...attrs, ...props } as Recordable
      // console.log(propsData, 'propsData')
      return <Modal {...propsData}>{slots}</Modal>
    }
  }
})
