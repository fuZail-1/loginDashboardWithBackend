import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ReactSelect from "react-select";
import { BASE_URL } from "../Config/url";

const EditPage = () => {
  const [recData, setRecData] = useState({});
  const { id } = useParams();
  console.log(id, "l");

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem
        ? `Bearer ${localStorage.getItem("token")}`
        : null,
    },
  });

  const getDataFromForm = async () => {
    try {
      const receiveData = await axiosInstance.get("/getAllFormData");
      console.log(receiveData.data, "rc");
      // Find the specific form data based on the id
      const formData = receiveData.data.formDataList.find(
        (item) => String(item.id) === String(id)
      );
      setRecData(formData || {});
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getDataFromForm();
  }, [id]);
  useEffect(() => {
    console.log(recData, "rc");
  });
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col className="d-flex justify-content-end">
            <Button
              variant="outline-success"
              size="sm"
              style={{ maxWidth: "5%" }}
              className="custom-button"
              // onClick={handleBack}
            >
              Back
            </Button>
          </Col>
        </Row>
        <Form className="mt-5">
          <Row>
            <Form.Group as={Col} md="3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Name"
                //   onChange={(e) => handleInputChange(e)}
                name="fullName"
                value={recData?.fullName}
              />
              {/* <span className="error">{error.fullName}</span> */}
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Employee</Form.Label>
              <ReactSelect
                //   options={employee}
                isClearable
                // isLoading
                isSearchable
                //   onChange={handleEmployeeActive}
                name="employeeActive"
                //   value={selectedEmployee}
                value={recData?.employeeActive}
              />
            </Form.Group>
            {/* {selectedEmployee?.value !== "1" && ( */}
            {/* <> */}
            <Form.Group as={Col} md="3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Email"
                //   onChange={(e) => handleInputChange(e)}
                name="Email"
                value={recData?.Email}
                //   disabled={selectedEmployee?.value === "1"}
              />
            </Form.Group>{" "}
            <Form.Group as={Col} md="3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Phone no"
                //   onChange={(e) => handleInputChange(e)}
                name="Phone"
                //   value={formData.Phone}
                //   disabled={selectedEmployee?.value === "1"}
              />
            </Form.Group>{" "}
            {/* </> */}
            {/* )} */}
          </Row>
          <Row className="mt-5 d-flex justify-content-center">
            <Form.Group as={Col} md="3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Address"
                //   onChange={(e) => handleInputChange(e)}
                name="Address"
                //   value={formData.Address}
              />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>State</Form.Label>
              <ReactSelect
                //   options={option}
                isClearable
                // isLoading
                isSearchable
                //   onChange={handleStateChange}
                name="State"
                //   value={selectedValue}
              />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>City</Form.Label>
              <ReactSelect
                //   options={optionCity}
                isClearable
                // isLoading
                isSearchable
                name="City"
                //   onChange={handleCityChange}
                //   value={selectedCity}
              />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Hobby</Form.Label>
              <ReactSelect
                //   options={hobby}
                isClearable
                // isLoading
                isMulti
                isSearchable
                name="hobby"
                //   onChange={handleHobby}
                //   value={selectedHobby}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              as={Col}
              md="3"
              className="mt-5 d-flex align-content-center"
            >
              <Form.Check
                required
                label="Active"
                feedbackType="invalid"
                id="validationFormik106"
                feedbackTooltip
                //   onChange={(e) => handleCheck(e)}
                name="active"
                //   checked={active}
              />
            </Form.Group>
          </Row>
          <Row className="mt-5 d-flex justify-content-center">
            <Button
              variant="outline-success"
              size="sm"
              style={{ maxWidth: "10%" }}
              className="custom-button"
              // onClick={saveFormData}
            >
              Save
            </Button>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default EditPage;
