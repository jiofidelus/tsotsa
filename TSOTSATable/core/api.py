from typing import List
import requests
from abc import ABC, abstractmethod

class KnowledgeGraph(ABC):
    instance = None

    def __init__(self, url: str, prefix: str) -> None:
        self.prefix = prefix
        self.url = url

    def add_prefix(self, id: str):
        return f"{self.prefix}{id}"
    
    @classmethod
    def get_knowledge_graph(cls):
        ...
    @abstractmethod
    def get_naive_cea(self, query: str) -> str:
        ...
    @abstractmethod
    def search(self, query: str, nb_max_results: int = 5) -> List[str]:
        ...
    @abstractmethod
    def get_parent_types(self, resource_id: str) -> List[str]:
        ...

    
    
class Wikidata(KnowledgeGraph):
    def __init__(self) -> None:
        super().__init__('https://www.wikidata.org/w/api.php', "http://www.wikidata.org/entity/")
    
    @classmethod
    def get_knowledge_graph(cls) -> KnowledgeGraph:
        if bool(cls.instance):
            return cls.instance
        return Wikidata()

    def get_naive_cea(self, query: str) -> str:
        if not isinstance(query,str) or query == 'nan':
            return 'NIL'
    
        params = {
            'action': 'wbsearchentities',
            'language': 'en',
            'format': 'json',
            'search': query
        }

        data = requests.get(self.url, params=params).json()
        
        
        if(len(data['search']) != 0):
            return data['search'][0]["concepturi"]   
        else:
            return 'NIL'

    def search(self, query: str, nb_max_results: int = 5) -> List[str]:
        params = {
            'action': 'wbsearchentities',
            'language': 'en',
            'format': 'json',
            'search': query
        }
        
        response = requests.get(self.url, params=params).json()
        if not 'search' in response:
            return []
        
        if len(response['search']) > nb_max_results:
            search_results = response['search'][:nb_max_results]
        else:
            search_results = response['search']

        # Sort the result labels so that the closest from the target
        # gets the highest score
        search_results = sorted(search_results, key=lambda entry : eval(query, entry['label'] if 'label' in entry else ''))

        return search_results

    def get_parent_types(self, resource_id: str) -> List[str]:
        subclass_of = 'P279'
        instance_of = 'P31'
        params = {
                'action': 'wbgetentities',
                'languages': 'en',
                'format': 'json',
                'props': 'claims',
                'ids': resource_id,
            }
        response = requests.get(self.url, params=params)
        claims = response.json()['entities'][id]["claims"]
        parents = []
        for parent_link in (instance_of, subclass_of):
            if parent_link in claims:
                for parent in claims[parent_link]: 
                    parent_id = parent["mainsnak"]["datavalue"]["value"]["id"]
                    parents.append(parent_id)
        return parents

class FoodOn(KnowledgeGraph):
    def __init__(self) -> None:
        super().__init__('', "http://purl.obolibrary.org/obo/")

    def add_prefix(self, id: str):
        return id

    @classmethod
    def get_knowledge_graph(cls) -> KnowledgeGraph:
        if bool(cls.instance):
            return cls.instance
        return FoodOn()
    
    
    def get_naive_cea(self, query: str) -> str:
        if not isinstance(query,str) or query == 'nan':
            return 'NIL'
        url = 'http://www.ebi.ac.uk/ols/api/search'
        params = {
            'q' : query,
            'ontology' : 'foodon',
            'type' : 'class',
            'fieldList' : 'iri,label'
        }
        try:
            data = requests.get(url, params=params).json()
            if(len(data['response']['docs']) != 0):
                return data['response']['docs'][0]['iri']
            else:
                return 'NIL'
        except:
            return 'NIL'

    def search(self, query: str, nb_max_results: int = 5) -> List[str]:
        params = {
            'q' : query,
            'ontology' : 'foodon',
            'type' : 'class',
            'fieldList' : 'iri,label'
        }
        url = 'http://www.ebi.ac.uk/ols/api/search'

        search_results = []
        try:
            response = requests.get(url, params=params).json()

            response_number = len(response['response']['docs'])
            
            if response_number > nb_max_results:
                search_results = [response['response']['docs'][i]['iri'] for i in range(0,nb_max_results)]
            else:
                search_results = [response['response']['docs'][i]['iri'] for i in range(0,response_number)]
            
            ### There is no sorting for foodon
        except:
            ...
        finally:
            return search_results

    def get_parent_types(self, resource_id: str) -> List[str]:
        url = 'http://www.ebi.ac.uk/ols/api/ontologies/foodon/parents'
    
        params = {
            'id' : resource_id,
            'ontology' : 'foodon',
        }
        parents = []
        try:
            response = requests.get(url, params=params).json()
            for term in response['_embedded']['terms']:
                parents.append(term['iri'])
        except:
            ...
        finally:
            return parents


