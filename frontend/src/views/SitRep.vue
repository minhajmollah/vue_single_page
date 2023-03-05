<template>
	<div id="sitrep">
		<div id="misc-top" class="section">
			<div id="misc-title" class="float-left">{{ response.name }}</div>
			<div id="misc-date" class="float-right">{{ date_created }}</div>
		</div>
		<div id="misc-main" class="section">
			<div id="misc-map">
				<label for="">Affected Area</label>
				<div id="misc-img-wrapper" :style="`background-image: url('${ response.src_img }')`"></div>
			</div>
			<div id="misc-numba">
				<label for="">Pre-disaster Population</label>
				<div id="misc-numba-wrapper">
					<div id="misc-numba-total">
						<b class="short-this-please">{{ response.total | abbreviate_this }}</b>
						<span>Estimated Total Population</span>
					</div>
					<div id="misc-numba-additional">
						<div v-for="o in top_banner_numbas" class="additional-wrapper">
							<b class="align-right format-this-please">{{ response[o.column] | abbreviate_this }}</b>
							<span class="align-left">{{ o.title }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="population" class="section">
			<label for="">Population centres within disaster-affected area</label>
			<div id="tabs-wrapper" class="align-right">
				<div v-for="x in population_tab_opts" :id="`${x}-button`" @click="activeTab = x" class="cursor-pointer align-center" :class="{ active: activeTab == x }">{{ x }} View</div>
			</div>
			<div id="population-content">
				<div id="List-content" v-show="activeTab == population_tab_opts[0]">
					<div id="legend-wrapper" class="align-right cursor-default">
						<div v-for="(x, key) in population_keys">
							<font-awesome-icon icon="square" :class="key" />
							<span>{{ x }}</span>
						</div>
					</div>

					<div id="accordion-wrapper">
						<div v-for="row in areas" class="toggler-wrapper">
							<div :id="row.id" class="toggler cursor-pointer" @click="activeAccordion = row.id">
								<div class="name">
									<span>{{ row.name }}</span>
									<font-awesome-icon icon="caret-up" v-if="activeAccordion == row.id"/>
									<font-awesome-icon icon="caret-down" v-else />
								</div>
								<div class="total align-center short-this-please">{{ row.population | abbreviate_this }}</div>
								<div class="bar-wrapper">
									<div v-for="key in Object.keys(population_keys)" :class="key" :style="{ width: row[key] * 100 / Object.keys(population_keys).map(o => row[o]).reduce((a, b) => a + b, 0) + '%' }"></div>
								</div>
							</div>
							<div class="content noselect" v-show='activeAccordion == row.id'>
								<div v-for="(x, key) in population_keys">
									<div class="content-title">{{ x }}</div>
									<div class="content-divider"></div>
									<div class="content-value">{{ row[key] | abbreviate_this }}</div>
								</div>
								<div class="airport-wrapper">
									<div class="content-title">Nearest Airport</div>
									<div class="content-divider"></div>
									<div class="content-value">
										<div class="ceil">{{ row.airport_name }}</div>
										<div class="floor">{{ (row.airport_dist / 1000) | round_this }}km away</div>
									</div>
								</div>
								<div class="poverty-wrapper">
									<div class="content-title">Poverty</div>
									<div class="content-divider"></div>
									<div class="content-value">
										<div class="rainbow-bar">
											<div class="gradient"></div>
										</div>
										<div class="pointy-wrapper" :style="{ left: `${(row.rwi + 2) / 4 * 100}%` }">
											<div class="pointy"></div>
											<div class="copy">{{ row.rwi | copytext_this }}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- <div id="Map-content" v-show="activeTab == population_tab_opts[1]">
					Map content
				</div> -->
			</div>
		</div>
		<div id="migration">
			<label for="">Post-disaster migration</label>
			<div id="migration-canvas">

			</div>
		</div>
		</div>
	</div>
</template>

<script>
import _ from 'lodash';
import * as d3 from 'd3'
import { sankey, sankeyLinkHorizontal } from 'd3-sankey'
import { DateTime } from "luxon";

const sankey_target = '#migration-canvas';
const step_copy = [
	{ step: 1.2, text: 'Wealthy' },
	{ step: 0.4, text: 'Relatively Wealthy' },
	{ step: -0.4, text: 'Average' },
	{ step: -1.2, text: 'Poor' },
	{ step: -2, text: 'Poorest' }
]

export default {
	name: 'sitrep',
	components: { },
	data: () => ({
		response: {},
		activeTab: '',
		activeAccordion: '',
	}),
	methods: {
		capitalize: function (str) {
			return (str.split(' ').map(o => ( _.includes(['DKI'], o.toUpperCase()) ? o.toUpperCase() : o.charAt(0).toUpperCase() + o.substring(1).toLowerCase())).join(' '));
		},
		drawSankey: function (data) {
			d3.select(sankey_target).selectAll('svg').remove();

			let canvasWidth		= d3.select(sankey_target).node().getBoundingClientRect().width;
			let canvasHeight	= d3.select(sankey_target).node().getBoundingClientRect().height;

			let margin 			= { top: 20, right: 10, bottom: 20, left: 10 };
			let width			= canvasWidth - margin.right - margin.left;
			let height			= canvasHeight - margin.top - margin.bottom;

			let svg = d3.select(sankey_target).append('svg')
				// .attr('id', map_id)
				.attr('width', canvasWidth)
				.attr('height', canvasHeight)

			const sankeyFunc = sankey()
				.nodeId(d => d.name)
				// .nodeAlign(d3[`sankey${align[0].toUpperCase()}${align.slice(1)}`])
				.nodeWidth(25)
				.nodePadding(10)
				.extent([[margin.left, margin.top], [width - 1, height - 5]]);

			data = _.orderBy(data, o => (parseInt(o.count)), 'desc')
			let links = data.map(o => ({ source: 'src_' + this.capitalize(o.source), target: 'trg_' + this.capitalize(o.target), value: parseInt(o.count) }))
			let nodes = Array.from(new Set(links.flatMap(l => [l.source, l.target])), name => ({ name }));

			let graph = sankeyFunc({ nodes, links });
			const grouped_sources = _.chain(data).groupBy('source').mapValues(val => this.$options.filters.abbreviate_this(_.sumBy(val, 'count')) ).value()
			const grouped_targets = _.chain(data).groupBy('target').mapValues(val => this.$options.filters.abbreviate_this(_.sumBy(val, 'count')) ).value()

			const link = svg.append("g")
				.attr("class", "links")
				.attr("fill", "none")
				.attr("stroke", "#000")
				.attr("stroke-opacity", 0.2)
					.selectAll("path")
				.data(graph.links)
					.enter().append("path")
		  			.attr("d", sankeyLinkHorizontal())
		  			.attr("stroke-width", (d) => (Math.max(1, d.width)));

			link.append("title")
				.text((d) => (d.source.name + " → " + d.target.name + "\n" + d.value));

			const node = svg.append("g")
				.attr("class", "nodes")
				.attr("font-family", "sans-serif")
				.attr("font-size", 10)
					.selectAll("g")
				.data(graph.nodes)
			    	.enter().append("g")
			  		// .call(
					// 	d3.drag()
			        //     .subject((d) => (d))
			        //     .on('start', () => { this.parentNode.appendChild(this); })
			        //     .on('drag', function(event, d) {
					// 		let rectY = d3.select(this).select("rect").attr("y");
					// 		let yTranslate = d.y0 - rectY;
					//
					// 		d.y0 = d.y0 + event.dy;
					//
					// 		d3.select(this).attr("transform", "translate(0" + "," + (yTranslate) + ")");
					//
					// 	    sankey.update(graph);
					// 	    link.attr("d", sankeyLinkHorizontal());
					// 	})
					// );

			node.append("rect")
				.attr("x", function(d) { return d.x0; })
				.attr("y", function(d) { return d.y0; })
				.attr("height", function(d) { return d.y1 - d.y0; })
				.attr("width", function(d) { return d.x1 - d.x0; })
				.attr("stroke", "#000");

			node.append("text")
				.attr("x", function(d) { return d.x0 - 6; })
				.attr("y", function(d) { return (d.y1 + d.y0) / 2; })
				.attr("dy", "0.35em")
				.attr("text-anchor", "end")
				.text(function(d) {
					let type = d.name.substring(0, 3);
					let name = d.name.substring(4);
					return `${name} (${type == 'src' ? grouped_sources[name] : grouped_targets[name]})`;
				})
				.filter(function(d) { return d.x0 < width / 2; })
					.attr("x", function(d) { return d.x1 + 6; })
					.attr("text-anchor", "start");

			node.append("title")
				.text(function(d) { return d.name + "\n" + d.value; });
		},
		getDisaster: function(id) {
			this.$http.get(this.$store.state.baseURL + 'disaster/' + id)
			.then(response => {
				this.response = response.data;
				this.drawSankey(_.get(response, 'data.movements', []));
			})
			// .catch(err => { this.$router.push({ name: 'Home' }) })
			.catch(err => { console.error(err); })
		}
	},
	computed: {
		top_banner_numbas: function () {
			return [
				{ title: "Estimated Children Under 5", column: 'children under five' },
				{ title: "Estimated Women", column: 'women' },
				{ title: "Estimated Elderly (60+)", column: 'elderly' }
			];
		},
		population_tab_opts: function () {
			// return ['List', 'Map'];
			return ['List'];
		},
		population_keys: function () {
			return {
				"children_under_five": "Children Under 5",
				"youth_15_24": "Youth 15-24",
				"women_of_reproductive_age_15_49": "Women of Reproductive Age",
				"elderly_60_plus": "Elderly (60+)",
			};
		},
		date_created: function () {
			return this.response.created_at ? DateTime.fromISO(this.response.created_at).toLocaleString(DateTime.DATE_MED) : '';
		},
		areas: function () {
			return _.get(this.response, 'areas', []);
		}
	},
	filters: {
		abbreviate_this: function (n) {
			const decimal_point = 2;

			if (n < 1e3) return Math.round(n);
			if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(decimal_point) + "K";
			if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(decimal_point) + "M";
			if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(decimal_point) + "B";
			if (n >= 1e12) return +(n / 1e12).toFixed(decimal_point) + "T";
		},
		round_this: function (n) {
			return _.round(n, 2)
		},
		copytext_this: function (n) {
			let copy = '';
			for (let el of step_copy) {
				if (n >= el.step) { return el.text; }
			}

			// _.forEach(step_copy, (v) => {
			// 	if ((n > v) & _.isEmpty(copy)) { copy = k; }
			// });

		}
	},
	mounted: function() {
		this.activeTab = this.population_tab_opts[0];
		this.getDisaster(this.$route.params.id);
	}
}
</script>

<style media="screen" lang="scss">
@import '../stylesheets/sitrep.scss';
</style>
