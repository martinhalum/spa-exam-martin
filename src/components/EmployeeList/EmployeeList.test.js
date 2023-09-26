import { render } from "@testing-library/svelte";
import EmployeeList from "./EmployeeList.svelte";

// Mock Apollo Client and the query result
jest.mock("@apollo/client");
import { GET_EMPLOYEES } from "../graphql/queries";

const mockData = {
  employees: [
    {
      id: 1,
      name: "John Doe",
      primaryAddress: "123 Main St",
      primaryContactInfo: "johndoe@example.com",
      age: 30,
      yearsInCompany: 5,
    },
    // Add more mock data as needed
  ],
};

const mockQuery = jest.fn(() => ({
  data: mockData,
  loading: false,
  error: null,
}));

GET_EMPLOYEES = mockQuery; // Replace the imported query with the mock query

describe("EmployeeList", () => {
  it("renders loading state initially", () => {
    // Set the query result to loading state
    GET_EMPLOYEES = jest.fn(() => ({ loading: true }));

    const { getByText } = render(EmployeeList);

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error message if there is an error", () => {
    // Set the query result to an error state
    GET_EMPLOYEES = jest.fn(() => ({
      loading: false,
      error: { message: "Error message" },
    }));

    const { getByText } = render(EmployeeList);

    expect(getByText("Error: Error message")).toBeInTheDocument();
  });

  it("renders employee data when data is available", () => {
    const { getByText } = render(EmployeeList);

    // Check if employee data is rendered based on mockData
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("123 Main St")).toBeInTheDocument();
    expect(getByText("johndoe@example.com")).toBeInTheDocument();
    expect(getByText("30")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
  });
});
