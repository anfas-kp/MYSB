import { useState, useEffect } from 'react';
import { SeatStatusResponse } from '../types';

export function useSeatCount() {
  const [data, setData] = useState<SeatStatusResponse>({
    cohort: 1,
    totalSeats: 10,
    seatsRemaining: 4,
    isWaitlist: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchSeats() {
      try {
        const res = await fetch('/api/seat-count');
        if (res.ok) {
          const json = await res.json();
          if (isMounted) {
            setData(json);
            setLoading(false);
          }
        } else {
          if (isMounted) setLoading(false);
        }
      } catch (err) {
        // Fallback default state
        if (isMounted) setLoading(false);
      }
    }

    fetchSeats();
    return () => {
      isMounted = false;
    };
  }, []);

  return { ...data, loading };
}
