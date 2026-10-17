'use strict';
(()=>{
const T=window.THREE,$=s=>document.querySelector(s),canvases=[$('#normal'),$('#ad')];
const topics={
 cortex:['脑回变瘦，脑沟显得更宽','大脑表面有一道道隆起和沟壑，分别叫“脑回”和“脑沟”。当脑组织逐渐减少，脑回会变瘦，脑沟就显得更宽。试试“上方”视角，比较两侧的沟壑。','脑回相对饱满，表面的沟壑较窄。','脑组织减少后，脑回变瘦，沟壑显得更宽。'],
 hippo:['海马变小，新记忆更难留下','海马藏在大脑内侧，参与形成新的记忆。金色标出左右海马，其他结构淡出，便于看清大小差异。点击“放大重点”，还能单独比较。海马并不是全部记忆的唯一储存处。','金色：左右海马，参与形成新的记忆。','金色海马变小：示意与记忆有关的脑区受到影响。'],
 vent:['脑室变大，周围脑组织减少','脑室是脑内装有脑脊液的腔隙。周围脑组织减少后，脑室可能随之扩大。蓝色标出左右侧脑室，点击“放大重点”可单独观察其形态。','蓝色：左右侧脑室，是脑脊液所在的腔隙。','蓝色腔隙更大：演示脑组织减少时可能伴随的变化。']};
Object.assign(topics,{
 para:['海马旁回：记忆系统不止海马','海马旁回位于颞叶内侧，属于与记忆有关的网络。内嗅皮质也在这一带，是AD研究的重要区域。本图高亮的是图谱中的海马旁回，没有将内嗅皮质单独分割；两者不能画等号。','紫色：左右海马旁回，帮助定位内侧颞叶。','海马旁回缩小的方向示意；不是内嗅皮质的精确边界。'],
 temporal:['颞叶：记忆、语言和识别也会受影响','颞叶位于大脑两侧，参与记忆、语言理解和识别等功能。AD的影响可超出海马，涉及颞叶其他皮质。选择侧面或放大重点，对照区域轮廓；一种功能通常由多个脑区共同完成。','橙色：左右颞叶皮质。','橙色区域显示颞叶组织减少的趋势。'],
 parietal:['顶叶：空间判断和熟练动作可能变难','顶叶参与空间加工、感觉信息整合及熟练动作等。AD累及相关网络时，可能出现辨别方向、使用物品等困难。高亮的是整个顶叶作位置参照，不表示每个分区同样受累。','青色：左右顶叶皮质。','青色区域显示顶叶组织减少的趋势。'],
 frontal:['额叶：计划、判断和行动安排','额叶参与计划、判断、注意和行为调节等功能。随着AD进展，额叶相关网络也可能受累；不同人的受累位置与程度不同。图中缩小只作形态方向示意。','玫红色：左右额叶皮质。','玫红色区域显示额叶可能出现的组织减少。'],
 posterior:['后扣带回与楔前叶：网络中的重要节点','后扣带回与楔前叶位于大脑内侧偏后，参与记忆等脑网络。AD研究可观察到这里的功能、代谢或结构异常；这些指标并不等同。这里高亮解剖位置，形变只示意组织减少，不模拟PET或脑活动。','蓝紫色：后扣带回与楔前叶。','蓝紫色区域显示位置与萎缩方向，不表示代谢强弱。']});
const regions={
 para:{label:'海马旁回',color:0x9064b3,match:m=>/Parahippocampal/i.test(m.userData.name),view:[0,0]},
 temporal:{label:'颞叶',color:0xd8893e,match:m=>m.userData.region==='Temporal lobe',view:[Math.PI/2,0]},
 parietal:{label:'顶叶',color:0x3d9c9b,match:m=>m.userData.region==='Parietal lobe',view:[Math.PI/2,.65]},
 frontal:{label:'额叶',color:0xbe5d7c,match:m=>m.userData.region==='Frontal lobe',view:[0,0]},
 posterior:{label:'后扣带回 · 楔前叶',color:0x6c75b6,match:m=>/Precuneus|Cingulate.*(Posterior dorsal|Posteroventral)/.test(m.userData.name),view:[Math.PI,.1]}
};
const selected=(m,t)=>regions[t]?regions[t].match(m):m.userData.kind===t;
const startView=t=>regions[t]?regions[t].view:[t==='cortex'?-1.05:0,t==='hippo'?-.05:.12];
let yaw=-1.05,pitch=.12,targetYaw=yaw,targetPitch=pitch,zoom=1,topic='cortex',inside=false,focusOnly=false,dirty=true,panels=[],previous=0;
let stageIndex=0,progress=.06,targetProgress=.06,playing=false,stageClock=0;
const stages=[['症状初现',.06,'刚出现记忆等方面的变化；此时外观差异可能很细微。'],['轻度',.36,'日常生活仍可能较独立，但记忆和处理复杂事务逐渐困难。'],['中度',.68,'记忆、沟通和日常活动受影响，通常需要更多协助。'],['重度',1,'需要广泛照护；图中显示更明显的组织减少趋势，不代表固定的临终形态。']];
const reduceMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||false;
function info(t){topic=t;document.body.dataset.topic=t;const a=topics[t];$('#title').textContent=a[0];$('#explain').textContent=a[1];$('#cap0').textContent=a[2];$('#cap1').textContent=a[3];document.querySelectorAll('[data-topic]').forEach(b=>b.classList.toggle('active',b.dataset.topic===t));$('#focus').disabled=t==='cortex';$('#focus').textContent=focusOnly?'返回全脑定位':'放大重点';$('#focus').classList.toggle('active',focusOnly);$('#mode-description').textContent=t==='cortex'?'先看表面沟壑，再看内侧结构。':focusOnly?'已单独放大当前结构，两个模型使用相同显示尺度。':regions[t]?'彩色为'+regions[t].label+'；淡色全脑轮廓帮助定位。':t==='hippo'?'金色为海马；脑轮廓仅用于帮助定位。':'蓝色为侧脑室；脑轮廓仅用于帮助定位。';stageCaptions();dirty=true;}
function decode(s,Type){let raw=atob(s),a=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)a[i]=raw.charCodeAt(i);return new Type(a.buffer);}
function indices(m){if(m.it!=='u24')return decode(m.i,m.it==='u16'?Uint16Array:Uint32Array);const a=decode(m.i,Uint8Array),out=new Uint32Array(a.length/3);for(let i=0,j=0;i<a.length;i+=3,j++)out[j]=a[i]|a[i+1]<<8|a[i+2]<<16;return out;}
const meshes=[];let min=new T.Vector3(Infinity,Infinity,Infinity),max=new T.Vector3(-Infinity,-Infinity,-Infinity);
for(const m of window.BRAIN_DATA){const p=decode(m.p,Float32Array),idx=indices(m);for(let i=0;i<p.length;i+=3){min.min(new T.Vector3(p[i],p[i+1],p[i+2]));max.max(new T.Vector3(p[i],p[i+1],p[i+2]));}meshes.push({...m,p,idx});}
const center=min.clone().add(max).multiplyScalar(.5),unit=2.85/Math.max(...max.clone().sub(min).toArray());
const kind=m=>m.name.startsWith('Hippocampus.')?'hippo':m.cat==='ventricles'?'vent':m.cat;
function geometry(m,ad){const p=m.p.slice(),k=kind(m),mean=new T.Vector3();for(let i=0;i<p.length;i+=3)mean.add(new T.Vector3(p[i],p[i+1],p[i+2]));mean.multiplyScalar(3/p.length);let local=1,global=1;if(ad){if(k==='hippo')local=.62;else if(k==='vent')local=1.48;else if(k==='white_matter'){local=1;global=.87;}else if(k==='cortex'){local=/Parahippocampal/i.test(m.name)?.80:m.region==='Temporal lobe'?.85:m.region==='Parietal lobe'?.88:m.region==='Frontal lobe'?.92:.90;global=.87;}}for(let i=0;i<p.length;i+=3)for(let j=0;j<3;j++){let v=(p[i+j]-mean.getComponent(j))*local+mean.getComponent(j);if(k==='cortex'||k==='white_matter')v=(v-center.getComponent(j))*global+center.getComponent(j);p[i+j]=(v-center.getComponent(j))*unit;}const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(p,3));g.setIndex(new T.BufferAttribute(m.idx,1));g.computeVertexNormals();g.computeBoundingSphere();return g;}
try{for(let n=0;n<2;n++){
 const renderer=new T.WebGLRenderer({canvas:canvases[n],antialias:true,alpha:true,preserveDrawingBuffer:true});if(renderer.debug)renderer.debug.onShaderError=()=>{throw Error('当前浏览器未能完成3D绘制，请重试或使用手机自带浏览器。');};renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.03;
 const scene=new T.Scene(),root=new T.Group();scene.add(root);const camera=new T.PerspectiveCamera(35,1,.01,100);
 scene.add(new T.HemisphereLight(0xfff3ed,0x536e72,1.7));
 const key=new T.DirectionalLight(0xffe8da,2.45);key.position.set(-3,4,5);scene.add(key);
 const fill=new T.DirectionalLight(0xc9e6eb,1.25);fill.position.set(4,1,2);scene.add(fill);
 const rim=new T.DirectionalLight(0xffeee4,1.8);rim.position.set(1,3,-4);scene.add(rim);
 const items=[];
 for(const m of meshes){const k=kind(m),color=k==='hippo'?0xe6a524:k==='vent'?0x278cd6:k==='cerebellum'?0xc28d90:k==='brainstem'?0xcda1a0:k==='white_matter'?0xd2b7ac:0xd9aaa5;
 const mat=new T.MeshPhysicalMaterial({color,roughness:k==='hippo'||k==='vent'?.42:.72,metalness:k==='hippo'?.08:0,clearcoat:.08,clearcoatRoughness:.7,side:T.DoubleSide});
 if(k==='hippo'||k==='vent')mat.emissive.setHex(color).multiplyScalar(.09);
 const geom=geometry(m,n===1);if(n===1){const reference=geometry(m,false);geom.morphAttributes.position=[reference.attributes.position];geom.morphAttributes.normal=[reference.attributes.normal];geom.computeBoundingSphere();}const obj=new T.Mesh(geom,mat);if(n===1)obj.morphTargetInfluences[0]=1-progress;obj.userData={kind:k,name:m.name,base:color,region:m.region};root.add(obj);items.push(obj);}
 panels.push({renderer,scene,camera,root,items});
}}
catch(e){$('#status').textContent='无法启动3D显示。请用支持WebGL的浏览器，并开启硬件加速。';console.error(e);if(window.dispatchEvent)window.dispatchEvent(new CustomEvent('brain-error',{detail:e.message}));return;}
// Measure real vertices rather than summing per-structure spheres: tighter framing without clipping.
let fullRadius=0;const frames={};
for(const p of panels)for(const m of p.items){for(const attr of [m.geometry.attributes.position,...(m.geometry.morphAttributes.position||[])]){const a=attr.array;for(let i=0;i<a.length;i+=3)fullRadius=Math.max(fullRadius,Math.hypot(a[i],a[i+1],a[i+2]));}}
for(const k of ['hippo','vent',...Object.keys(regions)]){const bounds=new T.Box3();for(const m of panels[0].items.filter(m=>selected(m,k))){m.geometry.computeBoundingBox();bounds.union(m.geometry.boundingBox);}const anchor=bounds.getCenter(new T.Vector3());let radius=0;for(const p of panels)for(const m of p.items.filter(m=>selected(m,k))){for(const attr of [m.geometry.attributes.position,...(m.geometry.morphAttributes.position||[])]){const a=attr.array;for(let i=0;i<a.length;i+=3)radius=Math.max(radius,Math.hypot(a[i]-anchor.x,a[i+1]-anchor.y,a[i+2]-anchor.z));}}frames[k]={anchor,radius};}
function visibility(){for(const p of panels)for(const m of p.items){const k=m.userData.kind,highlight=selected(m,topic);
 m.visible=inside?(focusOnly?highlight:(highlight||k==='cortex')):(k!=='hippo'&&k!=='vent');
 const shell=inside&&k==='cortex'&&!highlight;m.material.color.setHex(highlight&&regions[topic]?regions[topic].color:m.userData.base);m.material.opacity=shell?.026:1;m.material.transparent=shell;m.material.depthWrite=!shell;m.renderOrder=shell?0:1;
 }document.body.classList.toggle('inside',inside);document.body.classList.toggle('focus-only',focusOnly);dirty=true;}
