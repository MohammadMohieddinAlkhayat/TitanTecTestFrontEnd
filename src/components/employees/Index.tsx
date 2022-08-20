import {
  Col,
  Pagination,
  Row,
  Input,
  Table,
  Tag,
  Button,
  notification,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import classes from "./index.module.css";
import { employees, deleteEmployee } from "../../react-query-services/employee";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import moment from "moment";
import AddAndUpdateComponents from "../addAndUpdateEmployee";
import ShowEmployeeDetiales from "../showEmployeeDetials";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteFilled,
  EditFilled,
  EyeOutlined,
} from "@ant-design/icons";
import { render } from "@testing-library/react";
const Employees = () => {
  /*
  *
  * 
     @ group of important state that allow us to controll this components and actions 
     @ we can use  useReducer also if we need  it to optomization rendring 
  *
  *
 */

  const [keyWord, setWordKey] = useState<string>("");
  const [pages, setPages] = useState<number>(0);
  const [showEmployyeDetiales, setShowEmployeeDetiales] =
    useState<boolean>(false);
  const [showEmployyeForm, setshowEmployyeForm] = useState<boolean>(false);

  const [EmployeeId, setEmployeeId] = useState<number>(0);
  const { Search } = Input;

  /*
   *
   *
     @ React Query  for call Api Managment and Cached important data 
     @ it is denedent on Pragmatics Senklton
   *
   *  
  */

  const query = useQueryClient();

  const employeesData = useQuery(["getAllEmployees", pages, keyWord], () =>
    employees(pages, keyWord)
  );
  const deleteEmployees = useMutation("DeleteEmployee", deleteEmployee, {
    onSuccess: (res) => {
      notification.open({
        message: res + "",
      });
      query.invalidateQueries("getAllEmployees");
    },
    onError: (res) => {
      notification.open({
        message: res + "",
      });
    },
  });

  /* 
   *
   * 
     @ Handler Method Action Must to Move Up into Seperate File
   * 
   *  
   */

  const onSearchHandler = (e: any) => {
    console.log(e.target.value, "emjhnsf");
    setWordKey(e.target.value);
  };

  const showDetialseHandler = (id: number) => {
    setShowEmployeeDetiales(true);
    setEmployeeId(id);
  };

  const showEmployeeFormHandler = (id: number) => {
    setEmployeeId(id);
    setshowEmployyeForm(true);
  };

  const deleteEmployeeHandler = (id: number) => {
    deleteEmployees.mutate(id);
  };

  const closeEmployeeForm = () => {
    setshowEmployyeForm(false);
  };
  const closeEmployeeDetiales = () => {
    setShowEmployeeDetiales(false);
  };

  const onChangeHandler = (e: any, page: number) => {
    let Page = (e - 1) * 10;
    setPages(Page);
  };

  const addNewEmployeeHandler = (e: any) => {
    setEmployeeId(0);
    setshowEmployyeForm(true);
  };

  /* 
   *
   *
      @ columns table we use for ui antd libraray 
   * 
   * 
  */

  const columns: ColumnsType<any> = [
    {
      title: <p className={classes.tablePhargraph}>name</p>,
      width: "15%",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <p className={classes.employeeName}>{name}</p>,
    },
    {
      title: <p className={classes.tablePhargraph}>department</p>,
      width: "20%",
      dataIndex: "department",
      key: "department",
      render: (department: string) => {
        return <p className={classes.employeeContent}>{department}</p>;
      },
    },
    {
      width: "25%",
      title: <p className={classes.tablePhargraph}>date birth</p>,

      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (date: string) => {
        let newDate = moment(date).format("MMMM Do YYYY");
        return <p className={classes.employeeContent}>{newDate}</p>;
      },
    },
    {
      title: <p className={classes.tablePhargraph}>Address</p>,
      key: "address",
      dataIndex: "address",

      render: (address) => (
        <Tag className={classes.employeeAddress} color={"geekblue"}>
          {address.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: <p className={classes.tablePhargraph}>actions</p>,
      key: "action",
      dataIndex: "id",
      render: (id: any) => {
        return (
          <Row className={classes.employeeActions}>
            <EyeOutlined
              className={classes.eyeAction}
              onClick={() => showDetialseHandler(id)}
            ></EyeOutlined>
            <EditFilled
              className={classes.editAction}
              onClick={() => showEmployeeFormHandler(id)}
            ></EditFilled>
            <DeleteFilled
              className={classes.deleteAction}
              onClick={() => deleteEmployeeHandler(id)}
            ></DeleteFilled>
          </Row>
        );
      },
    },
  ];

  return (
    <Row className={classes.employee}>
      <div className={`$ EmployeeTable`}>
        <Row className={classes.employeeHeader}>
          <Col span={6}>
            <Button
              className={classes.addEmployeeButton}
              onClick={addNewEmployeeHandler}
            >
              <PlusOutlined className={classes.plusIcon} /> Add New Employee
            </Button>
          </Col>
          <Col span={7} className={classes.employeeSearch}>
            <Search
              placeholder="search  employee"
              allowClear
              size="large"
              suffix={
                <SearchOutlined style={{ color: "rgb(205 201 201 / 77%)" }} />
              }
              className={classes.searchInput}
              onChange={onSearchHandler}
            />
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={employeesData.data}
          style={{ minWidth: "800px", overflow: "auto" }}
          loading={employeesData.isLoading}
        />
        <div className={classes.Pagination}>
          <Pagination
            defaultCurrent={1}
            total={2}
            pageSize={10}
            onChange={(e) => onChangeHandler(e, 10)}
            hideOnSinglePage={false}
          />
        </div>
      </div>
      <Row style={{ width: "100%" }}>
        {showEmployyeForm && (
          <AddAndUpdateComponents
            employeeId={EmployeeId}
            showModel={showEmployyeForm}
            onCancle={closeEmployeeForm}
          />
        )}

        {showEmployyeDetiales && (
          <ShowEmployeeDetiales
            employeeId={EmployeeId}
            showModel={showEmployyeDetiales}
            onCancle={closeEmployeeDetiales}
          />
        )}
      </Row>
    </Row>
  );
};

export default Employees;
