import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 引入模型对象
import { group, textureCube } from './model.js'

// 引入 gui
import gui from './gui.js'

// 场景
const scene = new THREE.Scene()
// 场景中所有物理材质的环境贴图
scene.environment = textureCube
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

// gui 光照
const lightFolder = gui.addFolder('光照')
lightFolder.close()
lightFolder.add(ambient, 'intensity', 0.4).name('环境光强度')
lightFolder.add(directionalLight, 'intensity', 0.4).name('平行光强度')

// 坐标格辅助对象
// const gridHelper = new THREE.GridHelper(100, 20, 'red', 'pink')
// scene.add(gridHelper)
// gridHelper.position.y = -2

// 相机、渲染器
const width = window.innerWidth
const height = window.innerHeight
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
camera.position.set(-616, 506, 577)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
// 解决纹理贴图颜色偏差
// 新版本已经废弃，改为了 .outputColorSpace，默认就是 THREE.SRGBColorSpace
renderer.outputEncoding = THREE.sRGBEncoding
document.body.appendChild(renderer.domElement)

// 轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 渲染循环
function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
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



