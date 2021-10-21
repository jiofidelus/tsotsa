/*
level0=document.getElementById('level0');
lev0=document.getElementById('lev0');
val1= document.getElementById('val0').value;
*/
//Objet arbre

var arbre = {
  uri:"",
  value: "",
  fils:[
    {
     
    }
  ]
}

//Recuperation des id pour remplir les proprietés

var subclass=document.getElementById('subclass');




var urltoendpoint='http://localhost:3333/api/sparql/';

var ul_main=document.getElementById('main');


var li_id= Array();
var input_val= Array();
test=0;
//alert(li_id[i])
i=1;
//input_val[i]= document.getElementById('val'+i).value;
s=0;
var tab=Array();

document.body.onload=function(){
  explore_racine();

}
/*
level0.onclick=function(){

   // explore(lev0,val1)
    //this.disabled=true;

}*/
noeuds=new Array();


//Fonction d'initialisation de la racine
z=0;
function explore_racine(){
  var ul_main=document.getElementById('main');

  query="PREFIX : <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>   PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> select ?racine where { ?racine rdf:type <http://www.w3.org/2002/07/owl#Class> minus{     ?racine <http://www.w3.org/2000/01/rdf-schema#subClassOf> ?b }  }";
  var tab3=new Array();
  $.ajax({
    url: urltoendpoint,
    method: "GET",
    data:{
        "query": query,
        "output ":"json"
    },
    //dataType:'jsonp',
    success: function(rep){
      for(var cle in Object.keys(rep.results.bindings)){
            
        $.each(rep.results.bindings[cle].racine, function(cle1, valeur){
          if(cle1=="value"){
            tab3=valeur.split('#');

            val=tab3[1];
            if(val!=null){
                const li = document.createElement('li');
                const p=document.createElement('p');
                li.setAttribute('id','lev0'+z);
                p.innerHTML=tab3[1];
                
                const inp =document.createElement('input');
               //inp.setAttribute('type','hidden');
                inp.setAttribute('value',''+val);
              //  inp.setAttribute('id','level'+i+q);

                li.appendChild(inp);
               // li.appendChild(p);
                ul_main.appendChild(li);
                    id1=document.getElementById('level0'+z);
                    //val
                   // alert(id)
                   //inp.disabled=true;
               
   inp.onclick=function(){
      // alert(this.value)
//      if(test==0){
  vl=this.value;
    this.style.color="rgb(47, 113, 189)";
 // alert(noeuds[s])
        
        explore(li,this.value)

    
        this.disabled=true;
        subclassOf(this.value);

    //this.value="";
  //    }

z++;
    }
  }
          }

        })
      }
      
    }
  })


}













//Fonction d'exploration des fils

var q2=0;
var i2=1;
const p0=document.createElement('p');


