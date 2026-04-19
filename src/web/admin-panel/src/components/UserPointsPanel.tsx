import React, { useEffect, useState } from 'react';

interface UserPoints {
    userId: string;
    points: number;
}

export const UserPointsPanel: React.FC = () => {
    const [userPoints, setUserPoints] = useState<UserPoints[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/user-points')
            .then(res => res.json())
            .then(setUserPoints)
            .catch(() => setError('Failed to load user points'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading user points...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!userPoints.length) return <div>No user points found.</div>;

    return (
        <div>
            <h2>User Rewards / Points</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {userPoints.map((u) => (
                        <tr key={u.userId}>
                            <td>{u.userId}</td>
                            <td>{u.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
