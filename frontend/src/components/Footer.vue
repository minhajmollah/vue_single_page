<template lang="html">
	<footer>
		<div id="plainstring" class="align-center">in partnership with</div>
		<div id="logos">
			<img id="plj" src="@/assets/images/logo/plj.png" alt="">
			<img id="facebook" src="@/assets/images/logo/facebook.png" alt="">
			<img id="unicef" src="@/assets/images/logo/unicef.png" alt="">
		</div>
		<div id="about" @click="$router.push({ name: 'About' }).catch(err => {})" class="align-center cursor-pointer" >
			<font-awesome-icon icon="question-circle" /> about this project
		</div>
	</footer>
</template>

<script>
export default {
	name: 'footer_component',
	components: { },
	data: () => ({

	}),
	computed: {

	},
	methods: {

	},
	mounted: function() {

	}
}
</script>

<style lang="scss" scoped>
footer {
	margin-top: 20px;
	div#plainstring { text-transform: uppercase; font-size: 12px;}
	div#logos {
		max-width: 900px; margin: 30px auto 20px;
		display: flex; align-items: center; justify-content: space-between;

		img {
			position: relative;
			&#plj { width: 175px; }
			&#facebook { width: 325px; }
			&#unicef { width: 125px; }
		}
	}
	div#about {
		font-size: 13px; color: gray; margin-bottom: 20px;
		svg { font-size: 12px; }
	}
}

</style>
