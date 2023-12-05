import requests
from data import load_data_json_contribution, data_app, prop_ids


class TSOTSA_ORKG:

    def __init__(self):

        self.paper = {}
        self.contribution = {}
        self.ressource = {}
        self.predicate = {}
        self.comparison = {}

        self.api = "https://incubating.orkg.org/api/"  # orkg incubation api
        # self.api = "https://orkg.org/api"
        self.full_api = ""

    # fetch a specific contribution
    def get_contribution(self, contribution_id):
        """ 
            structure of a contribution in json format
        """
        api_contrib = "contributions/"
        self.full_api = self.api + api_contrib + f"{contribution_id}"
        try:
            response = requests.get(self.full_api)

            self.contribution = {
                'status': 200,
                'message': 'success',
                'content': response.content
            }

            # print(self.contribution)

            return self.contribution
        except ValueError as e:
            print(str(e))

    # fetch all contribution

    def get_list_contribution(self, list_contribution_ids=None):
        """ 
            structure of the contributions in json format

        """
        lis_contrib = []
        # get list contributions by enter their ids
        if list_contribution_ids is not None:
            for ids in list_contribution_ids:
                self.full_api = f"{self.api}/contributions/{ids}"

                try:
                    response = requests.get(self.full_api)

                    self.contribution = response.content
                    lis_contrib.append(self.contribution)

                except ValueError as e:
                    print(str(e))
            self.contribution = {
                'status': 200,
                'message': 'success',
                'content': lis_contrib
            }
        # it a list ids is not given, fecth all contribution
        else:
            self.full_api = f"{self.api}/contributions"
            try:
                response = requests.get(self.full_api)
                self.contribution = {
                    'status': 200,
                    'message': 'success',
                    'content': response.content
                }
            except ValueError as e:
                print(e)
        return self.contribution

    # create contribution
    def create_contribution(self):
        headers = {
            "Content-Type": "application/vnd.orkg.contribution.v2+json;charset=UTF-8",
            "Accept": "application/vnd.orkg.contribution.v2+json"
        }

        self.full_api = f"{self.api}/papers/R837008/contributions"
        try:
            for data in load_data_json_contribution(data_json=data_app, property_ids=prop_ids):
                response = requests.post(
                    self.full_api, data=data, headers=headers)

                if response.status_code == 204:
                    print("Success")
                else:
                    print("Not Success", response.content, response.status_code)
        except ValueError as e:
            print(e)

    # fetch a specific contribution

    def get_comparison(self, contribution_id):
        """ 
            structure of a contribution in json format

        """
        return self.comparison

    # fetch all contribution
    def get_list_comparison(self):
        """ 
            structure of the contributions in json format

        """
        return self.comparison

    # create conparison

    def create_comparison(self):
        return self.comparison
