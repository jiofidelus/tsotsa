const fixUtf8 = require('fix-utf8');
let fetch = require('sync-fetch')
let fs = require("fs"); 
let path = require('path');  
const google = require('googlethis'); 
const gse = require("general-search-engine")
let stringComparison = require('string-comparison')
let natural = require('natural');  

var URL_wdok = new URL("https://query.wikidata.org/sparql");
var URL_wd = new URL("https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org");
var url_wpd = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageprops&ppprop=wikibase_item&redirects=1&titles=";
var url_wpd_new = "https://en.wikipedia.org/w/api.php?action=query&generator=allpages&prop=pageprops|info&inprop=url&ppprop=wikibase_item&gaplimit=5&gapfrom=";

//preprocesisng string var
function preProcess(s){
  const regex = /[!"#$%&()*+-./:;<=>?@[\]^_`{|}~]/g;//,
  let clean_string = ""; 
  s = fixUtf8(s);
  let arr  = s.split(" ").filter(x => x !== "")
  for (let item of arr) {//remove all long spaces in string
      clean_string += item + " "
  }     
  clean_string =  clean_string.replace(/<\/?[^>]+(>|$)/gi, "");//remove HTML TAG  
  clean_string = clean_string.replace(regex, '')
          .replace('\\', '')
          .trim();
  //final = final.toUpperCase();    
  return clean_string; 
} 
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
//Remove_stopwords
function remove_words(str,wordsList) {
  res = []
  words = str.split(' ')
  for(i=0;i<words.length;i++) {
     word_clean = words[i].split(".").join("")
     if(!wordsList.includes(word_clean.toLowerCase())) {
         res.push(word_clean)
     }
  }
  return(res.join(' '))
}
function extract_words(str,wordsList) {
  res = []
  words = str.split(' ')
  for(let i=0;i<words.length;i++) {
     word_clean = words[i].split(".").join("")
     if(wordsList.includes(word_clean.toLowerCase())) {
         res.push(word_clean)
     }
  }
  return(res.join(' '))
}
//preprocesisng string var
function pre_process(s){
  const regex = /[!"#$%&()*+-./:;<=>?@[\]^_`{|}~]/g;//,
  let clean_string = ""; 
  s = fixUtf8(s);
  let arr  = s.split(" ").filter(x => x !== "")
  for (let item of arr) {//remove all long spaces in string
      clean_string += item + " "
  }     
  clean_string =  clean_string.replace(/<\/?[^>]+(>|$)/gi, "");//remove HTML TAG  
  clean_string = clean_string.replace(regex, '')
          .replace('\\', '')
          .trim();
  //final = final.toUpperCase();    
  return clean_string; 
} 

//Check if cell is candidate to annotation
function mustAnnotate(a, b){ 
  //console.log(a)
  //console.log(b)
  for(ik=0;ik<a.length;ik++){
    let arr = a[ik]
    if(arr.toString()==b.toString()){
      //console.log("Annoter");
      return true; 
    }
    /*if(a[i].every((val, index) => val === b[index])){
      //console.log("true");
      return true;
    }*/ 
  }
  return false;
}
function isInside(data, target){  
  for(ik=0;ik<data.length;ik++){
    let str = data[ik].toString()
    if(str.startsWith(target)){
      //console.log(target+' <-- inside --> '+str);
      return true;
    } 
  }
  //console.log("NOT INSIDE");
  return false;
}
//get csv files names in tables
function getCSVNames(testFolder){  
  var tablesID = [];    
  fs.readdirSync(testFolder).forEach(file => {
      filename = path.parse(file).name; 
      tablesID.push(filename);
  });
  return tablesID;
} 
//get csv in Array
function getCSVArray(s){ 
  var data = fs.readFileSync(s, "utf8");   
  //console.log(data)
  data = data.split("\n"); // SPLIT ROWS
  for (let ik in data){  
    let t= ""+data[ik];
    if(t.trim()!=''){
      data[ik] = data[ik].split(",");
    }  
    for(let jk=0;jk<data[ik].length;jk++){
      //if(j!=data[i].length){    
        if(data[ik][jk].trim().startsWith('"')){ 
          if(!data[ik][jk].trim().endsWith('"')){
            if(data[ik][jk+1]!=undefined){
              //data[ik][jk] = data[ik][jk].trim().replace('"','') +" "+ data[ik][jk+1].trim().replace('"',''); 
              data[ik][jk] = data[ik][jk].trim() +","+ data[ik][jk+1].trim(); 
              data[ik].splice(jk+1, 1); 
            }            
          } 
        } 
      //}
    }
  }   
  var cols = data[0].length;//number of column
  var rows = data.length;//number of rows
  return {data: data, cols: cols, rows: rows};
}
function getCSVArray2(s){ 
  var data = fs.readFileSync(s, "utf8");   
  //console.log(data)
  data = data.split("\r\n"); // SPLIT ROWS
  for (let ik in data){  
    let t= ""+data[ik];
    if(t.trim()!=''){
      data[ik] = data[ik].split(",");
    }  
    for(let jk=0;jk<data[ik].length;jk++){
      //if(j!=data[i].length){    
        if(data[ik][jk].trim().startsWith('"')){ 
          if(!data[ik][jk].trim().endsWith('"')){
            if(data[ik][jk+1]!=undefined){
              //data[ik][jk] = data[ik][jk].trim().replace('"','') +" "+ data[ik][jk+1].trim().replace('"',''); 
              data[ik][jk] = data[ik][jk].trim() +","+ data[ik][jk+1].trim(); 
              data[ik].splice(jk+1, 1); 
            }            
          } 
        } 
      //}
    }
  }   
  var cols = data[0].length;//number of column
  var rows = data.length;//number of rows
  return {data: data, cols: cols, rows: rows};
}
function getJSON_file(s){
  try{
    var data = fs.readFileSync(s);
    return JSON.parse(data)
  }catch(err) {
    console.error("Error:", err); 
    return null;
  }    
}
//Get element with highest occurence
function eltwithHighOcc(array){
  if(array.length == 0) return null;
  var eltMap = {};
  var maxEl = array[0], maxCount = 1;
  for(var i = 0; i < array.length; i++){
      var el = array[i];
      if(eltMap[el] == null) eltMap[el] = 1;
      else eltMap[el]++;  
      if(eltMap[el] > maxCount){
          maxEl = el;
          maxCount = eltMap[el];
      }
  }
  return maxEl;
}

//Save not solved case on CEA to check after
function saveCEAUnresolve(fileID,col,row,reason){
  var csv_line = ''+fileID+','+row+','+col+','+reason+'\r\n';     
  fs.appendFileSync("ceaToResolve.csv", csv_line, function (err) {
    if (err) throw err; 
  }); 
}
//Save not solved case on CTA to check after
function saveCTAUnresolve(fileID,col,reason){
  var csv_line = ''+fileID+','+col+','+reason+'\r\n';     
  fs.appendFileSync("ctaToResolve.csv", csv_line, function (err) {
    if (err) throw err; 
  }); 
}
//Save CEA annotation
function saveCEA(CEAFileName,fileID,col,row,annotation){
  var csv_line = '"'+fileID+'","'+col+'","'+row+'","'+annotation+'"\r\n';     
  fs.appendFileSync(""+CEAFileName, csv_line, function (err) {
    if (err) throw err; 
  }); 
}
//Save CTA annotation
function saveCTA(CTAFileName,fileID,col,annotation){
  var csv_line = '"'+fileID+'","'+col+'","'+annotation+'"\r\n';     
  fs.appendFileSync(""+CTAFileName, csv_line, function (err) {
    if (err) throw err; 
  }); 
}  
async function searchType(question,kg){
  let rslt=[], sen="", wkres=[]
  sen = remove_words(question, stopwords_1)
  sen = remove_words(sen, Interrogate_words)  
  //console.log(sen) 
  wkres = await wikipediaSearch(sen)
  //console.log(wkres.length) 
  if(wkres.length>0){    
    if(kg=='dbpedia'){
      let ID = gQID(wkres[0].link)
      let params = params_gcta("http://dbpedia.org/resource/"+ID);
      URL_wd.search = new URLSearchParams(params).toString(); 
      let metadata = await fetch(URL_wd, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'SMARTASK/3.0', 'Content-Type':'application/json'}})
      let SparQLdata = safeParseJSON(metadata)
      //console.log(SparQLdata)
      if(SparQLdata!=undefined || SparQLdata!=[]){ 
        SparQLdata.results.bindings.forEach(bs => { 
          let t = gTID(bs.type.value)
          rslt.push("dbo:"+t);
        });
        //console.log("types :"+rslt)
      }  
    }else if(kg=='wikidata'){
      rslt = await wQID(wkres[0].link) 
      //console.log(rslt)
    }else{
      console.log("Erreur with KG=:"+kg)
    }
  } 
  return rslt
}
function params_gcta(annotation){
  return {
    query:`PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX dbr: <http://dbpedia.org/resource>
    PREFIX dbo: <http://dbpedia.org/ontology>
    
    SELECT DISTINCT ?type WHERE{
    <`+annotation+`>  rdf:type ?type
    FILTER strstarts(str(?type), str(dbo:))}`                            
  }
}
function safeParseJSON(response) {
  var body = response.text(); 
  try {
      return JSON.parse(body);
  } catch (err) {
      console.error("Error:", err);
      console.error("Response body:", body);
      return [];
  }
}
function safeParseJSON2(response) {
  var body = response.text(); 
  try {
      return JSON.parse(body);
  } catch (err) {
      console.error("Error:", err);
      console.error("Response body:", body);
      return {
          head: {
          vars: [
            'entity',
            'entityLabel',
            'entityDescription',
            'type',
            'typeLabel'
          ]
        },
        results: { bindings: [] }
      };
  }
}
//saveJson Result
function saveJsonFile(finTab,output){  
  const jsonContent = JSON.stringify(finTab);
  fs.writeFileSync(output, jsonContent, 'utf8', function (err) {
      if (err) return console.log(err);
      //console.log("The file "+output+" was saved!");
  });
}
//Get cta candidates from google cea annotation
function get_gcandidate_cta(data, gcandidate_cta){
  cta_candidate = gcandidate_cta;
  if(data!=undefined){ 
    data.results.bindings.forEach(bs => { 
      cta_candidate.push(bs.type.value);    
    });
  }
  return cta_candidate;
}
//wikipedia search
async function wikipediaSearch(token, clean_cell, gsearch_options){ 
  //console.log("token generalsearch:"+token)
  //let cos = stringComparison.cosine;
	try{
    /*let URL_wp = "https://en.wikipedia.org/w/api.php?action=query&list=search&utf8&format=json&srsearch="+token.replaceAll(" ","%20") 
    let url_wpd = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info|pageprops&inprop=url&ppprop=wikibase_item&redirects=1&titles="+token.replaceAll(" ","%20") ;
    console.log(url_wpd)
    metadata = await fetch(url_wpd, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'Semtab2022/1.3', 'Content-Type':'application/json'}})
    sleep(1000)
    let data = safeParseJSON(metadata)
    let link = Object.values(data.query.pages)[0].canonicalurl
    //console.log("gsearch : "+token)
    console.log(link)
    return link*/
      console.log("gsearch : "+token)
      let petition = await new gse.search()
        .setType("wikipedia")
        .setQuery(token)
        .setOptions({language:'en'})
        .run()
      console.log(petition)
      return petition[0].link;
    } catch(err){
        console.log(err)
        return ""
    }
}

