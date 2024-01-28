let width = $("#boxLinks").innerWidth() ;
let dataDisplayed = document.querySelector("#ContactUS") ;
let datarows   = document.querySelector("#datarows");
let SearchingContainer = document.querySelector("#SearchingContainer");
$(document).ready(() => {
    
        // loadin icone speed
        $("#loading").fadeOut(3000);
        // changing body css
        

  
})


$(".OpenDiv").on('click',()=>{
    let left  = $("#BoxContainer").css('left');
  
    if(left == "0px"){
       
        closeSlider();
        console.log(left)
       

    }
    else{
        openSlider() ;
        console.log(left)
        
    }
})

closeSlider() ;

function closeSlider(){

    $("#links li").css({ top: "50px", opacity: 0 });
    $("#BoxContainer").animate({left : -width},800,function(){
        $(".OpenDiv .fa-x").addClass('d-none');
        $(".OpenDiv .fa-bars").removeClass('d-none');
    });

}

function openSlider(){
    $("#BoxContainer").animate({left : 0},800) ;
    $(".OpenDiv .fa-x").removeClass('d-none');
    $(".OpenDiv .fa-bars").addClass('d-none');
    $("#links li").each(function (index) {
        $(this).animate({ top: 0, opacity: 1 }, 300 * index);
    });
}





async function getAllMeals(){
    $("#loading").show();
    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let responseData = await response.json();
    $("#loading").fadeOut(3000);
    displayAllMeals(responseData.meals);
}

function displayAllMeals(theMeals) {
    let cartona = " ";
    
    for (let i = 0; i < theMeals.length; i++) {
        cartona += `
            <div class="col-md-3">
                <div onclick="getDetails('${theMeals[i].idMeal}')" class="mealContainer position-relative  w-100">
                    <div class="imgContainer">
                        <img src="${theMeals[i].strMealThumb}" class="w-100 imge" alt="">
                        <div class="mealLayer position-absolute d-flex align-items-center text-black p-2 w-100">
                            <h4>${theMeals[i].strMeal}</h4>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    datarows.innerHTML = cartona;
}

getAllMeals();











// ------------------------------------------------------------------------------------------------------

// -------------------------------------------------   Category section ----------------------------------

async function getCategory(){
   
    $("#loading").show();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let responseData = await response.json();
    $("#loading").fadeOut(3000);
    displayCategories(responseData.categories);

}

async function getcategoryMeals(item){
    $("#loading").show() ;
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${item}`);
    let responseData = await response.json() ;
     $("#loading").fadeOut(3000) ;
    displayAllMeals(responseData.meals);
}




function  displayCategories(theCategories){
 
    let cartona = " " ;
    const maxDescriptionLength = 20;
    for(let i = 0 ; i < theCategories.length ; i++){
        const truncatedDescription = theCategories[i].strCategoryDescription.split(' ').splice(0, maxDescriptionLength).join(' ');

        cartona+= `

        
           <div class="col-md-3">
               <div onclick="getcategoryMeals('${theCategories[i].strCategory}')" class="mealContainer position-relative  w-100">
                   <div class="imgContainer">
                       <img src="${theCategories[i].strCategoryThumb}" class="w-100 imge" alt="">
                       <div class="mealLayer position-absolute">
                           <h4>${theCategories[i].strCategory}</h4>
                           <p>${truncatedDescription}</p>
                       </div>
                   </div>
               </div>
           </div>
      
        
        
        
        
        `
        datarows.innerHTML = cartona ;
       


    }

    
   

}
 

// ------------------------------------------------------------------------------------------------------

// -------------------------------------------------  Area section ----------------------------------


async function getArea(){
    $("#loading").show();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`) ;
    let responseData = await response.json();
    $("#loading").fadeOut(3000);
    displayArea(responseData.meals);
}
async function getAreaMeals(item){
    $("#loading").show() ;
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${item}`);
    let responseData = await response.json() ;
     $("#loading").fadeOut(3000) ;
    displayAllMeals(responseData.meals);
}

function displayArea(theArea){
    datarows.innerHTML = " " ;
    let cartona = " " ;
    for(let i = 0 ; i < theArea.length ; i++){
        

        cartona+= `

        
           <div class="col-md-3 p-4 my-3">
               <div onclick="getAreaMeals('${theArea[i].strArea}')" class="mealContainer text-center w-100 text-light ">
                   <div class="iconContainer">
                   <i class="fa-solid fa-house-laptop fs-1 fw-bolder "></i>
                       
                   </div>
                   <div>
                      <h3 class=" fs-1" >${theArea[i].strArea}</h3>
                   </div>
               </div>
           </div>
      
        
        
        
        
        `
        datarows.innerHTML = cartona ;

}
}

// ------------------------------------------------------------------------------------------------------

// -------------------------------------------------  Ingrediants section --------------------------------

async function getIngrediants(){
    $("#loading").show();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`) ;
    let responseData = await response.json() ;
    $("#loading").fadeOut(3000);
    displayIngrediants(responseData.meals.slice(0, 20));
}
async function getIngradiantsMeals(item){
    $("#loading").show() ;
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${item}`);
    let responseData = await response.json() ;
     $("#loading").fadeOut(3000) ;
    displayAllMeals(responseData.meals);
}

