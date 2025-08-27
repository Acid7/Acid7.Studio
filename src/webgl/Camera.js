import * as THREE from 'three'
import { events, viewport } from '@/webgl/utils/Events'

export default class Camera {
	constructor() {

		const { width, height } = viewport
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)
		camera.position.set(0, 0, 0)

		events.on('resize', () => {
			const { width, height } = viewport
			camera.aspect = width / height
			camera.updateProjectionMatrix()
		})

		return camera

	}
}
