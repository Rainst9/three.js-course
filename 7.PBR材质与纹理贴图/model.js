import * as THREE from 'three'
import gui from './gui.js'

// 加载 .gltf 文件
// 引入 GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const group = new THREE.Group()

// 环境贴图 .envMap 模型可以反射周围的景物（更符合现实生活）
// 上下左右前后 6 张贴图，构成一个立方体空间
// p：positive 正方向，n：negative 负方向
// px, nx, py, ny, pz, nz

// CubeTextureLoader 立方体纹理加载器
const textureCube = new THREE.CubeTextureLoader()
  .setPath('./环境贴图/环境贴图1/')
  .load([
    'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'
  ])

// 物理网格材质
const material = new THREE.MeshPhysicalMaterial({
  // 透明图层，0 - 1，默认 0，比如车漆
  clearcoat: 1,
  // 透明图层的粗糙度，0 - 1，默认 0
  clearcoatRoughness: 0
})

// 实例化加载器对象
const loader = new GLTFLoader()

// 加载模型
loader.load('./车.glb', (gltf) => {
  console.log('gltf', gltf)
  group.add(gltf.scene)

  const mesh = gltf.scene.getObjectByName('外壳01')
  material.color = mesh.material.color
  // mesh.material = material

  const mesh1 = gltf.scene.getObjectByName('玻璃01')
  // mesh1.material = new THREE.MeshPhysicalMaterial({
  //   color: mesh1.material.color,
  //   // metalness: 0,
  //   roughness: 0,
  //   // 透光率，0 - 1，默认是 0，比如玻璃、透明或者半透明的塑料
  //   transmission: 1,
  //   // 折射率，1 - 2.333。默认为 1.5
  //   ior: 2
  // })

  // gui 光照
  const glassFolder = gui.addFolder('玻璃')
  glassFolder.close()
  glassFolder.add(mesh1.material, 'transmission', 0, 1).name('透光率')
  glassFolder.add(mesh1.material, 'ior', 1, 2.333).name('折射率')

  // gltf.scene.traverse((obj) => {
    // if (obj.isMesh) {
      // .metalness 金属度，0 - 1，非金属 0，金属 1，默认是 0
      // obj.material.metalness = 1
      // .roughness 粗糙程度，0 - 1，镜面反射 0，漫反射 1，默认是 1
      // obj.material.roughness = 0.3

      // 设置环境贴图
        // 如果场景里没有光源，那么 PBR 材质是黑色的，这时候只加上环境贴图，会发现可以看见了
        // 其实相当于是 贴图里的环境提供了光线
      // obj.material.envMap = textureCube

      // 环境贴图反射率，控制环境贴图对于物体表面的影响程度（环境贴图像素值乘以该系数）
      // 0 相当于没有设置环境贴图
      // obj.material.envMapIntensity = 0
      // obj.material.envMapIntensity = 1
    // }
  // })
})

export { group, textureCube }