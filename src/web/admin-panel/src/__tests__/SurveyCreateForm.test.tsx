import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { SurveyCreateForm } from '../components/SurveyCreateForm';

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ title: 'Customer Feedback' })
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders and submits survey create form', async () => {
  render(<SurveyCreateForm />);
  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Customer Feedback' } });
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Quarterly feedback survey' } });
  fireEvent.click(screen.getByText('Create'));
  await waitFor(() => expect(screen.getByText('Survey created!')).toBeInTheDocument());
});
