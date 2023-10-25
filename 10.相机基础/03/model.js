import * as THREE from 'three'

// 管道漫游
const arr = [
  new THREE.Vector3(10, -10, 60),
  new THREE.Vector3(-20, 20, 0),
  new THREE.Vector3(60, 60, -60)
]
// 三维样条曲线
const catmullRomCurve = new THREE.CatmullRomCurve3(arr)
// 管道缓冲几何体
const geometry = new THREE.TubeGeometry(catmullRomCurve, 64, 5)
// 纹理贴图
const texLoader = new THREE.TextureLoader()
const texture = texLoader.load('../diffuse.jpg')
// wrapS 对于 U、wrapT 对于 V
texture.wrapS = THREE.RepeatWrapping
// texture.wrapT = THREE.RepeatWrapping
// repeat 决定纹理在表面的重复次数，两个方向分别表示 U 和 V，如果重复次数在任何方向上设置了超过 1 的数值，
// 对应的 Wrap 需要设置为 THREE.RepeatWrapping 或者 THREE.MirroredRepeatWrapping 来达到想要的平铺效果
texture.repeat.set(8, 1)
// texture.repeat.x = 8
const material = new THREE.MeshLambertMaterial( { 
  map: texture,
  side: THREE.DoubleSide
})
const mesh = new THREE.Mesh(geometry, material)

export { mesh, catmullRomCurve }