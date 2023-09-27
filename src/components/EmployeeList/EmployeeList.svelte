<!-- src/EmployeeList.svelte -->
<script>
  import "./styles/index.css";
  import { push } from "svelte-spa-router";
  import { mutation } from 'svelte-apollo';

  import {computeDate} from "../../scripts/AppHandler";
  import { DELETE_EMPLOYEE } from '../../graphql/queries';
  
  export let employees = {};
  export let total = 1;
  export let limit = 0;
  export let offset = 0;
  export let refreshData = () => {};

  const deleteEmployee = mutation(DELETE_EMPLOYEE);
  
  const handleDelete = async (id) => {
    try {
      await deleteEmployee({ variables: { id } });
      refreshData(limit, offset);
    } catch (error) {
        console.error("GraphQL Deletion Error:", error);
    }
  }

  const jumpToFirst = () =>{
    offset = 0;
    refreshData(limit, offset);
  }

  const nextPage = () => {
    offset = Math.max(offset + limit);
    refreshData(limit, offset);
  }

  const prevPage = () => {
    offset = Math.max(offset - limit, 0);
    refreshData(limit, offset);
  }

  const jumpToLast = (lastItem) => {
    offset = Math.floor(lastItem/limit) * limit;
    refreshData(limit, offset);
  }
</script>

<body class="list-container">
  {#if employees.loading}
    <p>Loading...</p>
  {:else if employees.error}
    <p>Error: {employees.error.message}</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Primary Address</th>
          <th>Primary Contact Info</th>
          <th>Age</th>
          <th>Years in Company</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each employees.data.employees as employee (employee.id)}
          <tr>
            <td>{employee.first_name} {employee.last_name}</td>
            <td>{employee.primary_address}</td>
            <td>{employee.primary_number}</td>
            <td>{computeDate(employee.birthday)}</td>
            <td>{computeDate(employee.date_hired)}</td>
            <td>
              <button on:click={()=>push(`/view/${employee.id}`)}>View</button>
              <button on:click={()=>push(`/edit/${employee.id}`)}>Edit</button>
              <button on:click={()=>handleDelete(employee.id)}>Delete</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    {#if $total.loading !== true}
    <div class="table-footer">
      <p>
        Page:
        {Math.ceil((offset+1)/limit)} of {Math.ceil($total.data.employeeTotal.total/limit)}
      </p>
      {#if $total.data.employeeTotal.total > 5}
      <div class="button-group">
        <button on:click={jumpToFirst} disabled={offset === 0}>First</button>
        <button on:click={prevPage}  disabled={offset === 0}>Back</button>
        <button on:click={nextPage} disabled={Math.ceil((offset+1)/limit) === Math.ceil($total.data.employeeTotal.total/limit)}>Next</button>
        <button on:click={()=> jumpToLast($total.data.employeeTotal.total)} disabled={Math.ceil((offset+1)/limit) === Math.ceil($total.data.employeeTotal.total/limit)}>Last</button>
      </div>
      {/if}
    </div>
    {/if}
  {/if}
</body>
