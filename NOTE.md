# 一、文档地址：http://www.webgl3d.cn/pages/2e5d69/

# 二、三要素
- 场景
- 相机
![透视投影相机](image-1.png)
- 渲染器
![三要素](image.png)

# 三、已完成示例
  ## 2. 几何体BufferGeometry
  节省顶点数据定义，可以使用顶点索引数据。
  索引数据来源可以是顶点，也可以是顶点法线数据。
  ## 4. 层级模型
  ### （1）组对象Group、层级模型
  ### （5）移除对象 remove()
  三维物体（Object3D）的方法，可以从当前对象的子级(.children)中移除对象。
  ```
    group.remove(mesh1, mesh2)
    scene.remove(directionalLight)
  ```
  ### （6）模型隐藏或显示
  三维物体（Object3D）、材质（Material）都有 .visible 属性，类型为 Boolean，决定物体、材质是否可见。
  ```
    group.visible = false
    mesh1.material.visible = false // 共享该材质的所有 mesh 都会隐藏
  ```   
  ## 5. 顶点 UV 坐标、纹理贴图
  ### （1）创建纹理贴图
  ```
    // 纹理贴图加载器 TextureLoader
    const texLoader = new THREE.TextureLoader() 
    // 返回一个纹理对象  
    const texture = texLoader.load('./earth.jpg')

    const material = new THREE.MeshBasicMaterial({
      // color: 0x00ffff
      // map：颜色贴图属性
      // 之所以叫颜色贴图，就是因为会获得贴图的颜色值到网格模型上
      // 一般设置 map 后不需要再设置 color，因为颜色会混合
      map: texture
    })
  ```  
  ### （2）自定义顶点 UV 坐标
  ``` 
    // 顶点 UV 坐标 geometry.attributes.uv 和 顶点位置坐标 geometry.attributes.position 是一一对应的
    // UV 顶点坐标在 0～1 之间，具体怎么设置，取决于你想把图片的哪部分映射到 Mesh 的几何体表面
    const uvs = new Float32Array([
      0, 0,
      0.3, 0,
      0.3, 0.3,
      0, 0.3
    ])
    // 设置 uv 属性
    geometry.attributes.uv = new THREE.BufferAttribute(uvs, 2)
  ``` 
  ![Alt text](image-2.png)

  ### （3）圆形平面设置纹理贴图
  CircleGeometry 的 UV 坐标默认就是一个圆形。
  
  ### （4）纹理对象 Texture 阵列
  ``` 
    texture.wrapS = THREE.RepeatWrapping // 水平方向如何映射
    texture.wrapT = THREE.RepeatWrapping // 垂直方向如何映射
    texture.repeat.x = 20 // 水平方向重复个数，注意选择合适的阵列数量
    texture.repeat.y = 20 // 水平方向重复个数，注意选择合适的阵列数量
  ``` 

  ### （5）矩形 Mesh + 背景透明 png 贴图
  ```
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      // 开启透明计算
      transparent: true
    })
  ```

  ### （6）UV 动画
  ```
    // offset 范围是 0 - 1，是指贴图从开始偏移多少，本质还是改变 UV 坐标
    // 其实就是这个贴图的百分比
    // texture.offset.x = 0.8
    // texture.offset.y = 0.5

    // 渲染循环
    function render() {
      texture.offset.x += 0.01 // 设置纹理动画
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }
  ```
