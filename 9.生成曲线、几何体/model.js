import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const geometry = new THREE.BufferGeometry()
// const R = 100 // 圆弧半径
// const N = 50 // 分段数量
// const sp = Math.PI / N // 相隔弧度

// // 设置圆心坐标
// const cx = 50
// const cy = -50

// // 批量生成顶点数据
// const arr = []
// for (let i = 0; i < N; i++) {
//     const angle = sp * i // 当前点弧度
//     // 以坐标原点为中心，在 XOY 平面上生成顶点数据
//     const x = cx + R * Math.cos(angle)
//     const y = cy + R * Math.sin(angle)
//     arr.push(x, y, 0)
// }

// // 类型数组创建顶点数据
// const vertices = new Float32Array(arr)
// // 创建属性缓冲区对象
// const attribute = new THREE.BufferAttribute(vertices, 3)

// // 设置几何体的位置属性
// geometry.attributes.position = attribute

// 三维向量 Vector3 表示顶点坐标，xyz
// const pointsArr = [
//     // 三维向量 Vector3 表示的坐标值
//     new THREE.Vector3(0, 0, 0),
//     new THREE.Vector3(0, 100, 0),
//     new THREE.Vector3(0, 100, 100),
//     new THREE.Vector3(0, 0, 100)
// ]

// // 二维向量 Vector2 表示顶点坐标，xy
// const pointsArr = [
//     // 三维向量 Vector3 表示的坐标值
//     new THREE.Vector3(0, 0),
//     new THREE.Vector3(30, 0),
//     new THREE.Vector3(30, 30),
//     new THREE.Vector3(0, 30)
// ]

// // 几何体 BufferGeometry 的 .setFromPoints() 方法
// // 把坐标数据提取出来，赋值给 geometry.attributes.position 属性
// geometry.setFromPoints(pointsArr)

// 曲线 Curve 简介
// 一、EllipseCurve 椭圆
// EllipseCurve(中心x坐标，中心y坐标，x轴半径，y轴半径，弧线开始角度，从X轴正半轴开始，默认0，弧线结束角度，从X轴正半轴开始，默认2*Math.PI，是否顺时针绘制，默认false)
// EllipseCurve(aX，aY，xRadius，yRadius，aStartAngle，aEndAngle，aClockwise)
// const ellipse = new THREE.EllipseCurve(0, 0, 100, 50, Math.PI, ((Math.PI * 2)/4)*3, true)
// getPoints 考虑曲线斜率，斜率变化快，返回的顶点更多
// const points = ellipse.getPoints(50)
// getSpacedPoints 按照距离等间距返回顶点
// const points = ellipse.getSpacedPoints(30)
// points 越多，曲线越光滑
// geometry.setFromPoints(points)

// 二、2D 线段曲线
// const line = new THREE.LineCurve(new THREE.Vector2(0, 10), new THREE.Vector3(100, 10))
// const points = line.getPoints(3)
// geometry.setFromPoints(points)

// 三、样条曲线：经过一系列点创建的平滑曲线
// SplineCurve、CatmullRomCurve3
// 2d
// const arr = [
//     new THREE.Vector2(10, -10),
//     new THREE.Vector2(-20, 20),
//     new THREE.Vector2(60, 60)
// ]
// const splineCurve = new THREE.SplineCurve(arr)
// const points = splineCurve.getPoints(50)
// geometry.setFromPoints(points)

// 3d
const arr = [
    new THREE.Vector3(10, -10, 60),
    new THREE.Vector3(-20, 20, 0),
    new THREE.Vector3(60, 60, -60)
]
const catmullRomCurve = new THREE.CatmullRomCurve3(arr)
const points = catmullRomCurve.getPoints(50)
geometry.setFromPoints(points)

// 四、贝塞尔曲线：二次贝塞尔曲线、三次贝塞尔曲线
// 二次：起点、终点、1个控制点
// 三次：起点、终点、2个控制点

// 二维二次贝塞尔曲线 QuadraticBezierCurve(起点，控制点，终点)
// const arr = [
//     new THREE.Vector2( -10, 0 ),
// 	new THREE.Vector2( 20, 15 ),
// 	new THREE.Vector2( 10, 0 )
// ]
// const quadraticBezierCurve = new THREE.QuadraticBezierCurve(...arr)
// const points = quadraticBezierCurve.getPoints(50)
// geometry.setFromPoints(points)

