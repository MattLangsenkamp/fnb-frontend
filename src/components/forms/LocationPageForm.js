import { Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import Error from "../common/Error";
import { gql, useMutation } from "@apollo/client";
import { Form, Col, Button } from "react-bootstrap";
import Thumb from "../common/Thumb";
import styled from "styled-components";

const UPDATE_LOCATION_DATA = gql`
  mutation UpdateLocation(
    $id: String!
    $name: String
    $friendlyLocation: String!
    $description: String!
    $latitude: Float!
    $longitude: Float
    $picture: String!
  ) {
    updateLocation(
      id: $id
      name: $name
      friendlyName: $friendlyName
      description: $description
      latitude: $latitude
      longitude: $longitude
      picture: $picture
    ) {
      payload {
        id
        name
        friendlyName
        description
        latitude
        longitude
        picture
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
  name: Yup.string()
    .min(3, "Name must be at least three characters")
    .max(255, "Name must be less than 255 characters")
    .required("Name is required"),
  friendlyName: Yup.string()
    .min(3, "friendlyName must be at least three characters")
    .max(255, "friendlyName must be less than 255 characters")
    .required("friendlyName is required"),
  description: Yup.string()
    .min(3, "Description must be at least three characters")
    .max(510, "Description must be less than 510 characters")
    .required("Description is required"),
  latitude: Yup.number().min(-90).max(90).required("Required"),
  longitude: Yup.number()
    .min(-180, "Too Short!")
    .max(180, "Too Long!")
    .required("Required"),

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

export default function LocationPageForm({ setEditing, locationData }) {
  const [
    updateLocationData,
    { data: mutData, error: mutationError },
  ] = useMutation(UPDATE_LOCATION_DATA);

  return (
    <FormStyles>
      <Formik
        initialValues={{
          name: locationData.name,
          friendlyName: locationData.friendlyName,
          description: locationData.description,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          picturePath: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          console.log(values);
          var file = values.picturePath;
          var reader = new FileReader();
          reader.onloadend = function () {
            updateLocationData({
              variables: {
                id: locationData.id,
                name: values.name,
                friendlyLocation: values.friendlyName,
                picture: reader.result,
                description: values.description,
                latitude: values.latitude,
                longitude: values.longitude,
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
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.name && !errors.name}
                  className={
                    touched.name && errors.name && values.name.length > 0
                      ? "form-error"
                      : null
                  }
                />
                {RenderErrorMessage(touched, errors, values, "name")}
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationFormik02">
                <Form.Label>Friendly Name</Form.Label>
                <Form.Control
                  type="text"
                  name="friendlyName"
                  placeholder="Corner of X and Y"
                  value={values.friendlyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.friendlyName && !errors.friendlyName}
                  className={
                    touched.friendlyName &&
                    errors.friendlyName &&
                    values.friendlyName.length > 0
                      ? "form-error"
                      : null
                  }
                />
                {RenderErrorMessage(touched, errors, values, "friendlyName")}
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationFormik03">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="description"
                  placeholder="Free stand, regularily stocked with food"
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
              <Form.Group as={Col} md="3" controlId="validationFormik04">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.latlong.net/"
                >
                  Find Latitude and Longitude
                </a>
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="text"
                  name="latitude"
                  placeholder="latitude"
                  value={values.latitude}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.latitude && !errors.latitude}
                  className={
                    touched.latitude &&
                    errors.latitude &&
                    values.latitude.length > 0
                      ? "form-error"
                      : null
                  }
                />
                {RenderErrorMessage(touched, errors, values, "latitude")}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik05">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="text"
                  name="longitude"
                  placeholder="longitude"
                  value={values.longitude}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.longitude && !errors.longitude}
                  className={
                    touched.longitude &&
                    errors.longitude &&
                    values.longitude.length > 0
                      ? "form-error"
                      : null
                  }
                />
                {RenderErrorMessage(touched, errors, values, "longitude")}
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
