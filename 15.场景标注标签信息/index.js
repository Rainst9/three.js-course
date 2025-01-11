import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

import { group } from './model.js'; // 模型对象

// 场景
const scene = new THREE.Scene();
// 辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);
scene.add(group);

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

// 创建 CSS2DObject 对象 -- 在这写会报错，因为模型可能还没加载完
// const tag = new CSS2DObject(document.getElementById('tag'));

// // 常见的两种标注方式：1. 追加到要标注的对象里 2. 追加到提前创建好的空对象里
// const jarA = group.getObjectByName('设备A');
// console.log(jarA, 'jarA')
// jarA.add(tag);

// 创建 CSS2D 渲染器
const css2dRenderer = new CSS2DRenderer();
css2dRenderer.setSize(width, height);
// 定位
css2dRenderer.domElement.style.position = 'absolute';
css2dRenderer.domElement.style.top = '0';
css2dRenderer.domElement.style.left = '0';
css2dRenderer.domElement.style.pointerEvents = 'none'; // 禁止鼠标事件
document.body.appendChild(css2dRenderer.domElement);

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
    css2dRenderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();

// 轨道控制器，使得相机围绕目标进行轨道运动
const controls = new OrbitControls(camera, renderer.domElement);

// 画布跟随窗口变化
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    css2dRenderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};