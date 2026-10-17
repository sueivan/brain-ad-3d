# 看见大脑的变化 V8.0
软件开发：苏裕盛 教授/医学博士

## 上传
将index.html与整个assets文件夹一起覆盖上传至仓库根目录。顶部显示GPU直绘版 V8.0。保留许可文件。

## 本次修改
恢复第一版直接创建Three.js WebGLRenderer的GPU绘图路径，移除强制CPU及额外GPU探测。保留目前四阶段、脑区与移动端布局，模型仍使用约1MB的简化解剖网格；不代表整个项目回滚为第一版。
视频及GIF烧录明确的Aβ和Tau原文标注、引线与说明；两者分别标在细胞外斑块和细胞内缠结处。不使用“陶”。保留视频进度检测、返回网页按钮。

## 验证
模型几何、阶段、主题、取景及媒体状态与返回按钮的程序检查通过；视频完整解码，Aβ与Tau画面逐张复核。GPU实际性能未在用户手机验证。

## 医学边界
正常参照为通用解剖图谱。AD侧形变为视觉增强科普示意，没有按临床随访数据标定。四步不对应固定年份或标准分期脑图；“症状初现”与轻度可重叠。
海马旁回高亮不是内嗅皮质的精确分割。颜色仅用于定位，不是PET信号或病理程度。
细胞动画为机制示意，非显微实拍；四个观察分镜不对应病程四阶段或固定病理发生顺序。

## 依据与授权
NIA：https://www.nia.nih.gov/health/alzheimers-causes-and-risk-factors/what-happens-brain-alzheimers-disease
病程：https://www.alz.org/alzheimers-dementia/stages
脑区：https://www.alzheimers.org.uk/about-dementia/stages-and-symptoms/areas-of-the-brain

解剖网格来自 Brain Project / Z-Anatomy / BodyParts3D © DBCLS：https://github.com/itayinbarr/brainproject
几何筛选、平滑、减面、转码和AD形变属于派生修改，遵循 CC BY-SA 4.0：https://creativecommons.org/licenses/by-sa/4.0/
详见 MODEL_LICENSE.txt。Three.js采用MIT许可，详见 THREE_LICENSE.txt。软件署名不替代模型原作者署名。

