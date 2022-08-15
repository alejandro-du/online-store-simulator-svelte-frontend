<script lang="ts">
	import { onMount } from "svelte";
	import ApexCharts from "apexcharts";

	export let title;
	export let type;
	export let curve;

	export function update(newValue) {
		data = [...data, [x++, newValue]];
		chart.updateSeries([{ data: data }]);
		if (data.length > range * 10) {
			data = data.slice(data.length - range - 1, data.length);
		}
	}

	let data = [];
	let chartDiv;
	let chart;
	let x = 1;
	let range = 60;

	const options = {
		series: [
			{
				name: "Value",
				data: data,
			},
		],
		xaxis: {
			type: "numeric",
			range: range,
		},
		chart: {
			type: type,
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
