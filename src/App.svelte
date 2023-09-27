<script>
	import './styles/index.css';
	import Router from 'svelte-spa-router';
	import { setClient } from "svelte-apollo";
	import {routes} from './routes';

	export let client;

	setClient(client);
</script>

<body>
	<Router {routes}/>
</body>