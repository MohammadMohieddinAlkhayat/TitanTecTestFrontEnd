import { Col, Modal, notification, Row, Image, Carousel } from "antd";
import moment from "moment";
import { FunctionComponent } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { Employee_Id } from "../../model/employee";
import { getEmployeeById } from "../../react-query-services/employee";
import classes from "./index.module.css";
interface showEmployeeDetialesProps {
  employeeId: number;
  showModel: boolean;
  onCancle: () => void;
}

const ShowEmployeeDetiales: FunctionComponent<showEmployeeDetialesProps> = (
  props
) => {
  const handleOk = () => {
    props.onCancle();
  };
  const handleCancel = () => {
    props.onCancle();
  };

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
    }
  );

  return (
    <Row>
      <Modal
        title={"Employee Detiales"}
        visible={props.showModel}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"75%"}
        centered
      >
        {getEmployeeByIds && getEmployeeByIds.isLoading && (
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
        {getEmployeeByIds && !getEmployeeByIds.isLoading && (
          <Row className={classes.employeeDetiales}>
            <Col
              xs={24}
              sm={24}
              md={11}
              lg={11}
              className={classes.employeeInformations}
            >
              <div className={classes.employeeContent}>
                <p className={classes.employeedata}>
                  Name: <span>{getEmployeeByIds.data?.name}</span>
                </p>
              </div>
              <div className={classes.employeeContent}>
                <p className={classes.employeedata}>
                  Department: <span>{getEmployeeByIds.data?.department}</span>
                </p>
              </div>
              <div className={classes.employeeContent}>
                <p className={classes.employeedata}>
                  Dirth of Date:{" "}
                  <span>
                    {moment(getEmployeeByIds.data?.dateOfBirth).format(
                      "MMMM Do YYYY"
                    )}
                  </span>
                </p>
              </div>
              <div className={classes.employeeContent}>
                <p className={classes.employeedata}>
                  Address: <span>{getEmployeeByIds.data?.address}</span>
                </p>
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={11}
              lg={11}
              className={classes.employeeImages}
            >
              <Carousel autoplay style={{width:300,height:200}}>
              {getEmployeeByIds.data?.files.map((ele: any) => {
                return (
                  <>
                  <Image
                    src={ele}
                    style={{ objectFit: "cover" }}
                    preview={false}
                  ></Image>

                  
                </>
                );
              })}
              </Carousel>
            </Col>
          </Row>
        )}
      </Modal>
    </Row>
  );
};

export default ShowEmployeeDetiales;
