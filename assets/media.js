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
 document.getElementById('cell-fullscreen').onclick=()=>{if(mode==='video'&&video.webkitEnterFullscreen){video.webkitEnterFullscreen();return;}const enter=frame.requestFullscreen||frame.webkitRequestFullscreen;if(enter){const p=enter.call(frame);if(p&&p.catch)p.catch(()=>report('当前浏览器限制全屏，请将手机横屏观看。'));}else report('当前浏览器限制全屏，请将手机横屏观看。');};
})();