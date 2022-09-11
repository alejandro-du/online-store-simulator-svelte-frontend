<script lang="ts">
	import {
		Button,
		Col,
		FormGroup,
		FormText,
		Icon,
		Input,
		InputGroup,
		InputGroupText,
		Label,
		Row,
	} from "sveltestrap";
	import {
		intervalInSeconds,
		productViewsPerInterval,
		ordersPerInterval,
		itemsPerOrder,
		timeoutMillis,
	} from "./stores.js";

	export let update;
</script>

<FormGroup>
	<Icon name="stopwatch-fill" />
	<Label for="intervalInSeconds">Interval duration in seconds:</Label>
	<Input
		id="intervalInSeconds"
		bind:value={$intervalInSeconds}
		type="number"
		min="0"
		max="60"
	/>
</FormGroup>
<FormGroup>
	<Icon name="people-fill" />
	<Label for="productViewsPerSecond">Product views per interval:</Label>
	<span>{$productViewsPerInterval}</span>
	<Input
		id="productViewsPerSecond"
		bind:value={$productViewsPerInterval}
		type="range"
		min="0"
		max="500"
	/>
</FormGroup>
<FormGroup>
	<Icon name="funnel-fill" />
	<Label for="ordersPerInterval">Orders per interval:</Label>
	<span>{$ordersPerInterval}</span>
	<Input
		id="ordersPerInterval"
		bind:value={$ordersPerInterval}
		type="range"
		min="0"
		max="100"
	/>
</FormGroup>
<Row>
	<Col>
		<FormGroup>
			<InputGroup>
				<InputGroupText><Icon name="cart-fill" /></InputGroupText>
				<Input bind:value={$itemsPerOrder} type="number" min="1" />
			</InputGroup>
			<FormText>Products per order</FormText>
		</FormGroup>
	</Col>
	<Col>
		<FormGroup>
			<InputGroup>
				<InputGroupText><Icon name="clock-fill" /></InputGroupText>
				<Input bind:value={$timeoutMillis} type="number" min="1" step="100" />
			</InputGroup>
			<FormText>Timeout in milliseconds</FormText>
		</FormGroup>
	</Col>
</Row>
<Row>
	<Col>
		<hr />
		<div class="d-flex flex-row-reverse bd-highlight">
			<Button on:click={update} color="primary">Apply</Button>
		</div>
	</Col>
</Row>
