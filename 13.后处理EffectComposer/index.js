import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { model, mesh } from './model.js'; // 模型对象

// 后处理 
// 效果合成器 EffectComposer
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// 渲染器通道
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// OutlinePass 通道：高亮发光描边
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
// UnrealBloomPass 通道: Bloom 发光
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
// GlitchPass 通道：闪屏效果
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';

// 场景
const scene = new THREE.Scene();
scene.add(model); // 模型对象添加到场景中

// 辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
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

// 后处理(可以根据关键字去 example 目录里搜示例和用法)
// 创建 后处理对象 EffectComposer，WebGL渲染器 作为参数
const effectComposer = new EffectComposer(renderer)

// 创建 一个 渲染器通道，场景 和 相机 作为参数
const renderPass = new RenderPass(scene, camera)
// 通道 添加到 过程链 中
effectComposer.addPass(renderPass)

// 创建一个 OutlinePass
const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera)
outlinePass.selectedObjects = [mesh]
// 发光描边的颜色
outlinePass.visibleEdgeColor.set('red')
// 发光描边的厚度
outlinePass.edgeThickness = 10
// 描边的发光强度
outlinePass.edgeStrength = 10
// 描边的闪烁频率，默认0不闪烁
outlinePass.pulsePeriod = 3
effectComposer.addPass(outlinePass)

// 创建一个 UnrealBloomPass
const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight))
unrealBloomPass.strength = 1
effectComposer.addPass(unrealBloomPass)

// 创建一个 GlitchPass
const glitchPass = new GlitchPass()
effectComposer.addPass(glitchPass)

// 渲染循环
function render() {
    effectComposer.render(scene, camera);
    // renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();




const controls = new OrbitControls(camera, renderer.domElement);

// 画布跟随窗口变化
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};