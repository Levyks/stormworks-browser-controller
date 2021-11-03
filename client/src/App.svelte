<script lang="ts">
	import { Router, Route, navigate } from "svelte-routing";
	import Menu from "./components/Menu.svelte";
	import Controller from "./components/Controller.svelte";
</script>

<Router basepath="client">
	<Route path="/" component={Menu} />
	<Route path="menu" component={Menu} />
	<Route path="controller/:id" component={Controller} />
</Router>