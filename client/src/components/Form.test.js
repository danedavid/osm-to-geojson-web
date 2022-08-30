import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';
import { sampleValues } from '../constants';

test('should render form', () => {
  render(<Form />);
  const input1 = screen.getByLabelText('Min Long');
  const input2 = screen.getByLabelText('Min Lat');
  const input3 = screen.getByLabelText('Max Long');
  const input4 = screen.getByLabelText('Max Lat');

  const submitButton = screen.getByRole('button', { name: 'submit' });
  expect(input1).toBeVisible();
  expect(input2).toBeVisible();
  expect(input3).toBeVisible();
  expect(input4).toBeVisible();
  expect(submitButton).toBeVisible();
});

test('submit without all 4 values should display error', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn();

  render(<Form onSubmit={onSubmit} />);
  const input1 = screen.getByLabelText('Min Long');
  const submitButton = screen.getByRole('button', { name: 'submit' });
  fireEvent.change(input1, { target: { value: 23 } });
  await user.click(submitButton);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();
  expect(dialog).toHaveTextContent(/missing/i);
  expect(onSubmit.mock.calls.length).toBe(0);
});

test('should invoke onSubmit on succesful submit', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn();

  render(<Form onSubmit={onSubmit} />);

  const input1 = screen.getByLabelText('Min Long');
  const input2 = screen.getByLabelText('Min Lat');
  const input3 = screen.getByLabelText('Max Long');
  const input4 = screen.getByLabelText('Max Lat');
  const submitButton = screen.getByRole('button', { name: 'submit' });
  const dialog = screen.queryByRole('dialog');

  const inputValues = {
    minLong: 23,
    minLat: 1.12,
    maxLong: 23.56,
    maxLat: 2,
  };

  fireEvent.change(input1, { target: { value: inputValues.minLong } });
  fireEvent.change(input2, { target: { value: inputValues.minLat } });
  fireEvent.change(input3, { target: { value: inputValues.maxLong } });
  fireEvent.change(input4, { target: { value: inputValues.maxLat } });
  await user.click(submitButton);

  expect(dialog).toBeNull();
  expect(onSubmit.mock.calls.length).toBe(1);
  expect(onSubmit.mock.calls[0][0]).toStrictEqual(inputValues);
});

test('should fill sample values', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn();

  render(<Form onSubmit={onSubmit} />);

  const fillButton = screen.getByRole('button', { name: 'fill values' });
  await user.click(fillButton);

  const val1 = +screen.getByLabelText('Min Long').value;
  const val2 = +screen.getByLabelText('Min Lat').value;
  const val3 = +screen.getByLabelText('Max Long').value;
  const val4 = +screen.getByLabelText('Max Lat').value;

  expect(val1).toBe(sampleValues.minLong);
  expect(val2).toBe(sampleValues.minLat);
  expect(val3).toBe(sampleValues.maxLong);
  expect(val4).toBe(sampleValues.maxLat);

  const submitButton = screen.getByRole('button', { name: 'submit' });
  await user.click(submitButton);

  expect(onSubmit.mock.calls.length).toBe(1);
  expect(onSubmit.mock.calls[0][0]).toStrictEqual(sampleValues);
});

test('display spinner on loading', async () => {
  render(<Form loading />);

  const submitButton = screen.getByRole('button', { name: 'submit' });
  const spinner = within(submitButton).queryByRole('progressbar');

  expect(submitButton).toHaveTextContent('');
  expect(submitButton).toBeDisabled();
  expect(spinner).toBeVisible();
});
