let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if(!productsInCart){
	productsInCart = [];
}
/* const parentElement = document.querySelector('#buyItems'); */
const parentElement = document.getElementById('buyItems');
/* const cartSumPrice = document.querySelector('#sum-prices'); */
const cartSumPrice = document.getElementById('sum-prices');
const products = document.querySelectorAll('.product-under');

const checkoutElement = document.querySelector('.checkout');


const countTheSumPrice = function () { // 4
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	return sum;
}

const updateShoppingCartHTML = function () {  // 3
	localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			return `
				<li class="buyItem">
					<img src="${product.image}">
					<div>
						<h5>${product.name}</h5>
						<h6>Rs.${product.price}</h6>
						<div>
							<button class="button-minus" data-id=${product.id}>-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="button-plus" data-id=${product.id}>+</button>
						</div>
					</div>
				</li>`
		});
		/* parentElement.innerHTML = result.join(''); */
        if (parentElement) {
            parentElement.innerHTML = result.join('');
        }
		/* document.querySelector('.checkout').classList.remove('hidden'); */
        /* const checkoutElement = document.querySelector('.checkout'); */
        if (checkoutElement) {
        checkoutElement.classList.remove('hidden');
        }
		/* cartSumPrice.innerHTML = 'Rs. ' + countTheSumPrice(); */
        if (cartSumPrice) {
            cartSumPrice.innerHTML = 'Rs. ' + countTheSumPrice();
        }

	}
	else {
		/* document.querySelector('.checkout').classList.add('hidden'); */
        /* const checkoutElement = document.querySelector('.checkout'); */
        if (checkoutElement) {
        checkoutElement.classList.add('hidden');
        }
		/* parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>'; */
        if (parentElement) {
        parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
        }
		/* cartSumPrice.innerHTML = ''; */
        if (cartSumPrice) {
            cartSumPrice.innerHTML = '';
          }
	}
}

function updateProductsInCart(product) { // 2
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
			return;
		}
	}
	productsInCart.push(product);
}

products.forEach(item => {   // 1
    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('addToCart')) {
        const productID = e.target.dataset.productId;
        const productName = item.querySelector('.productName').innerHTML;
        const productPrice = item.querySelector('.priceValue').innerHTML;
        const productImage = item.querySelector('img').src;
        let product = {
          name: productName,
          image: productImage,
          id: productID,
          count: 1,
          price: +productPrice,
          basePrice: +productPrice,
        }
        updateProductsInCart(product);
        updateShoppingCartHTML();
      }
    });
});
  


if(parentElement){
    parentElement.addEventListener('click', (e) => { // Last
        const isPlusButton = e.target.classList.contains('button-plus');
        const isMinusButton = e.target.classList.contains('button-minus');
        if (isPlusButton || isMinusButton) {
            for (let i = 0; i < productsInCart.length; i++) {
                if (productsInCart[i].id == e.target.dataset.id) {
                    if (isPlusButton) {
                        productsInCart[i].count += 1
                    }
                    else if (isMinusButton) {
                        productsInCart[i].count -= 1
                    }
                    productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
    
                }
                if (productsInCart[i].count <= 0) {
                    productsInCart.splice(i, 1);
                }
            }
            updateShoppingCartHTML();
        }
    });
}

updateShoppingCartHTML(); 

const search_item = document.getElementById('searchbar');
if(search_item){
    search_item.addEventListener('keyup', e=>{
        let currentValue = e.target.value.toLowerCase();
        let items = document.querySelectorAll('h5.productName');
        items.forEach(item =>{
            if(item.textContent.toLowerCase().includes(currentValue)){
                item.parentNode.parentNode.style.display = 'block';
            }
            else{
                item.parentNode.parentNode.style.display = 'none';
            }
        });

    });

}


