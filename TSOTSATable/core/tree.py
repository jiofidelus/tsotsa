from typing import List
from core.entry import Entries

class Tree:

    cache = dict()

    def __init__(self, value):
        self.value = value 
        self.children : List[Tree] = []

    def add_child(self, tree):
        self.children.append(tree)
    
    def prefixed_display(self):
        print(self.value, "")
        for child in self.children:
            child.prefixed_display()
        
    def get_cea(self, flag=False) -> str:
        cta_id = Entries.get_max().id
        if self.value == cta_id:
            return self.value
        else:
            for child in self.children:
                child_cea = child.get_cea()
                if child_cea != 'NIL':
                    if flag:
                        return child_cea
                    return self.value
            return 'NIL'
