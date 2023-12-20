import * as THREE from 'three'

// * 创建精灵材质对象
// 1. 和网格材质对象类似，都有颜色、透明度这些
// 2. 父类材质也是 Material
const spriteMaterial = new THREE.SpriteMaterial({
  color: 'red'
})

// * 精灵模型
// 1. 只需要材质对象，不需要几何体对象
// 2. 默认是一个长宽都为 1 的矩形
const sprite = new THREE.Sprite(spriteMaterial)

export default sprite