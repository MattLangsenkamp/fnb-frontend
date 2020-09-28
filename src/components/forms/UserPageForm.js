import { Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import Error from "../common/Error";
import { gql, useMutation } from "@apollo/client";
import { Form, Col, Button } from "react-bootstrap";
import Thumb from "../common/Thumb";

import styled from "styled-components";
const UPDATE_USER_DATA = gql`
  mutation UpdateUserData(
    $id: String!
    $username: String!
    $contact: String!
    $description: String!
    $picture: String!
    $locations: [String]!
  ) {
    updateUserData(
      id: $id
      username: $username
      contact: $contact
      description: $description
      picture: $picture
      locations: $locations
    ) {
      payload {
        id
        username
        contact
        description
        picture
        locations
      }
    }
  }
`;

const FormStyles = styled.div`
  .form-error {
    border-color: #f44336;
  }
`;

const ValidationSchema = Yup.object({
  contact: Yup.string()
    .min(3, "Contact must be at least three characters")
    .max(255, "Contact must be less than 255 characters")
    .required("Contact is required"),
  username: Yup.string()
    .min(3, "Username must be at least three characters")
    .max(255, "Username must be less than 255 characters")
    .required("Username is required"),
  description: Yup.string()
    .min(3, "Description must be at least three characters")
    .max(510, "Description must be less than 510 characters")
    .required("Description is required"),
  picturePath: Yup.mixed().required(
    "A picturePath of the location is required"
  ),
});

const RenderErrorMessage = (touched, errors, values, field) => {
  return (
    touched[field] &&
    errors[field] &&
    values[field].length > 0 && (
      <Error touched={touched[field]} message={errors[field]} />
    )
  );
};

export default function UserPageForm({ setEditing, userData }) {
  const [updateUserData, { data: mutData, error: mutationError }] = useMutation(
    UPDATE_USER_DATA
  );

  return (
    <FormStyles>
      <Formik
        initialValues={{
          username: userData.username,
          contact: userData.contact,
          description: userData.description,
          picturePath: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          console.log(values);
          var file = values.picturePath;
          var reader = new FileReader();
          reader.onloadend = function () {
            updateUserData({
              variables: {
                id: userData.id,
                username: values.username,
                contact: values.contact,
                picture: reader.result,
                description: values.description,
                locations: userData.locations,
              },
            });
          };
          reader.readAsDataURL(file);

          setEditing(false);
          resetForm({ values: "" });
          document.getElementById("hmmm").value = "";
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
          touched,
          errors,
          isValid,
          setFieldValue,
        }) => (
          <>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Col} md="6" controlId="validationFormik01">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.name && !errors.name}
                  className={
                    touched.name && errors.name && values.name.length > 0
                      ? "form-error"
                      : null
                  }
                />
                {RenderErrorMessage(touched, errors, values, "username")}
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationFormik02">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  value={values.contact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.contact && !errors.contact}
                  className={
                    touched.contact &&
                    errors.contact &&
                    values.contact.length > 0
                      ? "form-error"
                      : null
                  }
                />
                {RenderErrorMessage(touched, errors, values, "contact")}
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationFormik03">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.description && !errors.description}
                  className={
                    touched.description &&
                    errors.description &&
                    values.description.length > 0
                      ? "form-error"
                      : null
                  }
                />
                {RenderErrorMessage(touched, errors, values, "description")}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik07">
                <Form.Label>Picture</Form.Label>
                <Form.File>
                  <Form.File.Input
                    id="hmmm"
                    name="picturePath"
                    onChange={(event) => {
                      setFieldValue(
                        "picturePath",
                        event.currentTarget.files[0]
                      );
                      console.log(event.currentTarget.files[0].name);
                    }}
                    className={
                      touched.picturePath &&
                      errors.picturePath &&
                      values.picturePath.length > 0
                        ? "form-error"
                        : null
                    }
                  />
                </Form.File>
                {RenderErrorMessage(touched, errors, values, "picturePath")}
                <Thumb file={values.picturePath} />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik08">
                <Button type="submit">Submit</Button>
              </Form.Group>
            </Form>
          </>
        )}
      </Formik>
    </FormStyles>
  );
}
