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
		visitorsPerSecond,
		conversionRate,
		productViewsPerVisitor,
		maxWaitingTimeMillis,
		itemsPerOrder,
		maxBudgetPerVisitor,
	} from "./stores.js";

	let accumulatedIncome = 0.0;
	let disappointedVisitors = 0;
	let missedOpportunityTotal = 0;
	let accumulatedIncomeChart;
	let averageWaitTimeMillisChart;

	setInterval(generateOrders, 1000);

	async function generateOrders() {
		if ($visitorsPerSecond > 0) {
			const response = await fetch(
				`${$apiUrl}/orders/random/?visitors=${$visitorsPerSecond}&conversionRate=${$conversionRate}&productViewsPerVisitor=${$productViewsPerVisitor}&maxWaitingTimeMillis=${$maxWaitingTimeMillis}&itemsPerOrder=${$itemsPerOrder}&maxBudgetPerVisitor=${$maxBudgetPerVisitor}`,
				{
					method: "POST",
				}
			);

			if (response.ok) {
				const summary = await response.json();
				accumulatedIncome += summary.salesTotal;
				disappointedVisitors += summary.disappointedVisitors;
				missedOpportunityTotal += summary.missedOpportunityTotal;

				accumulatedIncomeChart.update(
					accumulatedIncome,
					missedOpportunityTotal
				);
				averageWaitTimeMillisChart.update(
					summary.maxWaitTimeMillis,
					summary.averageWaitTimeMillis
				);
			}
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
							bind:disappointedVisitors
							bind:missedOpportunityTotal
						/>
					</CardBody>
				</Card>
				<p />
				<Card>
					<CardHeader>Settings</CardHeader>
					<CardBody>
						<ConfigForm />
					</CardBody>
				</Card>
			</Col>
			<Col md="9" class="gy-3">
				<Card>
					<CardBody>
						<AnimatedChart
							bind:this={accumulatedIncomeChart}
							title="Income"
							names={["Accumulated", "Missed"]}
							type={["area", "line"]}
							curve="smooth"
						/>
					</CardBody>
				</Card>
				<p />
				<Card>
					<CardBody>
						<AnimatedChart
							bind:this={averageWaitTimeMillisChart}
							title="Waiting time"
							names={["Max", "Average"]}
							type={["area", "line"]}
							curve="stepline"
						/>
					</CardBody>
				</Card>
			</Col>
		</Row>
	</Container>
</main>
