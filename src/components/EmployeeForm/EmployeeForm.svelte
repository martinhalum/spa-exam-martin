<script>
  import "./styles/index.css";
  import {v4 as uuidv4} from 'uuid';
  import { mutation } from "svelte-apollo";
  import { pop, replace } from "svelte-spa-router";
  import { ADD_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE } from "../../graphql/queries";

  import {DEFAULT_DATA} from './config';

  export let selectedEmployee = DEFAULT_DATA;
  export let type = "edit";
  export let addEmployee = () => {};
  export let updateEmployee = () => {};
  export let deleteEmployee = () => {};

  let employeeDetail = {...selectedEmployee.data.employee};
  let addresses  = [];
  let contacts = [];
  let primaryAddress = "";
  let primaryNumber = "";
  const isView = type === "view";
  const otherAddress = [];
  const otherNumber = [];

  if(type !== 'add'){
    addresses.push({value: employeeDetail.primary_address, isPrimary: true});
    contacts.push({value: employeeDetail.primary_number, isPrimary: true});
    if(employeeDetail.other_address !== undefined){
      employeeDetail.other_address.forEach(element => {
        addresses.push({
          value: element,
          isPrimary: false
        })
      });
    }

    if(employeeDetail.other_number !== undefined){
      employeeDetail.other_number.forEach(element=>{
        contacts.push({
          value: element,
          isPrimary: false
        })
      })
    }
}

  // Function to add an empty address input field
  const addAddress = () => {
    addresses = [...addresses, { value: '', isPrimary: false }];
  }

  const addContact = () => {
    contacts = [...contacts, { value: '', isPrimary: false }];
  }

  // Function to remove an address at a given index
  const removeAddress = (index) => {
    addresses.splice(index, 1);
    addresses = [...addresses]; // Trigger Svelte reactivity
  }

  const removeContact = (index) => {
    contacts.splice(index, 1);
    contacts = [...contacts];
  }

  // Function to update the address value in the addresses array
  function updateAddress(index, value) {
    addresses[index].value = value;
  }

  function updateContact(index, value){
    contacts[index].value = value;
  }

  // Function to set the primary address
  function setPrimaryAddress(index) {
    addresses.forEach((address, i) => {
      address.isPrimary = i === index;
    });
  }

  function setPrimaryContact(index) {
    contacts.forEach((contact, i) => {
      contact.isPrimary = i === index;
    });
  }

  const handleOnSave = () => {
    addresses.forEach(element=>{
      if(element.isPrimary){
        primaryAddress = element.value
      } else {
        otherAddress.push(element.value)
      }
    });

    contacts.forEach(element=>{
      if(element.isPrimary){
        primaryNumber = element.value
      } else {
        otherNumber.push(element.value)
      }
    })
    type === "edit" ? saveEdit() : saveAdd()
  }

  const saveAdd = async() =>{
    try {
      const { data } = await addEmployee({
        variables: {
          id: uuidv4(),
          first_name: employeeDetail.first_name,
          middle_name: employeeDetail.middle_name,
          last_name: employeeDetail.last_name,
          birthday: employeeDetail.birthday,
          gender: employeeDetail.gender,
          marital_status: employeeDetail.marital_status,
          position: employeeDetail.position,
          date_hired: employeeDetail.date_hired,
          primary_number: primaryNumber,
          other_number: otherNumber,
          primary_address: primaryAddress,
          other_address: otherAddress
          },
        });
  
        if (data && data.addEmployee) {
          // Handle successful edit
          console.log(`Added employee with ID ${data.addEmployee.id}`);
          // You may want to update the UI here with the edited employee data.
          replace("/");
        } else {
          // Handle edit failure
          console.error('Creation failed');
        }
      } catch (error) {
        // Handle any errors that occur during the mutation.
        console.error('Error creating employee', error);
      }
  }

  const saveEdit = async() => {
    try {
      const { data } = await updateEmployee({
        variables: {
          id: employeeDetail.id,
          first_name: employeeDetail.first_name,
          middle_name: employeeDetail.middle_name,
          last_name: employeeDetail.last_name,
          birthday: employeeDetail.birthday,
          gender: employeeDetail.gender,
          marital_status: employeeDetail.marital_status,
          position: employeeDetail.position,
          date_hired: employeeDetail.date_hired,
          primary_number: primaryNumber,
          other_number: otherNumber,
          primary_address: primaryAddress,
          other_address: otherAddress
        },
      });

      if (data && data.editEmployee) {
        // Handle successful edit
        console.log(`Edited employee with ID ${data.editEmployee.id}`);
        // You may want to update the UI here with the edited employee data.
        replace('/');
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
      await deleteEmployee({variables: {id}});
      replace('/');
    }catch(error){
      console.error("GraphQL Deletion: Error: ", error)
    }
  }
</script>


<div class="container">
  <div class="header">
    <button on:click={()=>pop()}>Back</button>
    {#if !isView}
    <button type="button" data-testid="save_button" id="save_button" on:click={handleOnSave}>Save</button>
    <button type="button" id="delete_button" on:click={()=>deleteSelected(employeeDetail.id)}>Delete</button>
    {/if}
  </div>
  <div class="content">
    <div id="profile_info" class="profile">
      <div class="label_input">
        <label for="first_name" class="label">First Name:</label>
        <input 
          type="text" 
          data-testid="first_name"
          id="first_name"
          class="input"
          disabled={isView}
          bind:value={employeeDetail.first_name}
        />
      </div>
      <div class="label_input">
        <label for="last_name">Last Name:</label>
        <input 
          type="text" 
          id="last_name" 
          class="input" 
          disabled={isView}
          bind:value={employeeDetail.last_name} 
        />
      </div>
      <div class="label_input">
        <label for="middle_name">Middle Name:</label>
        <input 
          type="text" 
          id="middle_name" 
          class="input" 
          disabled={isView}
          bind:value={employeeDetail.middle_name} 
        />
      </div>
      <div class="label_input">
        <label for="birthday">Birthday:</label>
        <input
          type="text"
          id="birthday"
          class="input"
          disabled={isView}
          bind:value={employeeDetail.birthday}
        />
      </div>
      <div class="label_input">
        <label for="gender">Gender:</label>
        <select id="gender" class="input" disabled={isView} bind:value={employeeDetail.gender}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="label_input">
        <label for="maritalStatus">Marital Status:</label>
        <select id="maritalStatus" class="input" disabled={isView} bind:value={employeeDetail.marital_status}>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </select>
      </div>
      <div class="label_input">
        <label for="position">Position:</label>
        <input 
          type="text" 
          id="position" 
          class="input"
          disabled={isView}
          bind:value={employeeDetail.position}
        />
      </div>
      <div class="label_input">
        <label for="dateHired">Date Hired:</label>
        <input
          type="text"
          id="dateHired"
          class="input"
          disabled={isView}
          bind:value={employeeDetail.date_hired}
        />
      </div>
    </div>
    <div id="details_info" class="details">
      <div id="contact_info" class="contact">
        <div>
          <span>Contact Information:</span>
          {#if !isView}
            <button on:click={addContact}>Add</button>
          {/if}
        </div>
        {#if contacts.length > 0}
        <table>
          <thead>
            <tr>
              <th>Contact Numer</th>
              <th>Primary?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {#each contacts as contact, index}
            <tr>
              <td>
                <input
                  type="text"
                  id="contact"
                  class="profile_input"
                  disabled={isView}
                  bind:value={contact.value}
                  on:input={() => updateContact(index, contact.value)}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="primaryContact"
                  checked={contact.isPrimary}
                  disabled={isView}
                  on:change={() => setPrimaryContact(index)}
                />
              </td>
              <td>
                <button type="button" disabled={isView} on:click={() => removeContact(index)}>
                  Remove
                </button>
              </td>
            </tr>
            {/each}
          </tbody>
        </table>
        {/if}
      </div>
      <div id="address_info" class="address">
        <div>
          <span>Addresses:</span>
          {#if !isView}
            <button on:click={addAddress}>Add</button>
          {/if}
        </div>
        {#if addresses.length > 0}
        <table class="data_table">
          <thead>
            <tr>
              <th>Address</th>
              <th>Primary?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {#each addresses as address, index}
            <tr>
              <td>
                <input
                  type="text"
                  id="address"
                  class="profile_input"
                  bind:value={address.value}
                  disabled={isView}
                  on:input={() => updateAddress(index, address.value)}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="primaryAddress"
                  checked={address.isPrimary}
                  disabled={isView}
                  on:change={() => setPrimaryAddress(index)}
                />
              </td>
              <td>
                <button type="button" disabled={isView} on:click={() => removeAddress(index)}>
                  Remove
                </button>
              </td>
            </tr>
            {/each}
          </tbody>
        </table>
        {/if}
      </div>
    </div>
  </div>
</div>