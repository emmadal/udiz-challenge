import { useState } from "react";
import { Table, Row, Col, Container, Button } from "reactstrap";
import CanvasRoof from "../components/CanvasRoof";

const RoofList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Container className="mt-5 pt-5">
      <CanvasRoof toggle={toggle} isOpen={isOpen} />
      <Row>
        <Col>
          <Button color="primary" className="mb-4" onClick={toggle}>
            Ajouter un plafond
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table bordered responsive striped>
            <thead>
              <tr>
                <th>Référence</th>
                <th>Libellé</th>
                <th>Montant</th>
                <th>Actions</th>
              </tr>
            </thead>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default RoofList;
