<script lang="ts">
	import {
		Button,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Form,
		FormGroup,
		Icon,
		Image,
		Input,
		Label,
		Modal,
		ModalBody,
		ModalFooter,
		ModalHeader,
		Nav,
		Navbar,
		NavbarBrand,
		NavItem,
		NavLink,
		Toast,
		ToastBody,
		ToastHeader,
	} from "sveltestrap";

	import { apiUrl } from "./stores";

	let showCreateDemoProductsModel = false;
	let showWaitToast = false;
	let showDoneToast = false;
	let toastHeader = "";
	let toastBody = "";

	let numberOfProducts = 5000;
	let minProductPrice = 5;
	let maxProductPrice = 3000;

	function showWaitMessage(text) {
		showDoneToast = false;
		toastHeader = text;
		toastBody = "Please wait...";
		showWaitToast = true;
	}

	function showDoneMessage(text) {
		showWaitToast = false;
		toastHeader = "Done.";
		toastBody = text;
		showDoneToast = true;
	}

	async function createDemoProducts() {
		showCreateDemoProductsModel = false;
		showWaitMessage("Creating demo products...");
		let eventSource = new EventSource(
			`${$apiUrl}/products/createDemoData?count=${numberOfProducts}&minPrice=${minProductPrice}&maxPrice=${maxProductPrice}`
		);

		let count = 0;
		eventSource.onmessage = (event) => {
			count++;
			if (count >= numberOfProducts) {
				eventSource.close();
				showDoneMessage("Products created.");
			}
		};
	}

	async function deleteAllOrders() {
		showWaitMessage("Deleting all orders...");
		let eventSource = new EventSource(`${$apiUrl}/orders/deleteAll`);
		eventSource.onmessage = (event) => {
			eventSource.close();
			showDoneMessage("Orders deleted.");
		};
	}

	async function deleteAllProducts() {
		showWaitMessage("Deleting all products...");
		let eventSource = new EventSource(`${$apiUrl}/products/deleteAll`);
		eventSource.onmessage = (event) => {
			eventSource.close();
			showDoneMessage("Products deleted.");
		};
	}

</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
	/>
</svelte:head>

<Navbar light>
	<NavbarBrand>
		<Image
			alt="MariaDB"
			height="25"
			class="d-inline-block align-text-top"
			src="https://mariadb.com/wp-content/uploads/2019/11/mariadb-logo-vertical_black.svg"
		/>
		Online Store Simulator
	</NavbarBrand>
	<Nav>
		<NavItem>
			<NavLink>
				<Icon name="github" />
				GitHub
			</NavLink>
		</NavItem>
		<NavItem>
			<Dropdown>
				<DropdownToggle nav caret>
					<Icon name="table" />
					Data
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem
						on:click={() => (showCreateDemoProductsModel = true)}
					>
						Create products...
					</DropdownItem>
					<DropdownItem divider />
					<DropdownItem on:click={deleteAllOrders}>
						Delete all orders
					</DropdownItem>
					<DropdownItem on:click={deleteAllProducts}>
						Delete all products
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</NavItem>
	</Nav>
</Navbar>

<Modal isOpen={showCreateDemoProductsModel}>
	<ModalHeader>Create demo products</ModalHeader>
	<ModalBody>
		<Form>
			<FormGroup>
				<Label for="numberOfProducts">Number of products</Label>
				<Input
					id="numberOfProducts"
					type="number"
					step="100"
					bind:value={numberOfProducts}
				/>
			</FormGroup>
			<FormGroup>
				<Label for="minProductPrice">Min price</Label>
				<Input
					id="minProductPrice"
					type="number"
					step="10"
					bind:value={minProductPrice}
				/>
			</FormGroup>
			<FormGroup>
				<Label for="maxProductPrice">Max price</Label>
				<Input
					id="maxProductPrice"
					type="number"
					step="10"
					bind:value={maxProductPrice}
				/>
			</FormGroup>
		</Form>
	</ModalBody>
	<ModalFooter>
		<Button on:click={() => (showCreateDemoProductsModel = false)}
			>Cancel</Button
		>
		<Button on:click={createDemoProducts} color="primary">Create</Button>
	</ModalFooter>
</Modal>

<div class="toast-container position-fixed bottom-0 end-0" style="z-index: 100;">
	<Toast
		class="bg-primary text-light"
		isOpen={showWaitToast}
		on:close={() => (showWaitToast = false)}
	>
		<ToastHeader toggle={() => (showWaitToast = !showWaitToast)}>
			<Icon name="table" slot="icon" class="me-2" />
			{toastHeader}
		</ToastHeader>
		<ToastBody>{toastBody}</ToastBody>
	</Toast>
	<Toast
		autohide
		class="bg-success text-light"
		isOpen={showDoneToast}
		on:close={() => (showDoneToast = false)}
	>
		<ToastHeader toggle={() => (showDoneToast = !showDoneToast)}>
			<Icon name="table" slot="icon" class="me-2" />
			{toastHeader}
		</ToastHeader>
		<ToastBody>{toastBody}</ToastBody>
	</Toast>
</div>
