export const DEFAULT_DATA = {
  loading: true,
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
  error: false,
};

export const DEFAULT_TOTAL = {
  loading: false,
  data: {
    employeeTotal: {
      total: 1,
    },
  },
};
