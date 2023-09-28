<!-- src/pages/Home.svelte -->
<script>
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";
  import EmployeeList from "../../components/EmployeeList/EmployeeList.svelte";

  import { useGetEmployees, useGetTotal, useDeleteEmployee } from '../../scripts/EmployeeHandler.js';
  
  let limit = 5;
  let offset = 0;
  
  const data = useGetEmployees(limit, offset);
  const deleteEmployee = useDeleteEmployee();
  const total = useGetTotal();

  const refreshData = (limit, offset) =>{
    data.refetch({limit, offset});
    total.refetch();
  }

  onMount(() => {
    refreshData(limit, offset);
  })

</script>

<main>
    <head>
        <span>Employees Management System</span>
    </head>
    <body>
        <button on:click={()=>push(`/add/`)}>Add Employee</button>
        {#if $data.loading}
            <p>Loading...</p>
        {:else if $data.error}
            <p>Error: {$data.error.message}</p>
        {:else}
            <EmployeeList 
                limit={limit}
                offset={offset}
                employees={$data} 
                refreshData={refreshData} 
                total={$total}
                deleteEmployee={deleteEmployee}
            />
        {/if}
    </body>
</main>