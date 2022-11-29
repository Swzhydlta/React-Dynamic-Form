import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import ConditionalForm from "./components/ConditionalForm.js";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <div className="form-heading px-3 py-3">
            <h3>Conditional Form</h3>
          </div>
        </Col>
        <Col></Col>
      </Row>
      <ConditionalForm />
    </Container>
  );
}

export default App;
