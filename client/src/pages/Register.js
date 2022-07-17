import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  CardBody,
  Card,
  UncontrolledAlert,
  Container,
  Form,
  Input,
  FormFeedback,
  Spinner,
  Label,
} from "reactstrap";
import * as Yup from "yup";

const Register = () => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Veuillez entrer votre Nom et Prénoms"),
      username: Yup.string().required("Entrez un Nom d'utilisateur valide"),
      password: Yup.string().required("Le Mot de passe est requis"),
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
    <div className="account-pages">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="overflow-hidden">
              <CardBody className="pt-0">
                <div className="p-2">
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
                      <Label className="form-label">Nom et Prénoms</Label>
                      <Input
                        name="name"
                        className="form-control"
                        placeholder="Nom et Prénoms"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ""}
                        invalid={
                          validation.touched.name &&
                          validation.errors.name
                            ? true
                            : false
                        }
                      />
                      {validation.touched.name &&
                      validation.errors.name ? (
                        <FormFeedback type="invalid">
                          {validation.errors.name}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="my-4">
                      <Label className="form-label">
                        Nom d&#39;utilisateur
                      </Label>
                      <Input
                        name="username"
                        className="form-control"
                        placeholder="Nom d'utilisateur"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.username || ""}
                        invalid={
                          validation.touched.username &&
                          validation.errors.username
                            ? true
                            : false
                        }
                      />
                      {validation.touched.username &&
                      validation.errors.username ? (
                        <FormFeedback type="invalid">
                          {validation.errors.username}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="my-4">
                      <Label className="form-label">Mot de passe</Label>
                      <Input
                        name="password"
                        className="form-control"
                        value={validation.values.password || ""}
                        type="password"
                        placeholder="Mot de passe"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={
                          validation.touched.password &&
                          validation.errors.password
                            ? true
                            : false
                        }
                      />
                      {validation.touched.password &&
                      validation.errors.password ? (
                        <FormFeedback type="invalid">
                          {validation.errors.password}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mt-3 d-grid">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Créer un compte{" "}
                        {loading ? (
                          <Spinner color="white" size="sm" className="mx-2" />
                        ) : null}
                      </button>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>
            <div className="mt-5 text-center">
              <p>
                Vous avez déjà un conpte ?{" "}
                <Link to="/login" className="fw-medium text-primary">
                  {" "}
                  Connexion{" "}
                </Link>{" "}
              </p>
              <p>© {new Date().getFullYear()} Udiz Challenge. </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
