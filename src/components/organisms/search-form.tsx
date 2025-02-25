"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

type Anchor = {
  element: string;
  id: string;
  text: string;
  location: number;
};

type ResultData = {
  anchors: Anchor[];
  content: string;
  excerpt: string;
  filters: Record<string, unknown>;
  locations: number[];
  meta: {
    title: string;
    image: string;
  };
  raw_content: string;
  raw_url: string;
  sub_results: unknown[];
  url: string;
  weighted_locations: unknown[];
  word_count: number;
};

type ResultType = {
  id: string;
  data: () => Promise<ResultData>;
};

export interface PagefindWindow extends Window {
  pagefind?: {
    search: (query: string) => Promise<{ results: ResultType[] }>;
  };
}

declare const window: PagefindWindow;

export default function SearchPage() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<ResultType[]>([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const loadPagefind = async () => {
      if (!window.pagefind) {
        try {
          window.pagefind = await import(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            /* webpackIgnore: true */ '/pagefind/pagefind.js' as any
          );
        } catch {
          window.pagefind = {
            search: async () => ({ results: [] as ResultType[] }),
          };
        }
      }
    };
    loadPagefind();
  }, []);

  async function handleSearch() {
    if (window.pagefind && query.trim() !== '') {
      const search = await window.pagefind.search(query);
      setResults(search.results);
      setSearched(true);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === '') {
      setResults([]);
      setSearched(false);
    }
  }

  return (
    <div className='relative'>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-gray-300" />
      </div>
      <input
        type="text"
        placeholder="検索..."
        className="w-full pl-9 pr-9 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:ring-2 hover:ring-blue-500 hover:shadow-lg transition"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div id="results" className="mt-2 absolute z-50 bg-white w-full shadow-md rounded-md">
        {searched && results.length === 0 &&
          <div className="text-gray-500 font-bold text-sm h-[80px] rounded-md shadow-md grid place-content-center">
            見つかりませんでした
          </div>
        }
        {results.length > 0 && <h2 className="text-[12px] font-bold border-b p-2">
          検索結果: {results.length}件
        </h2>}
        <div className='overflow-y-scroll max-h-[200px]'>
          {results.map((result) => (
            <Result key={result.id} result={result} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Result({ result }: { result: ResultType }) {
  const [data, setData] = useState<ResultData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const resultData = await result.data();
      setData(resultData);
    }
    fetchData();
  }, [result]);

  if (!data) return null;

  return (
    <div>
      <Link href={data.url} className="block hover:bg-gray-100 p-2 rounded">
        <p className='text-[16px]' dangerouslySetInnerHTML={{ __html: data.excerpt.split(".")[0] }} />
      </Link>
    </div>
  );
}
