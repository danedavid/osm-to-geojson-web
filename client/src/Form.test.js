import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

test('should render form', () => {
  render(<Form />);
  const input1 = screen.getByLabelText('Min Long');
  const input2 = screen.getByLabelText('Min Lat');
  const input3 = screen.getByLabelText('Max Long');
  const input4 = screen.getByLabelText('Max Lat');

  const submitButton = screen.getByRole('button');
  expect(input1).toBeVisible();
  expect(input2).toBeVisible();
  expect(input3).toBeVisible();
  expect(input4).toBeVisible();
  expect(submitButton).toBeVisible();
});

test('submit without all 4 values should display error', async () => {
  const user = userEvent.setup();

  render(<Form />);
  const input1 = screen.getByLabelText('Min Long');
  const submitButton = screen.getByRole('button');
  fireEvent.change(input1, { target: { value: 23 } });
  await user.click(submitButton);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();
  expect(dialog).toHaveTextContent(/missing/i);
});

test('should invoke onSubmit on succesful submit', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn();

  render(<Form onSubmit={onSubmit} />);

  const input1 = screen.getByLabelText('Min Long');
  const input2 = screen.getByLabelText('Min Lat');
  const input3 = screen.getByLabelText('Max Long');
  const input4 = screen.getByLabelText('Max Lat');
  const submitButton = screen.getByRole('button');
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
