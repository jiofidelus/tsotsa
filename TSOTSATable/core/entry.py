from typing import List, Dict, Union


class Entry:

    def __init__(self, id: str = 'NIL', score : float = 0) -> None:
        self.id = id
        self.score = score

class Entries: 

    entries = dict()
    max : Entry = Entry()

    @classmethod
    def add_entry(cls, id : str, proximity_score: float = 1):
        if id in cls.entries:
            cls.entries[id].score += proximity_score
            return
        cls.entries[id] = Entry(id, proximity_score)

    @classmethod
    def compute_max(cls) -> Entry:
        max_score = 0
        for entry in cls.entries:
            if cls.entries[entry].score > max_score:
                cls.max = cls.entries[entry]
                max_score = cls.entries[entry].score
        return cls.max
    
    @classmethod
    def get_max(cls) -> Entry:
        return cls.max
    
    @classmethod
    def reset_entries(cls):
        cls.entries = dict()
        cls.max = Entry()
        print('__________Entries resetted_______________')


