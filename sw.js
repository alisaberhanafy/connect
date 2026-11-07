const CACHE='connect-wifi-v127-resilient-cache';

// الملفات الأساسية فقط هي التي يوقف فشلها تثبيت Service Worker.
const REQUIRED=[
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// كل ملف إضافي يُحمّل بشكل مستقل؛ فشل ملف لا يلغي الملفات التي نجحت.
const OPTIONAL=[
  './support.html',
  './games.html',
  './adhkar.html',
  './assets/fonts/fonts.css',
  './assets/fonts/Cairo-400.ttf',
  './assets/fonts/Cairo-500.ttf',
  './assets/fonts/Cairo-600.ttf',
  './assets/fonts/Cairo-700.ttf',
  './assets/fonts/Cairo-800.ttf',
  './assets/fonts/Cairo-900.ttf',
  './assets/fonts/Alexandria-400.ttf',
  './assets/fonts/Alexandria-500.ttf',
  './assets/fonts/Alexandria-600.ttf',
  './assets/fonts/Alexandria-700.ttf',
  './assets/fonts/Alexandria-800.ttf',
  './assets/fonts/Alexandria-900.ttf',
  './assets/fonts/Tajawal-400.ttf',
  './assets/fonts/Tajawal-500.ttf',
  './assets/fonts/Tajawal-600.ttf',
  './assets/fonts/Tajawal-700.ttf',
  './assets/fonts/Tajawal-800.ttf',
  './assets/fonts/Tajawal-900.ttf',
  './ambient-nature.wav',
  './connect-nasheed.mp3',
  './salawat-once.mp3',
  './theme-config.js',
  './backgrounds/sky.svg',
  './backgrounds/neon.svg',
  './backgrounds/waves.svg',
  './backgrounds/minimal.svg',
  './backgrounds/desert.svg',
  './backgrounds/cyber.svg'
];

async function cacheOne(cache,path){
  const response=await fetch(path,{cache:'reload'});
  if(!response.ok) throw new Error('HTTP '+response.status+' for '+path);
  await cache.put(path,response);
}

self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);

  // تثبيت الحد الأدنى الضروري بالتتابع، مع إظهار الملف الذي فشل.
  for(const path of REQUIRED){
    try{
      await cacheOne(cache,path);
    }catch(error){
      console.error('[Connect SW] Required file failed:',path,error);
      throw error;
    }
  }

  // الملفات الإضافية مستقلة: لا يُسقط فشل أي ملف بقية عملية التثبيت.
  const results=await Promise.allSettled(
    OPTIONAL.map(path=>cacheOne(cache,path))
  );
  results.forEach((result,index)=>{
    if(result.status==='rejected'){
      console.warn('[Connect SW] Optional file skipped:',OPTIONAL[index],result.reason);
    }
  });
})()));

self.addEventListener('activate',event=>event.waitUntil(
  caches.keys()
    .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
    .then(()=>self.clients.claim())
));

self.addEventListener('message',event=>{
  if(event.data?.type==='SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin)return;

  const isPage=request.mode==='navigate'||
    url.pathname.endsWith('.html')||
    url.pathname.endsWith('/notifications.json')||
    url.pathname.endsWith('/offers.json');

  if(isPage){
    event.respondWith(
      fetch(new Request(request,{cache:'no-store'}))
        .then(response=>{
          if(response.ok&&!url.pathname.endsWith('.json')){
            const copy=response.clone();
            caches.open(CACHE).then(cache=>cache.put(request,copy));
          }
          return response;
        })
        .catch(()=>caches.match(request).then(hit=>hit||caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached=>cached||fetch(request).then(response=>{
      if(response.ok){
        const copy=response.clone();
        caches.open(CACHE).then(cache=>cache.put(request,copy));
      }
      return response;
    }))
  );
});
