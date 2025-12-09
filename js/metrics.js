/* metrics.js OPTIMISÉ - Version légère et différée */
(function(){
  const s={fcp:null,lcp:null,cls:0,tbt:0,res:[],req:0,bytes:0,nav:null};
  const fmt=v=>v==null?'-':v.toFixed(0)+' ms';
  const kb=v=>v==null?'-':(v/1024).toFixed(1)+' KB';
  
  // 1. OBSERVERS (Silencieux et passifs)
  try{new PerformanceObserver(l=>{for(const e of l.getEntries()){if(e.name==='first-contentful-paint'&&!s.fcp){s.fcp=e.startTime;up();}}}).observe({type:'paint',buffered:true});}catch(e){}
  try{const poL=new PerformanceObserver(l=>{const e=l.getEntries().pop();if(e)s.lcp=e.renderTime||e.loadTime||e.startTime;up();});poL.observe({type:'largest-contentful-paint',buffered:true});addEventListener('visibilitychange',()=>document.visibilityState==='hidden'&&poL.takeRecords());}catch(e){}
  try{new PerformanceObserver(l=>{for(const e of l.getEntries()){if(!e.hadRecentInput)s.cls+=e.value;up();}}).observe({type:'layout-shift',buffered:true});}catch(e){}
  try{new PerformanceObserver(l=>{for(const e of l.getEntries()){s.tbt+=Math.max(0,e.duration-50);}up();}).observe({entryTypes:['longtask']});}catch(e){}

  // 2. CALCULS
  function col(){
    const r=performance.getEntriesByType('resource');
    s.res=r;s.req=r.length+1;
    s.bytes=r.reduce((a,c)=>(c.transferSize>0?c.transferSize:(c.encodedBodySize||0))+a,0);
    s.nav=performance.getEntriesByType('navigation')[0];
  }

  // 3. UI (Interface Graphique)
  const p=document.createElement('div');
  p.id='perf-panel';
  p.style.cssText="position:fixed;right:16px;bottom:16px;z-index:9999;width:300px;font-family:sans-serif;background:rgba(10,12,28,.95);color:#fff;border:1px solid #333;border-radius:8px;padding:12px;font-size:12px;backdrop-filter:blur(4px);display:none;";
  p.innerHTML=`<div style="display:flex;justify-content:space-between;margin-bottom:8px"><b>PERFS</b><div><button id="ref" style="background:#7C5CFF;color:#fff;border:0;border-radius:4px;cursor:pointer;margin-right:4px">Mesurer</button><button id="cls" style="background:0;border:1px solid #555;color:#ccc;border-radius:4px;cursor:pointer">x</button></div></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px">
    <div>FCP: <b id="d-fcp">-</b></div><div>LCP: <b id="d-lcp">-</b></div>
    <div>CLS: <b id="d-cls">-</b></div><div>TBT: <b id="d-tbt">-</b></div>
    <div>Req: <b id="d-req">-</b></div><div>Poids: <b id="d-bytes">-</b></div>
  </div>`;

  // 4. AFFICHAGE (Seulement après le chargement complet pour ne pas polluer le LCP)
  window.addEventListener('load', ()=>{
    document.body.appendChild(p);
    p.style.display='block';
    setTimeout(up, 100); 
  });

  function up(){
    col();
    const $=id=>p.querySelector(id);
    $('#d-fcp').innerText=fmt(s.fcp);$('#d-lcp').innerText=fmt(s.lcp);
    $('#d-cls').innerText=s.cls.toFixed(3);$('#d-tbt').innerText=fmt(s.tbt);
    $('#d-req').innerText=s.req;$('#d-bytes').innerText=kb(s.bytes);
  }

  document.addEventListener('click',e=>{
    if(e.target.id==='ref') up();
    if(e.target.id==='cls') p.remove();
  });
})();
