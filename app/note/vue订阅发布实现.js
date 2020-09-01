/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-tabs */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

function eventsMixin(Vue) {
  const hookRE = /^hook:/
  Vue.prototype.$on = function (event, fn) {
    const this$1 = this

    const vm = this
    // event 为数组时，循环执行 $on
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn)
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn)
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true
      }
    }
    return vm
  }

  Vue.prototype.$once = function (event, fn) {
    const vm = this
    // 先绑定，后删除
    function on() {
        	vm.$off(event, on)
      fn.apply(vm, arguments)
    }
    on.fn = fn
    vm.$on(event, on)
    return vm
  }

  Vue.prototype.$off = function (event, fn) {
    const this$1 = this

    const vm = this
    // all，若没有传参数，清空所有订阅
    if (!arguments.length) {
      vm._events = Object.create(null)
      return vm
    }
    // array of events，events 为数组时，循环执行 $off
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn)
      }
      return vm
    }
    // specific event
    const cbs = vm._events[event]
    if (!cbs) {
        	// 没有 cbs 直接 return this
      return vm
    }
    if (!fn) {
        	// 若没有 handler，清空 event 对应的缓存列表
      vm._events[event] = null
      return vm
    }
    if (fn) {
      // specific handler，删除相应的 handler
      let cb
      let i$1 = cbs.length
      while (i$1--) {
        cb = cbs[i$1]
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1)
          break
        }
      }
    }
    return vm
  }

  Vue.prototype.$emit = function (event) {
    const vm = this
    {
        	// 传入的 event 区分大小写，若不一致，有提示
      const lowerCaseEvent = event.toLowerCase()
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          `Event "${lowerCaseEvent}" is emitted in component ${
            formatComponentName(vm)} but the handler is registered for "${event}". `
                    + 'Note that HTML attributes are case-insensitive and you cannot use '
                    + 'v-on to listen to camelCase events when using in-DOM templates. '
                    + `You should probably use "${hyphenate(event)}" instead of "${event}".`,
        )
      }
    }
    let cbs = vm._events[event]
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs
      // 只取回调函数，不取 event
      const args = toArray(arguments, 1)
      for (let i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args)
        } catch (e) {
          handleError(e, vm, (`event handler for "${event}"`))
        }
      }
    }
    return vm
  }
}

/** *
   * Convert an Array-like object to a real Array.
   */
function toArray(list, start) {
  start = start || 0
  let i = list.length - start
  const ret = new Array(i)
  while (i--) {
      	ret[i] = list[i + start]
  }
  return ret
}



export class eventEmitter {
  constructor() {
    this.eventList = {}
    this.on = this.on.bind(this)
    this.emit = this.emit.bind(this)
    this.off = this.emit.bind(this)
    this.once = this.emit.bind(this)
  }

  on(eventName, fn) {
    if (Array.isArray(eventName)) {
      for (let i = 0; i < eventName.length; i++) {
        this.on(eventName, fn)
      }
    } else {
      (this.eventList[eventName] || (this.eventList[eventName] = [])).push(fn)
    }
    return this
  }

  once(eventName, fn) {
    function on() {
      this.off(eventName, fn)
      fn.apply(this, arguments)
    }
    on.fn = fn
    this.on(eventName, on)
    return this
  }

  emit() {
    const eventName = [].shift.call(arguments)
    const cbs = [...this.eventList(eventName)]
    if (!cbs && !cbs.length) {
      return false
    }
    cbs.forEach(item => {
      item.apply(this, arguments)
    })
    return this
  }

  off(eventName, fn) {
    const cbs = [...this.eventList(eventName)]
    if (!cbs && !cbs.length) { return false }
    if (!fn) {
      this.eventList[eventName] = null
    }
    for (let i = 0; i < cbs.length; i++) {
      if (cbs[i] === fn || cbs[i].fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return this
  }
}
