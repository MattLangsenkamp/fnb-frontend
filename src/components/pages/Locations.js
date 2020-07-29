import React from 'react';
import MyMap from '../common/MyMap';
import styled from 'styled-components';
import Layout from '../common/Layout';

const Styles = styled.div`
    height: 100%;
`;

export default function Locations() {
    const description = "A map containing locations of various food resources around the rochester area"

    return (
        <Layout title={"Locations"} description={description}>
            <Styles>
                {/*<h2>Locations</h2>
                <p>all the locations</p>*/}
                <MyMap/>
            </Styles>
        </Layout>
    )
}