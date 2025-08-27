<template>
	<div id="preloader">
		<div class="pyramid">
			<div class="triangle side-1"></div>
			<div class="triangle side-2"></div>
			<div class="triangle side-3"></div>
			<div class="triangle side-4"></div>
		</div>
	</div>
</template>



<script>
export default {
	methods: {
		hide() {
			document.body.classList.add('preloader-hidden')
		},
		show() {
			document.body.classList.remove('preloader-hidden')
		},
	},
}
</script>



<style lang="stylus" scoped>
#preloader
	z-index 4
	position fixed
	top 0
	left 0
	right 0
	bottom 0
	background-color #000
	perspective 1200px
	perspective-origin 50% 50%
	transition opacity .5s

	.pyramid
		position absolute
		top 50%
		left 50%
		width 46px
		height 46px
		margin-left -20px
		transform-style preserve-3d
		transform rotateX(75deg) rotate(65deg)
		animation pyramidRotation 3.5s linear infinite
		animation-direction reverse

	.triangle
		transform-style preserve-3d
		width 0
		height 0
		background none
		&::before
			content ''
			position absolute
			height 0
			width 0
			border-style solid
			border-width 67px 23px 0 23px

	.side-1, .side-2, .side-3, .side-4
		opacity 0.9

	.side-1 
		transform translatex(0) rotatey(110.2deg) rotatez(90deg)
		&::before 
			border-color #eee transparent transparent transparent

	.side-2
		transform translatex(46px) rotatez(90deg) rotatex(69.8deg)
		&::before 
			border-color #eee transparent transparent transparent

	.side-3
		transform translatez(0) rotatex(69.8deg)
		&::before 
			border-color #ddd transparent transparent transparent
	
	.side-4  
		transform translatey(46px) rotatex(110.2deg)
		&::before 
			border-color #ddd transparent transparent transparent

@keyframes pyramidRotation
	0%
		transform rotateX(75deg) rotate(0deg)
	100%
		transform rotateX(75deg) rotate(360deg)

body.preloader-hidden #preloader
	opacity 0
	z-index -2
	pointer-events none
	.pyramid
		animation-play-state paused
</style>