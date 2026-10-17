# 看见大脑的变化 V7.7 兼容绘图版
软件开发：苏裕盛 教授/医学博士

## GitHub 更新方法（本版与以前不同）
解压后，把 index.html 与 assets 文件夹一起上传到 brain-ad-3d 仓库根目录，覆盖同名文件。保留 assets 文件夹内的文件名和目录结构。
本版不能只上传 index.html；模型、程序、视频和GIF已拆成独立文件。
MODEL_LICENSE.txt、THREE_LICENSE.txt 建议同时上传保留。
地址仍为 https://sueivan.github.io/brain-ad-3d/ 。部署后顶部应显示“兼容绘图版 V7.7”。
如果本地直接双击HTML，浏览器可能限制模型读取；本版面向GitHub Pages使用。

## 放大观看与返回
“全屏观看”改为网页内放大，右上角始终显示“返回网页 ×”。点击后回到原滚动位置；桌面也可按Esc返回。放大时原按钮状态切换为“退出全屏”。
本次必须同步更新 index.html、assets/media.js 和 assets/style.css；建议将index.html与整个assets文件夹一同上传覆盖。

## 改动
1. 改用Canvas2D对真实解剖网格作透视投影和深度排序，不再依赖WebGL。保留拖动旋转、缩放、脑区选择及四阶段形变。
2. 120个结构采用网格简化，总计约5.3万三角形，模型约1MB。移动设备使用较低细节与绘制频率。
3. 保留AD脑正上方的四阶段按钮、GIF/视频、放大观看与“返回网页 ×”。

## 医学边界
正常参照为通用解剖图谱。AD侧形变为视觉增强科普示意，没有按临床随访数据标定。四步不对应固定年份或标准分期脑图；“症状初现”与轻度可重叠。
海马旁回高亮不是内嗅皮质的精确分割。颜色仅用于定位，不是PET信号或病理程度。
细胞动画为机制示意，非显微实拍；四个观察分镜不对应病程四阶段或固定病理发生顺序。

## 检查
使用真实Canvas2D画布输出PNG并检查非空像素、阶段画面差异；几何、四阶段、八个主题、窄屏取景及返回按钮检查通过。
线上旧版在云浏览器复现WebGL创建失败，不能据此断定用户手机的唯一原因。本版尚未在用户手机或上线后的网址验证。

## 依据与授权
NIA：https://www.nia.nih.gov/health/alzheimers-causes-and-risk-factors/what-happens-brain-alzheimers-disease
病程：https://www.alz.org/alzheimers-dementia/stages
脑区：https://www.alzheimers.org.uk/about-dementia/stages-and-symptoms/areas-of-the-brain

解剖网格来自 Brain Project / Z-Anatomy / BodyParts3D © DBCLS：https://github.com/itayinbarr/brainproject
几何筛选、平滑、减面、转码和AD形变属于派生修改，遵循 CC BY-SA 4.0：https://creativecommons.org/licenses/by-sa/4.0/
详见 MODEL_LICENSE.txt。Three.js采用MIT许可，详见 THREE_LICENSE.txt。软件署名不替代模型原作者署名。
