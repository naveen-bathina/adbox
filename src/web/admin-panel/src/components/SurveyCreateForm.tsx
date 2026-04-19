import React, { useState } from 'react';

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

interface Props {
  onCreated?: (survey: SurveyCreateDto) => void;
}

export const SurveyCreateForm: React.FC<Props> = ({ onCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('survey');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const survey: SurveyCreateDto = {
      title,
      description,
      type,
      questions: [
        { text: 'How satisfied are you?', type: 'rating', options: ['1', '2', '3', '4', '5'] }
      ]
    };
    try {
      const res = await fetch('/api/admin/surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(survey)
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to create survey');
        return;
      }
      setSuccess(true);
      if (onCreated) onCreated(survey);
    } catch {
      setError('Network error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Survey/Ad</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Create</button>
      {error && <div style={{color:'red'}}>{error}</div>}
      {success && <div style={{color:'green'}}>Survey created!</div>}
    </form>
  );
};
