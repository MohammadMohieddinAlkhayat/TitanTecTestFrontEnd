import { AxiosRequestConfig } from "axios";
import ApiService from "../utils/api-services";
import { Result, Employee  , Employe_Res , Delete_Employe_Res , Employe_By_Id_Res ,Employee_Id  } from "../model/employee";
import { Employee_By_Id } from "../model/employee";
class EmployeeService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.REACT_APP_BASE_URL}/api/`, ...config });
  }

  public getEmployeeWithPatination = async (
    SkipCount: number,
    keyword: string
  ): Promise<Employee[] | undefined> => {
    const result: Result = await this.get(
      `/Employee/GetEmployees?pageLength=${10}&page=${SkipCount}&searchQuery=${keyword}`
    );
    if (!result.isOk) {
      throw new Error(result.message.content + "");
    }
    if (result.isOk) {
      return result.result.items;
    }
  };


  public getEmployee = async (id: number): Promise<Employee_Id > => {
    const result: Employe_By_Id_Res = await this.get(`/Employee/GetEmployee/${id}`);
    if (!result.isOk) {
      throw new Error(result.message.content + "");
    }
    if (result.isOk) {
      return result.result;
    }

    return result.result;
  };



  public addEmployee = async (employee: Employee_By_Id): Promise<string|undefined> => {
    const result: Result = await this.post(`/Employee/PostEmployee`, employee);
    if (!result.isOk) {
      throw new Error(result.message.content + "");
    }
    if (result.isOk) {
      return result.message.content + "";
    }
  };
  public updateEmployee = async (employee: Employee_By_Id): Promise<string|undefined> => {
    const result: Result = await this.put(`/Employee/PutEmployee`, employee);
    if (!result.isOk) {
      throw new Error(result.message.content + "");
    }

    if (result.isOk) {
      return result.message.content + "";
    }
  };




  public deleteEmployee = async (id:number): Promise<string|undefined> => {
    const result: Delete_Employe_Res = await this.delete(`/Employee/DeleteEmployee/${id}`);
    if (!result.isOk) {
      throw new Error(result.message.content + "");
    }
    if (result.isOk) {
      return result.message.content + "";
    }
  };


}




export const employee = new EmployeeService();
