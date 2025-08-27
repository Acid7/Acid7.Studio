import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'stats.js'
import settings from '@/app-settings.js'
import { events } from '@/webgl/utils/Events'

import Renderer from '@/webgl/Renderer'
import Camera from '@/webgl/Camera'

import { manager } from '@/webgl/utils/Loaders'
import Space from '@/webgl/world/Space'
import Stars from '@/webgl/world/Stars'
import Pyramid from '@/webgl/world/Pyramid'
import Audio from '@/webgl/world/Audio'

let scene, renderer, camera

export default class Scene {
	constructor(sceneLoaded) {

		// Renderer

		scene = new THREE.Scene()
		renderer = new Renderer()
		camera = new Camera()

		// World

		this.space = new Space(scene)
		this.stars = new Stars(scene, renderer)
		this.pyramid = new Pyramid(scene, camera, this.space)
		this.audio = new Audio({
			space: this.space,
			stars: this.stars,
			pyramid: this.pyramid
		})

		// Loading Manager

		manager.onProgress = (url, itemsLoaded, itemsTotal) => {
			const percent = Math.round((itemsLoaded / itemsTotal) * 100)
		}

		manager.onLoad = () => {
			this.render()
			setTimeout(() => {
				sceneLoaded()
			}, 100)
		}

		// HMR

		if (window.currentAnimationFrameId) { window.cancelAnimationFrame(currentAnimationFrameId) }

		// Debug

		if (settings.debug.isActive) {
			this.stats = new Stats()
			this.stats.showPanel(0)
			document.body.appendChild(this.stats.dom)

			const controls = new OrbitControls(camera, renderer.domElement)
			controls.enableDamping = true
			events.on('tick', () => controls.update())
		} else { this.stats = { begin: () => {}, end: () => {} } }
	}


	// Render

	render() {
		this.stats.begin()
		events.emit('tick')
		this.stats.end()

		renderer.render(scene, camera)
		window.currentAnimationFrameId = window.requestAnimationFrame(this.render.bind(this))
	}


	// Dispose

	dispose() {

		renderer.dispose()

		const cleanMaterial = (material) => { // Material
			material.dispose()

			for (const key of Object.keys(material)) { // Textures
				const value = material[key]
				if (value && typeof value === 'object' && 'minFilter' in value) {
					value.dispose()
				}
			}
		}

		scene.traverse(object => {
			if (!object.isMesh) return

			object.geometry.dispose() // Geometry

			if (object.material.isMaterial) { cleanMaterial(object.material) }
			else { for (const material of object.material) cleanMaterial(material) } // Array of materials
		})

	}

}