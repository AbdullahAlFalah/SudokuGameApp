import { useState, useEffect } from 'react';

const useFetchFact = () => {

  const [fact, setFact] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchFact = async () => {

        const url = `https://uselessfacts.jsph.pl/api/v2/facts/today`;

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

