import React from "react";
import MyMap from "../common/MyMap";
import styled from "styled-components";
import Layout from "../common/Layout";
import { gql, useQuery } from "@apollo/client";
import { Button } from "react-bootstrap";

const Styles = styled.div`
  height: 100%;
`;

const GET_LOCATIONS = gql`
  query getLocations {
    getAllLocations {
      payload {
        id
        name
        description
        latitude
        longitude
        picture
        friendlyLocation
      }
      message
    }
  }
`;

export default function Locations() {
  const { loading, error, data, refetch } = useQuery(GET_LOCATIONS);

  const description =
    "A map containing locations of various food resources around the rochester area";

  if (loading) return "Loading...";
  if (error) return "Error...";

  return (
    <Layout title={"Locations"} description={description}>
      <Styles>
        <Button onClick={() => refetch()}>Refresh</Button>
        <MyMap data={data} />
      </Styles>
    </Layout>
  );
}
