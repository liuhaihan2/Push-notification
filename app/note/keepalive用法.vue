// 要实现的功能点： 
  现有页面：首页（A）、列表页（B）、详情页（C），一般可以从：A->B->C；
  B到C再返回B时，B要保持列表滚动的距离；
  B返回A再进入B时，B不需要保持状态，是全新的
// global.js
<script>
export default {
  namespaced: true,
  state: {
    keepAliveComponents: [] // 缓存数组
  },
  mutations: {
    keepAlive (state, component) {
      // 注：防止重复添加（当然也可以使用Set）
      !state.keepAliveComponents.includes(component) && 
        state.keepAliveComponents.push(component)
    },
    noKeepAlive (state, component) {
      const index = state.keepAliveComponents.indexOf(component)
      index !== -1 &&
        state.keepAliveComponents.splice(index, 1)
    }
  }
}
</script>

// App.vue
<div class="app">
  <!--传入include数组-->
  <keep-alive :include="keepAliveComponents">
    <router-view></router-view>
  </keep-alive>
</div>

<script>
export default {
  computed: {
    ...mapState({
      keepAliveComponents: state => state.global.keepAliveComponents
    })
  }
}
</script>

// router
<script>
const router = new Router({
  routes: [
    {
      path: '/A/B',
      name: 'B',
      component: B,
      meta: {
        title: 'B页面',
        keepAlive: true // 这里指定B组件的缓存性
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 在路由全局钩子beforeEach中，根据keepAlive属性，统一设置页面的缓存性
  // 作用是每次进入该组件，就将它缓存
  if (to.meta.keepAlive) {
    store.commit('global/keepAlive', to.name)
  }
})
</script>

//B.vue
<script>
export default {
  name: 'B',
  created () {
      // ...设置滚动条在最顶部
  },
  beforeRouteLeave (to, from, next) {
    // 如果下一个页面不是详情页（C），则取消列表页（B）的缓存
    // 这里为啥这样写，因为关于b的跳转逻辑还是写在b里面比较好
    if (to.name !== 'C') {
        this.$store.commit('global/noKeepAlive', from.name)
    }
    next()
  }
}

</script>