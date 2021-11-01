import { ref, watch } from 'vue'

export function isFunction (val: unknown): any {
  return typeof val === 'function'
}

export function useTimeoutFn (handle: Fn<any>, wait: number, native = false) {
  if (!isFunction(handle)) {
    throw new Error('handle is not Function!')
  }

  const { readyRef, stop, start } = useTimeoutRef(wait)
  if (native) {
    handle()
  } else {
    watch(
      readyRef,
      (maturity) => {
        maturity && handle()
      },
      {
        immediate: true
      }
    )
  }
  return { readyRef, stop, start }
}

export function useTimeoutRef (wait: number) {
  const readyRef = ref(false)

  let timer: TimeoutHandle

  function stop (): void {
    readyRef.value = false
    timer && window.clearTimeout(timer)
  }

  function start (): void {
    stop()
    timer = setTimeout(() => {
      readyRef.value = true
    }, wait)
  }

  start()

  return {
    readyRef,
    stop,
    start
  }
}
