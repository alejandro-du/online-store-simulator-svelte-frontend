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
		itemsPerOrder,
		ordersPerMinute,
		timeoutMillis,
		viewsPerMinute,
	} from "./stores.js";

	export let update;
</script>

<FormGroup>
	<Label for="viewsPerMinute">Views per minute:</Label>
	<InputGroup>
		<InputGroupText><Icon name="people-fill" /></InputGroupText>
		<Input bind:value={$viewsPerMinute} type="number" />
	</InputGroup>
	<Input
		id="viewsPerMinute"
		bind:value={$viewsPerMinute}
		type="range"
		min="0"
		max="100000"
		step="1000"
	/>
</FormGroup>
<FormGroup>
	<Label for="ordersPerMinute">Orders per minute:</Label>
	<InputGroup>
		<InputGroupText><Icon name="funnel-fill" /></InputGroupText>
		<Input bind:value={$ordersPerMinute} type="number" />
	</InputGroup>
	<Input
		id="ordersPerMinute"
		bind:value={$ordersPerMinute}
		type="range"
		min="0"
		max="1000"
		step="100"
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
				<Input
					bind:value={$timeoutMillis}
					type="number"
					min="1"
					step="10"
				/>
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
