'use client';
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function JsonInput({ onSubmit, error }) {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputError('');

    try {
      const parsedJson = JSON.parse(inputValue);
      if (!parsedJson.data || !Array.isArray(parsedJson.data)) {
        setInputError('Input must contain a "data" array');
        return;
      }
      onSubmit(parsedJson);
    } catch (err) {
      setInputError('Invalid JSON format');
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        className="font-mono"
        rows="4"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='{"data": ["A","C","z"]}'
      />
      <Button onClick={handleSubmit} className="w-full">
        Process Data
      </Button>
      {(inputError || error) && (
        <Alert variant="destructive">
          <AlertDescription>
            {inputError || error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
} 