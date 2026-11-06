const CACHE='connect-wifi-v125-installed-detection';
const CORE=["./", "./index.html", "./support.html", "./games.html", "./adhkar.html", "./manifest.webmanifest", "./assets/fonts/fonts.css", "./assets/fonts/Cairo-400.ttf", "./assets/fonts/Cairo-500.ttf", "./assets/fonts/Cairo-600.ttf", "./assets/fonts/Cairo-700.ttf", "./assets/fonts/Cairo-800.ttf", "./assets/fonts/Cairo-900.ttf", "./assets/fonts/Alexandria-400.ttf", "./assets/fonts/Alexandria-500.ttf", "./assets/fonts/Alexandria-600.ttf", "./assets/fonts/Alexandria-700.ttf", "./assets/fonts/Alexandria-800.ttf", "./assets/fonts/Alexandria-900.ttf", "./assets/fonts/Tajawal-400.ttf", "./assets/fonts/Tajawal-500.ttf", "./assets/fonts/Tajawal-600.ttf", "./assets/fonts/Tajawal-700.ttf", "./assets/fonts/Tajawal-800.ttf", "./assets/fonts/Tajawal-900.ttf", "./ambient-nature.wav", "./connect-nasheed.mp3", "./salawat-once.mp3", "./theme-config.js", "./icons/icon-192.png", "./icons/icon-512.png", "./backgrounds/sky.svg", "./backgrounds/neon.svg", "./backgrounds/waves.svg", "./backgrounds/minimal.svg", "./backgrounds/desert.svg", "./backgrounds/cyber.svg"];
const REQUIRED=["./", "./index.html", "./manifest.webmanifest", "./assets/fonts/fonts.css", "./assets/fonts/Cairo-400.ttf", "./assets/fonts/Cairo-500.ttf", "./assets/fonts/Cairo-600.ttf", "./assets/fonts/Cairo-700.ttf", "./assets/fonts/Cairo-800.ttf", "./assets/fonts/Cairo-900.ttf", "./assets/fonts/Alexandria-400.ttf", "./assets/fonts/Alexandria-500.ttf", "./assets/fonts/Alexandria-600.ttf", "./assets/fonts/Alexandria-700.ttf", "./assets/fonts/Alexandria-800.ttf", "./assets/fonts/Alexandria-900.ttf", "./assets/fonts/Tajawal-400.ttf", "./assets/fonts/Tajawal-500.ttf", "./assets/fonts/Tajawal-600.ttf", "./assets/fonts/Tajawal-700.ttf", "./assets/fonts/Tajawal-800.ttf", "./assets/fonts/Tajawal-900.ttf", "./icons/icon-192.png", "./icons/icon-512.png"];
const OPTIONAL=CORE.filter(path=>!REQUIRED.includes(path));
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 // A missing optional sound/page/theme asset must not cancel Service Worker installation.
 await cache.addAll(REQUIRED);
 await Promise.allSettled(OPTIONAL.map(path=>cache.add(path)));
})()));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin)return;
 const isPage=request.mode==='navigate'||url.pathname.endsWith('.html')||url.pathname.endsWith('/notifications.json')||url.pathname.endsWith('/offers.json');
 if(isPage){event.respondWith(fetch(new Request(request,{cache:'no-store'})).then(response=>{if(response.ok&&!url.pathname.endsWith('.json')){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));}return response;}).catch(()=>caches.match(request).then(hit=>hit||caches.match('./index.html'))));return;}
 event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));}return response;})));
});
