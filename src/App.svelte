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

	let viewsSource;
	let ordersSource;
	let viewsChart;
	let ordersChart;
	let missedOportunities = 0;
	let disappointingVisitors = 0;

	function updateSimulation() {
		if (viewsSource) {
			viewsSource.close();
		}

		if (ordersSource) {
			ordersSource.close();
		}

		if ($viewsPerMinute > 0) {
			viewsSource = new EventSource(
				`${$apiUrl}/simulation/views?viewsPerMinute=${$viewsPerMinute}&timeoutMillis=${$timeoutMillis}`
			);
			const timeout = $timeoutMillis;
			viewsSource.onmessage = (event) => {
				let data = JSON.parse(event.data);
				if (data.time == -1) {
					disappointingVisitors++;
					data.time = timeout;
				}
				viewsChart.update(data.time);
			};
		}

		if ($ordersPerMinute > 0) {
			ordersSource = new EventSource(
				`${$apiUrl}/simulation/orders?ordersPerMinute=${$ordersPerMinute}&itemsPerOrder=${$itemsPerOrder}&timeoutMillis=${$timeoutMillis}`
			);
			const timeout = $timeoutMillis;
			ordersSource.onmessage = (event) => {
				let data = JSON.parse(event.data);
				if (data.time == -1) {
					missedOportunities++;
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
