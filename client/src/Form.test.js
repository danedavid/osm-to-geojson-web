import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

test('should render form', () => {
  render(<Form />);
  const input1 = screen.getByLabelText('min_long');
  const input2 = screen.getByLabelText('min_lat');
  const input3 = screen.getByLabelText('max_long');
  const input4 = screen.getByLabelText('max_lat');

  const submitButton = screen.getByRole('button');
  expect(input1).toBeVisible();
  expect(input2).toBeVisible();
  expect(input3).toBeVisible();
  expect(input4).toBeVisible();
  expect(submitButton).toBeVisible();
});

test('submit without all 4 values should display error', () => {
  const user = userEvent.setup();

  render(<Form />);
  const input1 = screen.getByLabelText('min_long');
  const submitButton = screen.getByRole('button');
  fireEvent.change(input1, { target: { value: 23 } });
  user.click(submitButton);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();
  expect(dialog).toHaveTextContent(/missing/i);
});

test('should invoke onSubmit on succesful submit', () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn();

  render(<Form onSubmit={onSubmit} />);

  const input1 = screen.getByLabelText('min_long');
  const input2 = screen.getByLabelText('min_lat');
  const input3 = screen.getByLabelText('max_long');
  const input4 = screen.getByLabelText('max_lat');
  const submitButton = screen.getByRole('button');
  const dialog = screen.getByRole('dialog');

  fireEvent.change(input1, { target: { value: 23 } });
  fireEvent.change(input2, { target: { value: 1.12 } });
  fireEvent.change(input3, { target: { value: 23.56 } });
  fireEvent.change(input4, { target: { value: 2 } });
  user.click(submitButton);

  expect(dialog).not.toBeVisible();
  expect(onSubmit).toHaveBeenCalled();
});
