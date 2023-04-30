<script lang="ts">
	import {
		Card,
		CardBody,
		CardHeader,
		Col,
		Container,
		Row,
	} from "sveltestrap";
	import AnimatedChart from "./AnimatedChart.svelte";
	import ConfigForm from "./ConfigForm.svelte";
	import Header from "./Header.svelte";
	import Stats from "./Stats.svelte";
	import {
		apiUrl,
		viewsPerMinute,
		ordersPerMinute,
		itemsPerOrder,
		timeoutMillis,
	} from "./stores.js";

	let viewsSimulationSource;
	let ordersSimulationSource;
	let orderCountSource;
	let productCountSource;
	let viewsChart;
	let ordersChart;
	let orderCount = 0;
	let productCount = 0;
	let missedOpportunities = 0;
	let disappointingVisitors = 0;

	productCountSource = new EventSource(`${$apiUrl}/simulation/productCount`);
	productCountSource.onmessage = (event) => {
		let data = JSON.parse(event.data);
		productCount = data;
	};
	orderCountSource = new EventSource(`${$apiUrl}/simulation/orderCount`);
	orderCountSource.onmessage = (event) => {
		let data = JSON.parse(event.data);
		orderCount = data;
	};

	function updateSimulation() {
		if (viewsSimulationSource) {
			viewsSimulationSource.close();
		}

		if (ordersSimulationSource) {
			ordersSimulationSource.close();
		}

		if ($viewsPerMinute > 0) {
			viewsSimulationSource = new EventSource(
				`${$apiUrl}/simulation/views?viewsPerMinute=${$viewsPerMinute}&timeoutMillis=${$timeoutMillis}`
			);
			const timeout = $timeoutMillis;
			viewsSimulationSource.onmessage = (event) => {
				let data = JSON.parse(event.data);
				if (data.time <= -1) {
					disappointingVisitors += -data.time;
					data.time = timeout;
				}
				viewsChart.update(data.time);
			};
		}

		if ($ordersPerMinute > 0) {
			ordersSimulationSource = new EventSource(
				`${$apiUrl}/simulation/orders?ordersPerMinute=${$ordersPerMinute}&itemsPerOrder=${$itemsPerOrder}&timeoutMillis=${$timeoutMillis}`
			);
			const timeout = $timeoutMillis;
			ordersSimulationSource.onmessage = (event) => {
				let data = JSON.parse(event.data);
				if (data.time <= -1) {
					missedOpportunities += -data.time;
					data.time = timeout;
				}
				ordersChart.update(data.time);
			};
		}
	}
</script>

<main>
	<Container fluid>
		<Header />
		<Row>
			<Col class="gy-3">
				<Card>
					<CardBody>
						<Stats
							bind:orderCount
							bind:productCount
							bind:disappointingVisitors
							bind:missedOpportunities
						/>
					</CardBody>
				</Card>
				<p />
				<Card>
					<CardHeader>Settings</CardHeader>
					<CardBody>
						<ConfigForm update={updateSimulation} />
					</CardBody>
				</Card>
			</Col>
			<Col md="9" class="gy-3">
				<Card>
					<CardBody>
						<AnimatedChart
							bind:this={viewsChart}
							title="Max view delay (ms)"
							names={["Milliseconds", "Missed"]}
							type={["area", "line"]}
							curve="smooth"
						/>
					</CardBody>
				</Card>
				<p />
				<Card>
					<CardBody>
						<AnimatedChart
							bind:this={ordersChart}
							title="Max order delay (ms)"
							names={["Milliseconds", "Average"]}
							type={["area", "line"]}
							curve="smooth"
						/>
					</CardBody>
				</Card>
			</Col>
		</Row>
	</Container>
</main>