## 6. 加载外部三维模型(gltf)
  ### （1~2）建模软件绘制3D场景、GLTF格式简介 (Web3D领域JPG)
    - 美术导出 3D 模型，导出 GLTF 等常见格式
    - 程序负责加载解析模型
  ### （3）加载.gltf文件(模型加载全流程)
    ```
      // 引入 GLTFLoader.js gltf 模型加载器
      import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
      // 实例化加载器对象
      const loader = new GLTFLoader()
      // 加载模型
      loader.load( 'gltf模型.gltf', function ( gltf ) {
        console.log('控制台查看加载 gltf 文件返回的对象结构',gltf);
        console.log('gltf 对象场景属性',gltf.scene);
        // 返回的场景对象 gltf.scene 插入到 threejs 场景中
        scene.add( gltf.scene );
      })
      // 设置合适的相机参数
        // position、lookAt、far、near 等
      // 解决纹理贴图颜色偏差
      renderer.outputEncoding = THREE.sRGBEncoding // 新版本已经不需要
    ```
  ### （4）OrbitControls 辅助设置相机参数
    ```
      // 在给出一个大概的值后，可以通过 OrbitControls，可视化设置相机参数
      function render() {
        requestAnimationFrame(render)
        console.log('camera.position', camera.position)
        console.log('controls.target', controls.target)
      }
      render()
    ```
  ### （5～6）gltf不同文件形式(.glb)、模型命名(程序与美术协作)
    ```
      - 单独.gltf文件
      - 单独.glb文件
      - .gltf + .bin + 贴图文件

      - .getObjectByName()根据.name获取模型节点
      - 分组 group 管理，更清晰
    ```
  ### （7）递归遍历层级模型修改材质
    ```
      // 递归遍历方法 .traverse()
      gltf.scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.material = new THREE.MeshLambertMaterial({
            color: 0x00ffff
          })
        }
      })

      // 查看 gltf 默认的材质
      // threejs 一般默认 gltf 的材质是 MeshStandardMaterial、MeshPhysicalMaterial，这两个属于 PBR 物理材质，效果更加真实
    ```
  ### （8）外部模型材质是否共享的问题
    ```
      // 1. 三维建模软件中设置，材质不共享
      // 2. 代码更改：克隆材质对象，重新赋值
      gltf.scene.getObjectByName("小区房子").traverse(function (obj) {
        if (obj.isMesh) {
          // .material.clone() 返回一个新材质对象，和原来一样，重新赋值给 .material 属性
          obj.material = obj.material.clone()
        }
      })
    ```

## 7. PBR 材质与纹理贴图
  ### （1）PBR 材质简介
  - PBR，基于物理的渲染（physically-based rendering）
  - threejs 提供两个相关 API，MeshStandardMaterial、MeshPhysicalMaterial。
  不同材质，使用的光照模型不同，效果也不同

  ![Alt text](image-4.png)
  ### （2）PBR 材质金属度和粗糙度
  ```
    // .metalness 金属度，0 - 1，非金属 0，金属 1，默认是 0
    material.metalness = 1
    // .roughness 粗糙程度，0 - 1，镜面反射 0，漫反射 1，默认是 1
    material.roughness = 0.3
  ```
  ### （3～4）环境贴图 .envMap
  ```
    // 环境贴图 .envMap 模型可以反射周围的景物（更符合现实生活）
    // 上下左右前后 6 张贴图，构成一个立方体空间
    // p：positive 正方向，n：negative 负方向
    // px, nx, py, ny, pz, nz

    // CubeTextureLoader 立方体纹理加载器
    const textureCube = new THREE.CubeTextureLoader()
      .setPath('./环境贴图/环境贴图1/')
      .load([
        'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'
      ])

    // 设置环境贴图
    // 如果场景里没有光源，那么 PBR 材质是黑色的，这时候只加上环境贴图，会发现可以看见了
    // 其实相当于是 贴图里的环境提供了光线
    material.envMap = textureCube

    // 也可以给场景设置环境贴图，这样场景中所有物理材质都会是这个环境贴图（已单独设置的不会被覆盖）
    scene.environment = textureCube
  ```
  ### （5）MeshPhysicalMaterial 透明图层/清漆层
  ```
    const material = new THREE.MeshPhysicalMaterial({
      // 透明图层，0 - 1，默认 0，比如车漆
      clearcoat: 1,
      // 透明图层的粗糙度，0 - 1，默认 0
      clearcoatRoughness: 0
    })
  ```
  ### （6）MeshPhysicalMaterial 透光率
  ```
    const material = new THREE.MeshPhysicalMaterial({
      roughness: 0,
      // 透光率，0 - 1，默认是 0，比如玻璃、透明或者半透明的塑料
      transmission: 1,
      // 折射率，1 - 2.333。默认为 1.5
      ior: 2
    })
  ```

# 四、实际遇到的问题
## 1. 直接照着第 11 节敲代码，本想着一步步来，先创建三要素，然后看效果慢慢加，但是总是出不来效果，分析后原因如下：
  （1）材质问题

    MeshBasicMaterial：基础网格材质，不受光照的影响
    MeshLambertMaterial：Lambert 网格材质，需要光照，否则就是黑色的

  （1）相机位置不对
## 2. 有光照的情况下，为什么 MeshLambertMaterial 材质不显示？
## 3. 代码没有光照的情况下，只有基础网格材质可以显示？如果美术模型里有光照呢？也会这样么？还是取决于美术模型里各个物体的材质呢？
![Alt text](image-3.png)
