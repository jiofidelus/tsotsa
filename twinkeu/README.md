# Twinkeu 

<img src='assets/logo_home.jpg' height=80 width=100/>

## Description

## Dependancies Requirements

#### Dependancies to run app in local

    * node version >=18 and stable
    * expo-cli: To debug application
    * eas-cli: to build apk 
    * expo Go: allow to see the render of the application developed in the device android, ios and emulator

## Launch application in Local

Open the project in you terminal and then run this command <br>

* Install dependancies of the application.

   ```
    npm install
   ```

* Launch the server

    ```bash
    npm start
    ```

* Open expo go install in your android device and Scan the QRcode 
  
## Navigation inside application

    Actually Twinkeu have three main screen that are:

    1. The Home Screnn that contain Tte differents criteria to search a food and see his composition.
      
       * Criteria
         * Continent
         * Country
         * Food Group
         * Food
  
    2. Food group Screen That contain the list of all food group. Actually make a general search for a given food group
   
    3. Detail Screen for a given food group that contain the name and the description of this food groupd with a source link to get it in ORKG plateform.


## Build Apk

1. Android device
   
```bash
eas build -p android --profile preview
```

2. IOS device
   
   * Navigate in eas.json file and replace the code by this:
  
    ```bash
    {
    "build": {
        "preview": {
        "ios": {
            "simulator": true
        }
        },
        "production": {}
    }
    }

    ```

    * Run command to build apk
  
    ```bash
    eas build -p ios --profile preview
    ```