//wikipedia search
async function wikipediaSearch2(token, clean_cell, gsearch_options){
  //console.log("token generalsearch:"+token)
  let cos = stringComparison.cosine;
	try{
      let petition = await new gse.search()
        .setType("wikipedia")
        .setQuery(token)
        .setOptions({language:'en'})
        .run()
      //console.log(gsearch_options)
      //console.log(petition)
      console.log("gsearch : "+token)
      let cos_imax =0;
      let tok1 = gsearch_options.opt2.lastIndexOf(",");
      let res_tok1 = gsearch_options.opt2.substr(tok1+1).replaceAll('"','');  
      let d = new Date(gsearch_options.opt0);
      let res_tok2 = d.toLocaleString("en-US",{dateStyle:"long"});
      let res_tok3 = gsearch_options.opt2.replaceAll('"',''); 
      if(gsearch_options.opt2.includes(",")){
        let tok3 = gsearch_options.opt2.lastIndexOf(",");
        res_tok3 = gsearch_options.opt2.substr(tok3+1);  
      }
      //console.log(clean_cell+", "+res_tok1)     
      for(let l=0; l<petition.length;l++){
        //search Method A
        /*if((cos.similarity(petition[l].title, clean_cell)>0.7 && petition[l].title.includes(gsearch_options.opt0.substr(0,4))) || (petition[l].title.includes(clean_cell) && petition[l].title.includes(gsearch_options.opt0.substr(0,4)) && petition[l].descriptions.includes(gsearch_options.opt1) && petition[l].descriptions.includes(gsearch_options.opt2))) 
          return petition[l].link;
        if(cos.similarity(petition[l].title, clean_cell)>0.7 && petition[l].title.includes(gsearch_options.opt0.substr(0,4)) && petition[l].descriptions.includes(gsearch_options.opt1) && petition[l].descriptions.includes(gsearch_options.opt2)) 
          return petition[cos_imax].link;*/

        //search Method A' To search people
        /*if(!petition[l].descriptions.includes("may refer to:")){
          //console.log(petition[l])
          //if(cos.similarity(petition[l].title, clean_cell)>0.65 && (petition[l].descriptions.includes(res_tok2) || (petition[l].descriptions.includes(gsearch_options.opt0.substr(0,4)) && petition[l].descriptions.includes(gsearch_options.opt1) && petition[l].descriptions.includes(res_tok3)))) 
          if(cos.similarity(petition[l].title, clean_cell)>=0.65 && petition[l].descriptions.includes(gsearch_options.opt0.substr(0,4))) 
            return petition[l].link;
        }*/

        //search Method B  
        if(cos.similarity(petition[l].title, clean_cell)==1) return petition[l].link;
        if(cos.similarity(petition[l].title, clean_cell) > cos.similarity(petition[cos_imax].title, clean_cell)) cos_imax=l

        //search Method C // crossSearch for Place
        //console.log(petition[l])
        //console.log(cos.similarity(petition[l].title, clean_cell+", "+res_tok1))
        //if(cos.similarity(petition[l].title, clean_cell+", "+res_tok1) > cos.similarity(petition[cos_imax].title, clean_cell+", "+res_tok1) && petition[l].descriptions.includes(res_tok1)) cos_imax=l
   
        if(l>6) break;
      } 
      if(cos.similarity(petition[cos_imax].title, clean_cell+", "+res_tok1)>=0.8) return petition[cos_imax].link; //Method B & C
      return "";
    } catch(err){
        console.log(err)
        return ""
    }
}
//google CEA QID
function gQID(url){
  if(url.startsWith("https://dbpedia.org/page/")) 
    return url.substr(25); 
  if(url.startsWith("https://en.m.wikipedia.org/wiki/"))
    return url.substr(32);
  if(url.startsWith("https://en.wikipedia.org/wiki/"))
    return url.substr(30);
  if(url.startsWith("http://www.wikidata.org/entity/"))
      return url.substr(31);
  return "";            
} 
function gTID(url){
  if(url.startsWith("http://dbpedia.org/ontology/")) 
    return url.substr(28); 
  if(url.startsWith("https://dbpedia.org/ontology/")) 
    return url.substr(29); 
  return "";            
}  
async function wQID(url){
  let ID = gQID(url)
  let wpToWdUrl = url_wpd+""+ID; 
  //console.log("url_wikibase_item:"+wpToWdUrl)  
  let gFetchWpWd = await fetch(wpToWdUrl, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'SMARTASK/3.0', 'Content-Type':'application/json'}})
  sleep(2000)
  wpToWd = safeParseJSON(gFetchWpWd)
  if(wpToWd!={}){
    let wdKey = ""+Object.values(wpToWd.query.pages)[0].pageprops.wikibase_item;  
    //console.log("wdKey:"+wdKey)
    params = params_gctawd(wdKey);
    URL_wdok.search = new URLSearchParams(params).toString(); 
    metadata = await fetch(URL_wdok, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'SMARTASK/3.0', 'Content-Type':'application/json'}})
    sleep(2000)
    SparQLdata = safeParseJSON2(metadata);
    if(SparQLdata!=undefined || SparQLdata!=[]){ 
      let rst =[]
      //console.log(SparQLdata)
      SparQLdata.results.bindings.forEach(bs => { 
        let tQID = bs.type.value;
        let qid = gQID(tQID)
        rst.push(qid);    
      });
      return rst
    }
  }             
}  
function params_gctawd(gQID){
  return {
    query:`#defaultView:Table
    PREFIX bd: <http://www.bigdata.com/rdf#> 
    PREFIX mwapi: <https://www.mediawiki.org/ontology#API/>
    PREFIX wdt: <http://www.wikidata.org/prop/direct/> 
    PREFIX wikibase: <http://wikiba.se/ontology#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>                     
    
    SELECT DISTINCT ?type ?typeLabel WHERE {
      wd:`+gQID+` (wdt:P279|wdt:P31) ?type. 
      SERVICE wikibase:label { 
        bd:serviceParam wikibase:language "en".
      } 
    } ORDER BY ASC(?type) LIMIT 10`                            
  }
}
//CTA add doc Naives Bayes Classification
async function NBayes_CTA_TRAIN(train,_dir){
  console.log("Entrainement CTA ");
  //console.log(train);
  let nbc = await new natural.BayesClassifier();
  for(let i=1;i<train.rows-1;i++){
    //console.log(train.data[i][0])
    let target = getCSVArray(_dir+"tables/"+train.data[i][0]+".csv"); 
    let col = train.data[i][1]
    //console.log(target) 
    //console.log("col:"+col)
    //console.log(_dir+"tables/"+train.data[i][0]+".csv")    
    for(let j=1;j<target.rows-1;j++){
      if(String(target.data[j][col]).length>0){
        //console.log((String(target.data[j][col])+" --> "+String(train.data[i][2]))) 
        await nbc.addDocument(String(target.data[j][col]), String(train.data[i][2]));
      }      
    }
  }  
  //let raw = JSON.stringify(nbc);
  //saveJsonFile(raw,"Classifiers_cta_class.json")
  return nbc;
} 
//CTA resolve Naives Bayes Classification
function NBayes_CTA_RSLT(targets,output,cls,_dir){
  console.log("resultat CTA ")
  //console.log(targets)
  for(let i=1;i<targets.rows-1;i++){
    let cta_candidates = []
    let target = getCSVArray(_dir+"tables/"+targets.data[i][0]+".csv"); 
    let annotation =""
    let col = targets.data[i][1]
    for(let j=1;j<target.rows-1;j++){
      if(String(target.data[j][col]).length>0){ 
        let candidate = cls.classify(String(target.data[j][col]))
        cta_candidates.push(candidate)
      }      
    }
    annotation = eltwithHighOcc(cta_candidates)
    saveCTA(output,targets.data[i][0],col,annotation);
  }
  console.log("FIN CTA ")
}
function isInside(data, target){  
  for(ik=0;ik<data.length;ik++){
    let str = data[ik].toString()
    if(str.startsWith(target)){
      //console.log(target+' <-- inside --> '+str);
      return true;
    } 
  }
  //console.log("NOT INSIDE");
  return false;
}
//Build token from string
function getTokens(arr,term){ 
  let tokens ='';
  arr.forEach(t =>{
    if(t.length>3 && t!=term) tokens += ' "'+t+'"';
  });   
  return tokens;
}
//Build tokens for searchURL
function getURLTokens(arr){ 
  let tokens = arr;
  tokens = tokens.join("%20")
  return tokens;
}
function getType(x){
  let country_list = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Barbados", "Beiyang Government", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "Colombia", "Comoros", "Costa Rica", "County of Loano", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Djibouti", "Dominica", "Dominican Republic", "Dutch Republic", "East Timor", "Ebla", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Federated States of Micronesia", "Fiji", "Finland", "France", "Gabon", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kingdom of Denmark", "Kingdom of the Netherlands", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Lordship of Albarracin", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mosquito Coast", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "People's Republic of China", "Peru", "Philippines", "Poland", "Portugal", "Principality of Smolensk", "Qatar", "Republic of Ireland", "Republic of the Congo", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "State of Palestine", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "SÃ£o TomÃ© and PrÃ­ncipe", "São Tomé and Príncipe", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "The Bahamas", "The Gambia", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]
  x = x.trim();
  if(isNaN(x)==false){
      return 'Numeric';
  }else if(isDate(x)){
      return "Date";
  }else if(x.startsWith("Template:Attached KML/")){
      return "Wikimedia KML file";//CTA->Q26267864 -- CPA->P3096
  }else if(x.startsWith("Template:")){
      return "Template Object";//CTA->Q11266439  -- //CPA->P5869
  }else if(x.toLowerCase().endsWith("png") || x.toLowerCase().endsWith("jpeg") || x.toLowerCase().endsWith("jpg") || x.toLowerCase().endsWith("gif") || x.toLowerCase().endsWith("webp") || x.toLowerCase().endsWith("svg")){
      return "Image"; 
  }else if(country_list.includes(x)){
    return "Country";//"Country"CTA->Q6256 --- "Souvereign States"CTA->Q3624078
  }else; 
}
//Parse CEA Json results
function safeParseJSON(response) {
  var body = response.text(); 
  try {
      return JSON.parse(body);
  } catch (err) {
      console.error("Error:", err);
      console.error("Response body:", body);
      return {
          head: {
            vars: []
          },
          results: { bindings: [] }
      };
  }
}
//SafeParseJson wikipedia
function safeParseJSONforWikipedia(response) {
  var body = response.text(); 
  try {
      return JSON.parse(body);
  } catch (err) {
      console.error("Error:", err);
      console.error("Response body:", body);
      return {};
  }
}
//google search CEA candidates
async function googlesearch(token){
  const optionsgthis = {
    page: 0, 
    safe: false,
    additional_params: {hl:'en'}
  }  
  var response = await google.search(token, optionsgthis);
  return response; 
} 

