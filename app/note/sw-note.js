import { worker } from "cluster";

pwa
// 其实就是使用pwa做web小程序

// 一些问题
// 为什么pwa 要使用 navigator来注册 sw.js 呢
// *service worker  *Web storage（IndexedDB, Caches） fetch promise
// pwa的优点和缺点  优点： https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Advantages  缺点：兼容性


// cache 常用方法提示
caches.open(CACHE_NAME) // open / create a cache
caches.addAll([
  '/',
  '/style/main.css',
  '/script/main.js'
]) // add all files that need cache
caches.add('cat.svg') // add single file

// notice 不要随便给sw.js更换名字
  // 为了 offline, sw.js will cache index.html
  // when you change sw.js and rename it as sw-v2.js  you changed the register in index.html
  // but because of the old sw, brower will read the old index.html from cache
  // so 你看，这个有问题了把
  // https://juejin.im/post/5c81cc985188257df17f109c#heading-1
  // 为了防止缓存的问题  sw.js 文件最好 Cache-control: no-store


  // getRegistration ：Call to get a Promise for the existing registration (which may be null).
  navigator.serviceWorker.getRegistration() 

//   关于 Service Worker 
// push message, background sync, geofencing networkcontrol
// 1. registor serviceworker
  if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
          this.navigator.serviceWorker.registor('/sw.js').then(function(registration) {
              console.log(`ServiceWorker registration successful with scope ${registration.scope}`)
          })
      }, function(err) {
          console.log(`ServiceWorker registration failed ${err}`)
      })
  }

let CACHE_NAME = 'my-site-cache-v1'
var urlsToCache = [
    '/',
    '/style/main.css',
    '/script/main.js'
]

// 2. install serviceworker
  self.addEventListener('install', function(event) {
    // three steps
    // 1. 打开缓存 cache
    // 2. 缓存我们的文件
    // 3. 确认是否所有的请求资源都已经被缓存
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('cache opened!')
                return cache.addAll(urlsToCache)
            })
    )
  })

  self.addEventListener('install', (event) => {
      event.waitUntil(async function() {
        const cache = await caches.open('mysite-static-v3')
        await cache.addAll(urlsToCache)
      }())
  })

// register after the first page has loaded
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    this.navigator.addEventListener.register('/service-worker.js')
  })
}

// 3. cache and return requests
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response // if we have a matching response we return the cached value
        }

        // a. if we don't want to cache the new req
        // return fetch(events.request) // otherwise, make a network request as normal

        // b. if we want to cache the new requests cumulatively
        return fetch(events.request)
          .then((response) => {
            if (!response || !response.status === 200 || response.type !== 'basic') {
              return response
            }

            // notice here
            // we cloned a response 
            // because a stream's body only can be consumed once
            // we want the browser to consume the response 
            // as well as the cache consuming the response
            // so we have to create two streams
            const responseToCache = response.clone()
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache)
              })
            return response
          })
      })
  )
})

// CODELAB: Add fetch event handler here.
if (evt.request.url.includes('/forecast/')) {
  console.log('[Service Worker] Fetch (data)', evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            }).catch((err) => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
      }));
  return;
}
evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
          .then((response) => {
            return response || fetch(evt.request);
          });
    })
);

// 4. update service worker and cache
// when you update a service, the old service worker will still work, so the new one just enter a wating state, but i guess already installed, i guess right
// when the currently open pages of your site are closed, old dead, new service worker's activate event will be fired

// notice cache management often accured in the active callback!!
self.addEventListener('activate', (event) => {
  let cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1']

  event.waitUntil(
    // delete some caches doesn't in  cacheWhiteList
    caches.keys()
      .then((cacheNames) => {
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      })
  )
})// 但是这里只讲了如何平滑删除决定弃用的缓存，没讲如何 update a servie worker
// you can update handle 
navigator.serviceWorker.register('/sw.js').then(reg => {
  reg.update()
  // 其实我们可以定时更新 service worker
  setInterval(() => {
    reg.update()
  }, 1000 * 60 * 60);
})

// 5. 题外话  关于缓存图片的问题
// you cache the low res version at install state
// but you want to try retrieve higher res images from network during page is loaded
// if success, then use the higher res images, if failed, fallback to the low res version
<img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x" />
<img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x" style="width:400px; height: 400px;" />


