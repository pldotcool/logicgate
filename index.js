let cellCounter = 0;
var id=0;
let objAll = [];
let cellsAll = [];
let dragEl;
let dragElId;



let sgate = document.getElementById('gate').value;
let newFF = document.getElementById('new');

newFF.onclick = function(e) {
    createOneCell('nand');
}

document.onclick = function(e) {
    // element.classList.add("mystyle");
    // element.classList.toggle("mystyle");
    // element.classList.contains()
    // dragElement(document.getElementById("oc-0"));
    
    if(e.target.classList.contains('smallBox')){
        console.log('==================================');
        console.log(e.target);
        let id = e.target.id;
        id = id.replace('ff+','');
        id = id.replace('-sb','');
        let oneCellSum = document.getElementById(`ocSum-${id}`);
        let oneCellRest = document.getElementById(`ocRest-${id}`);
        oneCellSum.classList.toggle('hide');
        oneCellRest.classList.toggle('hide');
        console.log(`small box id = ${id}`);
        console.log('==================================');
    }

    let id = e.target.id;
    dragEl = e.target.id;
    id = id.replace('oc-','');
    dragElId = id;
    // document.getElementById('gate').value = id;
    // sgate = id;
    console.log(e)
    console.log(e.target)
    console.log(e.target.getAttribute("class"))
    const hasClass = e.target.classList.contains('oneCell');
    console.log(hasClass);
    if(hasClass == true){
        document.getElementById('gate').value = id;
        sgate = id;
        // dragElement(document.getElementById(dragEl));
    }
    console.log(e.target.id)
}

var element = document.getElementById('lec');
element.onclick = function () { 
    let gate = sgate;
    // let gate = document.getElementById('gate').value;
    let set = 0;//document.getElementById('set').value;
    let enable = 0;//document.getElementById('enable').value;
    let reset = 0;//document.getElementById('reset').value;

    let xset = document.getElementsByName('set');
    xset.forEach((input, index) => {
        set = (index == 0 && input.checked == true) ? 0:1;
        set = (index == 1 && input.checked == true) ? 1:0;
    });

    let xenable = document.getElementsByName('enable');
    xenable.forEach((input, index) => {
        enable = (index == 0 && input.checked == true) ? 0:1;
        enable = (index == 1 && input.checked == true) ? 1:0;
    });

    let xreset = document.getElementsByName('reset');
    xreset.forEach((input, index) => {
        reset = (index == 0 && input.checked == true) ? 0:1;
        reset = (index == 1 && input.checked == true) ? 1:0;
    });


    console.log(`set::: ${set} enable::: ${enable} reset::: ${reset}`)
    setCell(gate,set,enable,reset);

    ///////// refreshAll();
    // refreshCell();
    refreshOneCell();
    ////////// show();
};

function drawGate(name,a,b){
    
}

function setGate(id,a,b){
    let gate = objAll.find(x => x.id == id);

    objAll[gate.id].a=a;
    objAll[gate.id].b=b;


    var box1 = document.getElementById(`${gate.name}+${gate.id}-a`);
    var box2 = document.getElementById(`${gate.name}+${gate.id}-b`);
    box2.innerHTML = gate.b;
    var box3 = document.getElementById(`${gate.name}+${gate.id}-c`);
    box3.innerHTML = gate.out;
    box3.style.backgroundColor = 'yellow';
    box1.style.backgroundColor = 'blue';
    box2.style.backgroundColor = 'blue';
    // console.log(box1);
    box1.innerHTML = gate.a;

    refreshAll();
}

function show() {
    console.log('--------------------------------------------');
    objAll.forEach(gate => {
        console.log(`${gate.name}:${gate.id}`);
        console.log(`a-${gate.a} b-${gate.b} out-${gate.out}`);
        
    });
    console.log('--------------------------------------------');
}



