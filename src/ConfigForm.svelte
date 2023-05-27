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
		productVisitsPerMinute,
	} from "./stores.js";

	export let update, stop, updateButtonCaption = "Start";
</script>

<Row>
	<Col>
		<FormGroup>
	<Label for="productVisitsPerMinute">Product visits per minute:</Label>
			<InputGroup>
				<InputGroupText><Icon name="people-fill" /></InputGroupText>
		<Input bind:value={$productVisitsPerMinute} type="number" />
			</InputGroup>
	<Input
		id="productVisitsPerMinute"
		bind:value={$productVisitsPerMinute}
		type="range"
		min="0"
		max="100000"
		step="1000"
	/>
		</FormGroup>
	</Col>
	<Col>
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
		max="10000"
		step="100"
	/>
		</FormGroup>
	</Col>
</Row>
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
					min="0"
					max="10000"
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
		<div class="d-flex flex-row-reverse gap-2">
			<Button on:click={update} color="primary" class="">{updateButtonCaption}</Button>
			<Button on:click={stop} color="light">Stop</Button>
		</div>
	</Col>
</Row>
