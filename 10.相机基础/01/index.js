import * as THREE from 'three'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { MapControls } from 'three/addons/controls/OrbitControls.js'

// 引入模型对象
import { group } from './model.js'

// 场景
const scene = new THREE.Scene()
scene.add(group)

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
const aspect = width / height // 宽高比
const s = 100 // 控制 left、top、bottom、right 范围
// 范围要保持 aspect 比例
const camera = new THREE.OrthographicCamera(-s * aspect, s * aspect, s, -s, 1, 8000)
// const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
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
const controls = new MapControls(camera, renderer.domElement)
// controls 的 target 表示相机观察目标，默认是 0，0，0
// 当相机 lookAt 变化时，target 也要变化
controls.target.set(13, 3.7, -25.2)
controls.update()

// OrbitControlsn 旋转缩放限制
// 禁止右键平移 .enablePan
controls.enablePan = false
// 禁止缩放 .enableZoom zoom 也还是生效，不过是范围小了，还影响 正投影缩放范围 的设置生效
// controls.enableZoom = false
// 禁止旋转 .enableRotate
// controls.enableRotate = false
// 设置透视投影相机缩放范围
// controls.maxDistance = 318
// controls.minDistance = 58
// 设置正投影缩放范围
// controls.minZoom = 0.5
// controls.maxZoom = 1

// 设置旋转范围
// 上下旋转 0 ～ 180 度
// controls.minPolarAngle = 0
// controls.maxPolarAngle = Math.PI / 2
// 左右旋转
// controls.minAzimuthAngle = 0
// controls.maxAzimuthAngle = -Math.PI / 2
console.log(controls, 'controls')

// 渲染循环
let angle = 0
const R = 100
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

  // 相机位置与目标观察点距离 .getDistance()
  // console.log('getDistance', controls.getDistance());
}

render()

// 画布跟随窗口变化
window.onresize = function() {
  renderer.setSize(window.innerWidth, window.innerHeight)
  // camera.aspect = window.innerWidth / window.innerHeight
  // camera.updateProjectionMatrix()
  const aspect = window.innerWidth / window.innerHeight //canvas画布宽高比
  camera.left = -s*aspect
  camera.right = s*aspect
  camera.updateProjectionMatrix()
}



