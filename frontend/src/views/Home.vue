<template>
	<div id="home">
		<div id="background"></div>
		<div id="billboard">
			<div id="title">Put an end to guesswork.</div>
			<div id="subs">Choose a disaster, get your situational analysis, make the decisions you need (to deploy accurate supplies).</div>
			<div id="button" @click="$router.push({ name: 'SitRepList' })" class="align-center cursor-pointer">Show available SitRep</div>
		</div>
		<div id="coalesce" class="noselect">
			<img id="home-map" src="@/assets/images/home-map.png" alt="">
			<img id="home-heat" src="@/assets/images/home-heat.png" alt="">
			<img id="home-chart" src="@/assets/images/home-chart.png" alt="">
			<div id="numba-population" class="cursor-default noselect">
				<div>83K</div>
				<div>Total Population</div>
			</div>
			<div id="numba-woman" class="cursor-default noselect">
				<div>38,452</div>
				<div>Estimated Women</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'home',
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

<style media="screen" lang="scss">
#home {
	max-height: 650px; overflow: hidden; position: relative;
	@include clearfix();
	div#background {
		width: 3000px; height: 3000px; background: white; border-radius: 100%;
		z-index: 0;
		@include transform(translate(-28%, -80%));
	}
	div#billboard {
		width: 375px;
		position: absolute; top: 100px; left: 150px;
		#title { font-family: "universLTPro-bold"; font-size: 45px; }
		#subs { margin: 20px 0 30px; }
		#button { padding: 15px 50px; background: $unicef-blue; color: white; display: inline; }
	}
	div#coalesce {
		position: absolute; width: 100%; top: 75px; right: 0;
		& > div, & > img { position: absolute; }
		#home-map { width: 275px; right: 0; top: 220px; }
		#home-heat { width: 160px; height: 200px; right: 295px; top: -15px; }
		#home-chart { width: 300px; right: 295px; top: 360px; }
		#numba-population {
			width: 250px; height: 125px; right: 0; background: $random-gray; padding: 75px 0 0 25px;
			div:first-child { font-family: "universLTPro-bold"; color: $unicef-blue; font-size: 60px; }
			div:last-child { font-size: 18px; }
		}
		#numba-woman {
			width: 225px; height: 130px; top: 205px; right: 295px; background: $unicef-blue; display: flex; align-items: center;
			div { flex: 1; }
			div:first-child { font-family: "universLTPro-bold"; color: white; font-size: 25px; text-align: center; }
			div:last-child { font-size: 18px; }
		}
	}
}

</style>
