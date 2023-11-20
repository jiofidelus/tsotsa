import axios from "axios";
import { useState, useEffect } from "react";

export default function fetchCountry() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const endpointUrl = 'https://orkg.org/triplestore';
            const sparqlQuery = `
                SELECT ?id_country ?country
                WHERE {
                ?id_country rdf:type <http://orkg.org/orkg/class/C20015> .
                ?id_country rdfs:label ?country
                }`;

            try {
                const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
                const headers = { 'Accept': 'application/sparql-results+json' };

                const response = await axios.get(fullUrl, { headers });
                setData(response.data.results.bindings);



                console.log('success country', data)

            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        fetchData();
    }, [])

    return data
}
