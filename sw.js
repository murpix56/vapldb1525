const C='vademecum-shell-20261109-1323';
const FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png','inter-latin-400-normal.woff2','inter-latin-500-normal.woff2','inter-latin-600-normal.woff2','inter-latin-700-normal.woff2','inter-latin-800-normal.woff2','jetbrains-mono-latin-500-normal.woff2','jetbrains-mono-latin-600-normal.woff2'];
const HEAVY=['tesseract.min.js','worker.min.js','tesseract-core-simd-lstm.wasm.js','spa.traineddata.gz','pdf.min.js','pdf.worker.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES).then(()=>Promise.allSettled(HEAVY.map(f=>c.add(f))))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  if(r.mode==='navigate'||u.pathname.endsWith('/index.html')){
    e.respondWith(Promise.race([fetch(r).then(x=>{const cp=x.clone();caches.open(C).then(c=>c.put('index.html',cp));return x}),new Promise((_,rej)=>setTimeout(rej,3500))]).catch(()=>caches.match('index.html').then(m=>m||caches.match('./'))))}
  else e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok){const cp=x.clone();caches.open(C).then(c=>c.put(r,cp))}return x})))});