// 三维二次贝塞尔曲线
// const arr = [
//     new THREE.Vector3(-10, 0, 70),
// 	new THREE.Vector3(20, 50, 0),
// 	new THREE.Vector3(10, 0, -30)
// ]
// const quadraticBezierCurve3 = new THREE.QuadraticBezierCurve3(...arr)
// const points = quadraticBezierCurve3.getPoints(50)
// geometry.setFromPoints(points)

// 二维三次贝塞尔曲线 CubicBezierCurve(起点，控制点1，控制点2，终点)
// const arr = [
//     new THREE.Vector2(-10, 0),
// 	new THREE.Vector2(10, 15),
// 	new THREE.Vector2(20, 18),
// 	new THREE.Vector2(30, 5)
// ]
// const cubicBezierCurve = new THREE.CubicBezierCurve(...arr)
// const points = cubicBezierCurve.getPoints(50)
// geometry.setFromPoints(points)

// // 三维三次贝塞尔曲线 
// const arr = [
//     new THREE.Vector3(-10, 0, 70),
// 	new THREE.Vector3(20, 50, 0),
// 	new THREE.Vector3(10, 0, -30),
// 	new THREE.Vector3(10, 0, -10)
// ]
// const cubicBezierCurve3 = new THREE.CubicBezierCurve3(...arr)
// const points = cubicBezierCurve3.getPoints(50)
// geometry.setFromPoints(points)

// // 验证点是否被经过
// const geometry2 = new THREE.BufferGeometry()
// geometry2.setFromPoints(arr)
// const material2 = new THREE.PointsMaterial({
//     color: 0xff00ff,
//     size: 10,
// })
// const points2 = new THREE.Points(geometry2, material2)

// // 将点连成线，观察 相切
// const material3 = new THREE.LineBasicMaterial({
//     color: 0xff00ff,
//     size: 10,
// })
// const points3 = new THREE.Line(geometry2, material2)

// 四、样条、贝塞尔曲线应用：飞线，比如地球、地图上的飞线
// 🌰：已知两点坐标，生成一条轨迹飞线，曲线有一定的高度
// const p1 = new THREE.Vector3(-100, 0, -100)
// const p3 = new THREE.Vector3(100, 50, 100)
// // 计算中点坐标
// const x2 = (p1.x + p3.x) / 2
// const z2 = (p1.z + p3.z) / 2
// const h = 70
// const p2 = new THREE.Vector3(x2, h, z2)
// const arr = [p1, p2, p3]
// const catmullRomCurve = new THREE.CatmullRomCurve3(arr)
// const points = catmullRomCurve.getPoints(50)
// geometry.setFromPoints(points)
// const quadraticBezierCurve3 = new THREE.QuadraticBezierCurve3(...arr)
// const points = quadraticBezierCurve3.getPoints(50)
// geometry.setFromPoints(points)

// 五、CurvePath 拼接曲线
// 注意：组成曲线的坐标顺序、线条组合的顺序不能随意写，要从一个方向出发，确保他们是首尾相接
// const r = 30
// const h = 30
// const line1 = new THREE.LineCurve(
//     new THREE.Vector2(r, r + h),
//     new THREE.Vector2(r, r)
// )
// const arc = new THREE.ArcCurve(0, r, r, 0, Math.PI, true)
// // const arc = new THREE.ArcCurve(0, r, r, Math.PI, Math.PI*2, true)
// const line2 = new THREE.LineCurve(
//     new THREE.Vector2(-r, r),
//     new THREE.Vector2(-r, r + h)
// )
// const curvePath = new THREE.CurvePath()
// curvePath.curves.push(line1, arc, line2)
// const points = curvePath.getPoints(10)
// geometry.setFromPoints(points)

// 六、曲线路径管道 TubeGeometry 沿着三维曲线
// const geometry = new THREE.TubeGeometry(catmullRomCurve, 20, 5)

