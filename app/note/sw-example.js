import { triggerAsyncId } from "async_hooks";

// 狗换猫咪
self.addEventListener('install', event => {
    console.log('V1 installing…');
  
    // cache a cat SVG
    event.waitUntil(
      caches.open('static-v1').then(cache => cache.add('/cat.svg'))
    );
  });
  
  self.addEventListener('activate', event => {
    console.log('V1 now ready to handle fetches!');
  });
  
  self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
  
    // serve the cat SVG from the cache if the request is
    // same-origin and the path is '/dog.svg'
    if (url.origin == location.origin && url.pathname == '/dog.svg') {
      event.respondWith(caches.match('/cat.svg'));
    }
  });

  const expectedCaches = ['static-v2'];







//狗换猫咪在第一次加载  very first load   client.claim()
  self.addEventListener('install', event => {
    console.log('Installing…');
    // cache a cat SVG
    event.waitUntil(
      caches.open('static-v1').then(cache => cache.add('cat.svg'))
    );
  });
  
  self.addEventListener('activate', event => {
    clients.claim();
    console.log('Now ready to handle fetches!');
  });
  
  self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
  
    // serve the cat SVG from the cache if the request is
    // same-origin and the path is '/dog.svg'
    if (url.origin == location.origin && url.pathname.endsWith('/dog.svg')) {
      event.respondWith(caches.match('cat.svg'));
    }
  });






// 狗换小马
// 这个故事告诉了我们什么呢？
// 猫咪依然在，只有关闭页面，或者强制更新 才能摆脱猫咪，迎接小马
// 上一个service worker依然在工作，所以等待中的service worker 依然在等待，所以你看不到马
self.addEventListener('install', event => {
  console.log('V2 Installing…');
  // cache a horse SVG
  event.waitUntil(
    caches.open('static-v2').then(cache => cache.add('horse.svg'))
  );
});

self.addEventListener('activate', event => {
  // delete any caches that aren't in expectedCaches
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('V2 now ready to handle fetches!');
    })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // serve the cat SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  if (url.origin == location.origin && url.pathname.endsWith('/dog.svg')) {
    event.respondWith(caches.match('horse.svg'));
  }
});

// 马换小牛
const expectedCaches = ['static-v3'];

self.addEventListener('install', event => {
  console.log('V3 Installing…');
  
  // don't wait
  self.skipWaiting(); //这里并不是 skip install
  
  // cache a cow SVG
  event.waitUntil(
    caches.open('static-v3').then(cache => cache.add('cow.svg'))
  );
});

self.addEventListener('activate', event => {
  // delete any caches that aren't in expectedCaches
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('V3 now ready to handle fetches!');
    })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // serve the cat SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  if (url.origin == location.origin && url.pathname.endsWith('/dog.svg')) {
    event.respondWith(caches.match('cow.svg'));
  }
});

// the whole update cycle 而不是直接调用一些api  这样更灵活
    navigator.serviceWorker.register('/sw.js').then(reg => {//Service Worker Registration
      reg.install // 正在安装的worker
      reg.waiting // 等待中的worker
      reg.active // 活跃中的worker

      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing // 捕获到一只野生sw in reg.installing

        newWorker.state //分析一下这只野生sw的声明周期
          // "installing" - the install event has fired, but not yet complete
          // "installed"  - install complete
          // "activating" - the activate event has fired, but not yet complete
          // "activated"  - fully active
          // "redundant"  - discarded. Either failed install, or it's been
          //                replaced by a newer version
        newWorker.addEventListener('statechange', () => {
          // newWorker.state has changed
        })
      })
    })

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // 改朝换代的时候被触发   比如一个新的太子等不及继承，就把他爹杀了当皇帝 这个时候就会被触发
    })

  // sw中正确的fetch 姿势
    self.addEventListener('fetch', event => {
      if (event.request.mode === 'navigate') {
        // See /web/fundamentals/getting-started/primers/async-functions
        // for an async/await primer.
        event.respondWith(async function() {
          // Optional: Normalize the incoming URL by removing query parameters.
          // Instead of https://example.com/page?key=value,
          // use https://example.com/page when reading and writing to the cache.
          // For static HTML documents, it's unlikely your query parameters will
          // affect the HTML returned. But if you do use query parameters that
          // uniquely determine your HTML, modify this code to retain them.
          const normalizedUrl = new URL(event.request.url);
          normalizedUrl.search = '';
    
          // Create promises for both the network response,
          // and a copy of the response that can be used in the cache.
          const fetchResponseP = fetch(normalizedUrl);
          const fetchResponseCloneP = fetchResponseP.then(r => r.clone());
    
          // event.waitUntil() ensures that the service worker is kept alive
          // long enough to complete the cache update.
          event.waitUntil(async function() {
            const cache = await caches.open('my-cache-name');
            await cache.put(normalizedUrl, await fetchResponseCloneP);
          }());
    
          // Prefer the cached response, falling back to the fetch response.
          return (await caches.match(normalizedUrl)) || fetchResponseP;
        }());
      }
    });