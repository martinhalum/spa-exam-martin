<script>
	import Modal from 'svelte-simple-modal';
  	import EmployeeList from "./components/EmployeeList/EmployeeList.svelte";
	import './styles/index.css';
	import { setClient } from "svelte-apollo";

	export let client;

	setClient(client);
</script>

<main>
	<h2>Employee Management System</h2>
	<Modal><EmployeeList /></Modal>
</main>