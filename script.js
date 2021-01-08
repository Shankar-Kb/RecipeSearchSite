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
    
    data.forEach(elem => {
        var card = createHtmlElement('div', 'card');
        card.style = 'width: 18rem';
        cardContainer.append(card);
        
        var cardHeader = createHtmlElement('div', 'card-header text-center');
        cardHeader.innerHTML = `<a class ='card-source' href='${elem.recipe.url}'>${elem.recipe.label}</a>`;

        var cardImg = createHtmlElement('img', 'card-image');
        cardImg.src = elem.recipe.image;
        cardImg.alt = elem.recipe.label;



        card.append(cardHeader, cardImg);


    })
    
}

/* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */