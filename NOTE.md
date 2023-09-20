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

# 四、实际写代码遇到的问题
## 1. 直接照着第 11 节敲代码，本想着一步步来，先创建三要素，然后看效果慢慢加，但是总是出不来效果，分析后原因如下：
  （1）材质问题

    MeshBasicMaterial：基础网格材质，不受光照的影响
    MeshLambertMaterial：Lambert 网格材质，需要光照，否则就是黑色的

  （1）相机位置不对
## 2. 有光照的情况下，为什么 MeshLambertMaterial 材质不显示？

