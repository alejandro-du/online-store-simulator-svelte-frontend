<script lang="ts">
	import {
		Button,
		Col,
		Form,
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
		productViewsPerSecond,
		ordersPerSecond,
		itemsPerOrder,
		timeoutMillis,
	} from "./stores.js";

	export let update;
</script>

<FormGroup>
	<Icon name="people-fill" />
	<Label for="productViewsPerSecond">Product views per second:</Label>
	<span>{$productViewsPerSecond}</span>
	<Input
		id="productViewsPerSecond"
		bind:value={$productViewsPerSecond}
		type="range"
		min="0"
		max="100"
	/>
</FormGroup>
<FormGroup>
	<Icon name="funnel-fill" />
	<Label for="ordersPerSecond">Orders per second:</Label>
	<span>{$ordersPerSecond}</span>
	<Input
		id="ordersPerSecond"
		bind:value={$ordersPerSecond}
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
