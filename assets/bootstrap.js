(()=>{
 const status=document.getElementById('brain-load-status'),retry=document.getElementById('retry-model');let complete=false;
 function say(t){status.textContent=t;document.getElementById('status').textContent=t;}
 function fail(t){document.body.dataset.brainError='true';say('3D图暂未显示：'+t);retry.hidden=false;document.querySelectorAll('.brain-loading').forEach(e=>{e.textContent='3D图未能载入，请点击“重新载入3D图”';});}
 retry.onclick=()=>location.reload();
 window.addEventListener('brain-ready',()=>{complete=true;document.body.dataset.brainError='false';retry.hidden=true;say('已载入 · 拖动脑图旋转，点击阶段切换');});
 window.addEventListener('brain-error',e=>fail(e.detail||'请重试'));
 window.addEventListener('error',e=>{if(!complete&&e.error)fail(e.message||'初始化异常，请重试');});
 function script(url){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=url;s.onload=resolve;s.onerror=()=>reject(Error('资源下载失败，请检查网络后重试'));document.head.appendChild(s);});}
 async function model(){const response=await fetch('assets/brain-data.json');if(!response.ok)throw Error('模型下载失败（'+response.status+'）');let raw='';if(response.body&&response.body.getReader){const reader=response.body.getReader(),decoder=new TextDecoder();let bytes=0;for(;;){const part=await reader.read();if(part.done)break;bytes+=part.value.length;raw+=decoder.decode(part.value,{stream:true});say('正在下载模型 '+Math.min(99,Math.round(bytes/3784045*100))+'%');}raw+=decoder.decode();}else raw=await response.text();window.BRAIN_DATA=JSON.parse(raw);say('模型已下载，正在准备3D画面…');}
 say('正在载入轻量3D模型…');Promise.all([script('assets/three.js'),model()]).then(()=>script('assets/app.js')).catch(e=>fail(e.message));
})();