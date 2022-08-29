import React from 'react';
import { FormField, TextInput, Box, Button } from 'grommet';

const Form = () => {
  return (
    <Box pad="xsmall">
      <Box direction="row" align="center" pad="small">
        <Box direction="column" align="center" pad="small">
          <FormField label="Min Long">
            <TextInput placeholder="type here" />
          </FormField>
        </Box>

        <Box direction="column" alignContent="between" gap="xlarge">
          <Box>
            <FormField label="Min Lat">
              <TextInput placeholder="type here" />
            </FormField>
          </Box>
          <Box>
            <FormField label="Max Lat">
              <TextInput placeholder="type here" />
            </FormField>
          </Box>
        </Box>

        <Box direction="column" align="center" pad="small">
          <FormField label="Max Long">
            <TextInput placeholder="type here" />
          </FormField>
        </Box>
      </Box>

      <Button primary alignSelf="center" label="Submit" />
    </Box>
  );
};

export default Form;