// 七、旋转成型 LatheGeometry 利用二维轮廓，经过旋转（默认是绕着Y轴）生成3D几何体曲面
// LatheGeometry(points, segments, phiStart, phiLength)
// points Vector2 表示的坐标数据组成的数组，x 必须大于 0
// const arr = [
//     new THREE.Vector2(50, 60),
//     new THREE.Vector2(25, 0),
//     new THREE.Vector2(50, -60)
// ]
// const splineCurve = new THREE.SplineCurve(arr)
// const points = splineCurve.getPoints(50)
// const geometry = new THREE.LatheGeometry(points, 30, 0, Math.PI*2)

// 八、Shape、ShapeGeometry、ExtrudeGeometry
// Shape，多边形轮廓，Shape(points)，points 为 Vector2 数组
// Shape，.currentPoint 当前点
// .moveTo(x, y) 可以改变，执行其他绘制方法也能改变，比如 .lineTo
// .lineTo(x, y)
// const shape = new THREE.Shape([
//     new THREE.Vector2(10, 10),
//     new THREE.Vector2(10, 30),
//     new THREE.Vector2(30, 30),
//     new THREE.Vector2(30, 10)
// ])
const shape = new THREE.Shape()
shape.lineTo(40, 0)
shape.lineTo(40, 40)
shape.lineTo(0, 40)
shape.lineTo(0, 0)

// 绘制矩形加扇形
// shape.lineTo(60, 0)
// arc 的圆心坐标是相当于当前的 currentPoint 而言的
// absarc 是以坐标原点而言的
// shape.arc(0, 0, 30, 0, Math.PI / 2)
// shape.absarc(60, 0, 30, 0, Math.PI / 2)
// shape.lineTo(0, 30)

// .holes path 数组，定义 shape 上的孔洞
const path1 = new THREE.Path()
path1.absarc(10, 10, 5)
const path2 = new THREE.Path()
path2.absellipse(25, 25, 10, 6)
shape.holes.push(path1, path2)

console.log(shape, 'shape')

// ShapeGeometry(shapes: Array, curveSegments: Integer)
// const geometry = new THREE.ShapeGeometry(shape)

// ExtrudeGeometry(shapes: Array, options: Object)
// 扫描轨迹：创建轮廓的扫描轨迹(3D样条曲线)
// const curve = new THREE.CatmullRomCurve3([
//     new THREE.Vector3(20, 20, 0),
//     new THREE.Vector3(10, 0, 0),
//     new THREE.Vector3(8, 50, 50)
// ])
// const geometry = new THREE.ExtrudeGeometry(shape, {
    // 拉伸长度
    // depth: 10,
    // 生成斜角，默认是 true
    // bevelEnabled: false,
    // 拉伸轨迹
    // extrudePath: curve,
    // 拉伸出的几何体分几段
    // steps: 100,
    // 曲线上点的数量
    // curveSegments: 1
// })

// 九、模型边界线 EdgesGeometry
// const edgesGeometry = new THREE.EdgesGeometry(geometry, 1)
// const edgesModel = new THREE.LineSegments(edgesGeometry, new THREE.LineBasicMaterial({
//     color: 0x00ffff
// }))

// 十、几何体顶点颜色数据 .attributes.color
// .attributes.color 和 .attributes.position 一一对应
// 3 个为一组，R，G，B
// 材质需要设置 .vertexColors 为 true，是否使用顶点着色。默认值为false
// const geometry = new THREE.BufferGeometry()
// const vertices = new Float32Array([
//     5, 5, 0,
//     50, 5, 0,
//     50, 50, 0
// ])
// geometry.attributes.position = new THREE.BufferAttribute(vertices, 3)

// const colors = new Float32Array([
//     1, 0, 0, // 红
//     0, 0, 1, // 蓝
//     0, 1, 0 // 绿
// ])
// geometry.attributes.color = new THREE.BufferAttribute(colors, 3)

// 设置曲线颜色渐变
console.log(geometry.attributes.position);
const positionCount = geometry.attributes.position.count
const colorsArr = []
for (let i = 0; i < positionCount; i++) {
    const per = i / positionCount
    colorsArr.push(per, 0, 1 - per)
}
console.log(colorsArr, 'colorsArr')
const colors = new Float32Array(colorsArr)
geometry.attributes.color = new THREE.BufferAttribute(colors, 3)

