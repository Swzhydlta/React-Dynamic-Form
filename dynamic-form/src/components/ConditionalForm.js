import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";

function ConditionalForm() {
  // A piece of state to store an array of objects containing the user's final selections
  const [finalVars, setFinalVars] = useState();

  // A state array of objects that is used to build a form out of JSX via a map function.
  // Each object has a "type" attribute which is used to treat types differently
  // in the functions that build the form and update state.
  // This array gets updated dynamically as the user works through the form.
  const [formVars, setFormVars] = useState([
    {
      parentOption: null,
      varName: "favActivity",
      question: "Please your favorite fun activity",
      value: null,
      type: "parentMulti",
      options: [
        { name: "Coding", value: false },
        { name: "Swimming", value: false },
        { name: "Hiking", value: false },
      ],
    },
    {
      parentOption: "Coding",
      varName: "stackOverflow",
      question: "Do you spend a lot of time on Stack Overflow?",
      value: null,
      type: "child",
      options: null,
    },
    {
      parentOption: "Swimming",
      varName: "enjoyBeach",
      question: "Do you enjoy going to the beach?",
      value: null,
      type: "child",
      options: null,
    },
    {
      parentOption: "Hiking",
      varName: "climbMountain",
      question: "Have you hiked to the top of a mountain before?",
      value: null,
      type: "child",
      options: null,
    },
    {
      parentOption: null,
      varName: "enjoyForm",
      question: "Did you enjoy filling in this form?",
      value: null,
      type: "standalone",
      options: null,
    },
  ]);

  // Update state to reflect all currently selected options in the form
  function submitFormStep(e) {
    e.preventDefault();
    setFormVars((prev) => {
      return prev.map((item) => {
        // Update the values of state objects of "parentMulti" type when user interacts with fields of that type
        if (item.type === "parentMulti") {
          // Check if varName attribute of item matches event.target.name
          if (item.varName === e.target.name) {
            // If so, update value attribute of item to e.target.value
            return {
              ...item,
              value: e.target.value,
              // then update only the options['option'] corresponding to what the user selected to true,
              // while updating other options to false
              options: item.options.map((option) => {
                if (option["name"] === e.target.value) {
                  return { ...option, value: true };
                } else {
                  return { ...option, value: false };
                }
              }),
            };
          } else {
            return item;
          }

          // Update the values of state objects of "child" type when user interacts with fields of that type
        } else if (item.type === "child") {
          // Check if varName attribute of item matches event.target.name
          if (item.varName === e.target.name) {
            // If so, update value attribute of item to e.target.value
            return { ...item, value: e.target.value };
            // If not, check if the item's parent is false, and if so, change it back to null
          } else {
            // Find its parent option in its parent item
            const parent = formVars
              .map((newItem) => newItem.options)
              .flat()
              .find((option) => option.name === item.parentOption);
            //If its parent is false
            if (parent.value === false) {
              // Make its value null
              return { ...item, value: null };
              // Else, keep its value as it previously was
            } else {
              return item;
            }
          }

          // Update the values of state objects of "standalone" type when user interacts with fields of that type
        } else if (item.type === "standalone") {
          // Check if varName attribute of item matches event.target.name
          if (item.varName === e.target.name) {
            // If so, update value attribute of item to e.target.value
            return { ...item, value: e.target.value };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    });
  }

  // After the user clicks submit, this function builds an array containing only variables that reflect the
  // user's final selection.
  function submitForm(e) {
    e.preventDefault();
    const finalVarsArray = [];
    formVars.forEach(function (item) {
      item.value &&
        finalVarsArray.push({ ["name"]: item.varName, ["value"]: item.value });
    });
    setFinalVars(finalVarsArray);
  }

  // Log out the formVars array on each state change to check if its values are updating correctly
  console.log("formars", formVars);

  // Log out the final variable array too
  console.log("final vars", finalVars);

  // The below JSX maps out the formVars array into a working form, treating each question type uniquely
  return (
    <div>
      <Row className="mt-5">
        <Col id="form-wrapper" className="px-3 py-4">
          <Form>
            {formVars.map((item, myindex) => {
              if (item.type === "parentMulti") {
                return (
                  <Form.Group key={myindex}>
                    <Form.Label>{item.question}</Form.Label>
                    <Form.Select
                      onChange={submitFormStep}
                      name={item.varName}
                      value={item.value ? item.value : "DEFAULT"}
                      data-type={item.type}
                    >
                      <option value="DEFAULT" disabled>
                        Choose a value
                      </option>
                      {item.options.map((option, index) => {
                        return (
                          <option key={index} value={option["name"]}>
                            {option["name"]}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                );
              } else if (item.type === "child") {
                const parent = formVars
                  .map((newItem) => newItem.options)
                  .flat()
                  .find((option) => option.name === item.parentOption);
                if (parent.value === true) {
                  return (
                    <Form.Group key={myindex}>
                      <Form.Label>{item.question}</Form.Label>
                      <Form.Select
                        onChange={submitFormStep}
                        name={item.varName}
                        value={item.value ? item.value : "DEFAULT"}
                        data-type={item.type}
                        data-parent={item.parentOption}
                      >
                        <option value="DEFAULT" disabled>
                          Choose a value
                        </option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Form.Select>
                    </Form.Group>
                  );
                }
              } else if (item.type === "standalone") {
                return (
                  <Form.Group key={myindex}>
                    <Form.Label>{item.question}</Form.Label>
                    <Form.Select
                      onChange={submitFormStep}
                      name={item.varName}
                      value={item.value ? item.value : "DEFAULT"}
                    >
                      <option value="DEFAULT" disabled>
                        Choose a value
                      </option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Form.Select>
                  </Form.Group>
                );
              }
            })}
            <Button
              onClick={submitForm}
              variant="secondary"
              type="submit"
              className="mt-3"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      {finalVars && (
        <Row className="mt-5">
          <Col>
            <Row>
              <Col>
                <div className="form-heading px-3 py-3">
                  <h3>Your final selection</h3>
                </div>
              </Col>
              <Col></Col>
            </Row>
            <Row className="mt-4">
              <Table striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>Variable name</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {finalVars.map((item) => {
                    return (
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ConditionalForm;
