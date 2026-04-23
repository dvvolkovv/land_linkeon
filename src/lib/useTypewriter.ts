import { useEffect, useState } from 'react';

interface Options {
  phrases: string[];
  typingMs?: number;
  deletingMs?: number;
  holdMs?: number;
}

export function useTypewriter({ phrases, typingMs = 55, deletingMs = 35, holdMs = 1800 }: Options) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;
    const current = phrases[index % phrases.length];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }
    const t = setTimeout(() => {
      setText((prev) => deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1));
    }, deleting ? deletingMs : typingMs);
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, typingMs, deletingMs, holdMs]);

  return text;
}
