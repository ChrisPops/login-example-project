import { expect, test } from 'vitest'
import {render, screen, fireEvent} from '@testing-library/react';
import App from '../src/App';

beforeEach(() => {
  render(<App />);
});

test('Incorrect Login Info Fails', async () => {
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  fireEvent.change(emailInput, {target: {value: 'bob-dole@aol.com'}});
  fireEvent.change(passwordInput, {target: {value: 'xyz123lmnop'}});
  let response = fireEvent(
    screen.getByText('Submit'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );
  const status = await screen.findByText(/Error/);
  expect(status).toBeInTheDocument();
});

test('Correct Login Succeeds', async () => {
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  fireEvent.change(emailInput, {target: {value: 'george.bluth@reqres.in'}});
  fireEvent.change(passwordInput, {target: {value: 'abc123xyz'}});
  let response = fireEvent(
    screen.getByText('Submit'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );
  const status = await screen.findByText(/Success/);
  expect(status).toBeInTheDocument();
});
