import { useState } from 'react';
import { Grommet, Page, PageContent, Heading } from 'grommet';
import Form from './Form';
import View from './View';
import { fetchGeoJSON } from '../service';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const data = await fetchGeoJSON(values);
      setData(data);
    } catch (err) {
      console.error(err);
      // notify error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grommet plain>
      <Page kind="narrow">
        <PageContent background="light-3" pad={{ vertical: 'small' }}>
          <Heading margin="none" alignSelf="center">
            OSM to GeoJSON
          </Heading>
          <Form onSubmit={onSubmit} loading={loading} />
          {data && <View data={data} />}
        </PageContent>
      </Page>
    </Grommet>
  );
};

export default App;
