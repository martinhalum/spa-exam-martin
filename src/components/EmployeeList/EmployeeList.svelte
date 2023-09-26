<!-- src/EmployeeList.svelte -->
<script>
  import "./styles/index.css";
  import { getContext } from 'svelte';
  import { query, mutation } from 'svelte-apollo';

  import AddModal from "../AddModal/AddModal.svelte";
  import EditModal from "../EditModal/EditModal.svelte";
  import { DELETE_EMPLOYEE, GET_EMPLOYEES, GET_EMPLOYEES_TOTAL } from '../../graphql/queries';
  
  const { open } = getContext('simple-modal');
  
  let limit = 5;
  let offset = 0;

  const employees = query(GET_EMPLOYEES, {
    variables: {limit, offset},
  });
  const total = query(GET_EMPLOYEES_TOTAL);
  
  const deleteEmployee = mutation(DELETE_EMPLOYEE);


  const handleAdd = () => {
    open(AddModal);
  }

  const handleEdit = (employee) => {
    open(EditModal, {
      selectedEmployee: employee, 
      employees: employees,
      pages: total,
    });
  }

  const handleDelete = async (id) => {
    try{
      await deleteEmployee({variables: {id}})
      employees.refetch();
      total.refetch();
    }catch(error){
      console.error("GraphQL Deletion: Error: ", error)
    }
  }

  const jumpToFirst = () =>{
    offset = 0;
    employees.refetch({limit, offset});
  }

  const nextPage = () => {
    offset = Math.max(offset + limit);
    employees.refetch({limit, offset});
  }

  const prevPage = () => {
    offset = Math.max(offset - limit, 0);
    console.log(offset)
    employees.refetch({limit, offset})
  }

  const jumpToLast = (lastItem) => {
    offset = Math.floor(lastItem/limit) * limit;
    employees.refetch({limit, offset});
  }
</script>

<main>
  <body class="container">
    <button on:click={handleAdd}>Add Employee</button>
    {#if $employees.loading}
      <p>Loading...</p>
    {:else if $employees.error}
      <p>Error: {$employees.error.message}</p>
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
          {#each $employees.data.employees as employee (employee.id)}
            <tr>
              <td>{employee.name}</td>
              <td>{employee.primaryAddress}</td>
              <td>{employee.primaryContactInfo}</td>
              <td>{employee.age}</td>
              <td>{employee.yearsInCompany}</td>
              <td>
                <button on:click={()=>handleEdit(employee)}>Edit</button>
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
</main>
