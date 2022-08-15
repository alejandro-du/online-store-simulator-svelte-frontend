<script lang="ts">
	import {
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
		visitorsPerSecond,
		conversionRate,
		productViewsPerVisitor,
		maxWaitingTimeMillis,
		itemsPerOrder,
		maxBudgetPerVisitor,
	} from "./stores.js";

	function updateProductViewsPerVisitor() {
		if ($productViewsPerVisitor < $itemsPerOrder) {
			$productViewsPerVisitor = $itemsPerOrder;
		}
	}

	function updateItemsPerOrder() {
		if ($itemsPerOrder > $productViewsPerVisitor) {
			$itemsPerOrder = $productViewsPerVisitor;
		}
	}

	function updateMaxBudgetPerVisitor() {
		if ($maxBudgetPerVisitor < 0) {
			$maxBudgetPerVisitor = 0;
		}
	}
</script>

<Form>
	<FormGroup>
		<Icon name="people-fill" />
		<Label for="visitorsPerSecond">Visitors per second:</Label>
		<span>{$visitorsPerSecond}</span>
		<Input
			id="visitorsPerSecond"
			bind:value={$visitorsPerSecond}
			type="range"
			min=0
			max=1000
		/>
	</FormGroup>
	<FormGroup>
		<Icon name="funnel-fill" />
		<Label for="conversionRate">Conversion rate:</Label>
		<span>{parseFloat("" + $conversionRate * 100).toFixed(1)}%</span>
		<Input
			id="conversionRate"
			bind:value={$conversionRate}
			type="range"
			min=0.0
			max=0.10
			step=0.0010
		/>
	</FormGroup>
	<p>Visitor behavior :</p>
	<Row>
		<Col>
			<FormGroup>
				<InputGroup>
					<InputGroupText><Icon name="eye-fill" /></InputGroupText>
					<Input
						bind:value={$productViewsPerVisitor}
						type="number"
						min=1
						on:change={updateProductViewsPerVisitor}
					/>
				</InputGroup>
				<FormText>Product views per visitor</FormText>
			</FormGroup>
		</Col>
		<Col>
			<FormGroup>
				<InputGroup>
					<InputGroupText><Icon name="cart-fill" /></InputGroupText>
					<Input
						bind:value={$itemsPerOrder}
						type="number"
						min=1
						bind:max={$productViewsPerVisitor}
						on:change={updateItemsPerOrder}
					/>
				</InputGroup>
				<FormText>Products per order</FormText>
			</FormGroup>
		</Col>
	</Row>
	<Row>
		<Col>
			<FormGroup>
				<InputGroup>
					<InputGroupText>&nbsp;$&nbsp;</InputGroupText>
					<Input
						bind:value={$maxBudgetPerVisitor}
						type="number"
						step=100
						min=1
						on:change={updateMaxBudgetPerVisitor}
					/>
				</InputGroup>
				<FormText>Max budget per visitor</FormText>
			</FormGroup>
		</Col>
		<Col>
			<FormGroup>
				<InputGroup>
					<InputGroupText><Icon name="clock-fill" /></InputGroupText>
					<Input
						bind:value={$maxWaitingTimeMillis}
						type="number"
						step=100
						min=0
					/>
				</InputGroup>
				<FormText>Max wait time in milliseconds</FormText>
			</FormGroup>
		</Col>
	</Row>
</Form>
