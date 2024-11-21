'use client';
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function ResponseDisplay({ response }) {
  const [selectedOptions, setSelectedOptions] = useState(['alphabets', 'numbers', 'highest_lowercase']);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase', label: 'Highest lowercase alphabet' }
  ];

  const handleOptionChange = (value) => {
    setSelectedOptions(prev => 
      prev.includes(value)
        ? prev.filter(option => option !== value)
        : [...prev, value]
    );
  };

  const renderResponse = () => {
    const result = {};
    
    if (selectedOptions.includes('alphabets')) {
      result.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('numbers')) {
      result.numbers = response.numbers;
    }
    if (selectedOptions.includes('highest_lowercase')) {
      result.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return (
      <pre className="mt-4 p-4 bg-muted rounded-lg overflow-auto font-mono text-sm">
        {JSON.stringify(result, null, 2)}
      </pre>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {options.map(option => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={selectedOptions.includes(option.value)}
              onCheckedChange={() => handleOptionChange(option.value)}
            />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </div>
      {renderResponse()}
    </div>
  );
} 