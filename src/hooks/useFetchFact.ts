import { useState, useEffect } from 'react';

import { FACT_API_URL} from '@env';

const useFetchFact = () => {

  const [fact, setFact] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchFact = async () => {

        const url = FACT_API_URL; // public API endpoint

        try {

            const response = await fetch(url, 
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                }
            );
            const data = await response.json();
            setFact(data.text);
            setLoading(false);

        } catch (err) {

            setError("Failed to fetch fact:" + err);
            setLoading(false);
            
        }

        };

        fetchFact();

    }, []);

    return { fact, loading, error };

};

export default useFetchFact;

