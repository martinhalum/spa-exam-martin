// src/graphql/queries.js
import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query GetEmployeesPaginated($limit: Int!, $offset: Int!) {
    employees(limit: $limit, offset: $offset) {
      id
      name
      primaryAddress
      primaryContactInfo
      age
      yearsInCompany
    }
  }
`;

export const GET_EMPLOYEES_TOTAL = gql`
  query {
    employeeTotal {
      total
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $name: String!
    $primaryAddress: String!
    $primaryContactInfo: String!
    $age: Int!
    $yearsInCompany: Int!
  ) {
    addEmployee(
      name: $name
      primaryAddress: $primaryAddress
      primaryContactInfo: $primaryContactInfo
      age: $age
      yearsInCompany: $yearsInCompany
    ) {
      id
      name
      primaryAddress
      primaryContactInfo
      age
      yearsInCompany
    }
  }
`;

export const EDIT_EMPLOYEE = gql`
  mutation EditEmployee(
    $id: ID!
    $name: String!
    $primaryAddress: String!
    $primaryContactInfo: String!
    $age: Int!
    $yearsInCompany: Int!
  ) {
    editEmployee(
      id: $id
      name: $name
      primaryAddress: $primaryAddress
      primaryContactInfo: $primaryContactInfo
      age: $age
      yearsInCompany: $yearsInCompany
    ) {
      id
      name
      primaryAddress
      primaryContactInfo
      age
      yearsInCompany
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
      name
      primaryAddress
      primaryContactInfo
      age
      yearsInCompany
    }
  }
`;
