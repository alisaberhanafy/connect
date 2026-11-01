const CACHE='connect-wifi-mobile-v55-interaction-hint-color';
const CORE=["./", "./index.html", "./manifest.webmanifest", "./ambient-nature.wav", "./connect-nasheed.mp3", "./theme-config.js", "./icons/icon-192.png", "./icons/icon-512.png", "./backgrounds/sky.svg", "./backgrounds/neon.svg", "./backgrounds/waves.svg", "./backgrounds/minimal.svg", "./backgrounds/desert.svg", "./backgrounds/cyber.svg"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin)return;
 const isPage=request.mode==='navigate'||url.pathname.endsWith('.html')||url.pathname.endsWith('/notifications.json')||url.pathname.endsWith('/offers.json');
 if(isPage){event.respondWith(fetch(new Request(request,{cache:'no-store'})).then(response=>{if(response.ok&&!url.pathname.endsWith('.json')){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));}return response;}).catch(()=>caches.match(request).then(hit=>hit||caches.match('./index.html'))));return;}
 event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));}return response;})));
});
