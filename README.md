# 真实MRI对照 V3.0
软件开发：苏裕盛 教授/医学博士

## 上传方法
本包的 index.html 已包含全部影像及程序，无需其他依赖。
将 index.html 上传到原 brain-ad-3d 仓库的根目录，覆盖旧文件。
不需要创建新仓库。提交并等待GitHub Pages部署完成后按 Ctrl+F5。
预期网址：https://sueivan.github.io/brain-ad-3d/
也可直接在本机双击 index.html 使用。

## 教学功能
正常与AD并排比较、冠状位/轴位切换、同步显示放大和拖动、观察区域定位、箭头开关、完整原图核对、文献及许可链接。
所有影像均为真实发表的MRI二维图版，不是3D、不是原始DICOM，也不是患者诊断工具。

## 来源与许可
1. McKeith IG, Boeve BF, Dickson DW, et al. Diagnosis and management of dementia with Lewy bodies: Fourth consensus report of the DLB Consortium. Neurology. 2017;89(1):88-100. doi:10.1212/WNL.0000000000004058. Fig 1A.
MRI部分由Lukelahood编辑，Commons来源页明确列为CC BY 4.0；原图注明影像由Dr. Val Lowe, Mayo Clinic提供并获准转载。
https://commons.wikimedia.org/wiki/File:MRI_Alzheimer_Disease_and_Dementia_with_Lewy_Bodies.jpg
原始列为AD / DLB / NC；网页取NC与AD。原始像素732×204。
2. Chandra A, Dervenoulas G, Politis M, for ADNI. Magnetic resonance imaging in Alzheimer’s disease and mild cognitive impairment. J Neurol. 2019;266:1293-1302. doi:10.1007/s00415-018-9016-3. Fig 1. CC BY 4.0.
https://commons.wikimedia.org/wiki/File:Control_MCI_AD_-_T1.jpg
原始图版标签为Normal / MCI / AD；网页取Normal与AD。原始像素1772×709，T1-MPRAGE轴位。
影像许可：https://creativecommons.org/licenses/by/4.0/
修改说明：只通过SVG取景、缩放和叠加教学箭头，未修改脑组织形态、灰度或用生成式AI增强影像。红框为原图已有标记。original-images目录保留来源图版原始字节。

## 解读边界
病例年龄、病期、体素尺寸与配准信息未在图注中完整报告；不宣称严格匹配或相同毫米尺度，不作体积比较。不同病例不是同一人的病程，MRI萎缩不是AD特异性诊断。海马定位为教学区域，箭头不是精确分割。

## 检查
已人工核对来源原图的诊断标签、顺序、切面、许可及原始尺寸，并检查图像嵌入、正常与AD取景列、同步缩放/重置、切面切换、原图弹窗与箭头开关逻辑。尚未实测浏览器视觉布局及触屏操作。
