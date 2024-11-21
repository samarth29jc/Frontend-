'use client';
import { useState, useEffect } from 'react';
import JsonInput from '@/components/JsonInput';
import ResponseDisplay from '@/components/ResponseDisplay';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "ABCD123"; // Replace with your roll number
  }, []);

  const handleSubmit = async (jsonData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bfhl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData)
      });
      
      const data = await response.json();
      if (!data.is_success) {
        setError(data.error);
        return;
      }
      
      setApiResponse(data);
      setError(null);
    } catch (err) {
      setError('Failed to process request');
    }
  };

  return (
    <main className="container mx-auto p-4 max-w-3xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Data Processor</CardTitle>
        </CardHeader>
        <CardContent>
          <JsonInput onSubmit={handleSubmit} error={error} />
        </CardContent>
      </Card>
      
      {apiResponse && (
        <Card>
          <CardHeader>
            <CardTitle>Response</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponseDisplay response={apiResponse} />
          </CardContent>
        </Card>
      )}
    </main>
  );
}
