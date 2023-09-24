const inputsearch=document.getElementById('inputsearch');
const searchbtn=document.getElementById('searchbtn');
const recipecontainer=document.getElementById('recipecontainer');
const searchform=document.querySelector('form');
const navbar=document.querySelector('nav');
const totalcount=document.getElementById('searchedrecipesnumber');
const cardelementsheight=280;
const cardelementswidth=320;

searchform.addEventListener('submit',(e)=>{
    e.preventDefault();
})

searchbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    recipecontainer.innerHTML='<h2>Fetching Recipes...</h2>';
    // totalcount=document.createElement('h2');
    // totalcount.innerHTML=`Total Recipes:-${value.meals.length}`;
    // navbar.appendChild(totalcount);
    totalcount.innerHTML=`Searched Recipes:-0`;
    if(inputsearch.value.trim().length>0){
        console.log(inputsearch.value.trim());
        setTimeout(() => {
            fetchRecipes(inputsearch.value.trim());
        }, 1000);
        
    }else{
        setTimeout(() => {
            recipecontainer.innerHTML='<h2>Nothing to display!Search Your Favourites</h2>';
            // recipecontainer.style='color:black;'
        }, 1000);
    }
    console.log("button clicked");
})

async function fetchRecipes(query){
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    recipecontainer.innerHTML='';

    await fetch(url).then((data)=>data.json()).then(value=>{
        console.log(value);
        // totalcount.innerHTML=`Searched Recipes:-${value.meals.length}`;
        if(value.meals!=null){
            totalcount.innerHTML=`Searched Recipes:-${value.meals.length}`;

            value.meals.forEach(meal=>{
            
                const card=document.createElement('div');
                card.classList.add('recipes');
                card.innerHTML=`
                <img src=${meal.strMealThumb}>
                <h3>${meal.strMeal}</h3>
                <p>${meal.strArea}</p>
                <p class="categorytext">${meal.strCategory}</p>
                `;

                const recipebtn=document.createElement('button');
                recipebtn.innerText='View Recipe';
                recipebtn.className='recipebtn';
                card.appendChild(recipebtn);

                recipebtn.addEventListener('click',()=>{
                    getRecipe(meal);
                })
                // card.innerHTML=``;
    
                // card.style=`width:340px;`;
    
                // const cardImage=document.createElement('div');
                // cardImage.classList.add('cardimages');
                // cardImage.innerHTML=`
                // <img src=${meal.strMealThumb}>`;
                // cardImage.style=`width:100%;height:${cardelementsheight}px;padding:2vh 2vw; `;
                // card.appendChild(cardImage);
                recipecontainer.appendChild(card);
            });
        }else{
            recipecontainer.innerHTML='<h2>Recipe not found!</h2>';
        }

        // value.meals.forEach(meal=>{
            
        //     const card=document.createElement('div');
        //     card.classList.add('recipes');
        //     card.innerHTML=`
        //     <img src=${meal.strMealThumb}>
        //     <h3>${meal.strMeal}</h3>
        //     <p>${meal.strArea}</p>
        //     <p class="categorytext">${meal.strCategory}</p>
        //     `;
        //     // card.innerHTML=``;

        //     // card.style=`width:340px;`;

        //     // const cardImage=document.createElement('div');
        //     // cardImage.classList.add('cardimages');
        //     // cardImage.innerHTML=`
        //     // <img src=${meal.strMealThumb}>`;
        //     // cardImage.style=`width:100%;height:${cardelementsheight}px;padding:2vh 2vw; `;
        //     // card.appendChild(cardImage);
        //     recipecontainer.appendChild(card);
        // });
    }).catch((error)=>{
        console.log(error);
    })
}

// function getRecipe(meal){

//     // if(recipedetails!=null){
//     //     recipedetails.remove();
//     // }
//     const recipedetails=document.createElement('div');
//     recipedetails.className='recipedetails';

//     const closepopup=document.createElement('button');
//     closepopup.innerText='close';
//     closepopup.className='closepopup';
//     recipedetails.appendChild(closepopup);

//     return recipedetails;


// }

function getRecipe(meal) {

    const existingpopup=document.querySelector('.recipedetails');
    if(existingpopup){
        existingpopup.remove();
    }
    
    const recipedetails = document.createElement('div');
    recipedetails.className = 'recipedetails';

   
    const popupheading=document.createElement('div');
    popupheading.className='popupheading';
    
    
    // const closepopup = document.createElement('button');
    // closepopup.innerText = 'Close';
    // closepopup.className = 'closepopup';
    // recipedetails.appendChild(closepopup);

    // const recipename=document.createElement('h3');
    // recipename.innerHTML=`${meal.strMeal}`;
    // recipedetails.append(recipename);

    const recipename=document.createElement('h3');
    recipename.innerHTML=`${meal.strMeal}`;
    popupheading.append(recipename);

    const closepopup = document.createElement('button');
    closepopup.innerText = 'Close';
    closepopup.className = 'closepopup';
    popupheading.appendChild(closepopup);

    

    recipedetails.appendChild(popupheading);

    const recipeinstructions=document.createElement('div');
    recipeinstructions.className='recipeinstructions';
    recipeinstructions.innerHTML=`
    <h3>Indegrients</h3>
    <ul>${fetchindegrients(meal)}</ul>
    <h3>Instructions:</h3>
    <h5>${meal.strInstructions}</h5>`;

    recipedetails.appendChild(recipeinstructions);
    
    closepopup.addEventListener('click', () => {
        
        recipedetails.remove();
    });

   
    

    recipecontainer.appendChild(recipedetails);
}

function fetchindegrients(meal){
    let indegrientslist='';
    let i=1;
    while(meal[`strIngredient${i}`]!=""){
        const quantity=meal[`strIngredient${i}`];
        const name=meal[`strMeasure${i}`];
        indegrientslist+=`<li>${quantity}:${name}</li>`;
        i++;
    }

    return indegrientslist;

}
