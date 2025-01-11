import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

// 加载 .gltf 文件
// 引入 GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

// 实例化加载器对象
const loader = new GLTFLoader()
// 创建组
const group = new THREE.Group()
// 加载模型
loader.load('./工厂.glb', (gltf) => {
    // 可视化工厂设备obj的局部坐标系
    // const axesHelper = new THREE.AxesHelper(30);
    // gltf.scene.add(axesHelper);
    const div = document.getElementById('tag');
    const tag = new CSS2DObject(div);
    // 常见的两种标注方式：
    // 1. 追加到要标注的对象里 
    const jarA = gltf.scene.getObjectByName('设备A');
    tag.position.y += 15; // 在局部坐标系位置不对的情况下，需要手动调整
    // 2. 追加到提前创建好的空对象里
    // const jarA = gltf.scene.getObjectByName('设备A标注');
    const axesHelperJar = new THREE.AxesHelper(40);
    jarA.add(axesHelperJar);
    jarA.add(tag);
    group.add(gltf.scene)
})

// 返回模型
export { group };