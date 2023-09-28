let input=document.querySelector("input[name=tarefa]")
 
let btn=document.querySelector("#botao")
  
let list=document.querySelector("#lista")



let tarefas=JSON.parse(localStorage.getItem("tarefas")) || []

function renderizarTarefa(){

    list.innerHTML=""
    
    for(tarefa of tarefas){
       //Criando item da lista
       let itemLista=document.createElement("li")

       itemLista.onclick=function(){
         removerItem(this)
       }

       //Adicionar classe do item na lista
       itemLista.setAttribute("class","list-group-item list-group-item-action")

       //Criar o texto
       let itemTexto=document.createTextNode(tarefa)

       //Adicionar o texto no item da lista
       itemLista.appendChild(itemTexto)

       //Adiciona o item da lista na lista
       list.appendChild(itemLista)

    }

}

renderizarTarefa()

btn.onclick=function(){

    //Captura o valor do input
    let novaTarefa=input.value

    if (novaTarefa!=="") {

    //Atualizar a nova tarefa
    tarefas.push(novaTarefa)

    renderizarTarefa()

    //Limpar o input
    input.value=""

    removeSpan()
    salvarDados()
  }else{
    removeSpan()
    let card=document.querySelector(".card")
    let span=document.createElement("span")
    span.setAttribute("class","alert alert-warning")

    let msg=document.createTextNode("Vc precisa informar a tarefa")
    span.appendChild(msg)
    card.appendChild(span)
  }
}


function removeSpan(){
    let spans=document.querySelectorAll("span")
    let card=document.querySelector(".card")

    for (var i = 0; i <spans.length; i++) {
        card.removeChild(spans[i])
    }
}


function removerItem(tar){
    tarefas.splice(tarefas.indexOf(tar.textContent),1)

    renderizarTarefa()
    salvarDados()
}


function salvarDados(){
    localStorage.setItem("tarefas",JSON.stringify(tarefas))
}