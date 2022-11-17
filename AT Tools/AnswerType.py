import json 
import re

def test(file , fileResult):
    # creation des differentes Regex
    whoReg = re.compile('^Who ' , re.IGNORECASE)
    whatReg = re.compile('^What ' , re.IGNORECASE)
    whatWhichRateReg = re.compile('^(what|which)(.)+ rate ' , re.IGNORECASE)
    hasReg = re.compile('^has ' , re.IGNORECASE)
    canReg = re.compile('^can ' , re.IGNORECASE)
    correctReg = re.compile('(.)+correct' , re.IGNORECASE)
    wereReg = re.compile('^were ' , re.IGNORECASE)
    whenReg = re.compile('When' , re.IGNORECASE)
    whereReg = re.compile('^Where ' , re.IGNORECASE)
    whichReg = re.compile('^Which ' , re.IGNORECASE)
    whichIsReg = re.compile('^Which is' , re.IGNORECASE)
    whichIsTheMainReg = re.compile('^Which is the main' , re.IGNORECASE)
    whichMeanReg = re.compile('^Which means' , re.IGNORECASE)
    isToOrReg = re.compile('^is (.)+ to (.)+ or ' , re.IGNORECASE)
    whomReg = re.compile('Whom' , re.IGNORECASE)
    compareReg = re.compile('(.)*(equal|less|greater|great|lesser) (.)+ to|than (.)+' , re.IGNORECASE)
    IsLessReg = re.compile('(.)*(is|was|does|do|did) +(.)+ (less|greater|equal|upper)(.) +' , re.IGNORECASE)
    whoseReg = re.compile('^Whose ' , re.IGNORECASE)
    whyReg = re.compile('^Why ' , re.IGNORECASE)
    ofWhichReg = re.compile('^of which' , re.IGNORECASE)
    isReg = re.compile('^is ' , re.IGNORECASE)
    listReg = re.compile('^list ' , re.IGNORECASE)
    howManyReg = re.compile('(.)*how many ' , re.IGNORECASE)
    doesReg = re.compile('^does ' , re.IGNORECASE)
    nameDReg = re.compile('^name ' , re.IGNORECASE)
    withinReg = re.compile('Within ' , re.IGNORECASE)
    whateverReg = re.compile('whatever ' , re.IGNORECASE)
    addressReg = re.compile('(.)* address (.)' , re.IGNORECASE)
    symbolReg = re.compile('(.)* symbol (.)' , re.IGNORECASE)
    iDReg = re.compile('(.)* ID (.)' , re.IGNORECASE)
    whatIstheNameOfTheReg = re.compile('^What is the name of (.)' , re.IGNORECASE)
    nameCombineReg = re.compile('^(what|name|tell|who|in|which|onwhich)(.)name(.)' , re.IGNORECASE)
    whatIsTheNumberOfReg = re.compile('(.)* What is the number of (.)' , re.IGNORECASE)
    whatMethodReg = re.compile('^(what|which)* method' , re.IGNORECASE)
    numberReg = re.compile('(.)* number*(.)' , re.IGNORECASE)
    whatIsTheNumberOfDReg = re.compile('^What is the number of (.)' , re.IGNORECASE)
    whatNumberReg = re.compile('^(what|which|list|the|who)*(.)+ number(.)' , re.IGNORECASE)
    whatIsNumberofReg = re.compile('^What is number (.)' , re.IGNORECASE)
    dateReg = re.compile('(.)* date (.)' , re.IGNORECASE)
    thePopulationOfReg = re.compile('(.)* the population of (.)' , re.IGNORECASE)
    pronunciationAudioReg = re.compile('(.)* pronunciation audio (.)' , re.IGNORECASE)
    pronunciationReg = re.compile('(.)*pronunciation (.)' , re.IGNORECASE)
    humanPopulationReg = re.compile('(.)* human population (.)' , re.IGNORECASE)
    theEndTimeReg = re.compile('(.)* the end time (.)' , re.IGNORECASE)
    theStartTimeReg = re.compile('(.)* the start time (.)' , re.IGNORECASE)
    iDQReg = re.compile('(.)* ID' , re.IGNORECASE)
    howManyQReg = re.compile('(.)* how many' , re.IGNORECASE)
    codeQReg = re.compile('(.)* code' , re.IGNORECASE)
    coordinatesQReg = re.compile('(.)* coordinates' , re.IGNORECASE)
    codeReg = re.compile('(.)*code (.)' , re.IGNORECASE)
    whatIsInTheReg = re.compile('^what is in the ' , re.IGNORECASE)
    didReg = re.compile('did ' , re.IGNORECASE)
    atWhatReg = re.compile('^At what ' , re.IGNORECASE)
    atWhatPositionReg = re.compile('^At what position ' , re.IGNORECASE)
    atWhatAgeReg = re.compile('^At (what|which) age ' , re.IGNORECASE)
    wasReg = re.compile('^was ' , re.IGNORECASE)
    inWhatYearReg = re.compile('^In (what|which) year ' , re.IGNORECASE)
    inWhatReg = re.compile('^In what ' , re.IGNORECASE)
    inWhichReg = re.compile('^In which ' , re.IGNORECASE)
    inWhichYearReg = re.compile('^In which year ' , re.IGNORECASE)
    inWhichYearEReg = re.compile('In (what|which) year ' , re.IGNORECASE)
    inWhichCountryReg = re.compile('^In which country ' , re.IGNORECASE)
    inWhichCityReg = re.compile('^In which year ' , re.IGNORECASE)
    whichYearReg = re.compile('^which year ' , re.IGNORECASE)
    doReg = re.compile('^Do ' , re.IGNORECASE)
    fromWhatReg = re.compile('^from what ' , re.IGNORECASE)
    howDidReg = re.compile('^how did ' , re.IGNORECASE)
    theReg = re.compile('^the ' , re.IGNORECASE)
    isOrReg = re.compile('^is (.)+ or ' , re.IGNORECASE)
    doesOrReg = re.compile('^does(.)+ or ' , re.IGNORECASE)
    didOrReg = re.compile('^did (.)+ or ' , re.IGNORECASE)
    wasOrReg = re.compile('^was(.)+ or ' , re.IGNORECASE)
    doOrReg = re.compile('^do(.)+ or ' , re.IGNORECASE)
    inHowManyReg = re.compile('(in|on)+ how +(many|much) ' , re.IGNORECASE)
    countNumOfReg = re.compile('count the ' , re.IGNORECASE)
    areReg = re.compile('^are ' , re.IGNORECASE)
    whatICDReg = re.compile('^(.)* ICD *(.)' , re.IGNORECASE)
    pronounceReg = re.compile('^(.)* pronounce *(.)' , re.IGNORECASE)
    whatQuantityReg = re.compile('^(what|which)* quantity *(.)' , re.IGNORECASE)
    whatWhichPackageReg = re.compile('^(what|which)* package *(.)' , re.IGNORECASE)
    whatIsNumberReg = re.compile('^(what|which)*(is|was)+number(.)' , re.IGNORECASE)
    howMuchReg = re.compile('how much ' , re.IGNORECASE)
    Q4Reg = re.compile('^(.)*Q48460*(.)' , re.IGNORECASE)
    whatYearReg = re.compile('^what year ' , re.IGNORECASE)
    countryCodeReg = re.compile('country code' , re.IGNORECASE)
    whatAmountReg = re.compile('^what amount ' , re.IGNORECASE)
    GiveCountReg = re.compile('^Give(.)+count (.)' , re.IGNORECASE)
    CountReg = re.compile('(.)*count ' , re.IGNORECASE)
    isTrueReg = re.compile('(.)*is (.)+ true' , re.IGNORECASE)
    
    with open(file, 'r' , encoding="utf8") as rf:
        category = ""
        questions = json.load(rf)
        counter = len(questions)
        qcount = 0
        with open(fileResult, 'a', encoding='utf-8')as result:
            result.write('[\n')
        for question in questions :
            qcount+=1
            if withinReg.match(question['question']):
                category = "resource"
                type = []
            elif  hasReg.match(question['question']):
                category = "boolean"
                type = ["boolean"]
            elif  wereReg.match(question['question']):
                category = "boolean"
                type = ["boolean"]
            elif listReg.match(question['question']):
                category = "resource"
                type = []
            elif  canReg.match(question['question']):
                category = "boolean"
                type = ["boolean"]
            elif CountReg.match(question['question']):
                category = "literal"
                type = ["number"]
            elif addressReg.match(question['question']):
                category = "literal"
                type = ["string"]
            elif symbolReg.match(question['question']):
                category = "literal"
                type = ["string"]
            elif Q4Reg.match(question['question']):
                category = "literal"
                type = ["string"]
                
            elif iDReg.match(question['question']):
                    category = "literal"
                    type = ["number"]
            elif dateReg.match(question['question']):
                    category = "literal"
                    type = ["date"]
            elif pronunciationAudioReg.match(question['question']):
                    category = "literal"
                    type = ["string"]
            elif pronunciationReg.match(question['question']):
                    category = "literal"
                    type = ["string"]
            
            elif pronunciationAudioReg.match(question['question']):
                    category = "literal"
                    type = ["string"]
            elif pronounceReg.match(question['question']):
                    category = "literal"
                    type = ["string"]
            elif thePopulationOfReg.match(question['question']):
                    category = "literal"
                    type = ["number"]
            elif humanPopulationReg.match(question['question']):
                    category = "literal"
                    type = ["number"]
            elif theEndTimeReg.match(question['question']):
                    category = "literal"
                    type = ["date"]
            elif theStartTimeReg.match(question['question']):
                    category = "literal"
                    type = ["date"]
            elif iDQReg.match(question['question']):
                    category = "literal"
                    type = ["number"]
            elif howManyQReg.match(question['question']):
                    category = "literal"
                    type = ["number"]
            elif codeQReg.match(question['question']):
                    category = "literal"
                    type = ["number"]
            elif coordinatesQReg.match(question['question']):
                    category = "literal"
                    type = ["number"]
            elif codeReg.match(question['question']):
                    category = "literal"
                    type = ["number"]
            elif GiveCountReg.match(question['question']):
                    category= "literal"
                    type = ["number"]
            elif whateverReg.match(question['question']):
                category = "resource"
                type = []
            elif whoReg.match(question['question']):
                category = "resource"
                type = []
                
            elif  howMuchReg.match(question['question']):
                category = "literal"
                type = ["number"]
            elif  countryCodeReg.match(question['question']):
                    category = "literal"
                    type = ["number"]    
            #test du matching avec What    
            elif  whatReg.match(question['question']):
                if whatYearReg.match(question['question']):
                    category ="literal"
                    type = ["date"]
                elif whatWhichRateReg.match(question['question']):
                    category ="literal"
                    type = ["number"]
                elif whatWhichPackageReg.match(question['question']):
                    category ="literal"
                    type = ["string"]
                elif whatIsNumberReg.match(question['question']):
                    category ="literal"
                    type = ["number"]
                elif whatNumberReg.match(question['question']):
                    category ="literal"
                    type = ["number"]
                elif whatQuantityReg.match(question['question']):
                    category ="literal"
                    type = ["number"]
                elif whatMethodReg.match(question['question']):
                    category ="literal"
                    type = ["string"]
                elif whatICDReg.match(question['question']):
                    category ="literal"
                    type = ["number"]
                elif whatIsTheNumberOfReg.match(question['question']):
                    category ="literal"
                    type = ["number"]
                elif whatIsTheNumberOfDReg.match(question['question']):
                    category ="literal"
                    type = ["number"]
                elif whatIstheNameOfTheReg.match(question['question']):
                    category ="resource"
                    type = []
                elif whatIsNumberofReg.match(question['question']):
                    category ="literal"
                    type = ["number"]
                elif whatIsInTheReg.match(question['question']):
                    category ="literal"
                    type = ["string"]
                elif whatAmountReg.match(question['question']):
                    category = "literal"
                    type = ["number"]
                else :
                    category = "resource"
                    type = []
                
            # test du matching avec When       
            elif whenReg.match(question['question']):
                category = "literal"
                type = ["date"]
            #test du matching avec Where    
            elif  whereReg.match(question['question']):
                category = "resource"
                type = []
            elif  IsLessReg.match(question['question']):
                    category = "boolean"
                    type = ["boolean"]
            elif  compareReg.match(question['question']):
                    category = "boolean"
                    type = ["boolean"]        
            # test du matching avec Which       
            elif whichReg.match(question['question']):
                if   whichIsTheMainReg.match(question['question']):
                    category = "resource"
                    type = []
                elif whatICDReg.match(question['question']):
                    category ="literal"
                    type = ["number"]
                elif whatIsNumberReg.match(question['question']):
                    category ="literal"
                    type = ["number"]
                elif whatQuantityReg.match(question['question']):
                    category ="literal"
                    type = ["number"]
                elif whatWhichRateReg.match(question['question']):
                    category ="literal"
                    type = ["number"]
                elif whichMeanReg.match(question['question']):
                    category = "literal"
                    type = ["string"]
                elif whichIsReg.match(question['question']):
                    category = "literal"
                    type = ["string"]
                elif whichYearReg.match(question['question']):
                    category = "literal"
                    type = ["date"]
                else:
                    category = "resource"
                    type = []
                    
            #test du matching avec Whom,    
            elif  whomReg.match(question['question']):
                category = "resource"
                type = []
                    
            # test du matching avec Whose       
            elif whoseReg.match(question['question']):
                category = "resource"
                type = []
                    
            #test du matching avec Why    
            elif  whyReg.match(question['question']):
                category = "resource"
                type = []
            #test du matching avec Of Which    
            elif  ofWhichReg.match(question['question']):
                category = "resource"
                type = []
            elif  inHowManyReg.match(question['question']):
                category = "literal"
                type = ["number"]
            elif  howManyReg.match(question['question']):
                category = "literal"
                type = ["number"]
            
            elif  inWhichReg.match(question['question']):
                if  inWhichYearReg.match(question['question']):
                    category = "literal"
                    type = ["date"]
                if  inWhichYearEReg.match(question['question']):
                    category = "literal"
                    type = ["date"]
                elif  inWhichCityReg.match(question['question']):
                    category = "resource"
                    type = []
                elif  inWhichCountryReg.match(question['question']):
                    category = "resource"
                    type = []
                else:
                    category = "resource"
                    type = []
                    
            #test du matching avec Is    
            elif  isReg.match(question['question']):
                if  isToOrReg.match(question['question']):
                    category = "boolean"
                    type = ["boolean"]
                elif isOrReg.match(question['question']):
                    category= "resource"
                    type = []
                
                elif isTrueReg.match(question['question']):
                    category="boolean"
                    type = ["boolean"]
                else:
                    category = "boolean"
                    type = ["boolean"]
                       
            #test du matching avec How Many    
            #elif  howManyReg.match(question['question']):
                #category = "literal"
                #type = ["number"]
            elif isTrueReg.match(question['question']):
                    category="boolean"
                    type = ["boolean"]
            elif correctReg.match(question['question']):
                    category= "boolean"
                    type = ["boolean"]        
            #test du matching avec Does    
            elif  doesReg.match(question['question']):
                if doesOrReg.match(question['question']):
                    category= "resource"
                    type = []
                elif whatICDReg.match(question['question']):
                    category ="literal"
                    type = ["number"]
                else:
                    category = "boolean"
                    type = ["boolean"]
                    
            #test du matching avec Name    
            elif  nameDReg.match(question['question']):
                category = "resource"
                type = []
                    
            #test du matching avec Did    
            elif  didReg.match(question['question']):
                if didOrReg.match(question['question']):
                    category= "resource"
                    type = []
                else:
                    category = "boolean"
                    type = ["boolean"]
                    
            #test du matching avec At what    
            elif  atWhatReg.match(question['question']):
                if atWhatPositionReg.match(question['question']):
                    category = "resource"
                    type = []
                elif atWhatAgeReg.match(question['question']):
                    category ="literal"
                    type = ["number"]
                else:
                    category = "literal"
                    type = ["date"]
            elif  wasReg.match(question['question']):
                if wasOrReg.match(question['question']):
                    category= "resource"
                    type = []
                else:
                    category = "boolean"
                    type = ["boolean"]
            
            elif  inWhatReg.match(question['question']):
                if  inWhatYearReg.match(question['question']):
                    category = "literal"
                    type = "date"
                if  inWhichYearReg.match(question['question']):
                    category = "literal"
                    type = "date"
                else:
                    category = "resource"
                    type = []
            elif  doReg.match(question['question']):
                if doOrReg.match(question['question']):
                    category= "resource"
                    type = []
                else:
                    category = "boolean"
                    type = ["boolean"]
            elif  fromWhatReg.match(question['question']):
                category = "resource"
                type = []
            elif  howDidReg.match(question['question']):
                category = "resource"
                type = []
            elif  theReg.match(question['question']):
                category = "resource"
                type = []
            elif  countNumOfReg.match(question['question']):
                category = "literal"
                type = ["number"]
            elif  areReg.match(question['question']):
                category = "boolean"
                type = ["boolean"]
            elif numberReg.match(question['question']):
                    category ="literal"
                    type = ["number"]
            else:
                category ="resource"
                type = []
            with open(fileResult, 'a' , encoding="utf8") as result:
                question['question'] = re.sub('\"|',"",question['question'])
                if qcount!= counter:
                    result.write('{\n'+ '\t"id":' + str(question['id'])+ ',\n' +'\t"question":'+ '"'+str(question['question'])+'"' +',\n' + '\t"category":' + '"'+str(category)+ '"'+ ',\n'+'\t"type":' + '"'+str(type)+ '"'+ '\n'+ '},\n')
                else:
                    result.write('{\n'+ '\t"id":' + str(question['id'])+ ',\n' +'\t"question":'+ '"'+str(question['question'])+'"' +',\n' + '\t"category":' + '"'+str(category)+ '"'+ ',\n'+'\t"type":' + '"'+str(type)+ '"'+ '\n'+ '}\n')
        with open(fileResult, 'a', encoding='utf-8')as result:
            result.write(']\n')
    return fileResult            
#test('smart-2022-datasets-main/smart-2022-datasets-main/AT_answer_type_prediction/wikidata/SMART2022-AT-wikidata-test.json', 'SMART2022-AT-wikidata-test.json')
test('clean-2022-dbpedia.json', 'result-dbpedia-2022.json')


def cleanTrain(TrainFile, cleanTrainFile):
    with open(TrainFile , 'r' , encoding='utf-8') as dirty:
        dirtiesQuestion = json.load(dirty)
        with open(cleanTrainFile, 'w' , encoding="utf8") as clean:
            for question in dirtiesQuestion:
                    question['question'] = re.sub('\"|',"",question['question'])
                    clean.write('{\n'+ '\t"id":' + str(question['id'])+ ',\n' +'\t"question":'+ '"'+str(question['question'])+'"' +'\n' + '},\n')

#cleanTrain('AT_resource_DBpedia.json',"AT_resource_result_DBpedia.json")


        