import Router from "koa-router"
import { SearchRoutes, WikiRoutes } from "./search.js";
import GraphDB from '../database/graphdb.js'
import axios from 'axios'


export const router = new Router();
let facts = []
router.prefix('/api')
// Expected here; serve static files from public dir

router.get('/', (ctx) => { ctx.redirect("/search") },)
router.get('/enrich', (ctx) => {  return ctx.render('enrich')})
router.get('/meal', (ctx) => {  return ctx.render('meal-finder')})
router.get('/diet-planner', (ctx) => {  return ctx.render('diet')})


router.get('/facts', async(ctx) => {
    return ctx.body = facts
})


router.post('/facts', async(ctx) => {
    console.log(ctx.request.body.facts);
    facts.push(...ctx.request.body.facts)
    console.log(facts);
    return ctx.body = facts
})

router.delete('/facts/:index', async(ctx)=>{
    facts = facts.splice(ctx.params.index, 1)
    return ctx.body = facts
})

router.get('/facts/validate', async(ctx)=>{
   if (!facts || facts.length === 0) {
       return ctx.body = "Nothing to validate"
   }

    
   let r = await axios.post('http://localhost:8983/solr/better_food_onto/update?_=1625552305075&commitWithin=1000&overwrite=true&wt=json', facts.map(x => ({object: x.subject, link: x.property, subject:x.object})))
   console.log(r);
   facts = []
    return ctx.body = "Validated and Indexed"
})

router.get('/re-index', async (ctx) => {
    let xml = '<delete><query>*:*</query></delete>'
    var config = {
        headers: {'Content-Type': 'text/xml'}
   };
   let body = await GraphDB.query(`
   
   select ?object ?link ?subject where { 
      ?object ?link ?subject
   }
     
   `)
   body = body.results.bindings.map(x => ({subject: x.subject.value, link: x.link.value, object: x.object.value}))
   console.log(body);
   await axios.post('http://localhost:8983/solr/better_food_onto/update?commit=true',xml, config); 
   console.log('Deleted all index');
   let r = await axios.post('http://localhost:8983/solr/better_food_onto/update?commitWithin=1000&overwrite=true&wt=json', body)
   console.log("Re indexded");
   console.log(r);
   ctx.body = "La base de connaissance a été indéxé"
})

router.get('/sparql', async (ctx)=>{
    console.log(ctx.query.query);
    const body = await GraphDB.query(ctx.query.query)
    console.log(body);
    return ctx.body = body
})

router.post('/sparql', async (ctx)=>{
    console.log(ctx.request.body.query);
    const body = await GraphDB.query(ctx.request.body.query)
    console.log(body);
    return ctx.body = body
})



router.get('/classes', async (ctx)=>{
    console.log(ctx.query.query);
    const body = await GraphDB.query(`
    PREFIX : <${GraphDB.iri}>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    select distinct ?class ?label where { 
       ?class rdf:type <http://www.w3.org/2002/07/owl#Class>
       optional{
        ?class <http://www.w3.org/2000/01/rdf-schema#label> ?label.
       }
       filter(bound(?label) && lang(?label)!='en')
    }
      
    `)
    console.log(body);
    return ctx.body = body.results.bindings.map(x => ({class: x.class.value, label: x.label.value}))
})

router.get('/instances', async (ctx)=>{
    let classes = ctx.query.class
    console.log(classes)
    if(classes){
        classes = classes.split('+').map(x => '<'+x+'>').join(',');
        console.log(classes)
        classes = `filter (?class IN (${classes}))`
    }
    console.log(classes);
    const body = await GraphDB.query(`
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX : <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        select distinct ?instance ?label where { 
           ?instance rdf:type ?class;
                    rdfs:label ?label.
            ?class a <http://www.w3.org/2002/07/owl#Class>
           
        ${classes ? classes : ''}
        filter(bound(?label) && lang(?label)!='en')
       
        }
      
    `)
    console.log(body);
    return ctx.body = body.results.bindings.map(x => ({instance: x.instance.value, label: x.label.value}))
})
router.get('/domain/:id', async (ctx)=>{
    const instanceID = ctx.params.id;
   
    let body = await GraphDB.query(`
    PREFIX : <${GraphDB.iri}>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    select distinct ?domain ?label ?domainType where { 
        :${instanceID} <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> ?class.
        ?domain <http://www.w3.org/2000/01/rdf-schema#domain> ?class;
                <http://www.w3.org/2000/01/rdf-schema#label> ?label;
                <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> ?domainType.
                

        filter(bound(?label) && lang(?label)!='en')
        filter(?domainType in (owl:ObjectProperty, owl:topDataProperty, owl:bottomDataProperty))
        

    }
      
    `)
    console.log(body);
    body = body.results.bindings.map(x => ({domain: x.domain.value, label: x.label.value, isObjectProperty: x.domainType.value === "http://www.w3.org/2002/07/owl#ObjectProperty"}))
    body.push({domain: 'http://www.w3.org/2000/01/rdf-schema#label', label: 'Dénomination', isObjectProperty: false})
    body.push({domain: 'http://www.w3.org/2000/01/rdf-schema#comment', label: 'Description', isObjectProperty: false})
    body.push({domain: 'http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#image', label: 'Lien vers image', isObjectProperty: false})
    return ctx.body = body  
})




//Get all the instances of a range in a property
router.get('/range-instance/:property', async (ctx)=>{
    const propertyID = ctx.params.property;
    const body = await GraphDB.query(`
    PREFIX : <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    select ?instance ?label where { 
        :${propertyID} <http://www.w3.org/2000/01/rdf-schema#range> ?range.
        ?instance <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> ?range.
        ?instance <http://www.w3.org/2000/01/rdf-schema#label> ?label
     
        
        filter(bound(?label) && lang(?label)!='en')
    }
    `)
    console.log(body.results.bindings);
    return ctx.body = body.results.bindings.map(x => ({id: x.instance.value, label: x.label.value}))
})

router.get('/details/:id', async (ctx)=>{
    const instanceID = ctx.params.id;
    const body = await GraphDB.query(`
    PREFIX : <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    select ?relation ?target ?relationLabel ?targetLabel where { 
        :${instanceID} ?relation ?target.
        filter(?relation != rdf:type)
        optional{
            ?relation <http://www.w3.org/2000/01/rdf-schema#label> ?relationLabel
        }
        
        optional{
            ?target <http://www.w3.org/2000/01/rdf-schema#label> ?targetLabel
        }
        
        filter((isLiteral(?target) && lang(?target)!='en') || (isUri(?target) && bound(?targetLabel)&&lang(?targetLabel) != 'en' && bound(?relationLabel)&&lang(?relationLabel) !='en'))

    }
    `)
    console.log(body.results.bindings);
    return ctx.body = body.results.bindings.map(x => ({relation: {id: x.relation.value, label: x.relationLabel?.value}, isObject: x.target.type=='uri', target: {id: x.target.value, label: x.target.type=='literal'? x.target.value : x.targetLabel?.value}}))
})


router.use(SearchRoutes())
router.use(WikiRoutes())

export function MainRouter() {
    return router.routes()
}