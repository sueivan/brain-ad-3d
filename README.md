# 看见大脑的变化 V7.5 轻量修复版
软件开发：苏裕盛 教授/医学博士

## GitHub 更新方法（本版与以前不同）
解压后，把 index.html 与 assets 文件夹一起上传到 brain-ad-3d 仓库根目录，覆盖同名文件。保留 assets 文件夹内的文件名和目录结构。
本版不能只上传 index.html；模型、程序、视频和GIF已拆成独立文件。
MODEL_LICENSE.txt、THREE_LICENSE.txt 建议同时上传保留。
地址仍为 https://sueivan.github.io/brain-ad-3d/ 。部署后顶部应显示“轻量修复版 V7.5”。
如果本地直接双击HTML，浏览器可能限制模型读取；本版面向GitHub Pages使用。

## 改动
1. index.html 从约23.9MB缩至约9.5KB；3D模型数据约3.8MB，异步加载。视频按点击加载，GIF使用懒加载。
2. 真实图谱网格保留120个结构：皮质采用一轮平滑与顶点聚类，白质基底等按结构大小减面。三角形总数降至约23.2万，每个视图采用相同尺度。模型解码与显存负担降低。
3. 显示模型下载进度；初始化、网络或绘制失败时显示错误与重试入口。
4. 阶段按钮位于AD疾病脑正上方：手机排列为正常脑、阶段按钮、疾病脑。滚到疾病脑后按钮条固定在屏幕顶部；桌面按钮仅在疾病脑一列。
5. 保留病程形变、三个观察主题与五组额外脑区、独立GIF/高清视频控件、图片导出和署名。

## 医学边界
正常参照为通用解剖图谱。AD侧形变为视觉增强科普示意，没有按临床随访数据标定。四步不对应固定年份或标准分期脑图；“症状初现”与轻度可重叠。
海马旁回高亮不是内嗅皮质的精确分割。颜色仅用于定位，不是PET信号或病理程度。
细胞动画为机制示意，非显微实拍；四个观察分镜不对应病程四阶段或固定病理发生顺序。

## 检查
几何顶点、索引及法线有效性，阶段切换，八个主题显隐，内部定位、重点放大、手机窄屏与桌面投影取景、PNG导出及媒体按钮逻辑已作程序检查。异步加载的成功、失败和重试路径已检查。
几何已作软件渲染复核。WebGL在检查中使用模拟渲染器，未在真实手机浏览器实机验证；文件变小不证明原空白的唯一原因就是文件体积。

## 依据与授权
NIA：https://www.nia.nih.gov/health/alzheimers-causes-and-risk-factors/what-happens-brain-alzheimers-disease
病程：https://www.alz.org/alzheimers-dementia/stages
脑区：https://www.alzheimers.org.uk/about-dementia/stages-and-symptoms/areas-of-the-brain

解剖网格来自 Brain Project / Z-Anatomy / BodyParts3D © DBCLS：https://github.com/itayinbarr/brainproject
几何筛选、平滑、减面、转码和AD形变属于派生修改，遵循 CC BY-SA 4.0：https://creativecommons.org/licenses/by-sa/4.0/
详见 MODEL_LICENSE.txt。Three.js采用MIT许可，详见 THREE_LICENSE.txt。软件署名不替代模型原作者署名。