function explore(level,val) {
    query="PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>PREFIX val: <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#"+val+">SELECT ?sub WHERE { ?sub rdfs:subClassOf val:}";
    //alert(i)
    noeuds[s]=new Array();
    
    noeuds[s][0]=val;
       //    }
q2=0;
i2=1;
li_main=document.getElementById('base');
//p0.innerHTML=val;

           li_main.innerHTML="<p>"+val+"</p>";
Tracer(li_main,val);
   // alert(arbre.fils.pere)
      $.ajax({
        url: urltoendpoint,
  //method: "POST",
        data:{
            "query": query,
            "output ":"json"
        },
        //dataType:'jsonp',
        success: function(rep){
            
           const head = Object.keys(rep.head.vars);
          // tb_head.innerHTML="";
           h=rep.results.bindings[0];
    
          
         for(var cle in Object.keys(rep.results.bindings)){
            
              const resultat=  Object.keys(rep.results.bindings[cle].sub);
             // res=Object.keys(resultat);

           ul=document.createElement('ul');
          // ul.setAttribute('id','lev'+i);
          v=document.getElementById('lev'+(i-1));
            level.appendChild(ul)
           //document.getElementById('body').appendChild(ul);
            // level.innerHTML+="<ul style=' position:absolute;   margin-left:20px;         '>";
            q=0;
           
             $.each(rep.results.bindings[cle].sub, function(cle1, valeur){
               
                if(cle1=="value"){
                  tab=valeur.split('#');

                if(valeur!=undefined || noeuds[s][1]){
                  //alert(valeur)
                // noeuds[s][0]=valeur;
                  noeuds[s]=tab[1];

                }
                  //arbre.fils.uri=valeur;
                  //arbre.fils.value=tab[1];
                      
                    
                 // alert(arbre.fils.pere)

                val=tab[1];
            if(val!=null){
                const li = document.createElement('li');
                const p=document.createElement('p');
                li.setAttribute('id','lev'+i+q);
                p.innerHTML=tab[1];
                
                const inp =document.createElement('input');
               //inp.setAttribute('type','hidden');
                inp.setAttribute('value',''+val);
              //  inp.setAttribute('id','level'+i+q);

                li.appendChild(inp);
               // li.appendChild(p);
                ul.appendChild(li);
                    id1=document.getElementById('level'+i+q);
                    //val
                   // alert(id)
                   //inp.disabled=true;
               
   inp.onclick=function(){
      // alert(this.value)
//      if(test==0){
  vl=this.value;
    this.style.color="rgb(47, 113, 189)";
 // alert(noeuds[s])
        
        explore(li,this.value)

    
        this.disabled=true;
        subclassOf(this.value);
        load_instance(this.value);

    
s++;
    }
     console.log(tab[1]);
     
                q++;
                }
            
            }   
            })
            
       
            i++;

    }
    

    
    
              }
    
    
    })
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                        
    

    //Chargement du parent pour avoir le subclassOf
var tab2 = new Array();

    function subclassOf(val){

      var query="PREFIX : <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>   select ?parent where { :"+val+" <http://www.w3.org/2000/01/rdf-schema#subClassOf> ?parent  }"

      $.ajax({
        url: urltoendpoint,
        //method: 'POST',
        data:{
            "query": query,
            "output ":"json"
        },
        //dataType:'jsonp',
        success: function(rep){
          //alert(rep)*
          for(var cle in Object.keys(rep.results.bindings)){
            
          $.each(rep.results.bindings[cle].parent, function(cle1, valeur){
            if(cle1=="value"){
              tab2=valeur.split('#');
            

              document.getElementById('subclass').innerHTML=tab2[1];
            }

          })
        }
        }
      })
    }
    

 

//Fonction qui charge les instances de classe

var instances=new Array();
var tab4=new Array();

function load_instance(val){
  var query="PREFIX : <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#>PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>select ?instance where {  ?instance rdf:type :"+val+".} limit 100";
  var compteur=0;
  document.getElementById('instance').innerHTML="";

      $.ajax({
        url: urltoendpoint,
        //method: 'POST',
        data:{
            "query": query,
            "output ":"json"
        },
        //dataType:'jsonp',
        success: function(rep){
          //alert(rep)*
          for(var cle in Object.keys(rep.results.bindings)){
            
          $.each(rep.results.bindings[cle].instance, function(cle1, valeur){
            if(cle1=="value"){
              tab4=valeur.split('#');
            
instances[compteur]=tab4[1];
document.getElementById('instance').innerHTML=instances;
document.getElementById('instance').style.color="rgb(47, 113, 189)";


compteur++;
}

          })
        }

        }
      })
    
}



//Fonction pour le tracé du graphe
var tab5=new Array();

function Tracer(level,val){
  query="PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>PREFIX val: <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#"+val+">SELECT ?sub WHERE { ?sub rdfs:subClassOf val:}";

  $.ajax({
    url: urltoendpoint,
    //method: 'POST',
    data:{
        "query": query,
        "output ":"json"
    },
    //dataType:'jsonp',
    success: function(rep){
        
       const head = Object.keys(rep.head.vars);
      // tb_head.innerHTML="";
       h=rep.results.bindings[0];

      
     for(var cle in Object.keys(rep.results.bindings)){
        
          const resultat=  Object.keys(rep.results.bindings[cle].sub);
         // res=Object.keys(resultat);

       ul=document.createElement('ul');
      // ul.setAttribute('id','lev'+i);
      v=document.getElementById('niv'+(i2-1));
        level.appendChild(ul)
       //document.getElementById('body').appendChild(ul);
        // level.innerHTML+="<ul style=' position:absolute;   margin-left:20px;         '>";
        q=0;
       
         $.each(rep.results.bindings[cle].sub, function(cle1, valeur){
           
            if(cle1=="value"){
              tab5=valeur.split('#');

           
              //arbre.fils.uri=valeur;
              //arbre.fils.value=tab[1];
                  
                
             // alert(arbre.fils.pere)

            val=tab5[1];
        if(val!=null){
            const li = document.createElement('li');
            const p=document.createElement('p');
            li.setAttribute('id','niv'+i2+q2);
           // alert(i2)
            p.innerHTML=tab5[1];
            
                       li.appendChild(p);
            ul.appendChild(li);
                id1=document.getElementById('niveau'+i2+q2);
                //val
               // alert(id)
               //inp.disabled=true;
           
//inp.onclick=function(){
  // alert(this.value)
//      if(test==0){

    
   // Tracer(li,this.value)


s++;
//}
 console.log(tab5[1]);
 
            q2++;
            }
        
        }   
        })
        
   
        i2++;

}




          }


})

}


