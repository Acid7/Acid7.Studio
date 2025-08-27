import * as THREE from 'three'

import { cubeTextureLoader } from '@/webgl/utils/Loaders'
import cubemapPX from '@/assets/cubemap/px.jpg'
import cubemapNX from '@/assets/cubemap/nx.jpg'
import cubemapPY from '@/assets/cubemap/py.jpg'
import cubemapNY from '@/assets/cubemap/ny.jpg'
import cubemapPZ from '@/assets/cubemap/pz.jpg'
import cubemapNZ from '@/assets/cubemap/nz.jpg'

// import { events } from '@/utils/Events'
import vertexShader from '@/webgl/shaders/spaceVertex.glsl?raw'
import fragmentShader from '@/webgl/shaders/spaceFragment.glsl?raw'

export default class Space {
	constructor(scene) {

		this.cubemap = cubeTextureLoader.load([
			cubemapPX, cubemapNX, cubemapPY, cubemapNY, cubemapPZ, cubemapNZ
		])
		this.cubemap.colorSpace = THREE.LinearSRGBColorSpace

		const geometry = new THREE.BoxGeometry(100, 100, 100)
		const material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			uniforms: {
				tCube: { value: this.cubemap },
				uWarp: { value: 0 },
			},
			side: THREE.BackSide,
			depthTest: false,
			depthWrite: false,
		})

		this.mesh = new THREE.Mesh(geometry, material)
		scene.add(this.mesh)

		// Update uniforms

		// events.on('tick', () => {
		// })

	}
}