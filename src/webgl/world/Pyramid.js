import * as THREE from 'three'

import settings from '@/app-settings.js'
import { mouse } from '@/webgl/utils/Controls'
import { events } from '@/webgl/utils/Events'
import vertexShader from '@/webgl/shaders/pyramidVertex.glsl?raw'
import fragmentShader from '@/webgl/shaders/pyramidFragment.glsl?raw'

export default class Pyramid {
	constructor(scene, camera, space) {

		const geometry = new THREE.ConeGeometry(1.25, 2.5, 4)
		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				tCube: { value: space.cubemap },
				uMouseX: { value: 0 },
				uMouseY: { value: 0 },
				uGreenShift: { value: 1 },
				uBlueShift: { value: 1 },
			},
		})

		this.mesh = new THREE.Mesh(geometry, material)
		this.mesh.position.z = -5
		scene.add(this.mesh)

		// Update uniforms

		const lerp = THREE.MathUtils.lerp

		events.on('tick', () => {
			this.mesh.rotation.y += 0.006

			material.uniforms.uMouseX.value = lerp(material.uniforms.uMouseX.value, Math.abs(mouse.x / 5 + 1), 0.03)
			material.uniforms.uMouseY.value = lerp(material.uniforms.uMouseY.value, Math.abs(mouse.y / 5 + 1), 0.03)

			camera.position.x = lerp(camera.position.x, mouse.x * -0.5, 0.03)
			camera.position.y = lerp(camera.position.y, mouse.y * -0.5, 0.03)
			camera.position.z = lerp(camera.position.z, mouse.y * 0.5, 0.03)
			camera.lookAt(this.mesh.position.x, this.mesh.position.y - 0.35, this.mesh.position.z)
		})

		// Debug

		if (settings.debug.isActive) {
			const pyramid = settings.debug.tweakpane.addFolder({ title: 'Pyramid' })
			pyramid.addBinding(this.mesh, 'visible')
			pyramid.addBinding(this.mesh.rotation, 'z', {
				min: -Math.PI,
				max: Math.PI,
				step: 0.001,
				label: 'rotationZ',
			})
		}

	}
}