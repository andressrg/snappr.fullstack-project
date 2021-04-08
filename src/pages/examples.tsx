import * as React from 'react';
import { useFetch } from 'react-async';

export default function ExamplesPage() {
  const getDataFetch = useFetch<{ title?: string }>('/api/example', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return (
    <>
      <h1>Examples</h1>

      <button
        disabled={getDataFetch.isLoading}
        onClick={() => {
          getDataFetch.run({
            body: JSON.stringify({
              postPath:
                '/no-vacancy-how-to-attract-tenants-with-professional-photography',
            }),
          });
        }}
      >
        {getDataFetch.isLoading ? 'Fetching...' : 'Get Snappr blog post title'}
      </button>

      <br />
      <br />

      {getDataFetch.data?.title != null && (
        <>Fetched title: {getDataFetch.data?.title}</>
      )}
    </>
  );
}
