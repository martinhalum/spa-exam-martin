import { query, mutation } from "svelte-apollo";
import {
  GET_EMPLOYEES,
  GET_EMPLOYEE,
  GET_EMPLOYEES_TOTAL,
  DELETE_EMPLOYEE,
} from "../graphql/queries";

export const useGetEmployees = (limit, offset) => {
  const employees = query(GET_EMPLOYEES, {
    variables: { limit, offset },
  });

  return employees;
};

export const useGetEmployee = (id) => {
  const employee = query(GET_EMPLOYEE, {
    variables: { id },
  });

  return employee;
};

export const useDeleteEmployee = (id) => {
  const deleteEmployee = mutation(DELETE_EMPLOYEE);

  return deleteEmployee;
};

export const useGetTotal = () => {
  const total = query(GET_EMPLOYEES_TOTAL);

  return total;
};
