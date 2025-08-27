import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

const manager = new THREE.LoadingManager()
const cubeTextureLoader = new THREE.CubeTextureLoader(manager)
const textureLoader = new THREE.TextureLoader(manager)
const gltfLoader = new GLTFLoader(manager)
const dracoLoader = new DRACOLoader(manager)
const fbxLoader = new FBXLoader(manager)

export { manager, cubeTextureLoader, textureLoader, gltfLoader, dracoLoader, fbxLoader }