export interface Employee {
  id: number;
  name: string;
  department: string;
  dateOfBirth: Date;
  address: string;
  files: string[];
}

export interface Employees {
  items: Employee[];
}

export interface Message {
  type: string;
  content: string;
}

export interface Result {
  result: Employees ;
  isOk: boolean;
  message: Message;
}
export interface Employe_Res {
  result: Employee_By_Id ;
  isOk: boolean;
  message: Message;
}
export interface Delete_Employe_Res {
  
  isOk: boolean;
  message: Message;
}

export interface Employee_By_Id {
  name: string;
  department: string;
  dateOfBirth: Date;
  address: string;
  employeeFiles: any;
  id?: number;
}

export interface Employe_By_Id_Res {
  result: Employee_Id;
  isOk: boolean;
  message: Message;
}


export interface Employee_Id{
  name: string;
  department: string;
  dateOfBirth: Date;
  address: string;
  files: any;
  id?: number;
}
