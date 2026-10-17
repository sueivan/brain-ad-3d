# 正常与AD脑结构交互对比 V2.0

软件开发：苏裕盛 教授/医学博士

## GitHub Pages
仓库名继续使用 brain-ad-3d，不需新建仓库。
解压后上传全部文件与文件夹到仓库根目录，覆盖原来的同名文件，保留目录结构。
进入 Settings → Pages，选择 Deploy from a branch → main → /(root)，保存。
账号为 sueivan 时，网址为 https://sueivan.github.io/brain-ad-3d/ 。上传后按 Ctrl+F5 刷新。

## 本地运行
将所有文件保持在同一文件夹内，双击 index.html；无需安装软件或联网。
使用支持WebGL的Chrome、Edge或Safari，并开启硬件加速。

## 功能
同步旋转、滚轮/滑块缩放、自动旋转、前/侧/上面观、内部观察海马与侧脑室、点击结构、中文解读。

## 模型来源与修改
3D解剖网格取自 Brain Project：https://github.com/itayinbarr/brainproject
原始几何来自 Z-Anatomy / BodyParts3D，© DBCLS；遵循 CC BY-SA 4.0。
已筛选118个结构、转码、对皮质应用两次Loop细分以获得平滑外形、重新着色，并制作AD教学变形。
本包 brain-data.js 及其几何派生修改（包括AD变形）依照 CC BY-SA 4.0 提供；保留署名并以相同许可共享。
完整上游许可说明见 MODEL_LICENSE.txt。
Three.js r170 使用MIT许可，见 THREE_LICENSE.txt。

正常侧是解剖图谱参照，不是某位正常老年人的MRI。AD侧演示局部萎缩与侧脑室扩大方向，形变参数不代表临床测量、疾病分期或诊断依据。
正常与AD使用同一显示尺度。内部模式隐藏皮质，不是MRI断面。

## 验证范围
已检查网格索引、顶点及法线有效性、双侧模型、海马缩小/脑室扩大、内外模式切换、重置逻辑及本地依赖完整性。
已从同一网格制作独立几何预览以检查脑形；尚未在真实浏览器中实测WebGL画面、触屏操作及设备性能。
