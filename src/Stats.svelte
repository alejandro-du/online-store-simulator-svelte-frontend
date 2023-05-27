<script lang="ts">
	import { Col, Icon, Row } from "sveltestrap";

	export let orderCount;
	export let productCount;
	export let disappointedVisitors;
	export let missedOpportunities;

	let formatter = Intl.NumberFormat("en", { notation: "compact" });

	function clearDisappointedVisitors() {
		disappointedVisitors = 0;
	}

	function clearMissedOpportunities() {
		missedOpportunities = 0;
	}
</script>

<Row class="text-center">
	<Col>
		<h2>
			<Icon name="bag-check" />
			{orderCount == -1 ? "Error" : formatter.format(orderCount)}
		</h2>
		<div>Orders</div>
	</Col>
	<Col>
		<h2>
			<Icon name="box" />
			{productCount == -1 ? "Error" : formatter.format(productCount)}
		</h2>
		<div>Products</div>
	</Col>
</Row>
<br />
<Row class="text-center">
	<Col>
		<h2>
			{#if disappointedVisitors > 0}
				<span on:click={clearDisappointedVisitors}>
					<Icon name="emoji-angry" />
				</span>
			{:else}
				<Icon name="emoji-smile" />
			{/if}
			{formatter.format(disappointedVisitors)}
		</h2>
		<div>Disappointed visitors</div>
	</Col>
	<Col>
		<h2>
			{#if missedOpportunities > 0}
				<span on:click={clearMissedOpportunities}>
					<Icon name="cart-x-fill" />
				</span>
			{:else}
				<Icon name="cart-check" />
			{/if}
			{formatter.format(missedOpportunities)}
		</h2>
		<div>Missed opportunities</div>
	</Col>
</Row>
