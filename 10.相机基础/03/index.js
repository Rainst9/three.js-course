import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 引入模型对象
import { mesh, catmullRomCurve } from './model.js'

// 场景
const scene = new THREE.Scene()
scene.add(mesh)

// 坐标系
const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)

// 光源
  // 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(100, 60, 50)
scene.add(directionalLight)

  // 环境光
const ambient = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambient)

// 坐标格辅助对象
// const gridHelper = new THREE.GridHelper(100, 20, 'red', 'pink')
// scene.add(gridHelper)
// gridHelper.position.y = -2

// 相机、渲染器
const width = window.innerWidth
const height = window.innerHeight
// const fov = 20
const fov = 100
const camera = new THREE.PerspectiveCamera(fov, width / height, 1, 3000)
camera.position.set(203, 156, 128)
// x: 203.32647622810867, y: 156.65813289557363, z: 128.99596148059564
// camera.lookAt(0, 0, 0)
camera.lookAt(13, 3.7, -25.2)
// x: 13.04626280766242, y: 3.7708402117835695, z: -25.286268929638346

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
// 解决纹理贴图颜色偏差
// 新版本已经废弃，改为了 .outputColorSpace，默认就是 THREE.SRGBColorSpace
renderer.outputEncoding = THREE.sRGBEncoding
document.body.appendChild(renderer.domElement)

// 轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// controls 的 target 表示相机观察目标，默认是 0，0，0
// 当相机 lookAt 变化时，target 也要变化
controls.target.set(13, 3.7, -25.2)
controls.update()

// 获取曲线上的点
const points = catmullRomCurve.getPoints(500)
let i = 0
console.log(points, 'points')
setInterval(() => {
  // 直接使用 .copy 方法，复制值并赋值
  camera.position.copy(points[i])
  camera.lookAt(points[i+1])
  // camera.position.set(points[i].x, points[i].y, points[i].z)
  // camera.lookAt(points[i+1].x, points[i+1].y, points[i+1].z)
  i++
  if (i >= points.length - 1) i = 0
}, 10)
// lookAt 相邻点，近似于当前曲线当前点的切线方向
// camera.position.set(points[10].x, points[10].y, points[10].z)
// camera.lookAt(points[11].x, points[11].y, points[11].z)
// 相机控件 .target 和 .lookAt() 参数同步，这样你可以旋转相机观察管道内部
// ** 注意：相机控件 .target 一般只需要和 .lookAt() 初始值相同即可
// controls.target.set(points[11].x, points[11].y, points[11].z)
// controls.update()

// 渲染循环
// let angle = 0
// const R = 100
function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)

  // 一、相机直线运动
  // 修改 .position 属性后，如果不执行 .lookAt 方法，观察方向是默认的，会一直变化
  // camera.position.y += 0.1
  // camera.lookAt(13, 3.7, -25.2)

  // 二、相机圆周运动
  // angle += 0.01
  // camera.position.x = R * Math.cos(angle)
  // camera.position.z = R * Math.sin(angle)
  // camera.lookAt(13, 3.7, -25.2)

  // 查看相机位置的变化
  // console.log('camera.position', camera.position);
  // console.log('controls.target', controls.target);
}

render()

// 画布跟随窗口变化
window.onresize = function() {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}



