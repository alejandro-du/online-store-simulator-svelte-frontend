<script lang="ts">
	import { Col, Icon, Row } from "sveltestrap";

	export let orderCount;
	export let productCount;
	export let disappointingVisitors;
	export let missedOportunities;

	let formatter = Intl.NumberFormat('en', { notation: 'compact' });
</script>

<Row class="text-center">
	<Col>
		<h2>
			<Icon name="bag-check" />
			{formatter.format(orderCount)}
		</h2>
		<div>Orders</div>
	</Col>
	<Col>
		<h2>
			<Icon name="box" />
			{formatter.format(productCount)}
		</h2>
		<div>Products</div>
	</Col>
</Row>
<br />
<Row class="text-center">
	<Col>
		<h2>
			{#if disappointingVisitors > 0}
				<Icon name="emoji-angry" />
			{:else}
				<Icon name="emoji-smile" />
			{/if}
			{formatter.format(disappointingVisitors)}
		</h2>
		<div>Disappointed visitors</div>
	</Col>
	<Col>
		<h2>
			{#if missedOportunities > 0}
				<Icon name="cart-x-fill" />
			{:else}
				<Icon name="cart-check" />
			{/if}
			{formatter.format(missedOportunities)}
		</h2>
		<div>Missed opportunities</div>
	</Col>
</Row>