function refreshAll() {
    objAll.forEach((gate, index) => {
        // console.log(gate.id)
    
        switch(gate.name) {
            case 'and': gate.out = (gate.a==1 && gate.b==1) ? 1:0;
              break;
            case 'nand': {
                let a;
                if(gate.parent_a !=-1 ){
                    gate.a = objAll[gate.parent_a].out;
                }

                if(gate.parent_b !=-1 ){
                    gate.b = objAll[gate.parent_b].out;
                }
                gate.out = (gate.a==1 && gate.b==1) ? 0:1;
            }
              break;
            case 'or': gate.out = (gate.a==0 && gate.b==0) ? 0:1;
              break;
            case 'nor': gate.out = (gate.a==0 && gate.b==0) ? 1:0;
              break;
            default:
              // code block
        }

        var box1 = document.getElementById(`${gate.name}+${gate.id}-a`);
        var box2 = document.getElementById(`${gate.name}+${gate.id}-b`).innerHTML = gate.b;
        var box3 = document.getElementById(`${gate.name}+${gate.id}-c`);
	    box3.innerHTML = gate.out;
        box3.style.backgroundColor = 'yellow';
        
        box1.innerHTML = gate.a;
    });
    // console.log(objAll);
}



function createGate(name) {

    var new_row = document.createElement( "div" );
    // let oc = document.getElementsByClassName(`oc-${cellCounter}`);
    let oc = document.getElementById(`ocRest-${cellCounter}`);
    // let oc = document.getElementById(`oc-${cellCounter}`);
    // let oc = document.getElementById("cell");
    
    
    // .setAttribute( "class", "oneCell" );
    var aa = document.createElement( "div" );
    var bb = document.createElement( "div" );
    var cc = document.createElement( "div" );
    
    document.body.appendChild(new_row);
    


    // let cellBody = document.getElementById('cell');
    // cellBody.appendChild(new_row);
    // cellBody.setAttribute( "class", `oneCell oc-${id}` );
    // document.body.appendChild( new_row );
    

    aa.setAttribute("id", `${name}+${id}-a`);
    aa.setAttribute("class", `node ${name}`);
    // aa.appendChild( document.createTextNode( `${a}` ) );
    
    bb.setAttribute("id", `${name}+${id}-b`);
    bb.setAttribute("class", `node ${name}`);
    // bb.appendChild( document.createTextNode( `${b}` ) );
    
    cc.setAttribute("id", `${name}+${id}-c`);
    cc.setAttribute("class", `node ${name}`);
    // cc.appendChild( document.createTextNode( `out` ) );

    new_row.setAttribute("id", `${name}+${id}`);
    new_row.setAttribute( "class", "body" );
    // new_row.setAttribute( "class", "aClassName anotherClass" );

    
    new_row.appendChild( document.createTextNode( `${name}+${id}` ) );
    new_row.appendChild( aa);
    new_row.appendChild( bb);
    new_row.appendChild( cc );      

    oc.appendChild(new_row);

    
    const obj = {};
    obj.name = name;
    obj.id = id;
    obj.a = 3;
    obj.parent_a = -1; //id of parent = output parent is input a
    obj.parent_b = -1;
    obj.b = 4;
    obj.out = 5;

    objAll.push(obj);
    id++;
    return obj;
  }

