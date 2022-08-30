import { useState } from 'react';
import { Grommet, Page, PageContent, Heading, Notification } from 'grommet';
import Form from './Form';
import View from './View';
import { fetchGeoJSON } from '../service';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const data = await fetchGeoJSON(values);
      setData(data);
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 400) {
        setServerError('Bad Request');
      } else {
        setServerError('Unknown Error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grommet plain>
      {serverError && (
        <Notification
          toast={{
            autoClose: true,
            position: 'bottom-right',
          }}
          status="critical"
          title="Server Error"
          message={serverError}
          onClose={() => setServerError('')}
        />
      )}

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
