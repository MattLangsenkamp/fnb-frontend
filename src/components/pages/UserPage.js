import React, { useState } from "react";
import Layout from "../common/Layout";
import { gql, useQuery, from } from "@apollo/client";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import UserPageForm from "../forms/UserPageForm";

const GET_USER = gql`
  query GetUserData($id: String!) {
    getUserData(id: $id) {
      payload {
        id
        username
        description
        contact
        picture
        locations
      }
    }
  }
`;

export default function User() {
  const [editing, setEditing] = useState(false);
  const { userId } = useParams();

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  const accessTokenEncoded = localStorage.getItem("AccessToken");
  const accessTokenDecoded = jwt_decode(accessTokenEncoded);

  if (loading) {
    return "loading...";
  }
  const user = data.getUserData.payload[0];

  const normal = (
    <>
      <h1>{user.username}</h1>
      <h3>{user.contact}</h3>
      <h3>{user.description}</h3>
      <img src={user.picture} alt="location" height="550" width="550" />
      <h3>{JSON.stringify(user.locations)}</h3>
    </>
  );

  const form = <></>;
  return (
    <Layout>
      {!editing && normal}
      {accessTokenDecoded.key === userId && !editing && (
        <Button onClick={() => setEditing(!editing)}>Edit</Button>
      )}
      {editing && <UserPageForm userData={user} setEditing={setEditing} />}
    </Layout>
  );
}
