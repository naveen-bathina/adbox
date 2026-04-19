import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { SurveyCreateForm } from '../components/SurveyCreateForm';
import '@testing-library/jest-dom';

// Mock fetch
beforeEach(() => {
    window.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ title: 'Customer Feedback' })
        })
    ) as unknown as typeof fetch;
});

test('submits survey form', async () => {
    render(<SurveyCreateForm />);
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Survey' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Description' } });
    fireEvent.click(screen.getByText('Create'));
    await waitFor(() => expect(screen.getByText('Survey created!')).toBeInTheDocument());
});
