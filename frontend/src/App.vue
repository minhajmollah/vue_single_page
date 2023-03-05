<template>
	<div id="root">
		<Header />
		<div class="content">
			<router-view/>
		</div>
		<Footer />
	</div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
	name: 'Root',
	components: { Header, Footer },
	data: () => ({ }),
	methods: { },
	computed: { },
	created: function () {

	}
}
</script>

<style lang="scss">
@import 'stylesheets/main.scss';
</style>
