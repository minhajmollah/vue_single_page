<template lang="html">
	<header class="align-center noselect">
		<div id="sitrep-nav" @click="$router.push({ name: 'SitRepList' }).catch(err => {})" class="cursor-pointer">SitRep List</div>
		<div id="title" @click="$router.push({ name: 'Home' }).catch(err => {})" class="cursor-pointer">Data for <b>Decision Making.</b></div>
		<div id="auth-nav" class="cursor-pointer">
			<!-- <span class="fa-stack">
				<i class="fas fa-circle fa-stack-2x"></i>
				<i class="fas fa-user fa-stack-1x fa-inverse"></i>
			</span> -->
			<font-awesome-layers class="fa-lg">
				<font-awesome-icon icon="circle" transform="grow-6" />
				<font-awesome-icon icon="user" class="fa-inverse" transform="shrink-6" />
			</font-awesome-layers>
			<!-- <font-awesome-icon icon="user" :mask="['far', 'circle']"/> -->
			<span class="placeholder">Login/Register</span>
		</div>
	</header>
</template>

<script>
export default {
	name: 'header_component',
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
header {
	background-color: $header-clr; display: flex;
	line-height: $header-heigth; border-bottom: 1px solid $header-border-clr;
	div { padding-top: 5px; }
	#sitrep-nav {
		width: $header-side-width; border-right: 1px solid $header-border-clr;
		&:hover { background: $header-border-clr; }
	}
	#title {
		flex: 1; font-size: 24px;
		b { font-family: "universLTPro-bold"; }
	}
	#auth-nav {
		width: $header-side-width; background: $unicef-blue;
		display: flex; align-items: center; justify-content: center;
		span.placeholder {
			display: inline-block;
			text-transform: uppercase; font-size: 12px; font-family: "universLTPro-bold"; color: white;
		}
		.fa-layers {
			color: #CBCBCB; margin-right: 7.5px;
		}
	}
}
</style>
