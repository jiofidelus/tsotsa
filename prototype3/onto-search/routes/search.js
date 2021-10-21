import Router from 'koa-router'
import GraphDB from '../database/graphdb.js'
import Solr from '../database/solr.js'
const _ = new Router()
const _wiki= new Router()
import loadash from "lodash";
import normalizeSparqlResults from '../helpers/normalizeSPARQL.js'

_.prefix("/search")
_wiki.prefix("/wiki")



/// GET /wiki/:id
/// Get wiki detail of an id in the ontology
_wiki.get('/:id', async (ctx) => {
    var main
    var id = ctx.params.id;
    let objectData = (await GraphDB.query(`
    PREFIX : <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#>
    SELECT * 
        WHERE {
           ?data ?link :${id}.
            ?data <http://www.w3.org/2000/01/rdf-schema#label> ?dataLabel.
            optional {
                ?link <http://www.w3.org/2000/01/rdf-schema#label> ?linkLabel
            }
            filter( lang(?dataLabel) != 'en' )
        }
    `)).results.bindings.map(x=>({data: x.data.value, dataLabel: x.dataLabel.value, link:x.link.value, linkLabel:x.linkLabel?.value}))
    objectData = loadash.groupBy(objectData, 'link')
    let keys = Object.values(objectData);
    for (const arrayKey of keys) {
        for (let index = 0; index < arrayKey.length; index++) {
            const element = arrayKey[index];
            if(element.data){
                element.dataDescription =  (await GraphDB.query(`
                PREFIX : <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#>
                SELECT * 
                WHERE {
                    <${element.data}> <http://www.w3.org/2000/01/rdf-schema#comment> ?data.
                }`)).results.bindings.map(x => x.data.value)
            }
            
        }
        
    }



    let objectProperty = (await GraphDB.query(`
    PREFIX : <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#>
    SELECT * 
    WHERE {
           :${id} ?link ?data.
            optional{
                ?data <http://www.w3.org/2000/01/rdf-schema#label> ?dataLabel.
            }
            optional {
                ?link <http://www.w3.org/2000/01/rdf-schema#label> ?linkLabel
            }
            filter(bound(?dataLabel) || isLiteral(?data))
            filter(
                (isLiteral(?data) && lang(?data) != 'en') || 
                (bound(?dataLabel) && ( lang(?dataLabel)!='en' && ( !bound(?linkLabel) || lang(?linkLabel) !='en')))
            )
        }
    `)).results.bindings.map(x=>({data: x.data.type==='uri' ? x.data.value : undefined, dataLabel: x.data.type==='literal' ? x.data.value : x.dataLabel.value, link:x.link.value, linkLabel:x.linkLabel?.value}))
    
    
    objectProperty = loadash.groupBy(objectProperty, 'link')
  
     keys = Object.values(objectProperty);
     for (const arrayKey of keys) {
        for (let index = 0; index < arrayKey.length; index++) {
            const element = arrayKey[index];
            if(element.data){
                element.dataDescription =  (await GraphDB.query(`
                PREFIX : <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#>
                SELECT * 
                WHERE {
                    <${element.data}> <http://www.w3.org/2000/01/rdf-schema#comment> ?data.
                    
                }`)).results.bindings.map(x => x.data.value)
            }
            
        }
        
    }
    ctx.body= {main, id, response:{objectData, objectProperty}}
    //return ctx.render('wiki',{main, id, response:response.results.bindings})
})






_.get('/', async(ctx) => {
    if(!ctx.query.query){
        return ctx.render("index")
    }
  
    const term = ctx.query.query.trim()
    var query = Solr.query().q(`subject:${term} || subject:"${term}"`)
    
    var time = Date.now();
    let response = await Solr.search(query)


    //Recuperer la boite de connaissance

    var boite

    var documents = response.response.docs ;
    //ctx.body = documents.filter(x => x.link === "http://www.w3.org/2000/01/rdf-schema#label").map(x => x.subject)
    //return

    // On recherche un triplet où le label est exactemenent le terme recherché
    boite = documents.find(x => x.link === "http://www.w3.org/2000/01/rdf-schema#label" && x.subject.trim().toLowerCase()===term.trim().toLowerCase())

    // Si la boite existe, on explore l'objet de la boite
    if(boite){
        var req = await GraphDB.query(`
        SELECT * 
        WHERE {
            <${boite.object}> ?link ?subject.
            optional {
                ?subject <http://www.w3.org/2000/01/rdf-schema#label> ?label.
                
                        
                }.
                optional {
                    ?link <http://www.w3.org/2000/01/rdf-schema#label> ?linkLabel
                }

                
                filter ( !bound(?linkLabel) || lang(?linkLabel) = 'fr' )
                filter (isLiteral(?subject) || isLiteral(?label))

                
        }
        `)


        var req2 = await GraphDB.query(`
        SELECT * 
        WHERE {
            ?subject ?link <${boite.object}>.
            filter ( ?link in ( <http://www.w3.org/1999/02/22-rdf-syntax-ns#type>, <http://www.w3.org/2000/01/rdf-schema#subClassOf> ) ).
            optional {
                ?subject <http://www.w3.org/2000/01/rdf-schema#label> ?label.
                
                        
                }.
                optional {
                    ?link <http://www.w3.org/2000/01/rdf-schema#label> ?linkLabel
                }

                filter ( bound(?label) || lang(?label) = 'fr' )
                filter ( !bound(?linkLabel) || lang(?linkLabel) = 'fr' )
                filter (isLiteral(?subject) || isLiteral(?label))

                
        }
        `)
        
        var r1 = normalizeSparqlResults(req.results.bindings)
        var r2 = normalizeSparqlResults(req2.results.bindings)
        boite.detail = r1;
        boite.relations = r2
    }
    
    //Tout ce qui est link.endwith=>Label est un objet ou une instance
    //On prend son label (subject) on met comme resultat puis on recherche sa description
    //On utilise l'objet (object) et on fait une SPARQL pour avoir les infos sur l'objets

    let _documents = loadash.groupBy(response.response.docs, 'object')
    const keys = Object.keys(_documents);
    for (const doc of keys) {
        _documents[doc] =  (await GraphDB.query(`
        SELECT * 
        WHERE {
            <${doc}> ?link ?data.
            filter ( ?link in (<http://www.w3.org/2000/01/rdf-schema#comment>, <http://www.w3.org/2000/01/rdf-schema#label> ) ).
        }`)).results.bindings.map(x => ({link: x.link.value, data: x.data.value}))
    }
    time = Date.now() - time



    

    const object = { documents: _documents, boite, query:term, time, count: keys.length}
   return ctx.body = (object);
   //return ctx.render('wiki',{main, filter, response})
   //return ctx.render('results',object)

})


export function SearchRoutes() {
    return _.routes();
}

export function WikiRoutes() {
    return _wiki.routes();
}
