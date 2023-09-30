import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 引入模型对象
import model from './model.js'

// 场景
const scene = new THREE.Scene()
scene.add(model) // 将模型对象添加到场景中

// 坐标系
const axesHelper = new THREE.AxesHelper(100)
// scene.add(axesHelper)

// 光源
  // 平行光 DirectionalLight
  // 方向是从 灯光的位置 到 目标的位置（默认是原点）
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(100, 60, 50)
scene.add(directionalLight)

  // 环境光 AmbientLight
  // 均匀照亮场景中的所有物体，没有方向
const ambient = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambient)

// 相机、渲染器
const width = 500
const height = 500
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
camera.position.set(292, 223, 185)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({
  // 设置背景色的透明度，默认 false ，是 1，设置 true，是 0
  // alpha: true
  // whether to preserve the buffers until manually cleared or overwritten. Default is false.
  preserveDrawingBuffer: true
})
renderer.setSize(width, height)
  // renderer.domElement 一个 canvas，渲染结果在上面
document.getElementById("gemWrapper").appendChild(renderer.domElement)

// 下载图片
document.getElementById('download-btn').addEventListener('click', () => {
  // 创建一个超链接元素，用来下载保存数据的文件
  const link = document.createElement('a')
  // 通过超链接herf属性，设置要保存到文件中的数据
  const canvas = renderer.domElement
  // toDataURL 获取画布上的像素信息
  // image/png image/jpeg image/bmp
  link.href = canvas.toDataURL('image/png')
  link.download = 'threejs.png'; //下载文件名
  link.click(); //js代码触发超链接元素a的鼠标点击事件，开始下载文件到本地
})

// 设置背景色的透明度，0 ～ 1
// renderer.setClearAlpha(0)

// 设置背景颜色以及透明度
renderer.setClearColor('red', 0)

// 渲染循环
function render() {
  model.rotateY(0.01)
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()

// 轨道控制器，使得相机围绕目标进行轨道运动
// const controls = new OrbitControls(camera, renderer.domElement)

// 画布跟随窗口变化
// window.onresize = function() {
//   renderer.setSize(window.innerWidth, window.innerHeight)
//   camera.aspect = window.innerWidth / window.innerHeight
//   camera.updateProjectionMatrix() // 更新摄像机投影矩阵。在任何参数被改变以后必须被调用。
// }

console.log(scene, 'scene')

