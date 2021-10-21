var tab=new Array();
    var tb_result=document.getElementById('tb_result');
    var tb_head=document.getElementById('tb_head');

    var id=document.getElementById('query_sparql');
    var urltoendpoint='http://localhost:3333/api/sparql/';
   // var queryurl= urltoendpoint + "?query" + encodeURIComponent(query) + "&format=json"; 
  
    var newCell=new Array();
  btn_execute=document.getElementById('execute');

  btn_execute.addEventListener('click',function(){
    var query=id.value;
     // alert(query)
     tb_result.innerHTML="";
    $.ajax({
        url: urltoendpoint,
        data:{
            "query": query,
            "output ":"json"
        },
        //dataType:'jsonp',
        success: function(rep){
           p=0;
            const head = Object.keys(rep.head.vars);
            tb_head.innerHTML="";
            h=rep.results.bindings[0];

           
          for(var cle in Object.keys(rep.results.bindings)){
             
               const resultat=  Object.keys(rep.results.bindings[cle]);
               if(cle==0){
                   row=tb_result.insertRow(tb_result.lenght);
                   Cell= row.insertCell(0);
                  
                    newText = document.createTextNode("");
                    Cell.appendChild(newText);

                    Cell.appendChild(newText);
               for (let a = 0; a < resultat.length; a++) {
                Cell= row.insertCell(a+1);
                CText = document.createTextNode(resultat[a]);
                Cell.appendChild(CText);
 
               }
            
            }
            p++;
            let newRow= tb_result.insertRow(tb_result.lenght);
            newCell= newRow.insertCell(newRow.lenght);
             newText = document.createTextNode(p);
            newCell.appendChild(newText);
      for (let index = 0; index < resultat.length; index++) {
var val=resultat[index];
f=0;
        $.each(rep.results.bindings[cle][val], function(cle1, valeur){
           
           if(cle1=="value"){
               
             newCell= newRow.insertCell(newRow.lenght);
           
            newText = document.createTextNode(valeur);
newCell.appendChild(newText);
f++;

console.log(valeur);


           }
             }) 
         
      }
     // tb_result.innerHTML+="</tr>";

}
        }
    
    })

  })