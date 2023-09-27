<script>
    import "./styles/index.css";
    import {DEFAULT_EMPLOYEE} from './config/index.js';
    import { useGetEmployee } from '../../scripts/EmployeeHandler';
    import EmployeeForm from '../../components/EmployeeForm/EmployeeForm.svelte';

    export let params = {};

    const selectedId = params.id || undefined;

    let selectedEmployee = selectedId !== undefined ?  useGetEmployee(selectedId) : undefined;

    const getType = () =>{
        const url = window.location.href;
        console.log(url);

        if(url.includes("add")){
            return "add"
        } else if (url.includes("edit")){
            return "edit"
        } else if (url.includes("view")){
            return "view"
        }
    }

</script>
  
<body class="container">
    {#if selectedId !== undefined && $selectedEmployee.loading !== true}
    <EmployeeForm selectedEmployee={$selectedEmployee} type={getType()}/>
    {:else}
    <EmployeeForm selectedEmployee={DEFAULT_EMPLOYEE} type={getType()}/>
    {/if}
</body>