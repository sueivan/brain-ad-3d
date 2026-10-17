(()=>{
 const gif=document.getElementById('neuron-gif'),video=document.getElementById('neuron-video'),frame=document.getElementById('cell-media-frame'),toggle=document.getElementById('cell-toggle'),hd=document.getElementById('cell-hd'),status=document.getElementById('cell-media-status');
 const gifSrc=gif.src,poster=video.poster;let mode='gif',paused=false;
 function report(t){status.textContent=t;}
 function showGif(restart=false){video.pause();video.hidden=true;gif.hidden=false;mode='gif';paused=false;toggle.textContent='停止动画';hd.textContent='高清视频';if(restart){gif.src=poster;requestAnimationFrame(()=>gif.src=gifSrc);}else gif.src=gifSrc;report('正在循环播放动画 · 点击“高清视频”可使用进度条');}
 function playVideo(){const promise=video.play();if(promise&&promise.catch)promise.catch(()=>{report('视频暂时无法启动，已恢复GIF动画。');showGif();});}
 toggle.onclick=()=>{if(mode==='gif'){paused=!paused;gif.src=paused?poster:gifSrc;toggle.textContent=paused?'播放动画':'停止动画';report(paused?'动画已停止，点击“播放动画”重新播放':'正在循环播放动画');}else{if(video.paused)playVideo();else video.pause();}};
 document.getElementById('cell-restart').onclick=()=>{if(mode==='gif')showGif(true);else{video.currentTime=0;playVideo();}};
 hd.onclick=()=>{if(mode==='video'){showGif();return;}mode='video';gif.hidden=true;video.hidden=false;hd.textContent='切回GIF动画';report('高清视频模式 · 可拖动视频进度条');playVideo();};
 video.addEventListener('play',()=>toggle.textContent='停止动画');video.addEventListener('pause',()=>{if(mode==='video')toggle.textContent='播放视频';});video.addEventListener('ended',()=>{toggle.textContent='重新播放';report('视频已播完，点击“从头播放”再次观看');});
 const full=document.getElementById('cell-fullscreen'),exit=document.getElementById('cell-exit-fullscreen');let expanded=false,scrollPosition=0;
 function closeExpanded(){if(!expanded)return;expanded=false;frame.classList.remove('media-expanded');document.body.classList.remove('media-open');document.documentElement.classList.remove('media-open');exit.hidden=true;full.textContent='全屏观看';full.setAttribute('aria-expanded','false');frame.removeAttribute('role');frame.removeAttribute('aria-modal');window.scrollTo(0,scrollPosition);full.focus({preventScroll:true});}
 full.setAttribute('aria-expanded','false');full.onclick=()=>{if(expanded){closeExpanded();return;}scrollPosition=window.scrollY;expanded=true;frame.classList.add('media-expanded');document.body.classList.add('media-open');document.documentElement.classList.add('media-open');frame.setAttribute('role','dialog');frame.setAttribute('aria-modal','true');exit.hidden=false;full.textContent='退出全屏';full.setAttribute('aria-expanded','true');exit.focus({preventScroll:true});};
 exit.onclick=closeExpanded;window.addEventListener('keydown',e=>{if(e.key==='Escape'&&expanded){e.preventDefault();closeExpanded();}});
})();