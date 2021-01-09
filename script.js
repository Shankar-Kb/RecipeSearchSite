function createHtmlElement(element,  className='', id=''){
    var elem = document.createElement(element);
    elem.setAttribute('class', className);
    elem.setAttribute('id', id);
    return elem;
}

let apiKey = '99753a5f9ea439dc1485b0ff5e190855'
let recipeURL = 'https://api.edamam.com/search?app_id=92a8b54d&app_key='+apiKey+'&q=grilled-chicken&from=0&to=5&calories=591-722&health=alcohol-free';

async function getRecipes(){
let edamamResp = await fetch(recipeURL);
let edamamData = await edamamResp.json();
console.log(edamamData.hits);
createCards(edamamData.hits);
}
getRecipes();

function createCards(data){
    let cardContainer = document.getElementById('cardContainer');
    
    data.forEach( (elem,index) => {
        var card = createHtmlElement('div', 'card');
        card.style = 'width: 18rem';
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
        cardIngredients.innerHTML = `<span class='ingredients-title'><i class="fas fa-utensils fa-1x"></i> Ingredient List</span>`;

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

/* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */