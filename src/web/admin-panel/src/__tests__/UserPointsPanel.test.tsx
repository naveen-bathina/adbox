import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserPointsPanel } from '../components/UserPointsPanel';

// Mock fetch for user points
beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve([
                { userId: 'user1', points: 100 },
                { userId: 'user2', points: 50 }
            ])
        })
    ) as jest.Mock;
});

describe('UserPointsPanel', () => {
    it('renders user points table', async () => {
        render(<UserPointsPanel />);
        expect(await screen.findByText('User Rewards / Points')).toBeInTheDocument();
        expect(await screen.findByText('user1')).toBeInTheDocument();
        expect(await screen.findByText('100')).toBeInTheDocument();
        expect(await screen.findByText('user2')).toBeInTheDocument();
        expect(await screen.findByText('50')).toBeInTheDocument();
    });
    it('shows error on fetch failure', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject('fail'));
        render(<UserPointsPanel />);
        expect(await screen.findByText(/failed to load user points/i)).toBeInTheDocument();
    });
});
