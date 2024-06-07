import { scentData } from './scentdata.js';

const notesRadio = document.getElementById('notes-radio')
const getFragranceBtn = document.getElementById('get-fragrance-btn')
const clearBtn = document.getElementById('clear-btn')
const fragranceImageDiv = document.getElementById('fragrance-image')
const fragranceImageInner = document.getElementById('fragrance-image-inner')

// CREATE AN ARRAY CONTAINING INDIVIDUAL FRAGRANCE NOTES
function getNotesArray(fragrances){
   const notesArray = []
   
   for (let fragrance of fragrances){
      for (let note of fragrance.notes){
         if (!notesArray.includes(note)){
            notesArray.push(note)
         }
      }
   }
   return notesArray
}

// RENDER NOTES ARRAY IN HTML, SORTED
function renderNotesRadios(fragrances){
   let radioItems = ``

   const notes = getNotesArray(fragrances)
   notes.sort()

   for (let note of notes){
      radioItems += `
      <div class="radio">
         <label for="${note}">${note}</label>
         <input type="radio"
         id="${note}"
         value="${note}"
         name="notes"
         >
         </div>
      `
   }
   notesRadio.innerHTML = radioItems
}
renderNotesRadios(scentData)

//// GET FRAGRANCES WHEN MAIN BUTTON IS CLICKED - MULTI-STEP
getFragranceBtn.addEventListener('click', renderImage)

// EVENT LISTENER TO CHANGE LABEL BACKGROUND COLOR WHEN CLICKED
const labelColors = document.querySelectorAll('.radio label')
labelColors.forEach(label => {
   label.addEventListener('click', function() {

      labelColors.forEach(label => {
         label.style.backgroundColor = 'white'
      })

         this.style.background = 'rgb(255, 228, 142)'
   });
});

// CHECKS NOTE SELECTION, FINDS FRAGRANCE MATCHES
function getFragrances() {
   const checkedRadio = document.querySelector('input[type="radio"]:checked')
   if (checkedRadio) {
      const selectedNote = checkedRadio.value
      const matchingFragrances = scentData.filter(function(fragrance) {
         return fragrance.notes.includes(selectedNote)
      });
      return matchingFragrances;
   }
}

// GENERATE IMAGE OR CONCATENATE IMAGES 
function renderImage(){
   const fragrancesArray = getFragrances()

   const fragranceHTML = fragrancesArray.map(fragrance => 
      `
      <div class="fragrance-item">
         <img class="scent-img"
         src="./${fragrance.url}"
         alt="${fragrance.name}"
         >
         <br>${fragrance.brand}
         <br>${fragrance.name}
      </div>
      `
   ).join('')

      fragranceImageInner.innerHTML = fragranceHTML
   }


// CLEAR RADIO BUTTON & FRAGRANCE IMAGE DIV
clearBtn.addEventListener('click', clearRadio)

function clearRadio() {
   const radioButtons = document.querySelectorAll('input[type="radio"]')
   radioButtons.forEach(radio => {
      radio.checked = false
   })

labelColors.forEach(label => {
         label.style.backgroundColor = 'white'
      })

   fragranceImageInner.innerHTML = ''

}