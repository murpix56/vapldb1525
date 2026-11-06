const C='vademecum-shell-2026-11-06';
const FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png','inter-latin-400-normal.woff2','inter-latin-500-normal.woff2','inter-latin-600-normal.woff2','inter-latin-700-normal.woff2','inter-latin-800-normal.woff2','jetbrains-mono-latin-500-normal.woff2','jetbrains-mono-latin-600-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  if(r.mode==='navigate'||u.pathname.endsWith('/index.html')){
    e.respondWith(Promise.race([fetch(r).then(x=>{const cp=x.clone();caches.open(C).then(c=>c.put('index.html',cp));return x}),new Promise((_,rej)=>setTimeout(rej,3500))]).catch(()=>caches.match('index.html').then(m=>m||caches.match('./'))))}
  else e.respondWith(caches.match(r).then(m=>m||fetch(r)))});
