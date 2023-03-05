<template>
	<div id="sitrep-list">
		<div id="bread" class="align-center">Generate SitRep for</div>
		<div id="sitrep-wrapper">
			<div v-for="o in disasters" class="disaster-wrapper cursor-pointer" @click="$router.push({ name: 'SitRep', params: { id: o.id } })">
				<div class="image-wrapper">
					<img :src="o.src_img" alt="">
				</div>
				<div class="title align-center">{{ o.name }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import _ from 'lodash';

export default {
	name: 'sitrep_list',
	components: { },
	data: () => ({
		disasters: []
	}),
	methods: {
		getAllDisasters: function() {
			this.$http.get(this.$store.state.baseURL + 'disaster')
			.then(response => {
				this.disasters = _.uniqBy(response.data, 'id');
			})
			.catch(err => { console.error(err); })
		}
	},
	computed: {

	},
	mounted: function() {
		this.getAllDisasters();
	}
}
</script>

<style media="screen" lang="scss">
#sitrep-list {
	padding: 30px;
	#bread { margin-bottom: 20px; }
	#sitrep-wrapper {
		display: flex; flex-flow: row wrap; justify-content: space-around;
		.disaster-wrapper {
			width: 350px; margin-bottom: 30px;
			.image-wrapper {
				width: 100%; height: 200px; display: flex; align-items: center; overflow: hidden;
			}
			.title {
				background: white; padding: 15px 10px; font-size: 14px;
			}
		}
	}
}

</style>
