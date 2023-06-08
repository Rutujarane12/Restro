let carts = document.querySelectorAll('.addToCart');

const products = document.getElementById("products");

for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click', ()=>{
        //console.log("add to cart");
        cartNumbers(products[i]);
    })
}

function cartNumbers(){
    /* console.log("The product cliked is",products); */
    console.log(document.getElementById("demo").innerHTML = "The product cliked is" + products.innerHTML);
    let productNumbers = localStorage.getItem('cartNumbers');
    //console.log(productNumbers);

    productNumbers = parseInt(productNumbers);
    //console.log(typeof productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart').textContent = productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart').textContent = 1;
    }
    
}