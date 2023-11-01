import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
// 引入后处理扩展库EffectComposer.js
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// 引入渲染器通道RenderPass
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// 引入OutlinePass通道
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
// SMAA抗锯齿通道
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';

// # gltf 后处理出现颜色异常（伽马校正）
// GammaCorrectionShader
import { GammaCorrectionShader } from 'three/addons/shaders/GammaCorrectionShader.js'  
// ShaderPass
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
// FXAAShader
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';  

import model from './model.js'; //模型对象

// 创建 伽马后处理通道：ShaderPass(GammaCorrectionShader)
const gammaPass = new ShaderPass(GammaCorrectionShader) 

//场景
const scene = new THREE.Scene();
scene.add(model); //模型对象添加到场景中


//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


//光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);


//相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
// camera.position.set(202, 123, 125);
camera.position.set(1.1, 11.8, 62.4);
camera.lookAt(0, 0, 0);

// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
    antialias: true, //开启优化锯齿
});
// 设置设备像素比，避免 canvas 画布输出模糊
renderer.setPixelRatio(window.devicePixelRatio); // 防止输出模糊
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
//解决加载gltf格式模型颜色偏差问题
// 设置后处理，renderer.outputEncoding 无效
renderer.outputEncoding = THREE.sRGBEncoding;

// 创建后处理对象EffectComposer，WebGL渲染器作为参数
const composer = new EffectComposer(renderer);
// 1. 创建一个渲染器通道，场景和相机作为参数
const renderPass = new RenderPass(scene, camera);
// 设置renderPass通道
composer.addPass(renderPass);

// 2. 创建OutlinePass通道
const v2 = new THREE.Vector2(window.innerWidth, window.innerWidth);
const outlinePass = new OutlinePass(v2, scene, camera);
// outlinePass.selectedObjects = [mesh];
outlinePass.visibleEdgeColor.set(0x00ffff);
outlinePass.edgeThickness = 4;
outlinePass.edgeStrength = 6;
composer.addPass(outlinePass);

// 伽马通道
composer.addPass(gammaPass) 

// # 抗锯齿后处理
// FXAAShader
// const FXAAPass = new ShaderPass(FXAAShader)
// const pixelRatio = renderer.getPixelRatio()
// FXAAPass.uniforms.resolution.value.x = 1 / (width * pixelRatio)
// FXAAPass.uniforms.resolution.value.y = 1 / (height * pixelRatio)
// composer.addPass(FXAAPass)

// SMAAPass: 效果更好
const pixelRatio = renderer.getPixelRatio()
const smaaPass = new SMAAPass(width * pixelRatio, height * pixelRatio)
composer.addPass(smaaPass)

// 通过UI按钮控制，哪个模型添加发光描边效果
document.getElementById('A').addEventListener('click',function(){
    const A = model.getObjectByName ('设备A');
    outlinePass.selectedObjects = [A];
})
document.getElementById('B').addEventListener('click',function(){
    const A = model.getObjectByName ('设备A');
    const B = model.getObjectByName('设备B');
    outlinePass.selectedObjects = [A, B]
})


// 渲染循环
function render() {
    composer.render();
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