import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 引入模型对象
import group from './model.js'

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
const gridHelper = new THREE.GridHelper(100, 20, 'red', 'pink')
// scene.add(gridHelper)
// gridHelper.position.y = -2

// 包围盒
const box3 = new THREE.Box3()
// .expandByObject 计算该模型的包围盒 
box3.expandByObject(group)
console.log(box3)
// .getSize 获取包围盒的长宽高
const scale = new THREE.Vector3()
box3.getSize(scale)
console.log(scale)
// .getCenter 获取包围盒的中心点
const center = new THREE.Vector3()
box3.getCenter(center)
console.log(center)

// 相机、渲染器
const width = window.innerWidth
const height = window.innerHeight
// const camera = new THREE.PerspectiveCamera(30, width / height, 1, 8000)
// 正投影相机 OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
// 区别：透视投影可以模拟人眼观察世界的视觉效果，正投影相机不会
const aspect = width / height // 宽高比
const s = scale.y / 2 + 3 // 控制 left、top、bottom、right 范围
// 范围要保持 aspect 比例
const camera = new THREE.OrthographicCamera(-s * aspect, s * aspect, s, -s, 1, 400)

// 正视图
// camera.position.set(center.x, center.y, 300)
// .up 相机的 上方向 属性，默认是(0, 1, 0)，y 的正半轴朝上
// camera.up.set(0, -1, 0) // y 的负半轴朝上
// camera.up.set(1, 0, 0) // x 的正半轴朝上
// camera.up.set(-1, 0, 0) // x 的负半轴朝上
// camera.lookAt(center.x, center.y, 0)

// 侧视图
camera.position.set(center.x + 300, center.y, 0)
// camera.up.set(0, 0, 1) // z 的正半轴朝上
camera.up.set(0, 0, -1) // z 的负半轴朝上
// camera.lookAt(center.x, center.y, 0)

// 俯视图
// camera.position.set(center.x, center.y + 300, 0)
// camera.lookAt(center.x, center.y, 0)

// 坐标系位置修改
axesHelper.position.set(center.x, center.y, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

// 轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(center.x, center.y, 0)
controls.update()

// 渲染循环
function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
  // 查看相机位置的变化
  // console.log('camera.position', camera.position);
  // console.log('controls.target', controls.target);
  // console.log(camera.up, '.up');
}

render()

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight)
  // camera.aspect = window.innerWidth / window.innerHeight
  const aspect = window.innerWidth / window.innerHeight //canvas画布宽高比
  camera.left = -s*aspect
  camera.right = s*aspect
  camera.updateProjectionMatrix()
}



