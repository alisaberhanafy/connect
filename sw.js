const CACHE='connect-wifi-mobile-v19-announcements-offers';
const CORE=["./", "./index.html", "./manifest.webmanifest", "./theme-config.js", "./icons/icon-192.png", "./icons/icon-512.png", "./backgrounds/sky.svg", "./backgrounds/neon.svg", "./backgrounds/waves.svg", "./backgrounds/minimal.svg", "./backgrounds/desert.svg", "./backgrounds/cyber.svg"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const req=e.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin)return;
 e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;}).catch(()=>caches.match('./index.html'))));
});