// 颜色插值
// lerpColors(c1, c2, percent)
// percent 代表 c2 的比例，c1 的比例为 1 - percent
// r = c1.r * (1 - percent) + c2.r * percent
// g、b 也是如此计算 
const c1 = new THREE.Color(0.6, 0.2, 0.1)
const c2 = new THREE.Color(0.4, 0.8, 0.9)
// const mix = new THREE.Color()
// mix.lerpColors(c1, c2, 0.4)
// console.log(mix, 'mix')

// lerp(c2, percent)
// c1.lerp(c2, percent) 混合后的值直接赋值给 c1 
// 可通过 .clone() 一个新的颜色对象，避免 c1 被修改
// c1.lerp(c2, 0.4)
c1.clone().lerp(c2, 0.4)
console.log(c1, 'c1')

// 九、查看或设置 gltf 几何体顶点 & 山脉高度可视化
const loader = new GLTFLoader()
const group = new THREE.Group()
loader.load('./地形.glb', (gltf) => {
    group.add(gltf.scene)
    const mesh = gltf.scene.children[0]
    console.log(mesh, 'mesh')
    const attr = mesh.geometry.attributes
    const pos = mesh.geometry.attributes.position
    const material = mesh.material
    material.vertexColors = true
    // .getX(index) .getY(index) .getZ(index)
    // .setX(index, value) .setY(index, value) .setZ(index, value)

    // console.log(attr, 'attr')
    // console.log(pos, 'pos')
    // pos.setY(0, 10)
    // console.log(pos.getY(0))

    // 设置地形高度
    // for (let i = 0; i < pos.count; i++) {
    //     const y = pos.getY(i)
    //     pos.setY(i, y*2)
    // }

    // 高度可视化
    let yArr = []
    for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i)
        yArr.push(y)
    }
    const maxY = Math.max(...yArr)
    const minY = Math.min(...yArr)
    const height = maxY - minY
    let colorArr = []
    let cRed = new THREE.Color(1, 0, 0)
    let cGreen = new THREE.Color(0, 1, 0)
    let cYellow = new THREE.Color(1, 1, 0)
    for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i)
        let color = new THREE.Color()
        let per = (y - minY) / height
        if (per <= 0.5) {
            color.lerpColors(cGreen, cYellow, per * 2)
        } else {
            // 以下两种都是对的
            color.lerpColors(cRed, cYellow, (1 - per) * 2)
            // color.lerpColors(cYellow, cRed, (per - 0.5) * 2)
        }
        colorArr.push(color.r, color.g, color.b)
    }
    const colors = new Float32Array(colorArr)
    mesh.geometry.attributes.color = new THREE.BufferAttribute(colors, 3)

    // （1）两种颜色表示山脉高度可视化
    // 我自己的算法：直接拿当前的高度 / 最高点，但其实这样不准确，因为这样会导致部分颜色出不来，可视化效果不准确（比如高度的最小值就是 300）
    // 准确的算法：求出山的高度，然后拿每一个高减去最小高，这样才能准确算出比例

    // （2）三种颜色表示山脉高度可视化
})



// 点材质
const pointMaterial = new THREE.PointsMaterial({
    // color: 'red',
    size: 10,
    vertexColors: true
})
// 点模型
const pointModel = new THREE.Points(geometry, pointMaterial)

// 线材质
const lineMaterial = new THREE.LineBasicMaterial({
    // color: 'pink',
    // 由于 OpenGL Core Profile 与 大多数平台上 WebGL 渲染器的限制，无论如何设置该值，线宽始终为 1
    // linewidth: 100
    vertexColors: true
})
// 线模型
const lineModel = new THREE.Line(geometry, lineMaterial)

// 网格材质
const meshMaterial = new THREE.MeshBasicMaterial({ 
    // color: 0x00ff00,
    side: THREE.DoubleSide,
    // wireframe: true
    vertexColors: true
})
// 网格模型
const meshModel = new THREE.Mesh(geometry, meshMaterial)

// export default pointModel
// export { lineModel, points2, points3 }
// export { lineModel }
// export { pointModel }
// export { meshModel }
// export { meshModel, edgesModel }
export { group }