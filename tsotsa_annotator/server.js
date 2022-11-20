let fetch = require('sync-fetch')
let fs = require("fs"); 
let stringComparison = require('string-comparison')
let natural = require('natural');  
const my_cf = require('./function.js');  

var URL_wd = new URL("https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org");
var lookup_dbp = "https://lookup.dbpedia.org/api/search?limit=25&format=json&query="; 
var url_wpd = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info|pageprops&inprop=url&ppprop=wikibase_item&redirects=1&titles=";

var _dir = 'GT-CTA-SCH/'; 
var _dir2 = 'GT-CTA-DBP/'; 
var _dir3 = 'BiodivTab-CTA_CEA-DBP/'; 

//GT-CTA-SCH
sch_cta_class_target = my_cf.getCSVArray(_dir+"schema_class_targets.csv");  
sch_cta_class_train = my_cf.getCSVArray(_dir+"schema_class_train.csv");  
sch_cta_prop_target = my_cf.getCSVArray(_dir+"schema_property_targets.csv");  
sch_cta_prop_train = my_cf.getCSVArray(_dir+"schema_property_train.csv"); 
//GT-CTA-DBP
git_dbp_cta_train = my_cf.getCSVArray(_dir2+"dbpedia_property_train.csv"); 
git_dbp_cta_target = my_cf.getCSVArray(_dir2+"dbpedia_property_targets.csv"); 
//BdT-CTA-DBP
BdT_dbp_cta_train = my_cf.getCSVArray2(_dir3+"CTA_biodivtab_gt.csv"); 
BdT_dbp_cta_test_target = my_cf.getCSVArray2(_dir3+"CTA_biodivtab_targets.csv"); 

var cell="", clean_cell="", candidate_cta=[], cea_annotation="", cta_annotation="",  annote_cta = false, annote_cea = false;

//cta_bayes_schema()
//cta_bayes_git()
//cta_bayes_biodivTab()
//cta_cea_M2_biodivTab()
 
//my_cf.mergeinfResults(cea_file, cea_target.data, "cea_fResults.csv"); 
//my_cf.removeBlankURI('cea_fResults.csv',"cea_noDuplicate.csv","cea")
//my_cf.removeDuplicatesResults(_dir3+'CTA_biodivtab_targets.csv',"cta_targat_bdt.csv","cta")//remove duplicate
//my_cf.removeDuplicatesResults('cea_biodivteb_validate.csv',"cea_biodivteb_validate(2).csv","cea")//remove duplicate
//my_cf.removeDuplicatesResults('cta_biodivteb_validate.csv',"cta_biodivteb_validate(2).csv","cta")//remove duplicate

