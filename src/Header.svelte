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

	let showDeleteAllOrdersToast = false;
	let showDeleteAllOrdersDoneToast = false;
	let showDeleteAllProductsToast = false;
	let showDeleteAllProductsDoneToast = false;
	let showCreateDemoProductsToast = false;
	let showCreateDemoProductsDoneToast = false;
	let showCreateDemoProductsModel = false;

	let numberOfProducts = 15000;
	let minProductPrice = 5;
	let maxProductPrice = 3000;

	async function deleteAllOrders() {
		showDeleteAllOrdersToast = true;
		const response = await fetch(`${$apiUrl}/orders/`, {
			method: "DELETE",
		});
		showDeleteAllOrdersToast = !(showDeleteAllOrdersDoneToast = true);
	}

	async function deleteAllProducts() {
		showDeleteAllProductsToast = true;
		const response = await fetch(`${$apiUrl}/products/`, {
			method: "DELETE",
		});
		showDeleteAllProductsToast = !(showDeleteAllProductsDoneToast = true);
	}

	async function createDemoProducts() {
		showCreateDemoProductsModel = false;
		showCreateDemoProductsToast = true;
		const response = await fetch(
			`${$apiUrl}/products/demo/?count=${numberOfProducts}&minPrice=${minProductPrice}&maxPrice=${maxProductPrice}`,
			{
				method: "POST",
			}
		);
		showCreateDemoProductsToast = !(showCreateDemoProductsDoneToast = true);
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
	/>
</svelte:head>

<Navbar color="light">
	<NavbarBrand>
		<Image
			alt="MariaDB"
			height="25"
			class="d-inline-block align-text-top"
			src="https://mariadb.com/wp-content/uploads/2019/11/mariadb-logo-vertical_blue.svg"
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
						Create demo products...
					</DropdownItem>
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

<div class="toast-container position-fixed bottom-0 end-0">
	<Toast
		autohide
		class="bg-success text-light"
		isOpen={showDeleteAllOrdersDoneToast}
		on:close={() => (showDeleteAllOrdersDoneToast = false)}
	>
		<ToastHeader
			toggle={() =>
				(showDeleteAllOrdersDoneToast = !showDeleteAllOrdersDoneToast)}
		>
			<Icon name="table" slot="icon" class="me-2" />
			Done.
		</ToastHeader>
		<ToastBody>All orders deleted.</ToastBody>
	</Toast>
	<Toast
		class="bg-primary text-light"
		isOpen={showDeleteAllOrdersToast}
		on:close={() => (showDeleteAllOrdersToast = false)}
	>
		<ToastHeader
			toggle={() =>
				(showDeleteAllOrdersToast = !showDeleteAllOrdersToast)}
		>
			<Icon name="table" slot="icon" class="me-2" />
			Deleting all orders...
		</ToastHeader>
		<ToastBody>Please wait.</ToastBody>
	</Toast>
	<Toast
		autohide
		class="bg-success text-light"
		isOpen={showDeleteAllProductsDoneToast}
		on:close={() => (showDeleteAllProductsDoneToast = false)}
	>
		<ToastHeader
			toggle={() =>
				(showDeleteAllProductsDoneToast =
					!showDeleteAllProductsDoneToast)}
		>
			<Icon name="table" slot="icon" class="me-2" />
			Done.
		</ToastHeader>
		<ToastBody>All products deleted.</ToastBody>
	</Toast>
	<Toast
		class="bg-primary text-light"
		isOpen={showDeleteAllProductsToast}
		on:close={() => (showDeleteAllProductsToast = false)}
	>
		<ToastHeader
			toggle={() =>
				(showDeleteAllProductsToast = !showDeleteAllProductsToast)}
		>
			<Icon name="table" slot="icon" class="me-2" />
			Deleting all products...
		</ToastHeader>
		<ToastBody>Please wait.</ToastBody>
	</Toast>
	<Toast
		autohide
		class="bg-success text-light"
		isOpen={showCreateDemoProductsDoneToast}
		on:close={() => (showCreateDemoProductsDoneToast = false)}
	>
		<ToastHeader
			toggle={() =>
				(showCreateDemoProductsDoneToast =
					!showCreateDemoProductsDoneToast)}
		>
			<Icon name="table" slot="icon" class="me-2" />
			Done.
		</ToastHeader>
		<ToastBody>Demo products created.</ToastBody>
	</Toast>
	<Toast
		class="bg-primary text-light"
		isOpen={showCreateDemoProductsToast}
		on:close={() => (showCreateDemoProductsToast = false)}
	>
		<ToastHeader
			toggle={() =>
				(showCreateDemoProductsToast = !showCreateDemoProductsToast)}
		>
			<Icon name="table" slot="icon" class="me-2" />
			Creating demo products...
		</ToastHeader>
		<ToastBody>Please wait.</ToastBody>
	</Toast>
</div>