function createOneCell(){
    // let cellBody = document.getElementById('cell');
    var smallBox = document.createElement( "div" );
    smallBox.setAttribute("id", `ff+${cellCounter}-sb`);
    smallBox.setAttribute("class", `smallBox`);
    let newCell = document.createElement( "div" );
    newCell.setAttribute( "id", `oc-${cellCounter}` );
    newCell.setAttribute( "class", `oneCell` );
    document.body.appendChild(newCell);

    newCell.appendChild( smallBox );

    let newCellsum = document.createElement( "div" );
    newCellsum.setAttribute( "id", `ocSum-${cellCounter}` );
    newCellsum.setAttribute( "class", `oneCellSum` );
    newCell.appendChild(newCellsum);
    // newCellsum.appendChild( document.createTextNode( `Flip-Flop ${cellCounter}` ) );
    newCellsum.innerHTML =  `Flip-Flop <b>${cellCounter}</b><br>`;

        let aa = document.createElement( "div" );
        let bb = document.createElement( "div" );
        let cc = document.createElement( "div" );
        let name = 'FlipFlop';

        aa.setAttribute("id", `${name}+${cellCounter}-set`);
        aa.setAttribute("class", `node ${name}`);
        
        bb.setAttribute("id", `${name}+${cellCounter}-Enable`);
        bb.setAttribute("class", `node ${name}`);
        
        cc.setAttribute("id", `${name}+${cellCounter}-Out`);
        cc.setAttribute("class", `node ${name}`);
        // var box1 = document.getElementById(`${gate.name}+${gate.id}-a`);
    
        // newCellsum.appendChild( document.createTextNode( `${name}+${id}` ) );
        
        newCellsum.appendChild( aa);
        newCellsum.appendChild( bb);
        newCellsum.appendChild( cc );    


    let newCellRest = document.createElement( "div" );
    newCellRest.setAttribute( "id", `ocRest-${cellCounter}` );
    newCellRest.setAttribute( "class", `oneCellRest hide` );
    newCell.appendChild(newCellRest);

    const obj = {};
    
    // let a1 = createGate('and', set, enable);
    // let a2 = createGate('and', enable, reset);
    let a1 = createGate('nand'); //obj.push(a1);
    let a2 = createGate('nand'); //obj.push(a2);
    let n1 = createGate('nand'); //obj.push(n1);
    let n2 = createGate('nand'); //obj.push(n2);
    

    obj.id = cellCounter;
    obj.n1 = a1.id;
    obj.n2 = a2.id;
    obj.n3 = n1.id;
    obj.n4 = n2.id;

    // setGate(objAll[a1.id].id, set, enable);
    
    // setGate(objAll[a2.id].id, enable, reset);
  
    objAll[n1.id].parent_a = a1.id;
    objAll[n2.id].parent_b = a2.id;
    cellsAll.push(obj);
    console.log(cellsAll);

    cellCounter++;
    return n1.out;
}

function setCell(id,set,enable,reset){
    let n2 = objAll[cellsAll[id].n4];
    let n1 = objAll[cellsAll[id].n3];
    let a2 = objAll[cellsAll[id].n2];
    let a1 = objAll[cellsAll[id].n1];

    setGate(a1.id, set, enable);
    setGate(a2.id, enable, reset);
    // refreshCell();
    refreshOneCell();
}

function refreshOneCell() {
    let getId = document.getElementById('gate').value;
    let currentCell = cellsAll[getId];
    let n2 = objAll[currentCell.n4];
    let n1 = objAll[currentCell.n3];
    let a2 = objAll[currentCell.n2];
    let a1 = objAll[currentCell.n1];

    let cellBody = document.getElementById(`oc-${getId}`);
    if(n1.out == 1){
        cellBody.setAttribute("class", "oneCell ocTrue");
    } else {
        cellBody.setAttribute("class", "oneCell ocFalse");
    }
            
    setGate(n2.id, n1.out, a2.out);
    setGate(n1.id, a1.out, n2.out);

    let name = 'FlipFlop';
            let box1 = document.getElementById(`${name}+${getId}-set`);
            let aa1 = objAll[currentCell.n1];
                box1.innerHTML = `SET: ${aa1.a}`;

            let box2 = document.getElementById(`${name}+${getId}-Enable`);
            let aa2 = objAll[currentCell.n2];
                box2.innerHTML = `ENA: ${aa2.a}`;

            let box3 = document.getElementById(`${name}+${getId}-Out`);
            let nn1 = objAll[currentCell.n3];
                box3.innerHTML = `OUT: ${nn1.out}`;
}


    let counter = 0;

    let bit = createOneCell();
    let bit2 = createOneCell();

    counter++;