async function cta_cea_M2_biodivTab(){
    var previous_cell = '', cta_file = "bdt_cta_dbp_M2.csv", cea_file='bdt_cea_dbp_M2.csv', save_cea = false, save_cta=false; 
    var tables_Names = my_cf.getCSVNames(_dir3+"tables");
    var cta_target = my_cf.getCSVArray2(_dir3+'CTA_biodivtab_targets.csv'), cea_target = my_cf.getCSVArray2(_dir3+'CEA_biodivtab_targets.csv');
    let cos = stringComparison.cosine;
    for(let i=0;i<tables_Names.length;i++){  
        if(tables_Names[i]=="OTHER") continue; 
		//tables_Names[i]="89e72a749d764c1aacd9284e01c412a4"
        let file_arr =  my_cf.getCSVArray(_dir3+"tables/"+tables_Names[i]+'.csv');  
        let nb_col = file_arr.cols, nb_row = file_arr.rows;         
        console.log("File("+i+") : "+tables_Names[i] + " | "+nb_col+"cols | "+nb_row+"rows");   
        for(let j=0;j<nb_col;j++){//Cols 
            let target_cta = tables_Names[i]+","+j , target_cta_p = '"'+tables_Names[i]+'","'+j+'"';
            let cta_results = my_cf.getCSVArray2(cta_file); 
            candidate_cta = [], cta_annotation="", annote_cta = false, annote_cea = false;      
			if(my_cf.mustAnnotate(cta_target.data,target_cta) && !my_cf.isInside(cta_results.data,target_cta_p)) annote_cta = true;      
            else annote_cta = false;      
            for(let k=0;k<nb_row-1;k++){//Rows
                let target_cea = tables_Names[i]+","+j+","+k , target_cea_p = '"'+tables_Names[i]+'","'+j+'","'+k+'"';
                let cea_results = my_cf.getCSVArray(cea_file);
                cea_annotation="", cell = file_arr.data[k][j];
                let params="", clean_cell = my_cf.preProcess(String(cell));
                if(my_cf.mustAnnotate(cea_target.data,target_cea) && !my_cf.isInside(cea_results.data,target_cea_p)) annote_cea = true;
                else annote_cea = false;
                if(cos.similarity(clean_cell, previous_cell)>=0.999){ //Same as the previous annotation
                    cea_annotation = previous_cea_annotation;                    
                    if(annote_cta){
                        params = my_cf.params_gcta(cea_annotation);
                        URL_wd.search = new URLSearchParams(params).toString(); 
                        metadata = await fetch(URL_wd, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'Semtab2022/1.3', 'Content-Type':'application/json'}})
                        SparQLdata = my_cf.safeParseJSON(metadata); 
                        candidate_cta = my_cf.get_gcandidate_cta(SparQLdata, candidate_cta);    
                    }
                }else{
					if(annote_cta || annote_cea){
						if(file_arr.data[0][j]=="Month"){
							cell = cell.replaceAll("_","").replaceAll("0","").replaceAll("1","").replaceAll("2","").replaceAll("3","").replaceAll("4","").replaceAll("5","").replaceAll("6","").replaceAll("7","").replaceAll("8","").replaceAll("9","").replaceAll("(","").replaceAll(")","").replaceAll("-","")
							if(cell.toLowerCase()=="month") cea_annotation ="http://dbpedia.org/resource/Month"
							else if(cell.toLowerCase()=="january"  || cell.toLowerCase()=="1") cea_annotation ="http://dbpedia.org/resource/January"
							else if(cell.toLowerCase()=="february" || cell.toLowerCase()=="2") cea_annotation ="http://dbpedia.org/resource/February"
							else if(cell.toLowerCase()=="march" || cell.toLowerCase()=="3") cea_annotation ="http://dbpedia.org/resource/March"
							else if(cell.toLowerCase()=="april" || cell.toLowerCase()=="4") cea_annotation ="http://dbpedia.org/resource/April"
							else if(cell.toLowerCase()=="may" || cell.toLowerCase()=="5") cea_annotation ="http://dbpedia.org/resource/May"
							else if(cell.toLowerCase()=="june" || cell.toLowerCase()=="6") cea_annotation ="http://dbpedia.org/resource/June"
							else if(cell.toLowerCase()=="july" || cell.toLowerCase()=="7") cea_annotation ="http://dbpedia.org/resource/July"
							else if(cell.toLowerCase()=="august" || cell.toLowerCase()=="8") cea_annotation ="http://dbpedia.org/resource/August"
							else if(cell.toLowerCase()=="september" || cell.toLowerCase()=="9") cea_annotation ="http://dbpedia.org/resource/September"
							else if(cell.toLowerCase()=="october" || cell.toLowerCase()=="10") cea_annotation ="http://dbpedia.org/resource/October"
							else if(cell.toLowerCase()=="november" || cell.toLowerCase()=="11") cea_annotation ="http://dbpedia.org/resource/November"
							else if(cell.toLowerCase()=="december" || cell.toLowerCase()=="12") cea_annotation ="http://dbpedia.org/resource/December"
						}else{ 	
							if(file_arr.data[0][j]=="Year") cell = cell.replace(/\D/g,'');
							//cea_annotation = await general_search(j,k,file_arr); /**** Obsolete *****/
							cea_annotation = await LookUpDBPEDIA(j,k,file_arr);
							//cea_annotation = await googleThis(j,k,file_arr); 
						}						
                    }
					if(i>5) break;
                }                 
                if(annote_cea){
					if(cell.toLowerCase()=="undetermined" || cell.toLowerCase()=="unknown"  || cell.toLowerCase()=="unknown species") cea_annotation="NIL"
					/*let c1 = cos.similarity(cell, "Male")
					let c2 = cos.similarity(cell, "Female")
					let c3 = cos.similarity(cell, "Unknown")
					let arr = [];
					arr.push(c1,c2,c3)
					let max = Math.max(...arr);					
					let index = arr.indexOf(max);
					if(index==0) cea_annotation="http://dbpedia.org/resource/Male_gender"
					else if(index==1) cea_annotation="http://dbpedia.org/resource/Female_gender"
					else cea_annotation="NIL"		
					if(j>8) break;*/
					my_cf.saveCEA(cea_file,tables_Names[i],j,k,cea_annotation);
                    console.log("CEA c["+j+"]r["+k+"]: "+cea_annotation);  
                }                
                previous_cell = clean_cell;
                previous_cea_annotation = cea_annotation;
            } 
            if(annote_cta){
                if(candidate_cta.length>0){
                    cta_annotation = my_cf.eltwithHighOcc(candidate_cta); //googleThis
                    //cta_annotation = "http://dbpedia.org/ontology/"+my_cf.eltwithHighOcc(candidate_cta); //LookUp API
                    my_cf.saveCTA(cta_file,tables_Names[i],j,cta_annotation);
                    console.log("#CTA col["+j+"]: "+cta_annotation); 
                }else{
                    console.log("CTA echec"); 
                }
            } 
        } 
        //if(i>=0) break;
    }
}
async function cta_bayes_schema(){ 
    //class 
    let CTA_classifier_class =  await my_cf.NBayes_CTA_TRAIN(sch_cta_class_train, _dir);  
    console.log("entrainement phase 2 class ")
    CTA_classifier.train();
    my_cf.NBayes_CTA_RSLT(sch_cta_class_target,"cta_class_sch.csv",CTA_classifier_class,_dir) 
    //properties
    let CTA_classifier_prop =  await my_cf.NBayes_CTA_TRAIN(sch_cta_prop_train, _dir);  
    console.log("entrainement phase 2 properties ")
    CTA_classifier_prop.train();
    my_cf.NBayes_CTA_RSLT(sch_cta_prop_target,"cta_prop_sch.csv",CTA_classifier_prop,_dir) 
}
async function cta_bayes_git(){  
    let CTA_classifier =  await my_cf.NBayes_CTA_TRAIN(git_dbp_cta_train, _dir2);  
    console.log("entrainement phase 2 git dbp")
    CTA_classifier.train();
    my_cf.NBayes_CTA_RSLT(git_dbp_cta_target,"cta_git_dbp.csv",CTA_classifier,_dir2) 
}
async function cta_bayes_biodivTab(){
    let CTA_classifier =  await my_cf.NBayes_CTA_TRAIN(BdT_dbp_cta_train, _dir3);  
    console.log("entrainement phase 2 ")
    CTA_classifier.train();
    my_cf.NBayes_CTA_RSLT(BdT_dbp_cta_test_target,"bdt_cta_dbp.csv",CTA_classifier,_dir3) 
}

