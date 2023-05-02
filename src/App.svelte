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
		productVisitsPerMinute,
		ordersPerMinute,
		itemsPerOrder,
		timeoutMillis,
	} from "./stores.js";

	let viewsSimulationSource;
	let ordersSimulationSource;
	let orderCountSource;
	let productCountSource;
	let productVisitDelayChart;
	let orderDelayChart;
	let orderCount = 0;
	let productCount = 0;
	let missedOpportunities = 0;
	let disappointedVisitors = 0;

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

		if ($productVisitsPerMinute > 0) {
			viewsSimulationSource = new EventSource(
				`${$apiUrl}/simulation/visits?productVisitsPerMinute=${$productVisitsPerMinute}&timeoutMillis=${$timeoutMillis}`
			);
			const timeout = $timeoutMillis;
			viewsSimulationSource.onmessage = (event) => {
				let data = JSON.parse(event.data);
				if (data.time <= -1) {
					disappointedVisitors += -data.time;
					data.time = timeout;
				}
				productVisitDelayChart.update(data.time);
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
					disappointedVisitors += -data.time;
					data.time = timeout;
				}
				orderDelayChart.update(data.time);
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
							bind:disappointedVisitors
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
							bind:this={productVisitDelayChart}
							title="Max product visit delay (ms)"
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
							bind:this={orderDelayChart}
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