# def wikidata_add_prefix(id: str) -> str:
#     return f"http://www.wikidata.org/entity/{id}"

# def wikidata_get_naive_cea(query: str) -> str:
#     if not isinstance(query,str) or query == 'nan':
#         return 'NIL'
    
#     params = {
#         'action': 'wbsearchentities',
#         'language': 'en',
#         'format': 'json',
#         'search': query
#     }

#     data = requests.get(wikidata_url, params=params).json()
    
    
#     if(len(data['search']) != 0):
#         return data['search'][0]["concepturi"]   
#     else:
#         return 'NIL'
    
# def wikidata_search(query: str, max_results: int = 5) -> List[str]:
#     params = {
#         'action': 'wbsearchentities',
#         'language': 'en',
#         'format': 'json',
#         'search': query
#     }
#     response = requests.get(wikidata_url, params=params).json()
#     if len(response['search']) > max_results:
#         search_results = response['search'][:max_results]
#     else:
#         search_results = response['search']

#     # Sort the result labels so that the closest from the target
#     # gets the highest score
#     search_results = sorted(search_results, key=lambda entry : eval(query, entry['label'] if 'label' in entry else ''))

#     return search_results

# def wikidata_get_parent_types(resource_id: str) -> List[str]:
#     subclass_of = 'P279'
#     instance_of = 'P31'
#     params = {
#             'action': 'wbgetentities',
#             'languages': 'en',
#             'format': 'json',
#             'props': 'claims',
#             'ids': resource_id,
#         }
#     response = requests.get(wikidata_url, params=params)
#     claims = response.json()['entities'][id]["claims"]
#     parents = []
#     for parent_link in (instance_of, subclass_of):
#         if parent_link in claims:
#             for parent in claims[parent_link]: 
#                 parent_id = parent["mainsnak"]["datavalue"]["value"]["id"]
#                 parents.append(parent_id)
#     return parents

# def foodon_add_prefix(id: str) -> str:
#     return f"http://purl.obolibrary.org/obo/{id}"

# def foodon_get_naive_cea(query: str) -> str:
#     if not isinstance(query,str) or query == 'nan':
#         return 'NIL'
#     url = 'http://www.ebi.ac.uk/ols/api/search'
    
#     params = {
#         'q' : query,
#         'ontology' : 'foodon',
#         'type' : 'class',
#         'fieldList' : 'iri,label'
#     }

#     data = requests.get(url, params=params).json()
    
#     if(len(data['response']['docs']) != 0):
#         return data['response']['docs'][0]['iri']
#     else:
#         return 'NIL'
    
# def foodon_search(query: str, max_results: int = 5) -> List[str]:
#     params = {
#         'q' : query,
#         'ontology' : 'foodon',
#         'type' : 'class',
#         'fieldList' : 'iri,label'
#     }
#     url = 'http://www.ebi.ac.uk/ols/api/search'

#     response = requests.get(url, params=params).json()

#     response_number = len(response['response']['docs'])
    
#     if response_number > max_results:
#         search_results = [response['response']['docs'][i]['iri'] for i in range(0,max_results)]
#     else:
#         search_results = [response['response']['docs'][i]['iri'] for i in range(0,response_number)]
    
#     ### There is no sorting for foodon
#     return search_results

# def foodon_get_parent_types(resource_id: str) -> List[str]:
#     url = 'http://www.ebi.ac.uk/ols/api/ontologies/foodon/parents'
    
#     params = {
#         'id' : resource_id,
#         'ontology' : 'foodon',
#     }
#     parents = []
#     try:
#         response = requests.get(url, params=params).json()
#         for term in response['_embedded']['terms']:
#             parents.append(term['short_form'])
#     except:
#         ...
#     finally:
#         return parents
    