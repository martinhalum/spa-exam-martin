// src/graphql/queries.js
import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query GetEmployeesPaginated($limit: Int!, $offset: Int!) {
    employees(limit: $limit, offset: $offset) {
      id
      first_name
      last_name
      middle_name
      birthday
      gender
      marital_status
      position
      date_hired
      primary_number
      other_number
      primary_address
      other_address
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployeeDetail($id: ID!) {
    employee(id: $id) {
      id
      first_name
      last_name
      middle_name
      birthday
      gender
      marital_status
      position
      date_hired
      primary_number
      other_number
      primary_address
      other_address
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
    $id: ID!
    $first_name: String!
    $last_name: String!
    $middle_name: String
    $birthday: String!
    $gender: String!
    $marital_status: String!
    $position: String!
    $date_hired: String!
    $primary_number: String!
    $other_number: [String]
    $primary_address: String!
    $other_address: [String]
  ) {
    addEmployee(
      id: $id
      first_name: $first_name
      last_name: $last_name
      middle_name: $middle_name
      birthday: $birthday
      gender: $gender
      marital_status: $marital_status
      position: $position
      date_hired: $date_hired
      primary_number: $primary_number
      other_number: $other_number
      primary_address: $primary_address
      other_address: $other_address
    ) {
      id
      first_name
      last_name
      middle_name
      birthday
      gender
      marital_status
      position
      date_hired
      primary_number
      other_number
      primary_address
      other_address
    }
  }
`;

export const EDIT_EMPLOYEE = gql`
  mutation EditEmployee(
    $id: ID!
    $first_name: String!
    $last_name: String!
    $middle_name: String
    $birthday: String!
    $gender: String!
    $marital_status: String!
    $position: String!
    $date_hired: String!
    $primary_number: String!
    $other_number: [String]
    $primary_address: String!
    $other_address: [String]
  ) {
    editEmployee(
      id: $id
      first_name: $first_name
      last_name: $last_name
      middle_name: $middle_name
      birthday: $birthday
      gender: $gender
      marital_status: $marital_status
      position: $position
      date_hired: $date_hired
      primary_number: $primary_number
      other_number: $other_number
      primary_address: $primary_address
      other_address: $other_address
    ) {
      id
      first_name
      last_name
      middle_name
      birthday
      gender
      marital_status
      position
      date_hired
      primary_number
      other_number
      primary_address
      other_address
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
      first_name
      last_name
      middle_name
      birthday
      gender
      marital_status
      position
      date_hired
      contact_info {
        primary
        others
      }
      address {
        primary
        others
      }
    }
  }
`;
