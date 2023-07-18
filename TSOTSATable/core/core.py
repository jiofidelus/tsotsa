import requests 
from typing import List

from core.tree import Tree
from core.entry import Entries
from core.api import Wikidata, FoodOn

knowledge_graph = FoodOn.get_knowledge_graph()
# knowledge_graph = Wikidata.get_knowledge_graph()

threshold = 2
seek_depth_start = 1

def fetch_data(id: str, seek_depth: int, proximity_score: int, ) -> Tree:
    if seek_depth < threshold:
        if id in Tree.cache and not len(Tree.cache[id].children) == 0:

            tree = Tree.cache[id]

            print(id, 'from cache')
            for i in range(0, len(tree.children)):
                tree.children[i] = fetch_data(tree.children[i].value, seek_depth + 1)
                Entries.add_entry(tree.children[i].value, proximity_score)
            return tree
        
        tree = Tree(id)

        parents = knowledge_graph.get_parent_types(id)

        for parent_id in parents:
            Entries.add_entry(parent_id, proximity_score)
            subtree = fetch_data(parent_id, seek_depth + 1, proximity_score / 1.2)
            tree.add_child(subtree)
            Tree.cache[id] = subtree
                    
        return tree
    elif seek_depth == threshold:
        return Tree(id)
    else:
        return Tree('NIL')
    
def remove_duplicates(targets : List[str]) -> List[str]:
    return list(dict.fromkeys(targets))

def cea_cta(targets: List[str]) -> dict:
    print('processing', targets)

    reduced_list = remove_duplicates(targets)

    print("condensed", reduced_list)

    trees : List[Tree] = []
    for target in reduced_list:
        tree = None
        if target in Tree.cache:
            print('target from cache', target)
            tree = Tree.cache[target]
            i = 5
            for child in tree.children:
                fetch_data(child.value, seek_depth_start, i)
                i-=1
                ...
            trees.append(tree)
            continue
        else :
            tree = Tree(target)
            Tree.cache[target] = tree
            trees.append(tree)

            if not isinstance(target,str) or target == 'nan':
                continue

            search_results = knowledge_graph.search(target)
            
        i = 5
        for entry in search_results:
            tree.add_child(fetch_data(entry, seek_depth_start, i))
            i-=1
    
    cta_id = Entries.compute_max().id
    if cta_id != 'NIL':
        cta_id = knowledge_graph.add_prefix(cta_id)
    cea_list = []
    for tree in trees:
        cea_id = tree.get_cea(True)
        if cea_id != 'NIL':
            cea_id = knowledge_graph.add_prefix(cea_id)
        cea_list.append(cea_id)
    
    cea_results_list = [cea_list[reduced_list.index(target)] for target in targets]
        
    result = {
        "cta": cta_id,
        "cea_list": cea_results_list
    }

    print('result', result)
    Entries.reset_entries()

    return result
    