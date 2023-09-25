import * as THREE from 'three'

const geometry = new THREE.BoxGeometry(50, 50, 50)
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff
})
const group = new THREE.Group()
const mesh1 = new THREE.Mesh(geometry, material)
const mesh2 = new THREE.Mesh(geometry, material)

// mesh 也能添加子对象
// mesh1.add(mesh2) 

mesh2.translateX(70)
// mesh2.translateY(-70)

// add 可传一个或者多个参数
group.add(mesh1, mesh2)
// group.add(mesh2)

// 父对象旋转、缩放、平移，子对象跟着变化
// group.translateY(-40)
// group.scale.set(0.5, 0.5, 0.5)
// group.rotateY(Math.PI/2)

// 隐藏
// mesh2.visible = false
// mesh2.material.visible = false

// 移除
// group.remove(mesh2)
// group.remove(mesh1, mesh2)

console.log(group.children, 'group')
console.log(mesh1.children, 'mesh1')

export default group