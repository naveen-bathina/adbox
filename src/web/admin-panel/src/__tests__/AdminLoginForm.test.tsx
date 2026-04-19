import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminLoginForm from '../components/AdminLoginForm';

jest.mock('../api/admin', () => ({
    adminLogin: jest.fn(() => Promise.resolve({ error: 'Login failed: Invalid credentials' }))
}));

describe('AdminLoginForm', () => {
    it('shows error on invalid login', async () => {
        render(<AdminLoginForm />);
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'admin@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        expect(await screen.findByText(/login failed/i)).toBeInTheDocument();
    });
});
