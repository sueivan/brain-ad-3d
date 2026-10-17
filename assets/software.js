/* Canvas2D renderer for anatomical meshes: perspective, depth sorting and smooth normal lighting.
   This uses the same atlas geometry and stage morphs as the WebGL renderer. */
(()=>{'use strict';const T=window.THREE;
class BrainCanvasRenderer{
 constructor({canvas}){this.domElement=canvas;this.ctx=canvas.getContext('2d',{alpha:true});if(!this.ctx)throw Error('当前浏览器无法创建绘图画布。');this.width=0;this.height=0;this.cache=new WeakMap();this.palettes=new Map();this.debug={};}
 setPixelRatio(){/* Native CSS pixel rendering keeps CPU use predictable on phones. */}
 setSize(w,h){w=Math.max(1,Math.round(w));h=Math.max(1,Math.round(h));if(w!==this.width||h!==this.height){this.domElement.width=w;this.domElement.height=h;this.width=w;this.height=h;}}
 render(scene,camera){const ctx=this.ctx,w=this.width,h=this.height;ctx.clearRect(0,0,w,h);scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);const vp=new T.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse),triangles=[];
 scene.traverseVisible(mesh=>{if(!mesh.isMesh)return;const g=mesh.geometry,mat=mesh.material,a=g.attributes.position.array,n=g.attributes.normal.array,idx=g.index.array,mp=g.morphAttributes.position?.[0]?.array,mn=g.morphAttributes.normal?.[0]?.array,b=mp?(mesh.morphTargetInfluences?.[0]||0):0,wm=mesh.matrixWorld.elements,M=new T.Matrix4().multiplyMatrices(vp,mesh.matrixWorld).elements;
 let points=this.cache.get(mesh);if(!points||points.length!==a.length/3*4){points=new Float32Array(a.length/3*4);this.cache.set(mesh,points);}
 for(let i=0,j=0;i<a.length;i+=3,j+=4){const x=a[i]+(mp?mp[i]-a[i]:0)*b,y=a[i+1]+(mp?mp[i+1]-a[i+1]:0)*b,z=a[i+2]+(mp?mp[i+2]-a[i+2]:0)*b,q=M[3]*x+M[7]*y+M[11]*z+M[15];points[j]=((M[0]*x+M[4]*y+M[8]*z+M[12])/q+1)*w*.5;points[j+1]=(1-(M[1]*x+M[5]*y+M[9]*z+M[13])/q)*h*.5;points[j+2]=(M[2]*x+M[6]*y+M[10]*z+M[14])/q;
 const nx=n[i]+(mn?mn[i]-n[i]:0)*b,ny=n[i+1]+(mn?mn[i+1]-n[i+1]:0)*b,nz=n[i+2]+(mn?mn[i+2]-n[i+2]:0)*b;const wx=wm[0]*nx+wm[4]*ny+wm[8]*nz,wy=wm[1]*nx+wm[5]*ny+wm[9]*nz,wz=wm[2]*nx+wm[6]*ny+wm[10]*nz;points[j+3]=Math.max(0,(-.30*wx+.50*wy+.81*wz)/(Math.hypot(wx,wy,wz)||1));}
 const hex=mat.color.getHex(),key=String(hex);let palette=this.palettes.get(key);if(!palette){const r=hex>>16&255,gg=hex>>8&255,bb=hex&255;palette=Array.from({length:32},(_,v)=>{const s=.62+.38*v/31;return `rgb(${Math.round(r*s)},${Math.round(gg*s)},${Math.round(bb*s)})`;});this.palettes.set(key,palette);}
 const opacity=mat.opacity??1;
 for(let i=0;i<idx.length;i+=3){const ia=idx[i]*4,ib=idx[i+1]*4,ic=idx[i+2]*4,z=(points[ia+2]+points[ib+2]+points[ic+2])/3;if(z< -1||z>1)continue;const shade=Math.min(31,Math.round((points[ia+3]+points[ib+3]+points[ic+3])*31/3));triangles.push([z,points,ia,ib,ic,palette[shade],opacity]);}
 });triangles.sort((a,b)=>b[0]-a[0]);let lastColor='',lastAlpha=-1;
 for(const t of triangles){const p=t[1],a=t[2],b=t[3],c=t[4];if(lastColor!==t[5]){ctx.fillStyle=t[5];lastColor=t[5];}if(lastAlpha!==t[6]){ctx.globalAlpha=t[6];lastAlpha=t[6];}const cx=(p[a]+p[b]+p[c])/3,cy=(p[a+1]+p[b+1]+p[c+1])/3,s=1.004;ctx.beginPath();ctx.moveTo(cx+(p[a]-cx)*s,cy+(p[a+1]-cy)*s);ctx.lineTo(cx+(p[b]-cx)*s,cy+(p[b+1]-cy)*s);ctx.lineTo(cx+(p[c]-cx)*s,cy+(p[c+1]-cy)*s);ctx.closePath();ctx.fill();}ctx.globalAlpha=1;this.lastTriangleCount=triangles.length;
 }
}
T.WebGLRenderer=BrainCanvasRenderer;window.BRAIN_SOFTWARE=true;
})();
