import * as THREE from 'three';

// 加载 .gltf 文件
// 引入 GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

// 实例化加载器对象
const loader = new GLTFLoader()
// 创建组
const group = new THREE.Group()
// 加载模型
loader.load('./工厂.gltf', (gltf) => {
    console.log(gltf, 'gltf')
    group.add(gltf.scene)
})

// 三角形模型
const geometry = new THREE.BufferGeometry();
// 类型化数组创建顶点数据
const vertices = new Float32Array([
    10, 0, 4, //顶点1坐标
    -4, 30, 4, //顶点2坐标
    -4, -30, 4, //顶点3坐标
]);
// 3个为一组，表示一个顶点的xyz坐标
const attribue = new THREE.BufferAttribute(vertices, 3); 
geometry.setAttribute('position', attribue);

// 添加法向量数据
geometry.computeVertexNormals();

const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    // side: THREE.DoubleSide // 正反面都可见
});
const mesh = new THREE.Mesh(geometry, material);

// 正方形模型
const squareGeometry = new THREE.PlaneGeometry(100, 100);
const squareMaterial = new THREE.MeshLambertMaterial({
    color: 'red',
    side: THREE.DoubleSide // 正反面都可见
});
const squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
squareMesh.position.set(100, 0, 0);

// 长方体模型
const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
const boxMaterial = new THREE.MeshLambertMaterial({
    color: 'yellow',
    // side: THREE.DoubleSide // 正反面都可见
});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.set(0, 0, 20);

// 引入工厂模型

// 创建精灵模型
const texture = new THREE.TextureLoader().load('./光点.png')
const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    color: 'blue'
})
const sprite = new THREE.Sprite(spriteMaterial)
sprite.scale.set(2, 2, 0)
sprite.position.set(60, 12, 0)

// 创建另一个精灵模型
const texture2 = new THREE.TextureLoader().load('./光点.png')
const spriteMaterial2 = new THREE.SpriteMaterial({
    map: texture2,
    color: 'yellow'
})
const sprite2 = new THREE.Sprite(spriteMaterial2)
sprite2.scale.set(2, 2, 0)
sprite2.position.set(80, 12, 0)

// 返回模型
export { mesh, squareMesh, boxMesh, group, sprite, sprite2 };
