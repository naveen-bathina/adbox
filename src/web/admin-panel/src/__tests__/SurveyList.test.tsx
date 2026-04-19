import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SurveyList } from '../components/SurveyList';

describe('SurveyList', () => {
    beforeEach(() => {
        // Mock fetch to return fake survey data
        global.fetch = jest.fn((url, options) => {
            if (options && options.method === 'DELETE') {
                return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
            }
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve([
                    { title: 'Survey 1', description: 'Desc 1', type: 'survey', questions: [] },
                    { title: 'Survey 2', description: 'Desc 2', type: 'survey', questions: [] }
                ])
            });
        }) as jest.Mock;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('renders surveys and allows delete', async () => {
        render(<SurveyList />);
        expect(await screen.findByText('Survey 1')).toBeInTheDocument();
        expect(screen.getByText('Survey 2')).toBeInTheDocument();
        // Delete the first survey
        fireEvent.click(screen.getAllByText('Delete')[0]);
        await waitFor(() => expect(screen.queryByText('Survey 1')).not.toBeInTheDocument());
        expect(screen.getByText('Survey 2')).toBeInTheDocument();
    });
});
