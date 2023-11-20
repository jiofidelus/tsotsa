import axios from "axios";
import { useState, useEffect } from "react";



export default function fetchFoodGroup() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const endpointUrl = 'https://orkg.org/triplestore';
      const sparqlQuery = `
        SELECT DISTINCT ?id_food ?food_name
        WHERE {
        ?id_food rdf:type <http://orkg.org/orkg/class/C34000> .
        ?id_food rdfs:label ?food_name .
        }
        `;

      try {
        const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
        const headers = { 'Accept': 'application/sparql-results+json' };

        const response = await axios.get(fullUrl, { headers });
        setData(response.data.results.bindings);
        console.log('success Food Groub', data)


      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, [])
  return data
};
