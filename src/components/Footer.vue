<template>
	<footer>
		<ul id="footer-menu" class="menu">
			<li class="menu-item">❦ Anno Domini 2048 - Earth, The Universe.</li>
		</ul>
	</footer>
</template>



<style lang="stylus" scoped>
footer
	z-index 3
	position fixed
	left 0
	right 0
	bottom 0
	display flex
	justify-content space-between
	align-items center
	text-align center
	margin 0 var(--horizontal-rim) var(--vertical-rim)
	font-family 'Federation'
	pointer-events none
	filter blur(10px)
	opacity 0
	transform translateY(25%)
	transition opacity .5s, filter .5s, transform .5s

body.footer-visible footer
	pointer-events auto
	transform translateY(0%)
	filter blur(0px)
	opacity 1

#footer-menu
	font-size .9375rem
	margin-left auto
	margin-right auto
	padding-left 0
	.menu-item
		display inline-block
		vertical-align middle
		a
			display inline-block
			text-decoration none
			padding .5rem
			margin 0 1rem
			transition-color()

@media (max-width: 413px)
	footer
		margin-bottom 0
</style>