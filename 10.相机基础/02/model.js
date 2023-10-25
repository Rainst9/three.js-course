import * as THREE from 'three'
import mapData from '../data.js'

const group = new THREE.Group()

const geometry = new THREE.BoxGeometry(50, 50, 50)
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide
})

// 一片阵列的长方体 尺寸范围大概4000左右
// for (let i = -9; i < 10; i++) {
//   for (let j = -9; j < 10; j++) {
//     const mesh = new THREE.Mesh(geometry, material) // 网格模型对象Mesh
//     // 在XOZ平面上分布
//     mesh.position.set(i * 200, 0, j * 200)
//     // group.add(mesh)
//   }
// }
// const mesh = new THREE.Mesh(geometry, material)
// group.add(mesh)

// 地图案例（box3 + 正投影）
const mapPoints = []
mapData.forEach((v, k) => {
  // 数据转为二维向量
  const point = new THREE.Vector2(v[0], v[1])
  mapPoints.push(point)
})
// 定义 shape
const mapShape = new THREE.Shape(mapPoints)
// 定义 shape 几何体
const mapShapeGeometry = new THREE.ExtrudeGeometry(mapShape)
const mesh = new THREE.Mesh(mapShapeGeometry, material)
group.add(mesh)

export default group