const surfaceSteps=['接近参照 · 变化细微','脑回稍瘦 · 脑沟略宽','脑回更瘦 · 脑沟更宽','脑回明显变瘦 · 脑沟明显变宽'];
function stageCaptions(){if(topic==='cortex')$('#cap1').textContent=stages[stageIndex][0]+'｜'+surfaceSteps[stageIndex]+'。为便于观察而增强的形变，不是分期的标准脑图。';}
function stageInfo(){const a=stages[stageIndex];$('#stage-name').textContent=a[0];$('#stage-description').textContent=a[2];$('#ad-stage').textContent=a[0]+' · 趋势示意';document.querySelectorAll('[data-stage]').forEach(b=>{b.classList.toggle('active',Number(b.dataset.stage)===stageIndex);b.setAttribute('aria-pressed',String(Number(b.dataset.stage)===stageIndex));});$('#play-course').textContent=playing?'暂停变化':'播放变化';stageCaptions();}
function setStage(i,manual=true){stageIndex=i;targetProgress=stages[i][1];stageClock=0;if(manual)playing=false;if(manual||reduceMotion)progress=targetProgress;stageInfo();dirty=true;}
document.querySelectorAll('[data-stage]').forEach(b=>b.onclick=()=>setStage(Number(b.dataset.stage)));
$('#play-course').onclick=()=>{playing=!playing;stageClock=0;if(playing&&stageIndex===3)setStage(0,false);stageInfo();};stageInfo();
function stopSpin(){$('#spin').checked=false;}
function aim(y,p){stopSpin();targetYaw=y;targetPitch=p;if(reduceMotion){yaw=y;pitch=p;}dirty=true;}
function selectTopic(t){topic=t;inside=t!=='cortex';focusOnly=false;zoom=1;$('#zoom').value=100;info(t);visibility();$('#inside').classList.toggle('active',inside);$('#surface').classList.toggle('active',!inside);aim(...startView(t));}
$('#surface').onclick=()=>selectTopic('cortex');$('#inside').onclick=()=>selectTopic('hippo');document.querySelectorAll('[data-topic]').forEach(b=>b.onclick=()=>selectTopic(b.dataset.topic));
$('#focus').onclick=()=>{if(!inside)return;focusOnly=!focusOnly;zoom=1;$('#zoom').value=100;stopSpin();info(topic);visibility();};
$('#front').onclick=()=>aim(0,0);$('#side').onclick=()=>aim(Math.PI/2,0);$('#top').onclick=()=>aim(0,Math.PI/2);
$('#reset').onclick=()=>{focusOnly=false;zoom=1;$('#zoom').value=100;info(topic);visibility();aim(...startView(topic));};
$('#zoom').oninput=e=>{zoom=e.target.value/100;dirty=true;};
const ray=new T.Raycaster();
for(let n=0;n<2;n++){const c=canvases[n];let last=null,origin=null,moved=false;
 c.onpointerdown=e=>{stopSpin();targetYaw=yaw;targetPitch=pitch;last=[e.clientX,e.clientY];origin=last;moved=false;c.setPointerCapture(e.pointerId);};
 c.onpointermove=e=>{if(!last)return;if(Math.hypot(e.clientX-origin[0],e.clientY-origin[1])>5)moved=true;yaw+=(e.clientX-last[0])*.007;pitch=Math.max(-1.55,Math.min(1.55,pitch+(e.clientY-last[1])*.007));targetYaw=yaw;targetPitch=pitch;last=[e.clientX,e.clientY];dirty=true;};
 c.onpointerup=e=>{if(!moved){const r=c.getBoundingClientRect();ray.setFromCamera(new T.Vector2((e.clientX-r.left)/r.width*2-1,1-(e.clientY-r.top)/r.height*2),panels[n].camera);const hit=ray.intersectObjects(panels[n].items.filter(m=>m.visible&&!m.material.transparent))[0];if(hit){const k=hit.object.userData.kind;if(k==='hippo'||k==='vent')selectTopic(k);}}last=null;};
 c.onpointercancel=()=>last=null;c.addEventListener('wheel',e=>{e.preventDefault();stopSpin();zoom=Math.max(.65,Math.min(1.5,zoom-e.deltaY*.001));$('#zoom').value=zoom*100;dirty=true;},{passive:false});}
