import React, { useState } from "react";
import Layout from "../common/Layout";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import LocationPageForm from "../forms/LocationPageForm";
import jwt_decode from "jwt-decode";
import { Button } from "react-bootstrap";

const GET_LOCATION = gql`
  query GetLocation($id: String!) {
    getLocation(id: $id) {
      message
      payload {
        name
        locationOwner
        friendlyLocation
        description
        latitude
        longitude
        picture
      }
    }
  }
`;

export default function Location() {
  const [editing, setEditing] = useState(false);
  const { locationId } = useParams();

  const { loading, error, data } = useQuery(GET_LOCATION, {
    variables: { id: locationId },
  });

  const accessTokenEncoded = localStorage.getItem("AccessToken");
  const accessTokenDecoded = jwt_decode(accessTokenEncoded);

  if (loading) {
    return <Layout title="loading">"loading..."</Layout>;
  }
  const location = data.getLocation.payload[0];

  const normal = (
    <>
      <h1>{location.name}</h1>
      <h3>{location.friendlyLocation}</h3>
      <h3>{location.description}</h3>
      <h3>{location.locationOwner}</h3>
      <img src={location.picture} alt="location" height="550" width="550" />
    </>
  );

  return (
    <Layout title="location blah">
      {!editing && normal}
      {accessTokenDecoded.key === locationId && !editing && (
        <Button onClick={() => setEditing(!editing)}>Edit</Button>
      )}
      {editing && (
        <LocationPageForm locationData={location} setEditing={setEditing} />
      )}
    </Layout>
  );
}
