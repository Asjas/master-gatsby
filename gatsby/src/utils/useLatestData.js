import { useState, useEffect } from 'react';

const gql = String.raw;

const deets = `
  _id
  name
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`;

export default function useLatestData() {
  const [hotSlices, setHotSlices] = useState();
  const [slicemasters, setSlicemasters] = useState();

  useEffect(function () {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setHotSlices(data.data.StoreSettings.hotSlices);
        setSlicemasters(data.data.StoreSettings.slicemaster);
      })
      .catch((err) => console.error(err));
  }, []);

  return {
    slicemasters,
    hotSlices,
  };
}
