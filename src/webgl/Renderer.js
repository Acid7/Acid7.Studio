import * as THREE from 'three'
import { events, viewport } from '@/webgl/utils/Events'

export default class Renderer {
	constructor() {

		// Make it work with HMR

		if (!document.getElementById('canvas')) {
			const canvas = document.createElement('canvas')
			document.body.appendChild(canvas)
			canvas.id = 'canvas'
		}

		const renderer = new THREE.WebGLRenderer({
			canvas: document.getElementById('canvas'),
			powerPreference: 'high-performance',
			antialias: true,
			alpha: true,
		})

		const { width, height } = viewport
		renderer.setSize(width, height)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		events.on('resize', () => {
			const { width, height } = viewport
			renderer.setSize(width, height)
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		})

		return renderer
	}
}