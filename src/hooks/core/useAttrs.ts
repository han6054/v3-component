import {
  getCurrentInstance,
  shallowRef,
  reactive,
  watchEffect,
  ref
} from 'vue'
import type { Ref } from 'vue'

interface Params {
  excludeListeners?: boolean;
  excludeKeys?: string[];
  excludeDefaultKeys?: boolean;
}

const DEFAULT_EXCLUDE_KEYS = ['class', 'style']
const LISTENER_PREFIX = /^on[A-Z]/

export function entries<T> (obj: Recordable<T>): [string, T][] {
  return Object.keys(obj).map((key: string) => [key, obj[key]])
}

export function useAttrs (params: Params = {}): Ref<unknown> | null {
  const instance = getCurrentInstance()
  if (!instance) return null

  const {
    excludeListeners = false,
    excludeKeys = [],
    excludeDefaultKeys = true
  } = params

  const attrs = ref({})
  const allExcludeKeys = excludeKeys.concat(
    excludeDefaultKeys ? DEFAULT_EXCLUDE_KEYS : []
  )

  instance.attrs = reactive(instance.attrs)
  console.log(instance.attrs)
  watchEffect(() => {
    const res = entries(instance.attrs).reduce((acm, [key, val]) => {
      if (
        !allExcludeKeys.includes(key) &&
        !(excludeListeners && LISTENER_PREFIX.test(key))
      ) {
        acm[key] = val
      }

      return acm
    }, {} as Recordable)

    attrs.value = res
  })

  return attrs
}
