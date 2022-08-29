import { Grommet, Page, PageContent, Heading } from 'grommet';
import Form from './Form';
import View from './View';

const App = () => {
  return (
    <Grommet plain>
      <Page kind="narrow">
        <PageContent background="light-3" pad={{ vertical: 'small' }}>
          <Heading margin="none" alignSelf="center">
            OSM to GeoJSON
          </Heading>
          <Form />
          <View />
        </PageContent>
      </Page>
    </Grommet>
  );
};

export default App;
