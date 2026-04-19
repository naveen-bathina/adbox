// src/web/admin-panel/src/api/admin.ts

export async function adminLogin(email: string, password: string): Promise<{ token?: string; error?: string }> {
    try {
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            const data = await response.json();
            return { error: data.error || 'Login failed' };
        }
        const data = await response.json();
        return { token: data.token };
    } catch (err) {
        return { error: 'Network error' };
    }
}
