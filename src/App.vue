<template>
	<Preloader ref="preloader"/>
	<Header/>
	<main id="content" v-if="loaded">
		<router-view/>
	</main>
	<Footer/>
</template>



<script>
import Preloader from '@/components/Preloader.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Debug from '@/webgl/utils/Debug'
import Scene from '@/webgl/Scene'
import settings from '@/app-settings.js'
export default {
	components: { Preloader, Header, Footer },
	data() { return { loaded: false } },
	methods: {
		sceneLoaded() {
			this.$refs.preloader.hide()
			this.loaded = true
		},
	},
	mounted() {
		const debug = new Debug()
		window._acid7 = new Scene(this.sceneLoaded)
	},
	unmounted() {
		if (settings.debug.isActive) { settings.debug.tweakpane.dispose() }
		window._acid7.dispose()
	}
}
</script>



<style lang="stylus">
#content
	z-index 2
	width 100%
	max-width 77rem
	margin auto
	padding 9rem 2rem
	text-align center
	color primary-color

#canvas
	position fixed
	z-index -1
	top 0
	left 0
	right 0
	bottom 0
	outline 0

a
	transition color .5s

header a:hover
footer a:hover
.hover:hover
	color secondary-color
	animation hoverAnimation .5s linear

@keyframes hoverAnimation
	0%
		opacity 1
	50%
		opacity 0
		transform scaleY(1.5)
		filter blur(10px)
	75%
		filter blur(0px)
	100%
		opacity 1

@media (max-width: 1112px)
	#content
		padding 9rem calc(var(--horizontal-rim) * 2)

@media (max-width: 667px)
	#content
		padding-left var(--horizontal-rim)
		padding-right var(--horizontal-rim)
</style>