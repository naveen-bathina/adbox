import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

jest.mock('../api/admin', () => ({
    adminLogin: jest.fn(() => Promise.resolve({ token: 'mock-token' }))
}));
jest.mock('../api/dashboard', () => ({
    fetchDashboardData: jest.fn(() => Promise.resolve({ data: 'Dashboard data' }))
}));

describe('Dashboard API', () => {
    it('shows dashboard data after login', async () => {
        render(<App />);
        fireEvent.click(screen.getByText(/admin login/i));
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'admin@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        const loginButtons = screen.getAllByRole('button', { name: /login/i });
        const loginButton = loginButtons.find(btn => btn.getAttribute('type') === 'submit');
        fireEvent.click(loginButton);
        expect(await screen.findByText(/dashboard data/i)).toBeInTheDocument();
    });
});
