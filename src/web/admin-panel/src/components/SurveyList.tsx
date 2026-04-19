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

  if (error) return <div style={{color:'red'}}>{error}</div>;
  if (!surveys.length) return <div>No surveys found.</div>;

  return (
    <div>
      <h2>Survey List</h2>
      <ul>
        {surveys.map((s, i) => (
          <li key={i}>
            <b>{s.title}</b> - {s.description}
          </li>
        ))}
      </ul>
    </div>
  );
};
