//Custom funtions Module
const _fcts = require('./function.js');  
const _terms = require('./terms.js');  

async function RL_main(){
    //Train Bayes classifier
    let train_file = "External_data/SMART2022-RL-wikidata-train.json";
    let input_file = "External_data/SMART2021-RL-wikidata-test.json";  
    if(false){//Development Phase
        let RL_classifier =  await _fcts.NBayes_RL_1step(train_file,1)
        let RL_classifier2 =  await _fcts.NBayes_RL_1step(train_file,2)
        let RL_classifier3 =  await _fcts.NBayes_RL_1step(train_file,3)
        let RL_classifier4 =  await _fcts.NBayes_RL_1step(train_file,4)
        RL_classifier.train()
        RL_classifier2.train()
        RL_classifier3.train()
        RL_classifier4.train()
        //Test phase
        console.log(">>>>res1")
        console.log(RL_classifier.classify('what film did lloyd richards direct?'));    
        console.log(RL_classifier.classify(_fcts.remove_words('what film did lloyd richards direct?',_fcts.RL_rwords)));    
        console.log(RL_classifier.classify(_fcts.remove_words('what film did lloyd richards direct?',_fcts.rwords)));  
        console.log(RL_classifier.classify(_fcts.extract_words('what film did lloyd richards direct?',_fcts.RLTokens_toExtract)));  
        console.log(RL_classifier.classify('who is credited as the cinematographer for eternal sunshine of the spotless mind'));    
        console.log(RL_classifier.classify(_fcts.remove_words('who is credited as the cinematographer for eternal sunshine of the spotless mind',_fcts.RL_rwords)));    
        console.log(RL_classifier.classify(_fcts.remove_words('who is credited as the cinematographer for eternal sunshine of the spotless mind',_fcts.rwords)));  
        console.log(RL_classifier.classify(_fcts.extract_words('who is credited as the cinematographer for eternal sunshine of the spotless mind',_fcts.RLTokens_toExtract))); 
        console.log(">>>>res2")
        console.log(RL_classifier2.classify('what film did lloyd richards direct?'));    
        console.log(RL_classifier2.classify(_fcts.remove_words('what film did lloyd richards direct?',_fcts.RL_rwords)));    
        console.log(RL_classifier2.classify(_fcts.remove_words('what film did lloyd richards direct?',_fcts.rwords)));  
        console.log(RL_classifier2.classify(_fcts.extract_words('what film did lloyd richards direct?',_fcts.RLTokens_toExtract)));  
        console.log(RL_classifier2.classify('who is credited as the cinematographer for eternal sunshine of the spotless mind'));    
        console.log(RL_classifier2.classify(_fcts.remove_words('who is credited as the cinematographer for eternal sunshine of the spotless mind',_fcts.RL_rwords)));    
        console.log(RL_classifier2.classify(_fcts.remove_words('who is credited as the cinematographer for eternal sunshine of the spotless mind',_fcts.rwords)));  
        console.log(RL_classifier2.classify(_fcts.extract_words('who is credited as the cinematographer for eternal sunshine of the spotless mind',_fcts.RLTokens_toExtract))); 
        console.log(">>>>res3")
        console.log(RL_classifier3.classify('what film did lloyd richards direct?'));    
        console.log(RL_classifier3.classify(_fcts.remove_words('what film did lloyd richards direct?',_fcts.RL_rwords)));    
        console.log(RL_classifier3.classify(_fcts.remove_words('what film did lloyd richards direct?',_fcts.rwords)));  
        console.log(RL_classifier3.classify(_fcts.extract_words('what film did lloyd richards direct?',_fcts.RLTokens_toExtract)));  
        console.log(RL_classifier3.classify('who is credited as the cinematographer for eternal sunshine of the spotless mind'));    
        console.log(RL_classifier3.classify(_fcts.remove_words('who is credited as the cinematographer for eternal sunshine of the spotless mind',_fcts.RL_rwords)));    
        console.log(RL_classifier3.classify(_fcts.remove_words('who is credited as the cinematographer for eternal sunshine of the spotless mind',_fcts.rwords)));  
        console.log(RL_classifier3.classify(_fcts.extract_words('who is credited as the cinematographer for eternal sunshine of the spotless mind',_fcts.RLTokens_toExtract))); 
        console.log(">>>>res4")
        console.log(RL_classifier4.classify('what film did lloyd richards direct?'));    
        console.log(RL_classifier4.classify(_fcts.remove_words('what film did lloyd richards direct?',_fcts.RL_rwords)));    
        console.log(RL_classifier4.classify(_fcts.remove_words('what film did lloyd richards direct?',_fcts.rwords)));  
        console.log(RL_classifier4.classify(_fcts.extract_words('what film did lloyd richards direct?',_fcts.RLTokens_toExtract)));  
        console.log(RL_classifier4.classify('who is credited as the cinematographer for eternal sunshine of the spotless mind'));    
        console.log(RL_classifier4.classify(_fcts.remove_words('who is credited as the cinematographer for eternal sunshine of the spotless mind',_fcts.RL_rwords)));    
        console.log(RL_classifier4.classify(_fcts.remove_words('who is credited as the cinematographer for eternal sunshine of the spotless mind',_fcts.rwords)));  
        console.log(RL_classifier4.classify(_fcts.extract_words('who is credited as the cinematographer for eternal sunshine of the spotless mind',_fcts.RLTokens_toExtract))); 
    }            
    if(true){//Production Phase 
        let RL_classifier =  await _fcts.NBayes_RL_1step(train_file,3)
        //let RL_classifier2 =  await _fcts.NBayes_RL_1step(train_file,2)
        //let RL_classifier3 =  await _fcts.NBayes_RL_1step(train_file,3)
        //let RL_classifier4 =  await _fcts.NBayes_RL_1step(train_file,4)
        RL_classifier.train()
        //RL_classifier2.train()
        //RL_classifier3.train()
        //RL_classifier4.train()
        //await _fcts.NBayes_RL(input_file,"Bayes_dbpedia_RL1.json",RL_classifier,1) 
        //await _fcts.NBayes_RL(input_file,"Bayes_dbpedia_RL2.json",RL_classifier2,2) 
        //await _fcts.NBayes_RL(input_file,"Bayes_dbpedia_RL3.json",RL_classifier3,3) 
        //await _fcts.NBayes_RL(input_file,"Bayes_dbpedia_RL4.json",RL_classifier4,4)
        await _fcts.NBayes_RL(input_file,"Bayes_wikidata_RL.json",RL_classifier,2) 
    } 
}
async function main(){
    //console.log(await _fcts.searchType("what is the name of my parents",'wikidata'))
    //Extraction of categories from main QA file
    /*train_file = "SMART2022-AT-dbpedia-train.json";
    _fcts.extract_ressource_QA(train_file,"AT_dbpedia_ressource_train_2022.json") 
    _fcts.extract_literal_QA(train_file,"AT_dbpedia_literal_train_2022.json")
    _fcts.extract_boolean_QA(train_file,"AT_dbpedia_boolean_train_2022.json")*/
    
    //AT typed
    /*let kg='wikidata'//dbpedia or wikidata
    train_file = "SMART2022-AT-dbpedia-train.json";
    input_file = "SMART2022-AT-wikidata-test.json";
    result_file = "SMART2022-AT-wikidata-test_typed.json";
    await _fcts._AT_typed(input_file, result_file, kg)*/	 

    //EL program
    /*train_file = "SMART2022-AT-dbpedia-train.json";
    result_file = "AT_dbpedia_test_2022.json";   
    _fcts._EL(train_file,result_file)*/

    //RL program
    /*train_file = "SMART2022-RL-dbpedia-train.json";
    test_file = "SMART2021-RL-dbpedia-test.json";
    result_file = "RL_dbpedia_test_2022_result.json";   
    sen =_fcts.remove_words("what film did lloyd richards direct?", _fcts.RL_rwords)
    console.log(sen)
    sen =_fcts.remove_words("who is credited as the cinematographer for eternal sunshine of the spotless mind", _fcts.RL_rwords)
    console.log(sen)
    let RL_classifier = _fcts.NaivesBayesClsfctRL(train_file)
    RL_classifier.train();
    //RL_classifier.save('RL_classifier.json', function(err, classifier) {});
    //console.log(RL_classifier.classify('what film did lloyd richards direct?'));    
    //console.log(RL_classifier.classify('who is credited as the cinematographer for eternal sunshine of the spotless mind'));    
    _fcts.NBayes_RL(test_file,result_file,RL_classifier)*/

    //Train Bayes classifier
    /*train_file = "SMART2022-RL-dbpedia-train.json";
    result_file = "RL_dbpedia_test_2022.json";
    RL_classifier = BayesClassfct(train_file)
    RL_classifier.train();
    console.log(RL_classifier.classify('what film did lloyd richards direct?'));*/

   /*classifier.addDocument('Which uni did Joshua A. Siegel attend ?', 'dbp:education'); 
   classifier.addDocument('Which education center Sidney Catlin Partrodge attended which was also the alma mater of Lisa Brummel ?', 'dbp:education'); 
   classifier.addDocument('Where did the relatives of David Hume study?', 'dbp:education'); 
   classifier.addDocument('Where did the relatives of David Hume study?', 'dbp:education'); 
   classifier.addDocument('What is the common palce of study for jack McGregor and Philip W. Pillsbury ?', 'dbp:education'); 
   classifier.addDocument('what album plays rock music?', 'dbp:education'); 
   classifier.addDocument('Count everyone who studied at an institute which are in Suburbs?', 'dbp:education'); 
   classifier.addDocument('Which university attended by Franklin W. Olin was also the alma mater of Patty Lin ?', 'dbp:education'); 
   classifier.addDocument('what label does tom liwa record under', 'dbo:recordLabel'); 
   classifier.addDocument('What label signed the waitresses', 'dbo:recordLabel'); 
   classifier.addDocument('Which label is the artist the darkness on', 'dbo:recordLabel'); 
   classifier.addDocument('what country is the division matabeleland north province from', 'dbo:recordLabel'); 
   classifier.addDocument('Which label is daryl hall signed to', 'dbo:recordLabel'); 
   classifier.addDocument('who is a British singer of the rca records', 'dbo:recordLabel'); 
   classifier.addDocument('Who is an artist on the warner music group record label?', 'dbo:recordLabel'); 
   classifier.addDocument('what is an American hip hop and dance music performer promoted by columbia records', 'dbo:recordLabel'); 
   classifier.addDocument('which artist belongs to hollywood records', 'dbo:recordLabel'); 
   classifier.addDocument('What label is kennyandchante on?', 'dbo:recordLabel'); 
   classifier.addDocument('who founded abkco records', 'dbo:recordLabel'); 
   classifier.addDocument('which artist belongs to hollywood records', 'dbo:recordLabel'); 
   classifier.addDocument('who was lightning over water directed by', 'dbo:director'); 
   classifier.addDocument('what films were directed by david gordon green?', 'dbo:director'); 
   classifier.addDocument('What are the awards won by the film director of Saraband ?', 'dbo:director'); 
   classifier.addDocument('who directed the film 1941', 'dbo:director'); 
   classifier.addDocument('Give me all movies directed by Francis Ford Coppola.', 'dbo:director'); 
   classifier.addDocument('who was the director for the movie  flirty birdy', 'dbo:director'); 
   classifier.addDocument('what is the film directed by james hong', 'dbo:director');   
   classifier.train();
   console.log(classifier.docs)
   console.log(classifier.classify('what film did lloyd richards direct?'));*/
}
async function EL_process(){
    /*if(false){//param Vector
        console.log(_fcts.buildV_EL("what is dieter oesterlen's gender"))
        console.log(_fcts.buildV_EL("Who is married to Lyudmila Gurchenko, whose party is Communist Party of the Soviet Union?"))
        console.log(_fcts.buildV_EL("How many sibling are determined for Caroline Rose Hunt?"))
        console.log(_fcts.buildV_EL("what genre of television is the program ice road truckers"))
        console.log(_fcts.buildV_EL("Was John Williams a student at both University of California, Los Angeles and Fiorello H. LaGuardia High School?"))
        console.log(_fcts.buildV_EL("what was alexander b\u00fcttner's place of birth"))
        console.log(_fcts.buildV_EL("what country is xuedong huang from"))
        console.log(_fcts.buildV_EL("what language is trapped available in"))
        console.log(_fcts.buildV_EL("What is the occupation of Uesugi Kenshin, whose competitor is Shibata Katsuie?"))
        console.log(_fcts.buildV_EL("what is an example of a rock music album"))
        console.log(_fcts.buildV_EL("Who directed the albums recorded in Anaheim?"))
        console.log(_fcts.buildV_EL("what kind of music can be found on the album called copacabana"))
        console.log(_fcts.buildV_EL("What is the name of an album by the artist fightstar"))
        console.log(_fcts.buildV_EL("Is Stephen Curry married to Rachael Ray?"))
        console.log(_fcts.buildV_EL("what is the history of the country of israel?"))
        console.log(_fcts.buildV_EL("What is the organisation whose purposes are Environmentalism and Peace?"))
    }*/
    let step  = 0// step est l'index de l'élément à partir du quel commencer
	//toujours exécuter en paire {EL_dbpedia_1 et El_wikidata_1}, {EL_dbpedia_2 et El_wikidata_2}, ....
    let input_dbpedia = "Q2V_dbpedia_EL_final.json"
    let input_wikidata = "External_data/SMART2022-EL-wikidata-test.json"
	let output = "Q2V_wikidata_EL.json"
    await _fcts._ELwd(step,input_dbpedia,input_wikidata,output)
}
async function EL_main(){
    /*if(false){//param Vector
        console.log(_fcts.buildV_EL("what is dieter oesterlen's gender"))
        console.log(_fcts.buildV_EL("Who is married to Lyudmila Gurchenko, whose party is Communist Party of the Soviet Union?"))
        console.log(_fcts.buildV_EL("How many sibling are determined for Caroline Rose Hunt?"))
        console.log(_fcts.buildV_EL("what genre of television is the program ice road truckers"))
        console.log(_fcts.buildV_EL("Was John Williams a student at both University of California, Los Angeles and Fiorello H. LaGuardia High School?"))
        console.log(_fcts.buildV_EL("what was alexander b\u00fcttner's place of birth"))
        console.log(_fcts.buildV_EL("what country is xuedong huang from"))
        console.log(_fcts.buildV_EL("what language is trapped available in"))
        console.log(_fcts.buildV_EL("What is the occupation of Uesugi Kenshin, whose competitor is Shibata Katsuie?"))
        console.log(_fcts.buildV_EL("what is an example of a rock music album"))
        console.log(_fcts.buildV_EL("Who directed the albums recorded in Anaheim?"))
        console.log(_fcts.buildV_EL("what kind of music can be found on the album called copacabana"))
        console.log(_fcts.buildV_EL("What is the name of an album by the artist fightstar"))
        console.log(_fcts.buildV_EL("Is Stephen Curry married to Rachael Ray?"))
        console.log(_fcts.buildV_EL("what is the history of the country of israel?"))
        console.log(_fcts.buildV_EL("What is the organisation whose purposes are Environmentalism and Peace?"))
    }*/
    let step  = 0// step est l'index de l'élément à partir du quel commencer
	//toujours exécuter en paire {EL_dbpedia_1 et El_wikidata_1}, {EL_dbpedia_2 et El_wikidata_2}, ....
	let input_dbpedia = "External_data/EL_dbpedia_1.json"
	let output_dbpedia = "Q2V_dbpedia_EL_1.json"
	let input_wikidata = "External_data/EL_wikidata_1.json"
	let output_wikidata = "Q2V_wikidata_EL_1.json"
    await _fcts._EL(step,input_dbpedia,output_dbpedia,input_wikidata,output_wikidata)
}