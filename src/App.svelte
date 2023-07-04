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
	let visitsChart;
	let ordersChart;
	let productVisitDelayChart;
	let orderDelayChart;
	let orderCount = 0;
	let productCount = 0;
	let missedOpportunities = 0;
	let disappointedVisitors = 0;
	let updateButtonCaption = "Start";

	productCountSource = new EventSource(`${$apiUrl}/simulation/productCount`);
	productCountSource.onmessage = (event) => {
		let data = JSON.parse(event.data);
		productCount = data;
	};
	productCountSource.onerror = (event) => {
		productCount = -1;
	};

	orderCountSource = new EventSource(`${$apiUrl}/simulation/orderCount`);
	orderCountSource.onmessage = (event) => {
		let data = JSON.parse(event.data);
		orderCount = data;
	};
	orderCountSource.onerror = (event) => {
		orderCount = -1;
	};

	function updateSimulation() {
		stopSimulation();

		if ($productVisitsPerMinute > 0) {
			viewsSimulationSource = new EventSource(
				`${$apiUrl}/simulation/visits?productVisitsPerMinute=${$productVisitsPerMinute}`
			);
			const visitsPerSecond = Math.floor($productVisitsPerMinute / 60);
			const timeout = $timeoutMillis;
			viewsSimulationSource.onmessage = (event) => {
				let data = JSON.parse(event.data);
				if (data.count < visitsPerSecond) {
					disappointedVisitors += visitsPerSecond - data.count;
				}
				if (data.time > timeout) {
					disappointedVisitors += visitsPerSecond;
				}
				productVisitDelayChart.update(data.time);
				visitsChart.update(data.count);
			};
			updateButtonCaption = "Apply";
		}

		if ($ordersPerMinute > 0) {
			ordersSimulationSource = new EventSource(
				`${$apiUrl}/simulation/orders?ordersPerMinute=${$ordersPerMinute}&itemsPerOrder=${$itemsPerOrder}`
			);
			const ordersPerSecond = Math.floor($ordersPerMinute / 60);
			ordersSimulationSource.onmessage = (event) => {
				let data = JSON.parse(event.data);
				if (data.count < ordersPerSecond) {
					missedOpportunities += ordersPerSecond - data.count;
				}
				orderDelayChart.update(data.time);
				ordersChart.update(data.count);
			};

			updateButtonCaption = "Apply";
		}
	}

	function stopSimulation() {
		if (viewsSimulationSource) {
			viewsSimulationSource.close();
		}

		if (ordersSimulationSource) {
			ordersSimulationSource.close();
		}

		updateButtonCaption = "Start";
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
						<ConfigForm
							update={updateSimulation}
							stop={stopSimulation}
							{updateButtonCaption}
						/>
					</CardBody>
				</Card>
			</Col>
			<Col md="9" class="gy-3">
				<Row>
					<Col>
						<Card>
							<CardBody>
								<AnimatedChart
									bind:this={visitsChart}
									title="Visits per second"
									names={["Visits"]}
									type={["area", "line"]}
									curve="smooth"
								/>
							</CardBody>
						</Card>
					</Col>
					<Col>
						<Card>
							<CardBody>
								<AnimatedChart
									bind:this={ordersChart}
									title="Orders per second"
									names={["Orders"]}
									type={["area", "line"]}
									curve="smooth"
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<p/>
				<Row>
					<Col>
						<Card>
							<CardBody>
								<AnimatedChart
									bind:this={productVisitDelayChart}
									title="Product visits delay (ms)"
									names={["Milliseconds", "Missed"]}
									type={["area", "line"]}
									curve="smooth"
								/>
							</CardBody>
						</Card>
					</Col>
					<Col>
						<Card>
							<CardBody>
								<AnimatedChart
									bind:this={orderDelayChart}
									title="Orders delay (ms)"
									names={["Milliseconds", "Average"]}
									type={["area", "line"]}
									curve="smooth"
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Col>
		</Row>
	</Container>
</main>
