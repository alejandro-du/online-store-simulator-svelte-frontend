<script lang="ts">
	import { onMount } from "svelte";
	import ApexCharts from "apexcharts";

	export let title;
	export let names = [];
	export let type = [];
	export let curve;

	export function update(...values) {
		let series = [];
		for (let i = 0; i < values.length; i++) {
			data[i] = [...data[i], [x, values[i]]];
			series.push({ data: data[i], type: type[i], name: names[i] });

			if (data[i].length > range * 10) {
				data[i] = data[0].slice(
					data[i].length - range - 1,
					data[i].length
				);
			}
		}

		chart.updateSeries(series);
		x++;
	}

	let data = [[], [], []];
	let chartDiv;
	let chart;
	let x = 1;
	let range = 60;

	const options = {
		series: [
			{
				data: [],
			},
		],
		grid: {
			row: {
				colors: ["#f3f3f3", "transparent"],
				opacity: 0.5,
			},
		},
		fill: {
			type: "gradient",
			gradient: {
				shade: "light",
				type: "vertical",
				inverseColors: true,
				opacityFrom: 0.75,
				opacityTo: 0.3,
				stops: [0, 100],
			},
		},
		xaxis: {
			type: "numeric",
			range: range,
		},
		dataLabels: {
			enabled: false,
		},
		chart: {
			legend: {
				show: false,
			},
			height: 350,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false,
			},
			animations: {
				enabled: true,
				easing: "linear",
				dynamicAnimation: {
					speed: 1000,
				},
			},
		},
		stroke: {
			curve: curve,
		},
		title: {
			text: title,
			align: "center",
			style: {
				fontSize: "20px",
			},
		},
	};

	onMount(() => {
		chart = new ApexCharts(chartDiv, options);
		chart.render();
	});
</script>

<div bind:this={chartDiv} />
