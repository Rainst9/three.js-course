import * as THREE from 'three';

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

export { mesh, squareMesh, boxMesh };
