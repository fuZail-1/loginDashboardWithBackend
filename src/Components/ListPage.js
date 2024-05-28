import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { BASE_URL } from "../Config/url";
import axios from "axios";
const ListPage = () => {
  const initialData = {
    fullName: "",
    Email: "",
    Phone: "",
    Address: "",
    State: "",
    City: "",
    hobby: [],
    active: false,
    employeeActive: "",
  };
  const data = [
    {
      id: 1,
      email: "fuzail@gmail.com",
      city: "Mumbai",
    },
    {
      id: 2,
      email: "ansari@gmail.com",
      city: "Thane",
    },
    {
      id: 3,
      email: "khan@gmail.com",
      city: "Pune",
    },
  ];
  const employee = [
    {
      value: "1",
      label: "yes",
    },
    {
      value: "2",
      label: "No",
    },
  ];
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [formData, setFormData] = useState({ ...initialData });
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedHobby, setSelectedHobby] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [tableSearch, setTableSearch] = useState();
  // const [filterTable, setFilterTable] = useState(data);
  const [getFormData, setGetFormData] = useState([]);
  const [active, setActive] = useState(false);
  const [error, setError] = useState("");

  const option = [
    {
      value: "1",
      label: "Maharashtra",
    },
    {
      value: "2",
      label: "UP",
    },
    {
      value: "3",
      label: "Delhi",
    },
  ];
  const optionCity = [
    {
      value: "1",
      label: "Mumbai",
    },
    {
      value: "2",
      label: "Agra",
    },
    {
      value: "3",
      label: "Partapgrah",
    },
  ];
  const hobby = [
    {
      value: "1",
      label: "Cricket",
    },
    {
      value: "2",
      label: "Football",
    },
    {
      value: "3",
      label: "Tennis",
    },
  ];

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem
        ? `Bearer ${localStorage.getItem("token")}`
        : null,
    },
  });
  const showForm = () => {
    setIsFormOpen(false);
  };
  const handleBack = () => {
    setIsFormOpen(true);
    setError({});
    setFormData({ ...initialData });
    setActive(false);
    setSelectedCity(null);
    setSelectedValue(null);
    setSelectedHobby([]);
    setSelectedEmployee(null);
  };
  const handleInputChange = (e) => {
    // console.log("change");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log(formData);
    setError((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const handleStateChange = (selectOption) => {
    // console.log(selectOption);
    const value = selectOption?.value;
    setSelectedValue(selectOption);
    setFormData({ ...formData, State: value });
  };
  const handleCityChange = (selectCity) => {
    const city = selectCity?.value;
    setSelectedCity(selectCity);
    setFormData({ ...formData, City: city });
  };
  const handleHobby = (selecthobby) => {
    const hobby = selecthobby?.map((option) => option?.value);
    setSelectedHobby(selecthobby);
    setFormData({ ...formData, hobby: hobby });
  };
  const handleEmployeeActive = (employeeData) => {
    const employeeStatus = employeeData?.value;
    setSelectedEmployee(employeeData);
    console.log(selectedEmployee, "emp");
    setFormData({ ...formData, employeeActive: employeeStatus });
  };
  useEffect(
    () => {
      // console.log(selectedValue);
      // console.log(selectedHobby);
    },
    // [selectedValue],
    [selectedHobby]
  );
  const saveFormData = async (e) => {
    try {
      e.preventDefault();
      const validate = validation();
      if (validate) {
        console.log(formData);
        const userFormData = await axiosInstance.post(
          "/saveFormData",
          formData
        );
        if (userFormData.data.success) {
          console.log(userFormData, "save");
          setFormData({ ...initialData });
          // console.log(selectedCity, "city");
          console.log(formData, "save");
          setSelectedCity(null);
          setSelectedValue(null);
          setSelectedHobby([]);
          setActive(false);
          setSelectedEmployee(null);
        }
      }
    } catch (error) {}
  };

  const getAllFormData = async () => {
    try {
      const response = await axiosInstance.get("getAllFormData");
      if (response.data.success) {
        console.log(response.data, "rs");
        setGetFormData(response.data.formDataList);
        // console.log(getFormData, "form");
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllFormData();
  }, []);
  useEffect(() => {
    console.log(getFormData);
  }, [getFormData]);
  const validation = () => {
    const newError = {};
    if (!formData.fullName) {
      newError.fullName = "Name is required";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };
  const handleSearch = (e) => {
    console.log("erech");
    const src = e.target.value.toLowerCase();
    setTableSearch(src);
    console.log(tableSearch, "srch");

    const filter = getFormData.filter(
      (item) =>
        item.email.toLowerCase().includes(src) ||
        item.city.toLowerCase().includes(src)
    );
    setGetFormData(filter);
  };
  const handleCheck = (e) => {
    const { name, checked } = e.target;

    setActive(checked);
    setFormData({ ...formData, [name]: checked });
    console.log(formData, "161");
  };
  return (
    <>
      {isFormOpen ? (
        <Container className="mt-5">
          <Row className="align-items-center">
            <Col sm={8}>
              <div className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  style={{ maxWidth: "35%" }}
                  onChange={(e) => handleSearch(e)}
                />

                <Button
                  variant="outline-success"
                  size="sm"
                  style={{ maxWidth: "15%" }}
                  className="custom-button"
                >
                  Search
                </Button>
              </div>
            </Col>

            <Col sm={4} className="text-end">
              <Button
                variant="outline-success"
                size="sm"
                style={{ maxWidth: "15%" }}
                className="custom-button"
                onClick={showForm}
              >
                Add
              </Button>
            </Col>
          </Row>
          <Row className="mt-5">
            <Table
              striped
              bordered
              hover
              size="lg"
              style={{ width: "50rem" }}
              className="mx-auto"
            >
              <thead>
                <tr>
                  <th>Sr no</th>
                  <th>Email </th>
                  <th>City</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              {getFormData?.map((item) => {
                return (
                  <>
                    <tbody>
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.Email}</td>
                        <td>{item.City}</td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              gap: "15px",
                            }}
                          >
                            <Link className="custom-link">
                              <i className="fa-sharp fa-solid fa-trash"></i>
                            </Link>
                            <Link
                              className="custom-link"
                              to={`/edit/${item.id}`}
                            >
                              <i className="fa-solid fa-user-pen"></i>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })}
            </Table>
          </Row>
        </Container>
      ) : (
        <Container className="mt-5">
          <Row>
            <Col className="d-flex justify-content-end">
              <Button
                variant="outline-success"
                size="sm"
                style={{ maxWidth: "5%" }}
                className="custom-button"
                onClick={handleBack}
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
                  onChange={(e) => handleInputChange(e)}
                  name="fullName"
                  value={formData.fullName}
                />
                <span className="error">{error.fullName}</span>
              </Form.Group>
              <Form.Group as={Col} md="3">
                <Form.Label>Employee</Form.Label>
                <ReactSelect
                  options={employee}
                  isClearable
                  // isLoading
                  isSearchable
                  onChange={handleEmployeeActive}
                  name="employeeActive"
                  value={selectedEmployee}
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
                  onChange={(e) => handleInputChange(e)}
                  name="Email"
                  value={formData.Email}
                  disabled={selectedEmployee?.value === "1"}
                />
              </Form.Group>{" "}
              <Form.Group as={Col} md="3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Phone no"
                  onChange={(e) => handleInputChange(e)}
                  name="Phone"
                  value={formData.Phone}
                  disabled={selectedEmployee?.value === "1"}
                />
              </Form.Group>{" "}
              {/* </> */}
              {/* )} */}
            </Row>
            <Row className="mt-5 d-flex justify-content-center">
              {selectedEmployee?.value !== "1" && (
                <>
                  <Form.Group as={Col} md="3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter Address"
                      onChange={(e) => handleInputChange(e)}
                      name="Address"
                      value={formData.Address}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="3">
                    <Form.Label>State</Form.Label>
                    <ReactSelect
                      options={option}
                      isClearable
                      // isLoading
                      isSearchable
                      onChange={handleStateChange}
                      name="State"
                      value={selectedValue}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="3">
                    <Form.Label>City</Form.Label>
                    <ReactSelect
                      options={optionCity}
                      isClearable
                      // isLoading
                      isSearchable
                      name="City"
                      onChange={handleCityChange}
                      value={selectedCity}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="3">
                    <Form.Label>Hobby</Form.Label>
                    <ReactSelect
                      options={hobby}
                      isClearable
                      // isLoading
                      isMulti
                      isSearchable
                      name="hobby"
                      onChange={handleHobby}
                      value={selectedHobby}
                    />
                  </Form.Group>
                </>
              )}
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
                  onChange={(e) => handleCheck(e)}
                  name="active"
                  checked={active}
                />
              </Form.Group>
            </Row>
            <Row className="mt-5 d-flex justify-content-center">
              <Button
                variant="outline-success"
                size="sm"
                style={{ maxWidth: "10%" }}
                className="custom-button"
                onClick={saveFormData}
              >
                Save
              </Button>
            </Row>
          </Form>
        </Container>
      )}
    </>
  );
};

export default ListPage;