async function general_search(j,k,file_arr) {
	let gsearchTokens = cell, gsearch_options = {'opt0': '','opt1': '',	'opt2': ''}
	//let gsearch_options = {'opt0':file_arr.data[k][1], 'opt1':my_cf.preProcess(file_arr.data[k][2]),'opt2':my_cf.preProcess(file_arr.data[k][3])}
	console.log("gsearch[" + j + "|" + k + "] : " + cell)
	let gsearch_result = await my_cf.wikipediaSearch(gsearchTokens, cell, gsearch_options);
	//console.log(gsearch_result);
	if (gsearch_result != "") {
		let gQID = my_cf.gQID(gsearch_result);
		cea_annotation = "http://dbpedia.org/resource/" + gQID;
		if (annote_cta) {
			params = my_cf.params_gcta(cea_annotation);
			URL_wd.search = new URLSearchParams(params).toString();
			metadata = await fetch(URL_wd, {headers: {"Accept": "application/sparql-results+json",'Api-User-Agent': 'Semtab2022/1.3','Content-Type': 'application/json'	}})
			SparQLdata = my_cf.safeParseJSON(metadata);
			candidate_cta = my_cf.get_gcandidate_cta(SparQLdata, candidate_cta);
		}
    }
    return cea_annotation
}
async function LookUpDBPEDIA(j,k,file_arr) {
	let pattern = cell, gcandidate_cea=[];
	if(cell.length==0 || cell.toLowerCase()=="undefined" || cell.toLowerCase()=="none" || cell.toLowerCase()=="unknown") return "NIL"
	let cos = stringComparison.cosine;
	console.log("#DPsearch : "+pattern);   
	lookup_url = lookup_dbp+""+pattern.replaceAll(" ","%20");       
	metadata = await fetch(lookup_url, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'Semtab2022/1.3', 'Content-Type':'application/json'}})
	datas = my_cf.safeParseJSON(metadata);
	if(datas.docs.length>0){ 
	    let cossim = 0, seuil = 0.75; 
	    cossim = cos.similarity(pattern, datas.docs[0].label[0].replace(/<\/?[^>]+(>|$)/gi, ""))
	    console.log("(founded): "+datas.docs[0].label[0].replace(/<\/?[^>]+(>|$)/gi, ""))
	    console.log("(similarity): "+cossim)                        
	    if(cossim>=seuil){
	        for(let l in datas.docs[0].typeName){
	            candidate_cta.push(datas.docs[0].typeName[l]);
	        }  
	        cea_annotation = ""+datas.docs[0].resource[0];	
            if(cea_annotation!="") return cea_annotation       
	    }//else ci-dessous
	    if(cea_annotation==''){ 
	        console.log("(2nd try) search : "+pattern);
	        lookup_url = lookup_dbp+""+pattern;  
	        metadata = await fetch(lookup_url, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'Semtab2022/1.0', 'Content-Type':'application/json'}})
	        SparQLdata = my_cf.safeParseJSON(metadata); 
	        console.log("(founded): "+SparQLdata.docs[0].label[0].replace(/<\/?[^>]+(>|$)/gi, ""))
	        console.log("(similarity): "+cos.similarity(pattern, SparQLdata.docs[0].label[0].replace(/<\/?[^>]+(>|$)/gi, "")))
	        if(cos.similarity(pattern, SparQLdata.docs[0].label[0].replace(/<\/?[^>]+(>|$)/gi, ""))>0.85){
	            for(let l in SparQLdata.docs[0].typeName){
	                candidate_cta.push(SparQLdata.docs[0].typeName[l]);
	            }  
	            cea_annotation = ""+SparQLdata.docs[0].resource[0];
	            console.log(SparQLdata.docs[0].typeName); 
	            if(cea_annotation!="") return cea_annotation 
	        }
	    } 
	}else{
	  pattern = my_cf.preProcess(cell).replaceAll(' ','%20');             
	  console.log(pattern);  
	  let lookup_wpd_url = url_wpd+""+pattern;
	  console.log(lookup_wpd_url);  
	  metadata = await fetch(lookup_wpd_url, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'Semtab2022/1.0', 'Content-Type':'application/json'}})
	  SparQLdata = my_cf.safeParseJSON(metadata);   
	  let item_res = Object.values(SparQLdata.query.pages)[0];//.pageprops.wikibase_item
	  //console.log(item_res);     
	  if(item_res.pageprops!=undefined){
	    cea_annotation = "http://dbpedia.org/resource/"+my_cf.gQID(item_res.canonicalurl);     
	    try{
			console.log(SparQLdata.docs[0].typeName); 
		}catch(e){
			console.log("Type Unkwon"); 
		}
	    params = my_cf.params_gcta(cea_annotation);
	    URL_wd.search = new URLSearchParams(params).toString(); 
	    metadata = await fetch(URL_wd, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'Semtab2022/1.0', 'Content-Type':'application/json'}})
	    SparQLdata = my_cf.safeParseJSON(metadata)
	    candidate_cta = my_cf.get_gcandidate_cta(SparQLdata, candidate_cta);                        
	    console.log(candidate_cta); 
	  }else{
	    //start else lookup  
	    let gsearchTokens = ""; 
	    if(j==0) gsearchTokens = ""+clean_cell+","+file_arr.data[k][1]+" - wipidedia";
	    else gsearchTokens = ""+clean_cell+" - wipidedia"; //else gsearchTokens = ""+clean_cell+", "+file_arr.data[k][0]+" - dbpedia"; 
	    let gResults = await my_cf.googlesearch(gsearchTokens);                        
	    //console.log(gResults);
	    for(l=0;l<gResults.results.length;l++){
	        if(gResults.results[l].url.startsWith("https://dbpedia.org/page/"))
	            if(cos.similarity("About: "+clean_cell+" - DBpedia", gResults.results[l].title)>0.8)
	                gcandidate_cea.push(gResults.results[l]); 
	        else if(gResults.results[l].url.startsWith("https://en.m.wikipedia.org/wiki/"))                           
	            if(cos.similarity(gsearchTokens+" - Wikipedia", gResults.results[l].title)>0.8)
	                gcandidate_cea.push(gResults.results[l]);
	        else;
	        if(l==7) break;
	    }
	    if(gcandidate_cea.length==0){//console.log('No gcandidates to CEA');  
	        return "undefined"
	    }else if(gcandidate_cea.length==1){//console.log('Only one gcandidates to CEA');                          
	        let gQID = my_cf.gQID(gcandidate_cea[0].url);
	        cea_annotation = "http://dbpedia.org/resource/"+gQID;
	        my_cf.saveCEA(cea_file,tables_Names[i],j,k,cea_annotation);               
	        if(!_ctaIsKnow && annote_cta){//search cta candidate if cta must be annotate and not already know
	            params = my_cf.params_gcta(cea_annotation);
	            URL_wd.search = new URLSearchParams(params).toString(); 
	            metadata = await fetch(URL_wd, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'Semtab2022/1.0', 'Content-Type':'application/json'}})
	            SparQLdata = my_cf.safeParseJSON(metadata); 
	            candidate_cta = my_cf.get_gcandidate_cta(SparQLdata, candidate_cta);    
	        }                   
	    }else if(gcandidate_cea.length>1){//console.log('Multiples gcandidates to CEA');  
	        let pos = 0;
	        for(l=0;l<gcandidate_cea.length;l++){
	            if(gcandidate_cea[l].url.startsWith("https://en.m.wikipedia.org/wiki/")){
	                pos = l;
	                break;
	            }
	        }  
	        let gQID = my_cf.gQID(gcandidate_cea[pos].url);
	        cea_annotation = "http://dbpedia.org/resource/"+gQID;
	        my_cf.saveCEA(cea_file,tables_Names[i],j,k,cea_annotation);
	        let polmsg ="[";
	        for(l=0;l<gcandidate_cea.length;l++){
	            polmsg=polmsg+""+gcandidate_cea[l].url+", "
	        } 
	        polmsg=polmsg+"]";
	        my_cf.saveCEAUnresolve(tables_Names[i],j,k,"1st choice selected in "+polmsg);
	        if(annote_cta){
	            params = my_cf.params_gcta(cea_annotation);
	            URL_wd.search = new URLSearchParams(params).toString(); 
	            metadata = await fetch(URL_wd, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'Semtab2022/1.0', 'Content-Type':'application/json'}})
	            SparQLdata = my_cf.safeParseJSON(metadata); 
	            candidate_cta = my_cf.get_gcandidate_cta(SparQLdata, candidate_cta);
	        }                    
	    }else;
	    //end else lookup
	  }    
	}
}
async function googleThis(j,k,file_arr) { 
	let gsearchTokens = cell+" - wikipedia", gcandidate_cea=[], cos = stringComparison.cosine;
	console.log("#search : "+cell);   
	let gResults = await my_cf.googlesearch(gsearchTokens);  
	//my_cf.sleep(1000)
	//console.log(gResults);
	for(l=0;l<gResults.results.length;l++){
	   if(gResults.results[l].url.startsWith("https://en.m.wikipedia.org/wiki/")){
			if(cos.similarity(cell+" - wikipedia", gResults.results[l].title)>0.7){
				let gQID = my_cf.gQID(gResults.results[l].url);
				cea_annotation = "http://dbpedia.org/resource/"+gQID;                     
				if(annote_cta){
					params = my_cf.params_gcta(cea_annotation);
					URL_wd.search = new URLSearchParams(params).toString(); 
					metadata = await fetch(URL_wd, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'Semtab2022/1.0', 'Content-Type':'application/json'}})
					SparQLdata = my_cf.safeParseJSON(metadata); 
					candidate_cta = my_cf.get_gcandidate_cta(SparQLdata, candidate_cta);    
				}   
				return cea_annotation  
			}				
	   }       
	}
	return 'undefined';
}
function mergeTables(){
	var target = my_cf.getCSVArray2('cta_git_dbp_15Oct.csv')
	for(let k=0;k<target.rows;k++){//Rows
		console.log(target.data[k])
		let annotation = target.data[k][2]
		if(target.data[k][3]!='ok' && String(target.data[k][3]).length>0) annotation = target.data[k][3]
		else annotation = target.data[k][2]
		var csv_line = target.data[k][0]+','+target.data[k][1]+','+annotation+'\r\n';     
		fs.appendFileSync("git_output.csv", csv_line, function (err) {
			if (err) throw err; 
		});
	}	
	console.log(target.rows)
}
    