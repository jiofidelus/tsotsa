import lodash from "lodash";
export default function normalizeSparqlResults(results) {
    var rest = lodash.groupBy(results, (x) => x.link.value)

    return rest;
    
}