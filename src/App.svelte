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
	import {
		apiUrl,
		productViewsPerSecond,
		ordersPerSecond,
		itemsPerOrder,
		timeoutMillis,
	} from "./stores.js";

	let viewsSource;
	let ordersSource;
	let viewsChart;
	let ordersChart;

	function updateSimulation() {
		if(viewsSource) {
			viewsSource.close();
		}

		if(ordersSource) {
			ordersSource.close();
		}
		
		if ($productViewsPerSecond > 0) {
			viewsSource = new EventSource(
				`${$apiUrl}/simulation/views?count=${$productViewsPerSecond}&intervalSeconds=1&timeoutMillis=${$timeoutMillis}`
			);
			viewsSource.onmessage = (event) => {
				viewsChart.update(event.data);
			};
		}

		if($ordersPerSecond > 0) {
			ordersSource = new EventSource(
				`${$apiUrl}/simulation/orders?count=${$ordersPerSecond}&itemsPerOrder=${$itemsPerOrder}&intervalSeconds=1&timeoutMillis=${$timeoutMillis}`
			);
			ordersSource.onmessage = (event) => {
				ordersChart.update(event.data);
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
							title="Products view delay (ms)"
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
							title="Orders delay (ms)"
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
