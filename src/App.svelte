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
		intervalInSeconds,
		productViewsPerInterval,
		ordersPerInterval,
		itemsPerOrder,
		timeoutMillis,
	} from "./stores.js";

	let viewsSource;
	let ordersSource;
	let viewsChart;
	let ordersChart;
	let missedOportunities = 0;
	let disappointingVisitors = 0;

	function updateSimulation() {
		if(viewsSource) {
			viewsSource.close();
		}

		if(ordersSource) {
			ordersSource.close();
		}
		
		if ($productViewsPerInterval > 0) {
			viewsSource = new EventSource(
				`${$apiUrl}/simulation/views?count=${$productViewsPerInterval}&intervalSeconds=${$intervalInSeconds}&timeoutMillis=${$timeoutMillis}`
			);
			viewsSource.onmessage = (event) => {
				let data = JSON.parse(event.data);
				if(data.timedOut) {
					disappointingVisitors++;
				}
				
				viewsChart.update(data.time);
			};
		}

		if($ordersPerInterval > 0) {
			ordersSource = new EventSource(
				`${$apiUrl}/simulation/orders?count=${$ordersPerInterval}&itemsPerOrder=${$itemsPerOrder}&intervalSeconds=${$intervalInSeconds}&timeoutMillis=${$timeoutMillis}`
			);
			ordersSource.onmessage = (event) => {
				let data = JSON.parse(event.data);
				if(data.timedOut) {
					missedOportunities++;
					
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
							bind:disappointingVisitors
							bind:missedOportunities
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
