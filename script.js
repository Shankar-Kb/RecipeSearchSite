function createHtmlElement(element,  className='', id=''){
    var elem = document.createElement(element);
    elem.setAttribute('class', className);
    elem.setAttribute('id', id);
    return elem;
}

let apiID = '92a8b54d';
let apiKey = '99753a5f9ea439dc1485b0ff5e190855';
let recipeURL = 'https://api.edamam.com/search?app_id='+apiID+'&app_key='+apiKey;

function buildURL(){

  var form = document.getElementById('inputForm');
  //console.log(form.elements);
  for( var i = 0; i < form.elements.length; i++ ) {
   var elem = form.elements[i];
   
   if(elem.type !== 'button'){

      if(elem.name === 'calMin'){
         if(elem.value !== ''){
         recipeURL += '&calories='+form.elements[i].value+'-'+form.elements[i+1].value;
         i++;
         }
      } 
      else {
        if (elem.value === '' && elem.name === 'q') elem.value = 'food';
        if (elem.value !== '' && elem.value !== 'Choose'){
          if (elem.value.includes(' ')) elem.value = elem.value.trim().replace(' ', '-');
          recipeURL += '&'+elem.name+'='+elem.value;
        }
      }
    }
  }
  //console.log(recipeURL);
  form.reset();
  getRecipes(recipeURL);
}


async function getRecipes(URL){
let edamamResp = await fetch(URL);
recipeURL = 'https://api.edamam.com/search?app_id='+apiID+'&app_key='+apiKey;
let edamamData = await edamamResp.json();
//console.log(edamamData.hits);
if(edamamData.hits.length === 0 || edamamData.hits === 'undefined') document.getElementById('noResults').innerHTML = `No Results`;
createCards(edamamData.hits);
}


function createCards(data){
  let cardContainer = document.getElementById('cardContainer');
    data.forEach( (elem,index) => {
        var card = createHtmlElement('div', 'card');
        cardContainer.append(card);
        
        var cardBody = createHtmlElement('div', 'card-body');

        var cardHeader = createHtmlElement('div', 'card-header text-center');
        cardHeader.innerHTML = `<a class ='card-source' href='${elem.recipe.url}'>${elem.recipe.label}</a>`;

        var cardImg = createHtmlElement('img', 'card-image');
        cardImg.src = elem.recipe.image;
        cardImg.alt = elem.recipe.label;
        
        var cardText = createHtmlElement('p', 'card-text');
        
        cardText.innerHTML = `<span><span class='bold'>Health Labels:</span>${getLabels(elem.recipe.healthLabels)}</span>
        <span><span class='bold'>Calories:</span> ${elem.recipe.calories.toFixed(0)} Cal</span>
        <span><span class='bold'>Vitamins:</span><span class='vitamins-list'>${getVitamins(elem.recipe.digest)}</span>`;

        var cardIngredients = createHtmlElement('span', 'btn');
        cardIngredients.setAttribute('data-toggle', 'collapse');
        cardIngredients.setAttribute('data-target', `#I${index}`);
        cardIngredients.innerHTML = `<span class='ingredients-title text-center'><i class="fas fa-utensils fa-1x"></i> Ingredient List</span>`;

        var ingredientsContent = createHtmlElement('div', 'collapse ingredients-content', `I${index}`);
        ingredientsContent.innerHTML = `${elem.recipe.ingredientLines}`;
        
        cardBody.append(cardText, cardIngredients, ingredientsContent);
        card.append(cardHeader, cardImg, cardBody);
    })
    
}

function getLabels(data){
  var labelArray = data.map(elem => { return ' '+elem});
  return labelArray;
}
function getVitamins(data){
  var vitaminsOnly = data.filter( elem => { return elem.label.includes('Vitamin') })
      .sort( (a,b) => { return b.total - a.total} );
  
  var vitaminsArray = [];
  for(var i = 0; i<vitaminsOnly.length-2; i++){
      vitaminsArray.push(' '+vitaminsOnly[i].label+'('+vitaminsOnly[i].total.toFixed(0)+vitaminsOnly[i].unit+')');
  }
  return vitaminsArray;
}

function clearScreen(){
  document.getElementById('cardContainer').innerHTML = '';
}