import { employee } from "../services/employee";
import { Employee, Employee_By_Id } from "../model/employee";
export const employees = async (
  SkipCount: number,
  keyword: string
): Promise<Employee[] | undefined> => {
  const result = await employee.getEmployeeWithPatination(SkipCount, keyword);
  return result;
};

export const addEmployee = async (
  employeeReq: Employee_By_Id
): Promise<string | undefined> => {
  const result = await employee.addEmployee(employeeReq);
  return result;
};
export const updateEmployee = async (
  employeeReq: Employee_By_Id
): Promise<string | undefined> => {
  const result = await employee.updateEmployee(employeeReq);
  return result;
};

export const getEmployeeById = async (id: number): Promise<any> => {
  const result = await employee.getEmployee(id);
  return result;
};

export const deleteEmployee = async (
  id: number
): Promise<string | undefined> => {
  const result = await employee.deleteEmployee(id);
  return result;
};
