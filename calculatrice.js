
// Patrick 08/2021 


var calculToDo ='';
document.getElementById("scientific").style.backgroundColor="green";
document.getElementById("normal").style.backgroundColor="white";
var dict = new Map([["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],
["7","7"],["8","8"],["9","9"],["0","0"],
["+","+"],["-","-"],["*","*"],["/","/"],["(","("],
[")",")"],[".","."],["reset","reset"],["cos","Math.cos"],["sin","Math.sin"],
["tan","Math.tan"],["PI","Math.PI"],["00","00"],["mem1","mem1"]])

console.log(dict)

// FUNCTIONS

function activScientificMode(){
    document.getElementById("operator2conteneur").hidden=false;
    document.getElementById("scientific").style.backgroundColor="green";
    document.getElementById("normal").style.backgroundColor="white";
    for (item of document.getElementById("operator2conteneur").children){
        item.hidden=false;
    }
}
function desactivScientificMode(){
    document.getElementById("operator2conteneur").hidden=true;
    document.getElementById("scientific").style.backgroundColor="white";
    document.getElementById("normal").style.backgroundColor="green";
    for (item of document.getElementById("operator2conteneur").children){
        item.hidden=true;
    }
}

function resetColorTextToBlack(){
    for (let item2 of document.getElementsByClassName("boutonformule")) {
        item2.style.color = "black";
    }
}

function displayConsoleClick(event){
    console.log("touche "+event.currentTarget.textContent+" a été cliquée")
}

function operatorEgal(){
    try {
        document
            .getElementById("resultconteneur")
            .textContent='= '+eval(calculToDo = document
                                                    .getElementById("formuleconteneur")
                                                    .value);
        calculToDo = '';
    } catch {
        console.log(" mauvaise formule")
        document
            .getElementById("resultconteneur")
            .textContent= 'résultat impossible'
    }

}

function boutonFormule(valeur){
    if (document
        .getElementById("formuleconteneur")
        .value == "Formule"){
            document
              .getElementById("formuleconteneur")
              .value = ''
              
        };
        // console.log('tototo   '+valeur)
        resetColorTextToBlack();
        calculToDo = document
            .getElementById("formuleconteneur")
            .value
        calculToDo = calculToDo + valeur;
        calculToDo = document
        .getElementById("formuleconteneur")
        .value = calculToDo
    }

function operatorMemory(event){
    document
    .getElementById("memory1conteneur")
    .textContent = document.getElementById("resultconteneur").textContent ;

}




function operatorReset(event){
    calculToDo = '';
    document
        .getElementById("formuleconteneur")
        .value='Formule';
    document
        .getElementById("resultconteneur")
        .textContent='Result';
    calculToDo = '';
    resetColorTextToBlack();       
    displayConsoleClick(event)
}

function kpress(evt){
    console.log("La touche ["+evt.code+"] a été tapée au clavier");
    // console.log(evt)
    if (evt.code=="Enter"){
        operatorEgal()
    }
}

function getHeritages(obj){
    var proto = Object.getPrototypeOf(obj);
    var heritages = [];
    while (proto !== null){
        heritages[heritages.length]=proto.constructor.name;
        proto = Object.getPrototypeOf(proto);
    }
    return heritages
}


// EVENEMENTS

document.getElementById("normal").addEventListener('click',function(){
    desactivScientificMode();
})
document.getElementById("scientific").addEventListener('click',function(){
    activScientificMode();
})

class boutonForFormule {
    constructor (element) {
        this.text=element.textContent
        this.valeur= dict.get(element.textContent)
        element.title = this.valeur
        var val = this.valeur
        
        element.addEventListener('click',function(event){
            console.log('TOTO  '+val)
            boutonFormule(val)
            displayConsoleClick(event)
            var colorOrigin = element.style.backgroundColor;
            element.style.backgroundColor="yellow";
            setTimeout(function(){
                element.style.backgroundColor=colorOrigin;
            },200)
        })
    }
}


for (let item of document.getElementsByClassName("boutonformule")){
    var bouton = new boutonForFormule(item)
}

document
    .getElementById("operator_reset")
    .addEventListener('click',function(event){
        operatorReset(event)
    })  




document
    .getElementById("operator_egal")
    .addEventListener('click',function(event){
        operatorEgal()
        displayConsoleClick(event)
    })  
 

document
    .getElementById("operator_memory1")
    .addEventListener('click',function(event){
        operatorMemory()
        displayConsoleClick(event)
    })  



window.addEventListener("keypress",kpress);



