import { useState } from "react";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import { useFormik } from "formik";
import {
  UncontrolledAlert,
  Form,
  Input,
  FormFeedback,
  Spinner,
  Label,
} from "reactstrap";
import * as Yup from "yup";

const CanvasRoof = ({ toggle, isOpen }) => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      reference: "",
      label: "",
      amount: "",
      dLength: "",
      dWidth: "",
    },
    validationSchema: Yup.object({
      reference: Yup.string().required("Ajouter la référence du plafond"),
      label: Yup.string().required("Ajouter le Libellé du plafond"),
      amount: Yup.string().required("Ajouter un montant au plafond"),
      dLength: Yup.string().required("Ajouter la Longueur(cm) du plafond"),
      dWidth: Yup.string().required("Ajouter la Largeur(cm) du plafond"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(!loading);
      } catch (error) {
        setErr(error);
      }
    },
    validateOnChange: true,
  });
  return (
    <Offcanvas
      toggle={toggle}
      isOpen={isOpen}
      direction="end"
    >
      <OffcanvasHeader toggle={toggle}>
        Ajout de nouveau plafond
      </OffcanvasHeader>
      <OffcanvasBody>
        <Form
          className="form-horizontal"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          {err && (
            <UncontrolledAlert
              color="danger"
              role="alert"
              className="alert-dismissible"
            >
              {err}
            </UncontrolledAlert>
          )}

          <div className="my-4">
            <Label className="form-label">Référence</Label>
            <Input
              name="reference"
              className="form-control"
              placeholder="Référence"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.reference || ""}
              invalid={
                validation.touched.reference && validation.errors.reference
                  ? true
                  : false
              }
            />
            {validation.touched.reference && validation.errors.reference ? (
              <FormFeedback type="invalid">
                {validation.errors.reference}
              </FormFeedback>
            ) : null}
          </div>

          <div className="my-4">
            <Label className="form-label">Libellé</Label>
            <Input
              name="label"
              className="form-control"
              placeholder="Libellé"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.label || ""}
              invalid={
                validation.touched.label && validation.errors.label
                  ? true
                  : false
              }
            />
            {validation.touched.label && validation.errors.label ? (
              <FormFeedback type="invalid">
                {validation.errors.label}
              </FormFeedback>
            ) : null}
          </div>

          <div className="my-4">
            <Label className="form-label">Montant</Label>
            <Input
              name="amount"
              className="form-control"
              placeholder="Montant"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.amount || ""}
              invalid={
                validation.touched.amount && validation.errors.amount
                  ? true
                  : false
              }
            />
            {validation.touched.amount && validation.errors.amount ? (
              <FormFeedback type="invalid">
                {validation.errors.amount}
              </FormFeedback>
            ) : null}
          </div>

          <div className="my-4">
            <Label className="form-label">Longueur(cm)</Label>
            <Input
              name="dLength"
              className="form-control"
              placeholder="Longueur(cm)"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.dLength || ""}
              invalid={
                validation.touched.dLength && validation.errors.dLength
                  ? true
                  : false
              }
            />
            {validation.touched.dLength && validation.errors.dLength ? (
              <FormFeedback type="invalid">
                {validation.errors.dLength}
              </FormFeedback>
            ) : null}
          </div>

          <div className="my-4">
            <Label className="form-label">Largeur(cm)</Label>
            <Input
              name="dWidth"
              className="form-control"
              placeholder="Largeur(cm)"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.dWidth || ""}
              invalid={
                validation.touched.dWidth && validation.errors.dWidth
                  ? true
                  : false
              }
            />
            {validation.touched.dWidth && validation.errors.dWidth ? (
              <FormFeedback type="invalid">
                {validation.errors.dWidth}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mt-3 d-grid">
            <button className="btn btn-primary btn-block" type="submit">
              Ajouter{" "}
              {loading ? (
                <Spinner color="white" size="sm" className="mx-2" />
              ) : null}
            </button>
          </div>
        </Form>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default CanvasRoof;
