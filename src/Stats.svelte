<script lang="ts">
	import { Col, Icon, Row } from "sveltestrap";

	export let disappointedVisitors;
	export let missedOpportunityTotal;
</script>

<Row class="text-center">
	<Col>
		<h2>
			<Icon name="emoji-angry" />
			{disappointedVisitors}
		</h2>
		<div>Disappointed visitors</div>
	</Col>
	<Col>
		<h2>
			$ {missedOpportunityTotal}
		</h2>
		<div>Missed opportunity</div>
	</Col>
</Row>
