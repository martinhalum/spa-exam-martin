import { render } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";

import EmployeeDetail from "../EmployeeForm.svelte";

describe("EmployeeDetail component", () => {
  it("should disable Input in view mode", async () => {
    const { getByTestId } = render(EmployeeDetail, { type: "view" });
    const firstNameInput = getByTestId("first_name");

    expect(firstNameInput).toBeDisabled();
  });

  it("should enable Input in add mode", async () => {
    const { getByTestId } = render(EmployeeDetail, { type: "add" });
    const firstNameInput = getByTestId("first_name");

    expect(firstNameInput).not.toBeDisabled();
  });

  it("should enable Input in edit mode", async () => {
    const { getByTestId } = render(EmployeeDetail, { type: "edit" });
    const firstNameInput = getByTestId("first_name");

    expect(firstNameInput).not.toBeDisabled();
  });
});
