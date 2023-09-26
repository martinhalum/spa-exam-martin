<!-- EditEmployeeModal.svelte -->
<script>
    import { getContext } from 'svelte';
    import { DELETE_EMPLOYEE, EDIT_EMPLOYEE } from '../../graphql/queries'; // Import the edit mutation
    import { mutation } from 'svelte-apollo';

    const { close } = getContext('simple-modal');
  
    export let employees; // To be used for refresh
    export let pages; // To be refetch;
    export let selectedEmployee; // The employee object to edit
    let editedEmployee = { ...selectedEmployee }; // Copy of the employee data for editing
  
    const editEmployee = mutation(EDIT_EMPLOYEE);
    const deleteEmployee = mutation(DELETE_EMPLOYEE);
    
    const saveChanges = async() => {
      try {
        const { data } = await editEmployee({
          variables: {
            id: editedEmployee.id,
            name: editedEmployee.name,
            primaryAddress: editedEmployee.primaryAddress,
            primaryContactInfo: editedEmployee.primaryContactInfo,
            age: editedEmployee.age,
            yearsInCompany: editedEmployee.yearsInCompany,
          },
        });
  
        if (data && data.editEmployee) {
          // Handle successful edit
          console.log(`Edited employee with ID ${data.editEmployee.id}`);
          // You may want to update the UI here with the edited employee data.
          close();
        } else {
          // Handle edit failure
          console.error('Edit failed');
        }
      } catch (error) {
        // Handle any errors that occur during the mutation.
        console.error('Error editing employee', error);
      }
    }

    const deleteSelected = async(id) =>{
      try{
        await deleteEmployee({variables: {id}})
        employees.refetch();
        pages.refetch();
        close();
      }catch(error){
        console.error("GraphQL Deletion: Error: ", error)
      }
    }

  </script>
  
  <!-- Modal content -->
  <div class="modal-content">
    <h2>Edit Employee</h2>
    <form>
      <label for="name">Name:</label>
      <input type="text" id="name" bind:value={editedEmployee.name} />

      <label for="primaryAddress">Primary Address:</label>
      <input type="text" id="primaryAddress" bind:value={editedEmployee.primaryAddress} />

      <label for="primaryContactInfo">Primary Contact Info:</label>
      <input type="text" id="primaryContactInfo" bind:value={editedEmployee.primaryContactInfo} />

      <label for="age">Age:</label>
      <input type="number" id="age" bind:value={editedEmployee.age} />

      <label for="yearsInCompany">Years in Company:</label>
      <input type="number" id="yearsInCompany" bind:value={editedEmployee.yearsInCompany} />

      <button type="button" on:click={saveChanges}>Save</button>
      <button type="button" on:click={()=>deleteSelected(editedEmployee.id)}>Delete</button>
    </form>
  </div>