function displayIngrediants(theIngrediants) {
    let cartona = "";
    const maxDescriptionLength = 20;
    datarows.innerHTML = " ";

    for (let i = 0; i < theIngrediants.length; i++) {
        const description = theIngrediants[i].strDescription || ''; // Default to an empty string if strDescription is null
        const truncatedDescription = description.split(' ').splice(0, maxDescriptionLength).join(' ');

        cartona += `
            <div class="col-md-3 p-4 my-3">
                <div onclick="getIngradiantsMeals('${theIngrediants[i].strIngredient}')" class="mealContainer text-center w-100 text-light">
                    <div class="iconContainer display-1">
                        <i class="fa-solid fa-drumstick-bite fs-1 fw-bolder   "></i>
                    </div>
                    <div>
                        <h3 class="">${theIngrediants[i].strIngredient}</h3>
                        <p>${truncatedDescription}</p>
                    </div>
                </div>
            </div>`;
    }

    // Assuming datarows is defined somewhere in your code
    datarows.innerHTML = cartona;
}

// ------------------------------------------------------------------------------------------------------

// -------------------------------------------------  Search section --------------------------------


async function searchByName(theword){
    $("#loading").show();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${theword}`) ;

    let responseData = await response.json();
   
    $("#loading").fadeOut(3000) ;
    
    if (responseData.meals) {
        displayAllMeals(responseData.meals) ;

    } else {
        displayAllMeals([]);
        
    }




}

async function searchByLetter(theletter){
    $("#loading").show();
    if (theletter === "") {
        theletter = "a";
    }
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${theletter}`) ;

    let responseData = await response.json();
    $("#loading").fadeOut(3000) ;
    if (responseData.meals) {
        displayAllMeals(responseData.meals) ;

    } else {
        displayAllMeals([]);
        
    }


    
}


function displaySearch(){

    datarows.innerHTML = " " ;

    SearchingContainer.innerHTML = `
       <div class="row">
           <div class="col-md-6">
              <input type="text" onkeyup="searchByName(this.value)" class="form-control text-white bg-transparent" placeholder="Search By Name" >  
           </div>
           <div class="col-md-6">
             <input type="text" onkeyup="searchByLetter(this.value)" class="form-control text-white bg-transparent" placeholder="Search By First letter" maxlength="1" >  
           </div>
       <div>
    
    
    `
   





}
//-------------------------------------------------------------------------------------------------------

//--------------------------------------------------- getDetails -----------------------------------------

