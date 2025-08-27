import * as THREE from 'three'
import { events, viewport } from '@/webgl/utils/Events'

class Controls {
	constructor() {

		this.mouse = new THREE.Vector2()

		// Mouse move

		window.addEventListener('mousemove', (event) => {
			this.mouse.x = event.clientX / viewport.width * 2 - 1
			this.mouse.y = -(event.clientY / viewport.height) * 2 + 1
		})

		// Click

		// window.addEventListener('click', () => {
		// 	events.emit('click')
		// })

	}
}

export const { mouse } = new Controls()