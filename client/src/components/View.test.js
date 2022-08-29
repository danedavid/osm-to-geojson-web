import { render, screen } from '@testing-library/react';
import View from './View';

test('should GeoJSON data', () => {
  const sampleData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [13.336490392684937, 52.478848296474176],
              [13.33663523197174, 52.478848296474176],
              [13.33663523197174, 52.47892507611695],
              [13.336490392684937, 52.47892507611695],
              [13.336490392684937, 52.478848296474176],
            ],
          ],
        },
      },
    ],
  };
  render(<View data={sampleData} />);

  const jsonViewContainer = screen.getByTestId('json-view-container');
  const jsonView =
    // eslint-disable-next-line testing-library/no-node-access
    jsonViewContainer.getElementsByClassName('react-json-view')[0];
  expect(jsonView).toBeVisible();
  expect(jsonView).toHaveTextContent(/root/i);
  expect(jsonView).toHaveTextContent('FeatureCollection');
  expect(jsonView).toHaveTextContent(/features/i);
});
