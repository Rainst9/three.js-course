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
loader.load('./简易小区-共享材质.glb', (gltf) => {
  console.log('gltf', gltf)
  group.add(gltf.scene)

  // 外部模型材质是否共享的问题
  const mesh1 = gltf.scene.getObjectByName('10号楼')
  mesh1.material.name = '10号楼材质'
  const mesh2 = gltf.scene.getObjectByName('9号楼')
  console.log(mesh2.material.name, '9号楼');
  // 可以通过代码修改，使材质不共享
  mesh2.material = mesh2.material.clone()
  mesh1.material.color.set('pink')

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
})

export { group }