function fitDistance(aspect,radius){const v=35*Math.PI/360,h=Math.atan(Math.tan(v)*aspect);return radius/Math.sin(Math.min(v,h))*1.08/zoom;}
function render(){let drawn=0;for(const m of panels[1].items)m.morphTargetInfluences[0]=1-progress;for(let n=0;n<2;n++){const p=panels[n],c=canvases[n],w=c.clientWidth,h=c.clientHeight;if(!w||!h)continue;p.renderer.setSize(w,h,false);p.camera.aspect=w/h;p.camera.updateProjectionMatrix();p.root.rotation.set(pitch,yaw,0,'YXZ');const focus=focusOnly&&inside?frames[topic]:null;const anchor=focus?focus.anchor:new T.Vector3();p.root.position.copy(anchor).applyEuler(p.root.rotation).negate();p.camera.position.set(0,0,fitDistance(w/h,focus?focus.radius:fullRadius));p.camera.lookAt(0,0,0);p.renderer.render(p.scene,p.camera);drawn++;$('#tag'+n).textContent=regions[topic]?(regions[topic].label+(n?' · 组织减少示意':' · 解剖位置')):topic==='hippo'?(n?'海马变小':'海马的位置'):topic==='vent'?(n?'脑室变大':'侧脑室的位置'):(n?surfaceSteps[stageIndex]:'脑回相对饱满');}if(drawn===2)document.body.dataset.brainReady='true';if(drawn===2&&window.dispatchEvent&&!window.__brainFirstRender){window.__brainFirstRender=true;window.dispatchEvent(new Event('brain-ready'));}dirty=false;}
window.addEventListener('resize',()=>dirty=true);if(typeof ResizeObserver!=='undefined'){const ro=new ResizeObserver(()=>dirty=true);canvases.forEach(c=>ro.observe(c));}canvases.forEach(c=>{c.addEventListener('webglcontextlost',e=>{e.preventDefault();document.body.dataset.brainReady='false';if(window.dispatchEvent)window.dispatchEvent(new CustomEvent('brain-error',{detail:'显示连接中断，请重新载入。'}));});});visibility();info('cortex');$('#status').textContent='已载入 · 点击变化卡片自动定位，拖动即可同步旋转';
function frame(now){const dt=Math.min(previous?now-previous:16,50);previous=now;if(playing){stageClock+=dt;if(stageClock>=2600){if(stageIndex<3)setStage(stageIndex+1,false);else{playing=false;stageInfo();}}}if(Math.abs(progress-targetProgress)>.0001){progress+=(targetProgress-progress)*(reduceMotion?1:1-Math.exp(-dt*.006));dirty=true;}if($('#spin').checked){yaw+=dt*.000075;targetYaw=yaw;dirty=true;}else{const dy=Math.atan2(Math.sin(targetYaw-yaw),Math.cos(targetYaw-yaw)),dp=targetPitch-pitch;if(Math.abs(dy)+Math.abs(dp)>.0005){const a=reduceMotion?1:1-Math.exp(-dt*.012);yaw+=dy*a;pitch+=dp*a;dirty=true;}}if(dirty&&(!window.BRAIN_SOFTWARE||window.__lastBrainDraw===undefined||now-window.__lastBrainDraw>=90)){render();window.__lastBrainDraw=now;}requestAnimationFrame(frame);}requestAnimationFrame(frame);
$('#export').onclick=()=>{
 playing=false;progress=targetProgress;stageInfo();render();const out=document.createElement('canvas');out.width=2000;out.height=1320;const g=out.getContext('2d');g.fillStyle='#f4f6f2';g.fillRect(0,0,2000,1260);g.fillStyle='#183d41';g.font='bold 50px system-ui';g.fillText('看见大脑的变化 · '+(regions[topic]?regions[topic].label:topic==='cortex'?'脑沟变宽':topic==='hippo'?'海马变小':'脑室变大'),65,85);
 for(let n=0;n<2;n++){const x=60+n*960,y=130,w=920,h=810;const grad=g.createLinearGradient(x,y,x,y+h);grad.addColorStop(0,n?'#f4e8d9':'#d9eee7');grad.addColorStop(1,'#fdfbf4');g.fillStyle=grad;g.fillRect(x,y,w,h);g.fillStyle='#204b4b';g.font='bold 36px system-ui';g.fillText(n?'阿尔茨海默病 · '+stages[stageIndex][0]:'正常脑',x+28,y+55);const c=canvases[n],scale=Math.min((w-50)/c.width,(h-120)/c.height);g.drawImage(c,x+(w-c.width*scale)/2,y+90,c.width*scale,c.height*scale);g.font='bold 29px system-ui';g.fillText($('#tag'+n).textContent,x+28,1010);}
 g.fillStyle='#4d6c66';g.font='25px system-ui';g.fillText('病程趋势示意 · 不对应固定年份或寿命 · 非患者影像，不用于诊断',65,1090);g.font='28px system-ui';g.fillText('软件开发：苏裕盛 教授/医学博士',65,1150);g.font='18px system-ui';g.fillText('解剖网格：Brain Project / Z-Anatomy / BodyParts3D © DBCLS · CC BY-SA 4.0（已修改）',65,1200);g.fillText('github.com/itayinbarr/brainproject · creativecommons.org/licenses/by-sa/4.0/',65,1250);
 out.toBlob(blob=>{if(!blob){$('#status').textContent='当前浏览器暂不支持导出图片，请使用浏览器截图。';return;}const a=document.createElement('a'),url=URL.createObjectURL(blob);a.href=url;a.download='Brain_Comparison_'+topic+'_stage'+(stageIndex+1)+'.png';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);},'image/png');};
})();
