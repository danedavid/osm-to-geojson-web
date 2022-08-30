import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form as GrommetForm,
  FormField,
  TextInput,
  Box,
  Button,
  Text,
  Spinner,
} from 'grommet';
import { sampleValues } from '../constants';

const Form = ({ onSubmit, loading }) => {
  const [missingError, setMissingError] = useState(false);

  const onFormSubmit = () => {
    const minLong = document.getElementById('min_long').value;
    const minLat = document.getElementById('min_lat').value;
    const maxLong = document.getElementById('max_long').value;
    const maxLat = document.getElementById('max_lat').value;

    const allPresent = minLong && minLat && maxLong && maxLat;

    if (!allPresent) {
      setMissingError(true);
    }

    const values = {
      minLong: parseFloat(minLong),
      minLat: parseFloat(minLat),
      maxLong: parseFloat(maxLong),
      maxLat: parseFloat(maxLat),
    };

    onSubmit(values);
  };

  const fillSampleValues = () => {
    document.getElementById('min_long').value = sampleValues.minLong;
    document.getElementById('min_lat').value = sampleValues.minLat;
    document.getElementById('max_long').value = sampleValues.maxLong;
    document.getElementById('max_lat').value = sampleValues.maxLat;
  };

  const onInputChange = () => {
    setMissingError(false);
  };

  return (
    <GrommetForm onSubmit={onFormSubmit}>
      <Box pad="xsmall">
        <Box direction="row" align="center" pad="small">
          <Box direction="column" align="center" pad="small">
            <FormField label="Min Long" htmlFor="min_long">
              <TextInput
                type="number"
                step="any"
                placeholder="-"
                id="min_long"
                onChange={onInputChange}
              />
            </FormField>
          </Box>

          <Box direction="column" alignContent="between" gap="xlarge">
            <Box>
              <FormField label="Min Lat" htmlFor="min_lat">
                <TextInput
                  type="number"
                  step="any"
                  placeholder="-"
                  id="min_lat"
                  onChange={onInputChange}
                />
              </FormField>
            </Box>
            <Box>
              <FormField label="Max Lat" htmlFor="max_lat">
                <TextInput
                  type="number"
                  step="any"
                  placeholder="-"
                  id="max_lat"
                  onChange={onInputChange}
                />
              </FormField>
            </Box>
          </Box>

          <Box direction="column" align="center" pad="small">
            <FormField label="Max Long" htmlFor="max_long">
              <TextInput
                type="number"
                step="any"
                placeholder="-"
                id="max_long"
                onChange={onInputChange}
              />
            </FormField>
          </Box>
        </Box>

        <Box justify="center" direction="row" gap="small">
          <Button
            type="submit"
            primary
            alignSelf="center"
            aria-label="submit"
            disabled={loading}
            label={
              loading ? (
                <Spinner color="light-1" role="progressbar" />
              ) : (
                'Submit'
              )
            }
          />
          <Button
            secondary
            alignSelf="center"
            aria-label="fill values"
            label="Fill Sample Values"
            onClick={fillSampleValues}
          />
        </Box>

        {missingError && (
          <Text
            textAlign="center"
            margin="medium"
            color="status-error"
            role="dialog"
          >
            Some values are missing
          </Text>
        )}
      </Box>
    </GrommetForm>
  );
};

Form.defaultProps = {
  onSubmit: () => {},
  loading: false,
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

export default Form;