async function getDetails(theId){
    $("#loading").show();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${theId}`);
    let responseData = await response.json() ;
    $("#loading").fadeOut(3000) ;
    displayTheDetails(responseData.meals[0]);
   

}


function displayTheDetails(details){
    SearchingContainer.innerHTML = " ";
    datarows.innerHTML = " " ;
    let cartona = " " ;
    let recpiesContainer = '';
    let tagsContainer=''
    if (details.strTags) {
        let tagsArray = details.strTags.split(',').map(tag => tag.trim());
        for (let i = 0; i < tagsArray.length; i++) {
            tagsContainer+=`<span class="badge mt-2 bg-secondary">${tagsArray[i]}</span>`
        }
    }
    for (let i = 1; i <= 20; i++) {
        const measureKey = `strMeasure${i}`;
        if (details[measureKey] === " ") {
            break;
        }else{

            recpiesContainer+=`
            <span class="badge mt-2 bg-secondary">${details[measureKey]}</span>`
        }
        // console.log(`${measureKey}: ${mealData[measureKey]}`);
    }
     cartona = `
     <div class="col-md-4 text-white">
     <img src="${details.strMealThumb}" class="w-100 rounded-2 " alt="">
     <h2>${details.strMeal}</h2>
  </div>
  <div class="col-md-8 text-white">
    <h2>Instructions</h2>
    <p>${details.strInstructions}</p>
    <h3><span class="fw-bolder ">Area : </span>${details.strArea}</h3>
    <h3><span class="fw-bolder">Category : </span>${details.strCategory}</h3>
    <h3><span class="fw-bolder">Recipies : </span> <div class='d-flex flex-wrap  gap-3 '>
        ${recpiesContainer}
    </div>
    </h3>
    <h3><span class="fw-bolder">Tags : </span></span> <div class='d-flex flex-wrap  gap-3 '>
    ${tagsContainer}
</div></h3>

    <a href="${details.strSource}" target="_blank" class="btn btn-success ">Source</a>
    <a href="${details.strYoutube}" target="_blank" class="btn btn-danger ">youtube</a>
  </div>
     
     
     `

     datarows.innerHTML = cartona ;


}








// ---------------------------------------------------   contact Us --------------------------------------

let name = document.querySelector("#nameInput");
let email = document.querySelector("#emailInput");
let phone = document.querySelector("#phoneInput") ;


let age = document.querySelector("#ageInput");
let password = document.querySelector("#passwordinput") ;
let repassword = document.querySelector("#repasswordinput") ;
let btnbutton  =  document.querySelector(".submitting");


function showContacts(){
    datarows.innerHTML = " ";

    datarows.innerHTML = `
    <div class="container w-75 text-center d-flex flex-column   align-items-center justify-content-center  vh-100 ">
    <div class="row"  id="Data">
        <div class="col-md-6 my-2">
            <input type="text" class="form-control" id="nameInput" onkeyup="checkName()" placeholder="Enter Your Name">
            <div class="NameError text-danger  bg-danger-subtle rounded-2 py-3 mt-2 text-center d-none">
                Special characters and numbers not allowed
            </div>
        </div>
        <div class="col-md-6 my-2">
            <input type="text" class="form-control " id="emailInput" onkeyup="checkemail()" placeholder="Enter Your Email">
            <div class="EmailError text-danger  bg-danger-subtle rounded-2 py-3 mt-2 text-center d-none">
                Email not valid *exemple@yyy.zzz
            </div>
            
        </div>
        <div class="col-md-6 my-2">
            <input type="text" class="form-control " id="phoneInput" onkeyup="checkPhone()" placeholder="Enter Your Phone">
            <div class="PhoneError text-danger  bg-danger-subtle rounded-2 py-3 mt-2 text-center d-none">
                Enter valid Phone Number
            </div>
            
        </div>
        <div class="col-md-6 my-2">
            <input type="number" class="form-control " id="ageInput" onkeyup="checkAge()" placeholder="Enter Your Age">
            <div class="ageError text-danger  bg-danger-subtle rounded-2 py-3 mt-2 text-center d-none">
                Enter valid age
            </div>
            
        </div>
        <div class="col-md-6 my-2">
            <input type="password" class="form-control " id="passwordinput" onkeyup="checkpass()" placeholder="Enter Your Password">
            <div class="passwordError text-danger  bg-danger-subtle rounded-2 py-3 mt-2 text-center d-none">
                Enter valid password *Minimum eight characters, at least one letter and one number:*
            </div>
            
        </div>
        <div class="col-md-6 my-2">
            <input type="password" class="form-control " id="repasswordinput" onkeyup="checkRepass()" placeholder="Repassword">
            <div class="repassError text-danger  bg-danger-subtle rounded-2 py-3 mt-2 text-center d-none">
                Enter valid repassword
            </div>
            
        </div>

    </div>
    <button class="btn btn-outline-danger  submitting  my-2" disabled >Submit</button>
</div>
    
    
    `



}




function validateName(){
    let regex = /^[a-zA-Z\s]+$/ ;

    if(regex.test(name.value)){
        return true ;
    }
    else{
        return false ;
    }
}

function validateEmail(){
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ ;
    if(regex.test(email.value)){
        return true ;
    }
    else{
        return false ;
    }

}
function validatePhone(){
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ ;
    if(regex.test(phone.value)){
        return true ;
    }
    else{
        return false ;
    }
}

function validateAge(){
    let regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/ ;
    
    if(regex.test(age.value)){
        return true ;
    }
    else{
        return false ;
    }


  
}

function validatePass(){
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ ;
    if(regex.test(password.value)){
        return true ;
    }
    else{
        return false ;
    }
}
function validateRepass(){
    if(repassword.value === password.value){
        return true ;
    }
    else{
        return false ;
    }
}




function checkRepass(){
    if(!validateRepass()){
        document.querySelector(".repassError").classList.replace('d-none','d-block'); 
    }
    else{
        document.querySelector('.repassError').classList.replace('d-block','d-none'); 
    }
    

}
function checkpass(){
    if(!validatePass()){
        document.querySelector(".passwordError").classList.replace('d-none','d-block'); 
    }
    else{
        document.querySelector('.passwordError').classList.replace('d-block','d-none'); 
    }
  
}


function checkName(){
    if(!validateName()){
        document.querySelector(".NameError").classList.replace('d-none','d-block'); 
    }
    else{
        document.querySelector('.NameError').classList.replace('d-block','d-none'); 
        btnDisable() ;
    }

}
function checkemail(){
    if(!validateEmail()){
        document.querySelector(".EmailError").classList.replace('d-none','d-block'); 
    }
    else{
        document.querySelector('.EmailError').classList.replace('d-block','d-none'); 
        btnDisable() ;
    }

}

function checkPhone(){
    if(!validatePhone()){
        document.querySelector(".PhoneError").classList.replace('d-none','d-block'); 
    }
    else{
        document.querySelector('.PhoneError').classList.replace('d-block','d-none'); 
        btnDisable() ;
    }


}

function checkAge(){
    if(!validateAge()){
        document.querySelector(".ageError").classList.replace('d-none','d-block'); 
    }
    else{
        document.querySelector('.ageError').classList.replace('d-block','d-none'); 
        btnDisable() ;
    }


}
function btnDisable() {
    if (validateName() && validateAge() && validateEmail() && validatePass() && validatePhone() && validateRepass()) {
        btnbutton.removeAttribute('disabled');
    } else {
        btnbutton.setAttribute('disabled', true);
        // Alternatively: btnbutton.disabled = true;
    }
}









