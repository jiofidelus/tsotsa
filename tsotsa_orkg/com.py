import requests
import json

data_format = {
    "thing_type": "COMPARISON",
    "thing_key": "R838000",
    "config": {
        "contributions": [
            "R837784",
            "R837785"
        ],
        "predicates": [],
        "type": "PATH",
        "transpose": False
    },
    "data": {
    }
}


def compare_contribution(data):

    headers = {
        'Content-Type': 'application/json'
    }
    url = "https://incubating.orkg.org/simcomp/contribution/compare?contributions=R837784&contributions=R837785&type=PATH"

    response = requests.get(url, headers=headers)
    response_decoded = json.loads(response.content)

    data["data"]['contributions'] = response_decoded['payload']['comparison']['contributions']
    data['data']['predicates'] = response_decoded['payload']['comparison']['predicates']
    data['data']['data'] = response_decoded['payload']['comparison']['data']

    output_file = "data.json"
    with open(output_file, "w") as file:
        json.dump(data, file)
    return data

# data = compare_contribution(data_format)


def create_comparison(data):
    headers = {
        'Content-Type': 'application/json'
    }

    url = "https://incubating.orkg.org/simcomp/thing/"
    response = requests.post(url, headers=headers,
                             data=compare_contribution(data))
    print(response.content)


create_comparison(data_format)
