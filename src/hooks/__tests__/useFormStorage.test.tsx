import { renderHook } from "@testing-library/react";
import useFormStorage from "../useFormStorage";
import { act } from "react";

describe("useFormStorage Hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initializes with default values", () => {
    const { result } = renderHook(() => useFormStorage());

    expect(result.current.formData).toEqual({
      name: "",
      maxCalls: 1,
    });
    expect(result.current.token).toBe("");
  });

  it("updates form data on input change", () => {
    const { result } = renderHook(() => useFormStorage());

    act(() => {
      result.current.handleInputChange({
        target: { name: "name", value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.formData.name).toBe("John Doe");
  });

  it("saves data to localStorage", () => {
    const { result } = renderHook(() => useFormStorage());

    act(() => {
      result.current.handleInputChange({
        target: { name: "name", value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSave();
    });

    expect(localStorage.getItem("formData")).toBe(
      JSON.stringify({ name: "John Doe", maxCalls: 1 })
    );
    expect(localStorage.getItem("token")).toBe(result.current.token);
  });

  it("deletes data from localStorage", () => {
    const { result } = renderHook(() => useFormStorage());

    act(() => {
      result.current.handleSave();
    });

    act(() => {
      result.current.handleDelete();
    });

    expect(localStorage.getItem("formData")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
  });
});
