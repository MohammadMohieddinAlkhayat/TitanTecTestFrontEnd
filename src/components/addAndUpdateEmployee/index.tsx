import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
  DatePicker,
  notification,
} from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import classes from "./index.module.css";
import { Employee_By_Id, Employee_Id } from "../../model/employee";

import {
  useMutation,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from "react-query";
import { upload } from "../../services/uploadImages";
import {
  addEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../react-query-services/employee";
import moment from "moment";
interface AddAndUpdateImployeeProps {
  employeeId: number;
  showModel: boolean;
  onCancle: () => void;
}

const AddAndUpdateImployee: FunctionComponent<AddAndUpdateImployeeProps> = (
  props
) => {
  /*
  *
  * 
     @ add  or update Employee
  *
  * 
  */
  const getEmployeeByIds: UseQueryResult<Employee_Id, unknown> = useQuery<
    Employee_Id,
    unknown
  >(
    ["getEmployeeByID", props.employeeId],
    () => getEmployeeById(props.employeeId),
    {
      onSuccess: (res) => {},
      onError: (res) => {
        notification.open({ message: res + "" });
      },
      enabled: false,
    }
  );

  const addNewEmployee = useMutation("addNewEmployee", addEmployee, {
    onSuccess: (res) => {
      notification.open({ message: res + "" });
      props.onCancle();
      setLoading(false);
      query.invalidateQueries("getAllEmployees");
      form.resetFields();
    },
    onError: (res) => {
      notification.open({
        message: res + "",
      });

      form.resetFields();
    },
  });
  const updateEmployees = useMutation("updateEmployee", updateEmployee, {
    onSuccess: (res) => {
      notification.open({ message: res + "" });
      props.onCancle();
      setLoading(false);
      query.invalidateQueries("getAllEmployees");
      form.resetFields();
    },
    onError: (res) => {
      notification.open({
        message: res + "",
      });
      setLoading(false);
    },
  });

  /*
  *
  * 
     @ group of important state that allow as to controll this components and actions 
     @ we can use  useReducer also if we need  it to optomization rendring 
  *
  *
 */

  const { Option } = Select;
  const [form] = Form.useForm();
  const query = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const handleOk = () => {
    form.resetFields();
    props.onCancle();
  };
  const handleCancel = () => {
    form.resetFields();
    props.onCancle();
  };

  useEffect(() => {
    form.resetFields();
    if (props.employeeId !== 0) getEmployeeByIds.refetch();
  }, [props.employeeId]);

  /*
   * 
   *
      @Form handling
   *  
   * 
   */

  const onFinishHandler = async (e: Employee_By_Id) => {
    console.log(e.employeeFiles, "ImageFiles");
    let ImageIds: any = [];

    const images = e.employeeFiles?.fileList?.map(async (ele: any) => {
      setLoading(true);
      if (ele?.url) {
        ImageIds.push(ele?.url);
      } else {
        let formData = new FormData();
        formData.append("image", ele.originFileObj);
        const result = await upload.UploadEmployeeImage(formData);
        ImageIds.push(result?.fileName);
      }
    });

    const waite = await Promise.all(images);

    if (props.employeeId === 0) {
      e.employeeFiles = ImageIds;
      addNewEmployee.mutate(e);
    } else if (props.employeeId !== 0) {
      e.employeeFiles = ImageIds;
      e.id = props.employeeId;
      updateEmployees.mutate(e);
    }
  };

  /**
   * 
   * 
      @ ui Modal as a component based on Antd Library
   * 
   */

  return (
    <Row>
      <Modal
        title={props.employeeId == 0 ? "Add New Employee" : "Edit  Employee"}
        visible={props.showModel}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"75%"}
        centered
      >
        {getEmployeeByIds &&
          getEmployeeByIds.isLoading &&
          props.employeeId !== 0 && (
            <Row
              style={{
                width: "100%",
                height: "434px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i
                className="fas fa-circle-notch fa-spin"
                style={{ fontSize: 25, color: "#9fa1a1" }}
              ></i>
            </Row>
          )}
        {((getEmployeeByIds && !getEmployeeByIds.isLoading) ||
          props.employeeId === 0) && (
          <Row
            style={{
              backgroundColor: "white",
              width: "100%",
            }}
            className={classes.globalFormStyle}
          >
            <Form
              style={{ width: "100%" }}
              onFinish={onFinishHandler}
              form={form}
            >
              <Row
                justify="space-between"
                style={{ width: "100%", paddingLeft: 20, paddingRight: 20 }}
              >
                <Col xs={24} sm={24} md={11} lg={11}>
                  <Form.Item
                    label={"name"}
                    name="name"
                    style={{ width: "100%" }}
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "the name is Required ",
                      },
                    ]}
                    initialValue={
                      props.employeeId !== 0 ? getEmployeeByIds?.data?.name : ""
                    }
                  >
                    <Input placeholder="name"></Input>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={11} lg={11}>
                  <Form.Item
                    label={"department"}
                    name="department"
                    labelCol={{ span: 24 }}
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "the department is Required ",
                      },
                    ]}
                    initialValue={
                      props.employeeId !== 0
                        ? getEmployeeByIds?.data?.department
                        : ""
                    }
                  >
                    <Input placeholder="department"></Input>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={11} lg={11}>
                  <Form.Item
                    label={"address"}
                    name="address"
                    labelCol={{ span: 24 }}
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "the address is Required ",
                      },
                    ]}
                    initialValue={
                      props.employeeId !== 0
                        ? getEmployeeByIds?.data?.address
                        : ""
                    }
                  >
                    <Input placeholder="address"></Input>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={11} lg={11}>
                  <Form.Item
                    label={"date birth"}
                    name="dateOfBirth"
                    labelCol={{ span: 24 }}
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "the dateOfBirth is Required ",
                      },
                    ]}
                    initialValue={
                      props.employeeId !== 0 &&
                      moment(getEmployeeByIds?.data?.dateOfBirth)
                    }
                  >
                    <DatePicker placeholder="date Birth"></DatePicker>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label={"employee files"}
                    name="employeeFiles"
                    labelCol={{ span: 24 }}
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "the employeeFiles  is Required ",
                      },
                    ]}
                    initialValue={
                      props.employeeId !== 0 &&
                      getEmployeeByIds?.data?.files?.map((ele: any) => {
                        return {
                          uid: Math.random(),
                          name: "images",
                          status: "done",
                          url: ele,
                          thumbUrl: ele,
                        };
                      })
                    }
                  >
                    <Upload
                      listType="picture"
                      className="upload-list-inline"
                      accept="image/png, image/jpeg , image/jpeg"
                      multiple={true}
                      maxCount={10}
                      defaultFileList={
                        props.employeeId !== 0
                          ? getEmployeeByIds?.data?.files?.map((ele: any) => {
                              return {
                                uid: Math.random(),
                                name: "images",
                                status: "done",
                                url: ele,
                                thumbUrl: ele,
                              };
                            })
                          : []
                      }
                    >
                      <Button
                        className="button-upload-image-partner"
                        icon={<PlusOutlined style={{ fontSize: 20 }} />}
                      ></Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  className={classes.subimtEmployeeButton}
                >
                  <Form.Item
                    style={{
                      width: "100",
                      justifyContent: "end",
                      marginBottom: 0,
                    }}
                  >
                    <Button
                      className={classes.submitButton}
                      htmlType={"submit"}
                      loading={loading}
                    >
                      {props.employeeId == 0
                        ? "Add New Employee"
                        : "Update Employee"}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Row>
        )}
      </Modal>
    </Row>
  );
};

export default AddAndUpdateImployee;
