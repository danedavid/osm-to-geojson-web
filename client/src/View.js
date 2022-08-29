import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import JSONViewer from 'react-json-view';

const View = ({ data }) => {
  return (
    <Box
      data-testid="json-view-container"
      pad={{ vertical: 'medium', horizontal: 'small' }}
    >
      <JSONViewer
        onEdit={false}
        onAdd={false}
        onDelete={false}
        enableClipboard={false}
        collapsed={2}
        theme="eighties"
        src={data}
      />
    </Box>
  );
};

View.propTypes = {
  data: PropTypes.object.isRequired,
};

export default View;