function duplicated_1(datas, test) {
  for (let data of datas)
      if (data[0] == test[0] && data[1] == test[1] && data[2] == test[2]) return true
  return false
}
function duplicated_2(datas, test) {
  for (let data of datas)
      if (data[0] == test[0] && data[1] == test[1]) return true
  return false
} 
function removeDuplicatesResults(pathSourceFile, pathresultFile, type="cea"){ 
  let sources = getCSVArray(pathSourceFile).data  
  console.log(""+sources.length+" lines in ("+pathSourceFile+")")
  datas = [];  
  if(type=='cta'){
    for(let elt of sources){
      if(!duplicated_2(datas, elt)) datas.push(elt); 
      else console.log("duplicated :"+elt)
    }
    for(data of datas){
      var csv_line = '' + data[0] + ',' + data[1] + ',' + data[2] + '\r\n';
      fs.appendFileSync("" +pathresultFile, csv_line, function (err) {
        if (err) throw err;
      });
    } 
  }else{    
    for(let elt of sources){
      if(!duplicated_1(datas, elt)) datas.push(elt);
      else console.log("duplicated :"+elt)
    }
    for(data of datas){
      var csv_line = '' + data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3] + '\r\n';
      fs.appendFileSync("" +pathresultFile, csv_line, function (err) {
        if (err) throw err;
      });
    }
  } 
  let results = getCSVArray(pathresultFile).data  
  console.log(""+results.length+" lines in ("+pathresultFile+")") 
}

module.exports = { 
  remove_words,
  extract_words,
  pre_process,
  preProcess,
  getCSVArray,
  getCSVArray2,
  getCSVNames,
  eltwithHighOcc,
  gQID,
  gTID,
  wQID,
  wikipediaSearch,
  wikipediaSearch2,
  removeDuplicatesResults,
  searchType,
  params_gctawd,
  params_gcta,
  getJSON_file,
  saveJsonFile,
  NBayes_CTA_TRAIN,  
  NBayes_CTA_RSLT,
  safeParseJSON, 
  sleep,   
  mustAnnotate,
  isInside,
  saveCTA,
  saveCEA,
  get_gcandidate_cta,
  googlesearch,
  
  URL_wd,
};