// 6. service worker life cycle

  // 检测 某个页面是否被 service worker 接管
  // You can detect if a client is controlled via  which will be null or a service worker instance.
  if (navigator.serviceWorker.controller) {}

  // install
    // only called once per service worker

  // activate
    // service worker is ready to control clients
  

  // service worker update 被触发的原因  
    // 1. 导航到一个新的  可控范围内到  页面
    // 2. push 或者 sync 事件被触发，除非已经有一个更新检查在之前到24小时中
    // 3. 仅仅在 service worker URL has changed call .register()
    //notice 上面的 point 4

  
  // self.client.claim()  
    // take control of uncontrolled clients by calling clients.claim() within your service worker once it's activated
    // 一但触发了activate，就会在你的service worker里面立即接管你没有控制的clients

    // By default, a page's fetches won't go through a service worker unless the page request itself went through a service worker. So you'll need to refresh the page to see the effects of the service worker.
    // 默认情况下，除非页面请求本身通过服务工作者，否则页面的提取将不会通过服务工作者
    // clients.claim() can override this default, and take control of non-controlled pages.
    // clients.claim()就是用来打破这个默认的
  // self.skipWaiting()
    // prevent waiting 
    // 旨在让service worker 在安装完之后立马进入activate这个状态
    // It doesn't really matter when you call skipWaiting()  调用skipWaiting()的时机并不重要  它不会跳过install的阶段，只会在进入waiting之后尽快进入activate

  // so what's the diff between self.client.claim() 和 self.skipWaiting() 呢？ 为什么经常把他们写在一起呢？
    // skipWaiting: 问题就在于页面没有刷新，所以client里面的一些fetch 依然被旧版本控制
    // client.claim()  接管没有被控制的client  一般用于 very first load ,不然都是从下一次刷新的时候 service worker开始控制 clients
  // 我还是没有明白为什么  要经常把他们写在一起

  // lavas实现sw刷新
      //普通js文件中
      function emitUpdate() {
        var event = document.createEvent('Event');
        event.initEvent('sw.update', true, true);
        window.dispatchEvent(event);
      }
      
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').then(function (reg) {
          if (reg.waiting) {
            emitUpdate();
            return;
          }
      
          reg.onupdatefound = function () {
            var installingWorker = reg.installing;
            installingWorker.onstatechange = function () {
              switch (installingWorker.state) {
                case 'installed':
                  if (navigator.serviceWorker.controller) {
                    emitUpdate();
                  }
                  break;
              }
            };
          };
        }).catch(function(e) {
          console.error('Error during service worker registration:', e);
        });
      }

      // 如果是要真让用户自己确认是否更新，那么就要用postMessage来通信，毕竟 service worker 也是web worker
      try {
        navigator.serviceWorker.getRegistration().then(reg => {
          reg.waiting.postMessage('skipWaiting');
        });
      } catch (e) {
        window.location.reload();
      }
      
      // service-worker.js
        // SW 不再在 install 阶段执行 skipWaiting 了
        self.addEventListener('message', event => {
          if (event.data === 'skipWaiting') {
            self.skipWaiting();
          }
        })

  // 同lavas一样的思路的另一种方法
  function listenForWaitingServiceWorker(reg, callback) {
    function awaitStateChange() {
      reg.installing.addEventListener('statechange', function() {
        if (this.state === 'installed') callback(reg);
      });
    }
    if (!reg) return;
    if (reg.waiting) return callback(reg);
    if (reg.installing) awaitStateChange();
    reg.addEventListener('updatefound', awaitStateChange);
  }

  // reload once when the new Service Worker starts activating
var refreshing;
navigator.serviceWorker.addEventListener('controllerchange',
  function() {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  }
);
function promptUserToRefresh(reg) {
  // this is just an example
  // don't use window.confirm in real life; it's terrible
  if (window.confirm("New version available! OK to refresh?")) {
    reg.waiting.postMessage('skipWaiting');
  }
}
listenForWaitingServiceWorker(reg, promptUserToRefresh);

// 最后，我们希望允许在普通的 JS 中通过 reg.waiting.skipWaiting() 直接插队，而不是只能在 SW 内部操作
// 代码可以变成这样
function promptUserToRefresh() {
  // don't use confirm in production; this is just an example
  if (confirm('Refresh now?')) reg.waiting.skipWaiting();
}
if (reg.waiting) promptUserToRefresh();
reg.addEventListener('statechange', function(e) {
  if (e.target.state === 'installed') {
    promptUserToRefresh();
  } else if (e.target.state === 'activated') {
    window.location.reload();
  }
});

这里涉及第四种方法
request.mode = navigation // 即跳转的目标地址为 HTML 文档的请求?
// 官方解释： A navigate request is created only while navigating between documents

  /*************************** basic ****************************/
  // icon
    // Chrome requires that you provide at least a 192x192px icon and a 512x512px icon. 
    // But you can also provide other sizes. Chrome uses the icon closest to 48dp, for example, 96px on a 2x device or 144px for a 3x device.
  // manifest
    // The web app manifest is a simple JSON file that gives you, the developer, the ability to control how your app appears to the user.
    // Safari on iOS doesn't support the web app manifest

  // update 记录
    // There will be a point in time where your service worker will need updating. When that time comes, you'll need to follow these steps:

    // 1. Update your service worker JavaScript file. When the user navigates to your site, the browser tries to redownload the script file that defined the service worker in the background. If there is even a byte's difference in the service worker file compared to what it currently has, it considers it new.
    // 2. Your new service worker will be started and the install event will be fired.
    // 3. At this point the old service worker is still controlling the current pages so the new service worker will enter a waiting state.
    // 4. When the currently open pages of your site are closed, the old service worker will be killed and the new service worker will take control.
    // 5. Once your new service worker takes control, its activate event will be fired.
  
  // clear cache
    // Unregistering a service worker does not clear the cache!
  
  // about update
    // If you alter your service worker script the browser considers it a different service worker, and it'll get its own install event.
  
  // about install
    // Typically the install event is used to cache everything you need for your app to run.

  // about cache the app data
    // Under normal circumstances, the cached data will be returned almost immediately providing the app with recent data it can use. 
    // Then, when the network request returns, the app will be updated using the latest data from the network
    // so the app needs to kick off two asynchronous requests, one to the cache and one to the network.
    // 就是 不会loading，而是会加载旧的数据 from cache，然后新的response响应成功，则在刷新成新的数据，很多都是这么做的

  // Splash Screens

  // CI/CD

  // Service Worker