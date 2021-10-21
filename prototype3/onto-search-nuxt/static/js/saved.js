


uri="<http://www.semanticweb.org/tong/ontologies/2021/4/food#Menu";
b=0;



document.body.onload=function(){
    explore(uri,b);
}

//Fonction d'exploration des fils d'une classe


tab2=new Array();
a=1;
function explore(uri,b){

    query="PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>PREFIX val: "+uri+">SELECT ?sub WHERE { ?sub rdfs:subClassOf val:}";
    var urltoendpoint='http://localhost:3030/food/sparql';

    $.ajax({
        url: urltoendpoint,
        data:{
            "query": query,
            "output ":"json"
        },
        dataType:'jsonp',
        success: function(rep){
            
           p=0;
           const head = Object.keys(rep.head.vars);
          // tb_head.innerHTML="";
           h=rep.results.bindings[0];

          
    
           tab2[a]=document.createElement('ul');
           tab2[a].setAttribute('id','level'+a);
          // alert(tab2[a])
    document.getElementById('level'+(a-1)).appendChild(tab2[a]);

         for(var cle in Object.keys(rep.results.bindings)){
            
             const resultat=  Object.keys(rep.results.bindings[cle].sub);
             // res=Object.keys(resultat);
           // tab2[a]=new Array();
             $.each(rep.results.bindings[cle].sub, function(cle1, valeur){
               
                if(cle1=="value"){
                    tab=valeur.split('#');

     console.log(tab[1]);

     uri="<"+tab[0]+"#"+tab[1];
     console.log(uri);
     explore(uri,b);
                    const li = document.createElement('li');
                li.innerHTML=tab[1];
                tab2[a].appendChild(li);

     
                }
            })

    }
    b++;

    a++;
    
    
    
              }
    
    
    })
    

}

