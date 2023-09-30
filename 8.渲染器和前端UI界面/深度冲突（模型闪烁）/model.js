import * as THREE from 'three';

const geometry = new THREE.PlaneGeometry(250, 250);
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide
});
const mesh = new THREE.Mesh(geometry, material);

const geometry2 = new THREE.PlaneGeometry(300, 300); 
const material2 = new THREE.MeshLambertMaterial({
    color: 0xff6666,
    side: THREE.DoubleSide
});
const mesh2 = new THREE.Mesh(geometry2, material2);

// 问题：以上两个 mesh 位置重合，电脑 GPU 无法分清谁在前谁后，所以会闪烁，这就叫深度冲突，即 Z-fighting

// 修改下位置即可，但如果相机距离模型位置较远，也会
// 闪烁，因为近大远小，之前设置的 z 轴距离的偏差也会变小，导致电脑无法识别
// 可以通过设置 logarithmicDepthBuffer 对数深度缓存为 true（在单个场景中处理巨大的比例差异）
mesh2.position.z = -1

// 但距离过小，电脑 GPU 也无法识别
// 距离过小或者重合，设置 logarithmicDepthBuffer 也是无效的
// mesh2.position.z = -0.000000000001

const group = new THREE.Group();
group.add(mesh, mesh2);

export default group;