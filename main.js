// Define Variable
let form = document.getElementById('add-frm');
let item = document.getElementById('items')
let title = document.getElementById('n-title');
let body = document.getElementById('n-body');
let tableDiv = document.getElementById('tbl-div');
let search = document.getElementById('srch')
let resetBtn = document.getElementById('reset')

let noteCount = 0;
let newNote = '';
let isUpdate = false;
let record = '';
let note = '';
let nbody = '';

// Add Event Listner

// For page load
window.onload = updateTable;

//For form submit
form.addEventListener('submit', addNote);

// for Search tag

search.addEventListener('keyup', searchNote);

//For Remove note
item.addEventListener('click', removeNote);

//For view & Update
item.addEventListener('click', viewNUpdateNote);

//For reset 
resetBtn.addEventListener('click', resetAll);

// Declare Function
//Update Table

    function updateTable(){
        //Display the table when notes get aooded
        if(noteCount > 0){
            tableDiv.style.display = '';
            
            // Update note
            if(isUpdate){
                note.firstChild.textContent = title.value;
                note.lastChild.textContent = body.value;
                //Reset update and notecount
                isUpdate = false;
                noteCount--;
            }
            //Add a new note
            else{
                item.appendChild(newNote);
            }
        }
        else{
            tableDiv.style.display = "none";
        }    
    }
// addNote

function addNote(e){
    // stop initial beheviour
    e.preventDefault();

    // Add validation
    if (title.value == "" || body.value == ""){
        alert("Please Add the relavant fields")
    }
    else{
        let tr = document.createElement('tr');
        tr.className = "item";
        
        // Create Td for title and body
        let td = document.createElement('td');
        td.appendChild(document.createTextNode(title.value));

        let span = document.createElement('span');
        span.className = "span";
        span.appendChild(document.createTextNode(body.value));
        td.appendChild(span);

    // New td for view
    
        var td1 = document.createElement('td');
        td1.className = "btcellv";
        let btn1 = document.createElement('button');
        btn1.appendChild(document.createTextNode('View'));
        btn1.setAttribute('id', 'vw');
        td1.appendChild(btn1);

    // New td for delete
    
        var td2 = document.createElement('td');
        td2.className = "btcelld";
        let btn2 = document.createElement('button');
        btn2.appendChild(document.createTextNode('delete'));
        btn2.setAttribute('id', 'del');
        td2.appendChild(btn2);

    // Add all td's to tr element
    
        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);

    //Increment  note count
    
        noteCount++;

    //Set new note

        newNote = tr; 

    //Add or Update the note of the table
    
        updateTable();

        console.log(tr);
    }
    resetAll();
}   
// Search bar

function searchNote(e){
    // Text to lower case
    let searchTxt = e.target.value.toLowerCase();

    //Get list
    
    let list = item.getElementsByClassName('item');

    //Convert to an array
    let listarray = Array.from(list);
    // we can execute the function according to the all elemints in the function
    listarray.forEach(function(item){
        //Get Title
        let notetitle = item.firstChild.textContent;
        //Math
        if(notetitle.toLowerCase().indexOf(searchTxt) != -1){
            item.style.display = '';
        }
        else{
            item.style.display = 'none';
        }
    })
    console.log(listarray);
}
//Remove Note
function removeNote(e){
    if(e.target.id === 'del'){
        if(confirm("Are you sure")){
            //Delete notes
            let tr = e.target.parentElement.parentElement;
            item.removeChild(tr);

            //Update table
            noteCount--;
            if(noteCount === 0){
                updateTable();
            }
        }
    }
}
//View & Update Note
function viewNUpdateNote(e){
    if(e.target.id === 'vw'){
        record = e.target.parentElement.parentElement;
        note = record.firstChild;
        title.value = note.firstChild.textContent;
        body.value = note.lastChild.textContent;
        isUpdate = true;
    }
}
//Reset All
function resetAll(){
    title.value = '';
    body.value = '';
    isUpdate = false;
    newNote = '';
}
