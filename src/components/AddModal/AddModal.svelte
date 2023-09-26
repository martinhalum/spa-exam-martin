<!-- EditEmployeeModal.svelte -->
<script>
    import { getContext } from 'svelte';
    import { ADD_EMPLOYEE } from '../../graphql/queries'; // Import the edit mutation
    import { mutation } from 'svelte-apollo';
    import {v4 as uuidv4} from 'uuid';

    const { close } = getContext('simple-modal');
  
    let name = "";
    let primaryAddress = "";
    let primaryContactInfo = "";
    let age = 0;
    let yearsInCompany = 0;
  
    const addEmployee = mutation(ADD_EMPLOYEE);
    
    const saveChanges = async() => {
        console.log(JSON.stringify(
        {
            id: uuidv4(),
            name: name,
            primaryAddress: primaryAddress,
            primaryContactInfo: primaryContactInfo,
            age: age,
            yearsInCompany: yearsInCompany,
          }
        ))
      try {
        const { data } = await addEmployee({
          variables: {
            id: uuidv4(),
            name: name,
            primaryAddress: primaryAddress,
            primaryContactInfo: primaryContactInfo,
            age: age,
            yearsInCompany: yearsInCompany,
          },
        });
  
        if (data && data.addEmployee) {
          // Handle successful edit
          console.log(`Added employee with ID ${data.addEmployee.id}`);
          // You may want to update the UI here with the edited employee data.
          close();
        } else {
          // Handle edit failure
          console.error('Creation failed');
        }
      } catch (error) {
        // Handle any errors that occur during the mutation.
        console.error('Error creating employee', error);
      }
    }

  </script>
  
  <!-- Modal content -->
  <div class="modal-content">
    <h2>Edit Employee</h2>
    <form>
      <label for="name">Name:</label>
      <input type="text" id="name" bind:value={name}/>

      <label for="primaryAddress">Primary Address:</label>
      <input type="text" id="primaryAddress" bind:value={primaryAddress}/>

      <label for="primaryContactInfo">Primary Contact Info:</label>
      <input type="text" id="primaryContactInfo" bind:value={primaryContactInfo}/>

      <label for="age">Age:</label>
      <input type="number" id="age" bind:value={age}/>

      <label for="yearsInCompany">Years in Company:</label>
      <input type="number" id="yearsInCompany" bind:value={yearsInCompany}/>

      <button type="button" on:click={saveChanges}>Save Changes</button>
    </form>
  </div>