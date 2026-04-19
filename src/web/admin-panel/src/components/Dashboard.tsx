import React, { useEffect, useState } from 'react';
import { fetchDashboardData } from '../api/dashboard';
import { SurveyCreateForm } from './SurveyCreateForm';
import { SurveyList } from './SurveyList';
import { UserPointsPanel } from './UserPointsPanel';

const Dashboard: React.FC = () => {
    const [data, setData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // In a real app, get token from context or storage
        const token = localStorage.getItem('adminToken') || '';
        fetchDashboardData(token).then(result => {
            if (result.data) setData(result.data);
            else setError(result.error || 'Unknown error');
        });
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <UserPointsPanel />
            <SurveyCreateForm />
            <SurveyList />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {data ? <div>Dashboard data: {data}</div> : <div>Loading...</div>}
        </div>
    );
};

export default Dashboard;
