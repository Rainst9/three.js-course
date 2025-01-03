import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { mesh, squareMesh, boxMesh } from './model.js'; // 模型对象


// 场景
const scene = new THREE.Scene();
scene.add(mesh); // 模型对象添加到场景中
scene.add(squareMesh); // 模型对象添加到场景中
scene.add(boxMesh); // 模型对象添加到场景中
// 辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

// 相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(292, 223, 185);
camera.lookAt(0, 0, 0);

// WebGL渲染器设置  
const renderer = new THREE.WebGLRenderer({
    antialias: true, // 开启优化锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); // 防止输出模糊
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// 渲染循环
function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();

// 射线交叉计算
// 📒 注意射线拾取的时候，mesh 位置要确保更新的情况下，执行射线计算
// ，threejs 一般是渲染器执行一次.render()之后，
// 你设置的 mesh.position 或者 mesh 父对象的 position 才会真实生效。
// setTimeout(() => {
    // 射线投射器
    const raycaster = new THREE.Raycaster();
    console.log(raycaster, 'raycaster')
    raycaster.ray.origin.set(0, 0, 0);
    raycaster.ray.direction.set(0, 0, 1);
    const intersects = raycaster.intersectObjects([mesh, squareMesh, boxMesh]);
    console.log(intersects, 'intersects')
    intersects.forEach((intersect, index) => {
        // 疑惑？？？
        // 1. mesh 的正反面对于射线交叉的影响？其中面和面组成的几何体感觉
        // 又不相同，比如三角形和长方体都只显示正面，但是交叉点的变化不同
        // 2. 为什么会返回两个完全相同的交叉点？
        console.log(`相交点 ${index}:`, {
            距离: intersect.distance,
            相交点坐标: intersect.point,
            物体类型: intersect.object === mesh ? '三角形' : 
                    intersect.object === squareMesh ? '正方形' : '长方体'
            });
        });
// }, 5000);

// 轨道控制器，使得相机围绕目标进行轨道运动
const controls = new OrbitControls(camera, renderer.domElement);

// 画布跟随窗口变化
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};