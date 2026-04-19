// src/web/admin-panel/src/api/dashboard.ts

export async function fetchDashboardData(token: string): Promise<{ data?: string; error?: string }> {
    try {
        const response = await fetch('/api/admin/dashboard', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const data = await response.json();
            return { error: data.error || 'Failed to fetch dashboard data' };
        }
        const data = await response.json();
        return { data: data.data };
    } catch (err) {
        return { error: 'Network error' };
    }
}
