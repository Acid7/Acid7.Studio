import * as THREE from 'three'

import { events, clock } from '@/webgl/utils/Events'
import vertexShader from '@/webgl/shaders/starsVertex.glsl?raw'
import fragmentShader from '@/webgl/shaders/starsFragment.glsl?raw'

export default class Stars {
	constructor(scene, renderer) {

		const starsCount = 250
		const positionArray = new Float32Array(starsCount * 3)
		const scaleArray = new Float32Array(starsCount)

		for (let i = 0; i < starsCount; i++) {
			positionArray[i * 3 + 0] = (Math.random() - 0.5) * 40
			positionArray[i * 3 + 1] = (Math.random() - 0.5) * 40
			positionArray[i * 3 + 2] = (Math.round(Math.random()) * 2 - 1) * (Math.random() * (20 - 5) + 5) // Exclude -5 to 5

			scaleArray[i] = Math.random() * 800
		}

		const geometry = new THREE.BufferGeometry()
		geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
		geometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

		const material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			uniforms: {
				uPixelRatio: { value: renderer.getPixelRatio() },
				uTime: { value: 0 },
			},
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
		})

		this.mesh = new THREE.Points(geometry, material)
		scene.add(this.mesh)

		// Update uniforms

		events.on('tick', () => {
			material.uniforms.uTime.value = clock.getElapsedTime()
		})

	}
}