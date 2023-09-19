import * as THREE from 'three'

// 纹理贴图加载器 TextureLoader
const texLoader = new THREE.TextureLoader()   
const texture = texLoader.load('./earth.jpg')

// const geometry = new THREE.BoxGeometry(50, 50, 50)
// const geometry = new THREE.SphereGeometry(50)
const geometry1 = new THREE.PlaneGeometry(150, 50)
const geometry = new THREE.BufferGeometry()

// 类型数组创建顶点数据
const vertices = new Float32Array([
  0, 0, 0,
  160, 0, 0,
  160, 90, 0,
  0, 90, 0
])
// 创建属性缓冲区对象
const attribue = new THREE.BufferAttribute(vertices, 3) // 3 个一组
// 设置几何体 attributes 属性的位置属性
geometry.attributes.position = attribue

// 类型数组创建顶点索引数据
const indexes = new Uint16Array([
  0, 1, 2, 0, 2, 3
])
// 设置几何体 index 
geometry.index = new THREE.BufferAttribute(indexes, 1)

// 顶点 UV 坐标 geometry.attributes.uv 和 顶点位置坐标 geometry.attributes.position 是一一对应的
// UV 顶点坐标在 0～1 之间，具体怎么设置，取决于你想把图片的哪部分映射到 Mesh 的几何体表面
const uvs = new Float32Array([
  0, 0,
  0.3, 0,
  0.3, 0.3,
  0, 0.3
])
// 设置 uv 属性
geometry.attributes.uv = new THREE.BufferAttribute(uvs, 2)

// Q：有光照的情况下，为什么 MeshLambertMaterial 材质不显示
const material = new THREE.MeshBasicMaterial({
  // color: 0x00ffff
  // map：颜色贴图属性
  // 之所以叫颜色贴图，就是因为会获得贴图的颜色值到网格模型上
  // 一般设置 map 后不需要再设置 color，因为颜色会混合
  map: texture
})

const mesh = new THREE.Mesh(geometry, material)

export default mesh