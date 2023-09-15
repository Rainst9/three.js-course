import * as THREE from 'three'

// 创建三维场景
const scene = new THREE.Scene()

// 创建物体 & 添加到场景
const geometry = new THREE.BoxGeometry(50, 50, 50)
const material = new THREE.MeshLambertMaterial({
  color: 0x0000ff
})
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, 10, 0)
scene.add(mesh)

// 辅助观察的坐标系
// const axesHelper = new THREE.AxesHelper(2000) 
// scene.add(axesHelper)

// 相机
const width = 800
const height = 500
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
// camera.position.set(292, 223, 185)
camera.position.set(292, 223, 185)
camera.lookAt(0, 0, 0)

// 渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.render(scene, camera)
document.body.appendChild(renderer.domElement)
