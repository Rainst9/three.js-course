import * as THREE from 'three'

// 加载 .gltf 文件
// 引入 GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const group = new THREE.Group()
// const material = new THREE.MeshBasicMaterial({
//   color: 0x00ffff
// })

// 实例化加载器对象
const loader = new GLTFLoader()

// 加载模型
loader.load('../工厂.gltf', (gltf) => {
  console.log('gltf', gltf)
  group.add(gltf.scene)
  
  // 获取物体，然后修改属性
  // const tree = gltf.scene.getObjectByName('tree051_1')
  // tree.scale.x = 4
  // tree.scale.y = 4
  // tree.scale.z = 4
  // console.log('tree', tree);

  // 递归遍历处理层级模型
  // gltf.scene.traverse((obj) => {
  //   console.log(obj, obj.name);
  //   if (obj.isMesh) {
  //     obj.material = new THREE.MeshLambertMaterial({
  //       color: 0x00ffff
  //     })
  //   }
  // })
}, (res) => {
  const percent = res.loaded / res.total
  // console.log(percent, 'percent')
})

export { group }