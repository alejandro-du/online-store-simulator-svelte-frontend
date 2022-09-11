<script lang="ts">
	import { Col, Icon, Row } from "sveltestrap";

	export let disappointingVisitors;
	export let missedOportunities;
</script>

<Row class="text-center">
	<Col>
		<h2>
			{#if disappointingVisitors > 0}
				<Icon name="emoji-angry" />
			{:else}
				<Icon name="emoji-smile" />
			{/if}
			{disappointingVisitors}
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
			{missedOportunities}
		</h2>
		<div>Missed opportunities</div>
	</Col>
</Row>
