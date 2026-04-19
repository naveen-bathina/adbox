import React, { useEffect, useState } from 'react';

interface SurveyQuestion {
    text: string;
    type: string;
    options: string[];
}

interface SurveyCreateDto {
    title: string;
    description: string;
    type: string;
    questions: SurveyQuestion[];
}

export const SurveyList: React.FC = () => {
    const [surveys, setSurveys] = useState<SurveyCreateDto[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/admin/surveys')
            .then(res => res.json())
            .then(setSurveys)
            .catch(() => setError('Failed to load surveys'));
    }, []);

    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!surveys.length) return <div>No surveys found.</div>;

    const handleDelete = async (index: number) => {
        await fetch(`/api/admin/surveys/${index}`, { method: 'DELETE' });
        setSurveys(surveys => surveys.filter((_, i) => i !== index));
    };

    // Minimal edit: just prompt for new title/description
    const handleEdit = async (index: number) => {
        const title = prompt('New title:', surveys[index].title);
        const description = prompt('New description:', surveys[index].description);
        if (title && description) {
            const updated = { ...surveys[index], title, description };
            await fetch(`/api/admin/surveys/${index}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated)
            });
            setSurveys(surveys => surveys.map((s, i) => i === index ? updated : s));
        }
    };

    return (
        <div>
            <h2>Survey List</h2>
            <ul>
                {surveys.map((s, i) => (
                    <li key={i}>
                        <b>{s.title}</b> - {s.description}
                        <button onClick={() => handleEdit(i)} style={{marginLeft:8}}>Edit</button>
                        <button onClick={() => handleDelete(i)} style={{marginLeft:4}}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
