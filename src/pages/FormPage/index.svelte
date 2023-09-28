<script>
    import "./styles/index.css";
    import {DEFAULT_EMPLOYEE} from './config/index.js';
    import { useGetEmployee } from '../../scripts/EmployeeHandler.js';
    import EmployeeForm from '../../components/EmployeeForm/EmployeeForm.svelte';
  import { mutation } from "svelte-apollo";
  import { ADD_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE } from "../../graphql/queries";

    export let params = {};

    const selectedId = params.id || undefined;
    const addEmployee = mutation(ADD_EMPLOYEE);
    const updateEmployee = mutation(EDIT_EMPLOYEE);
    const deleteEmployee = mutation(DELETE_EMPLOYEE);

    let selectedEmployee = selectedId !== undefined ?  useGetEmployee(selectedId) : undefined;

    const getType = () =>{
        const url = window.location.href;

        if(url.includes("add")){
            return "add"
        } else if (url.includes("edit")){
            return "edit"
        } else if (url.includes("view")){
            return "view"
        }
    }

</script>

{#if $selectedEmployee.loading}
    <p>Loading...</p>
{:else if $selectedEmployee.error}
    <p>Error: {$selectedEmployee.error.message}</p>
{:else}
    <body class="container">
        <EmployeeForm 
            selectedEmployee={getType() !== "add" ? $selectedEmployee : DEFAULT_EMPLOYEE} 
            addEmployee={addEmployee} 
            updateEmployee={updateEmployee} 
            deleteEmployee={deleteEmployee}
            type={getType()}
        />
    </body>
{/if}