import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 引入模型对象
import { mesh, texture } from './model.js'

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
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
camera.position.set(292, 223, 185)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

// 渲染循环
function render() {
  texture.offset.x += 0.01 // 设置纹理动画
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()

// 轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 画布跟随窗口变化
window.onresize = function() {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}



