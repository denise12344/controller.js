import icons from './icons.svg'; //Parcel 2
import 'core-js';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const renderSpinner = function (parentEl) {
  const markup = `
  <div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
</div>
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const showRecipe = async function () {
  try {
    //1.Loading recipe
    renderSpinner(recipeContainer);
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc8
      //'https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e
    );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    let { recipe } = data.data.recipe;
    recipe = {
      id: data.data.recipe.id,
      title: data.data.recipe.title,
      publisher: data.data.recipe.publisher,
      sourceUrl: data.data.recipe.source_url,
      image: data.data.recipe.image_url,
      servings: data.data.recipe.servings,
      cookingTime: data.data.recipe.cooking_time,
      ingredients: data.data.recipe.ingredients,
    };

    console.log(recipe);
    //2.rendering recipe
    const markup = `       
        <figure class="recipe__fig">
       <img src="${recipe.image}" alt="${recipe.title}" cl}ass="recipe__img" /
       <h1 class="${recipe.title}">
         <span>Pasta with tomato cream sauce</span>
       </h1>
       </figure>
       
       <div class="recipe__details">
       <div class="recipe__info">
         <svg class="recipe__info-icon">
           <use href="${icons}#icon-clock"></use>
         </svg>
         <span class="recipe__info-data recipe__info-data--minutes">${
           recipe.cookingTime
         }</span>
         <span class="recipe__info-text">minutes</span>
       </div>
       <div class="recipe__info">
         <svg class="recipe__info-icon">
           <use href="${icons}#icon-users"></use>
         </svg>
         <span class="recipe__info-data recipe__info-data--people">
         ${recipe.servings}
         </span>
         <span class="recipe__info-text">servings</span>
       
         <div class="recipe__info-buttons">
           <button class="btn--tiny btn--increase-servings">
             <svg>
               <use href="${icons}#icon-minus-circle"></use>
             </svg>
           </button>
           <button class="btn--tiny btn--increase-servings">
             <svg>
               <use href="${icons}#icon-plus-circle"></use>
             </svg>
           </button>
         </div>
       </div>
       
       <div class="recipe__user-generated">
         <svg>
           <use href="${icons}#icon-user"></use>
         </svg>
       </div>
       <button class="btn--round">
         <svg class="">
           <use href="${icons}#icon-bookmark-fill"></use>
         </svg>
       </button>
       </div>
       
       <div class="recipe__ingredients">
       <h2 class="heading--2">Recipe ingredients</h2>
       <ul class="recipe__ingredient-list">
       ${recipe.ingredients
         .map(ing => {
           return `         
         <li class="recipe__ingredient">
           <svg class="recipe__icon">
             <use href="${icons}#icon-check"></use>
           </svg>
           <div class="recipe__quantity">${ing.quantity}</div>
           <div class="recipe__description">
             <span class="recipe__unit">${ing.unit}</span>
             ${ing.description}
           </div>
        </li>
`;
         })
         .join('')}
       
       </div>
       
       <div class="recipe__directions">
       <h2 class="heading--2">How to cook it</h2>
       <p class="recipe__directions-text">
         This recipe was carefully designed and tested by
         <span class="recipe__publisher">${
           recipe.publisher
         }</span>. Please check out
         directions at their website.
       </p>
       <
         class="btn--small recipe__btn"
         href="${recipe.sourceUrl}"
         target="_blank"
       >
         <span>Directions</span>
         <svg class="search__icon">
           <use href="src/img/icons.sv g#icon-arrow-right"></use>
         </svg>
       </a>
       </div>
`;
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    alert(err);
  }
};

showRecipe();
