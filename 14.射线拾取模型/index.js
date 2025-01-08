import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { mesh, squareMesh, boxMesh, group, sprite, sprite2 } from './model.js'; // 模型对象

// 后处理
// 效果合成器 EffectComposer
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// 渲染器通道
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// OutlinePass 通道：高亮发光描边
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

// 场景
const scene = new THREE.Scene();
// scene.add(mesh); // 模型对象添加到场景中
// scene.add(squareMesh); // 模型对象添加到场景中
// scene.add(boxMesh); // 模型对象添加到场景中
scene.add(group); // 模型对象添加到场景中
scene.add(sprite); // 模型对象添加到场景中
scene.add(sprite2); // 模型对象添加到场景中
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

// 射线交叉计算 - example01
// 📒 注意射线拾取的时候，mesh 位置要确保更新的情况下，执行射线计算
// ，threejs 一般是渲染器执行一次.render()之后，
// 你设置的 mesh.position 或者 mesh 父对象的 position 才会真实生效。
// setTimeout(() => {
    // // 射线投射器
    // const raycaster = new THREE.Raycaster();
    // console.log(raycaster, 'raycaster')
    // raycaster.ray.origin.set(0, 0, 0);
    // raycaster.ray.direction.set(0, 0, 1);
    // const intersects = raycaster.intersectObjects([mesh, squareMesh, boxMesh]);
    // console.log(intersects, 'intersects')
    // intersects.forEach((intersect, index) => {
    //     // 疑惑？？？
    //     // 1. mesh 的正反面对于射线交叉的影响？其中面和面组成的几何体感觉
    //     // 又不相同，比如三角形和长方体都只显示正面，但是交叉点的变化不同
    //     // 2. 为什么会返回两个完全相同的交叉点？
    //     console.log(`相交点 ${index}:`, {
    //         距离: intersect.distance,
    //         相交点坐标: intersect.point,
    //         物体类型: intersect.object === mesh ? '三角形' : 
    //                 intersect.object === squareMesh ? '正方形' : '长方体'
    //         });
    //     });
// }, 5000);

// // 点击选中物体变色 - example02
// renderer.domElement.addEventListener('click', (event) => {
//     const mouse = getMousePosition(event); // 获取鼠标点击位置
//     const raycaster = new THREE.Raycaster(); // 创建射线投射器
//     raycaster.setFromCamera(mouse, camera); // 设置射线投射器
//     const intersects = raycaster.intersectObjects([mesh, squareMesh, boxMesh]); // 获取射线投射器与物体相交的点
//     console.log(intersects, 'intersects')
//     if (intersects.length > 0) {
//         intersects[0].object.material.color.set('blue');
//     }
// })

// 射线拾取层级模型(模型描边) - example06
// 创建后处理对象 EffectComposer，WebGL渲染器 作为参数
const effectComposer = new EffectComposer(renderer)
// 创建 一个 渲染器通道，场景 和 相机 作为参数
const renderPass = new RenderPass(scene, camera)
// 通道 添加到 过程链 中
effectComposer.addPass(renderPass)

// 创建一个 OutlinePass
const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera)
// 发光描边的颜色
outlinePass.visibleEdgeColor.set('blue')
// 发光描边的厚度
outlinePass.edgeThickness = 10
// 描边的发光强度
outlinePass.edgeStrength = 10
// 描边的闪烁频率，默认0不闪烁
outlinePass.pulsePeriod = 3
effectComposer.addPass(outlinePass)

// 渲染循环
function render() {
    // renderer.render(scene, camera);
    effectComposer.render(scene, camera); // 后处理渲染时，之前的renderer就不需要了
    requestAnimationFrame(render);
}
render();

// renderer.domElement.addEventListener('click', (event) => {
//     const mouse = getMousePosition(event); // 获取鼠标点击位置
//     const raycaster = new THREE.Raycaster(); // 创建射线投射器
//     raycaster.setFromCamera(mouse, camera); // 设置射线投射器
//     const model = group.getObjectByName('存储罐');
//     // model.children 设备A、设备B
//     // 由于该 model 下有多个 mesh 对象，所以需要遍历，给一个自定义属性，
//     // 这样在射线交叉计算的时候，可以直接让罐子整体被选中，给上效果
//     for (let i = 0; i < model.children.length; i++) {
//         const jarGroup = model.children[i];
//         // 递归遍历chooseObj，并给chooseObj的所有子孙后代设置一个ancestors属性指向自己
//         jarGroup.traverse(function (obj) {
//             if (obj.isMesh) {
//                 obj.ancestors = jarGroup;
//             }
//         })
//     }
//     console.log(model, 'model')
//     const intersects = raycaster.intersectObjects(model.children); // 获取射线投射器与物体相交的点
//     console.log(intersects, 'intersects')
//     if (intersects.length > 0) {
//         console.log(intersects[0].object.ancestors, 'ancestors')
//         // intersects[0].object.ancestors.material.color.set('blue');
//         outlinePass.selectedObjects = [intersects[0].object.ancestors]
//     }
// })

// 射线拾取Sprite控制场景 - example07
// change1 只是给 object 添加一个自定义属性
sprite.change1 = function () {
    // sprite.material.color.set('blue');
    const obj = group.getObjectByName('设备A')
    outlinePass.selectedObjects = [obj]
}
sprite2.change1 = function () {
    const obj = group.getObjectByName('设备B')
    outlinePass.selectedObjects = [obj]
}

renderer.domElement.addEventListener('click', (event) => {
    const mouse = getMousePosition(event); // 获取鼠标点击位置
    const raycaster = new THREE.Raycaster(); // 创建射线投射器
    raycaster.setFromCamera(mouse, camera); // 设置射线投射器
    const intersects = raycaster.intersectObjects([sprite, sprite2]); // 获取射线投射器与物体相交的点
    console.log(intersects, 'intersects')
    if (intersects.length > 0) {
        intersects[0].object.change1();
    }
})

// 轨道控制器，使得相机围绕目标进行轨道运动
const controls = new OrbitControls(camera, renderer.domElement);

// 画布跟随窗口变化
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};

// 屏幕坐标转为标准设备坐标
function getMousePosition(event) {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    return mouse;
}