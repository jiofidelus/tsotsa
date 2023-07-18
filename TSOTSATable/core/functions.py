import os
from typing import List
import pandas
from core.api import Wikidata, FoodOn
from core.core import cea_cta
import re

clean_files_folder = 'inputs'
output_files_folder = 'outputs'

knowledge_graphs = ('foodon', 'wikidata')
annotation_file_types = ('cea', 'cta', 'cpa')

kg = FoodOn.get_knowledge_graph()

def get_files_list(folder : str) -> List[str]:
    file_list = [os.path.join(folder,node) for node in os.listdir(folder) if os.path.isfile(os.path.join(folder,node)) and node.endswith('.csv')]
    return file_list

def get_annotation_file(file_type: str, knowledge_graph : str) -> pandas.DataFrame:
    if(knowledge_graph not in knowledge_graphs):
        raise Exception(f'Knowledge graph must be in {knowledge_graphs}')
    if(file_type not in annotation_file_types):
        raise Exception(f'File type must be in {annotation_file_types}')
    
    file = os.path.join(output_files_folder, knowledge_graph, f'{file_type}.csv')
    try:
        file_dataframe = pandas.read_csv(file)
    except FileNotFoundError:
        file_dataframe = pandas.DataFrame()

    return file_dataframe

def save_annotation_file(file_type: str, dataframe: pandas.DataFrame, knowledge_graph : str):
    if(knowledge_graph not in knowledge_graphs):
        raise Exception(f'Knowledge graph must be in {knowledge_graphs}')
    if(file_type not in annotation_file_types):
        raise Exception(f'File type must be in {annotation_file_types}')
    
    file = os.path.join(output_files_folder, knowledge_graph, f'{file_type}.csv')
    dataframe.to_csv(file, index=False)
    print("updated file", file_type)

def get_cea_file(knowledge_graph : str) -> pandas.DataFrame:
    return get_annotation_file('cea', knowledge_graph)

def save_cea_file(dataframe: pandas.DataFrame, knowledge_graph : str):
    save_annotation_file('cea', dataframe, knowledge_graph)


def get_cta_file(knowledge_graph : str) -> pandas.DataFrame:
    return get_annotation_file('cta', knowledge_graph)

def save_cta_file(dataframe: pandas.DataFrame, knowledge_graph : str):
    save_annotation_file('cta', dataframe, knowledge_graph)


def get_cpa_file(knowledge_graph : str) -> pandas.DataFrame:
    return get_annotation_file('cpa', knowledge_graph)

def save_cpa_file(dataframe: pandas.DataFrame, knowledge_graph : str):
    save_annotation_file('cpa', dataframe, knowledge_graph)


cpa_headers = ['file', 'col0', 'colx', 'URI']

def generate_annotation_files(knowledge_graph_name:str):

    csv_file_list = get_files_list(clean_files_folder)
    cea_dataframe = get_cea_file(knowledge_graph_name)
    cta_dataframe = get_cta_file(knowledge_graph_name)
    for csv_file in csv_file_list:
        file = pandas.read_csv(csv_file, header=None)
        row_nb = file.shape[0]
        col_nb = file.shape[1]
        file_name = os.path.splitext(os.path.basename(csv_file))[0]
        print(f"file {csv_file}")
        for col in range(0, col_nb):
            print(file.iloc[0:row_nb,col])
            should_annotate = determine_should_annotate(file.iloc[0:row_nb,col])
            print('should continue ? ', should_annotate)
            if should_annotate == 'n':
                cell_value = file.iloc[0, col]
                print(f'Annotating cell {0}-{col} : "{cell_value}"')
                uri = kg.get_naive_cea(cell_value)
                # uri = ""
                cea_new_line = pandas.DataFrame({"file": [file_name], "col": [col], "row": [0], "URI": [uri]})
                cea_dataframe = pandas.concat([cea_dataframe, cea_new_line])

                cta_new_line = pandas.DataFrame({"file": [file_name], "col": [col], "URI": [uri]})
                cta_dataframe = pandas.concat([cta_dataframe, cta_new_line])
            elif should_annotate == 'y':
                result = _cea_cta(file.iloc[0:row_nb,col])
                # print(result)
                cta = result["cta"]
                cea_list = result["cea_list"]
                cta_new_line = pandas.DataFrame({"file": [file_name], "col": [col], "URI": [cta]})
                cta_dataframe = pandas.concat([cta_dataframe, cta_new_line])
                for row in range(0, row_nb):
                    cea_new_line = pandas.DataFrame({"file": [file_name], "col": [col], "row": [row], "URI": [cea_list[row]]})
                    cea_dataframe = pandas.concat([cea_dataframe, cea_new_line])
                    
        save_cea_file(cea_dataframe,knowledge_graph_name)
        save_cta_file(cta_dataframe,knowledge_graph_name)

# a regex to identify altered numeric values or percentages
def is_number(val: str) -> bool:
    return bool(re.fullmatch(' *[+-]?(\(?\d+\.*/*[a-z%]? *)+\)?', val) )

def determine_should_annotate(df:pandas.DataFrame) -> str:
    row_nb = df.shape[0]
    try:
        match = is_number(df.iloc[0]) or is_number(df.iloc[1])
        if row_nb <= 2 and match:
            return 'n'
    except:
        ...

    nb_numeric_cells = 0
    for row in range(0, row_nb):
        if nb_numeric_cells > 2:
            return 'n'
        else:
            if isinstance(df.iloc[row],str) and df.iloc[row] != 'nan':
                if is_number(df.iloc[row]):
                    nb_numeric_cells += 1
    return 'y'

def _cea_cta(df:pandas.DataFrame) -> dict:
    row_nb = df.shape[0]
    cells = []
    for row in range(0, row_nb):
        cells.append(df.iloc[row])
        
    return cea_cta(cells)

    ...


