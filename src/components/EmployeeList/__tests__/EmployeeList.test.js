import { render } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";

import EmployeeList from "../EmployeeList.svelte";

const mockData = {
  loading: false,
  data: {
    employees: [
      {
        id: "123",
        first_name: "Martin Jaycy",
        last_name: "Halum",
        middle_name: "De Guzman",
        birthday: "12/19/1989",
        gender: "Male",
        marital_status: "Married",
        position: "Developer",
        date_hired: "09/18/2023",
        primary_number: "09267515599",
        other_number: ["09696230001", "09761674246"],
        primary_address:
          "Blk4 Lot7 Bronze Meadow St, Westernvill Sapphire Brgy Tagpos, Binangonan Rizal",
        other_address: [
          "#14 Purok 2 Marasat Pequeno San Mateo Isabela",
          "29-41 BNR Compound Gov Pascual Ave Malabon City",
        ],
      },
      // Add more mock data as needed
    ],
  },
};

describe("EmployeeList", () => {
  it("renders loading state initially", () => {
    // Set the query result to loading state
    const loadingData = { loading: true };

    const { getByText } = render(EmployeeList, { employees: loadingData });

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error message if there is an error", () => {
    // Set the query result to an error state
    const errorData = {
      loading: false,
      error: { message: "Error message" },
    };

    const { getByText } = render(EmployeeList, { employees: errorData });

    expect(getByText("Error: Error message")).toBeInTheDocument();
  });

  it("renders employee data when data is available", () => {
    const { getByText } = render(EmployeeList, {
      props: { employees: mockData },
    });

    // Check if employee data is rendered based on mockData
    expect(getByText("Martin Jaycy Halum")).toBeInTheDocument();
    expect(
      getByText(
        "Blk4 Lot7 Bronze Meadow St, Westernvill Sapphire Brgy Tagpos, Binangonan Rizal"
      )
    ).toBeInTheDocument();
    expect(getByText("09267515599")).toBeInTheDocument();
    expect(getByText("33")).toBeInTheDocument();
    expect(getByText("0")).toBeInTheDocument();
  });
});
