const carticon = document.querySelector('.cart-icon');
const cartsidebar = document.querySelector('.cart_side-bar');
const closebtn = document.querySelector('.close_btn');
let itemlist = [];
carticon.addEventListener('click', () => {
    cartsidebar.classList.add('active')
});
closebtn.addEventListener('click', () => {
    cartsidebar.classList.remove('active')
});


//Loaded Function
document.addEventListener('DOMContentLoaded', appFunctions());
function appFunctions() {
    loadedcontent();
}


function loadedcontent() {
    //item Removed form cart
    let productdeleteicon = document.querySelectorAll('.product_delete_icon');
    productdeleteicon.forEach((buttons) => {
        buttons.addEventListener('click', removed);
    })
    // adding quantity to not inserted negative value and don't change any text value
    let number = document.querySelectorAll('.number');
    number.forEach((input) => {
        input.addEventListener('change', changeQty);
    })
    //Item Add from Cart
    let cardcarticon = document.querySelectorAll('.card_cart-icon');
    cardcarticon.forEach((cartbtn) => {
        cartbtn.addEventListener('click', additems);
    });

    updatedprice();
}


//product remove function
function removed() {
    //confire msg
    if (confirm('Are you Sure Remove the Producs')) {
        let productbox = document.querySelector('.product_box');
        let titles = this.parentElement.querySelector('.title');
        console.log(titles);
        itemlist = itemlist.filter(ele => ele.titles != titles);
        productbox.remove();
        loadedcontent()
    }

    //this.parentElemen.remove()->removed by button parent elemnet
}
//quantity input box
function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    loadedcontent();
}

//Item Add from Cart
function additems() {
    let card01 = this.parentElement;
    let title = card01.querySelector('.title').innerHTML;
    let price = card01.querySelector('.price').innerHTML;
    let cardimg = card01.querySelector('.card_01 img').src;
    // console.log(title, price, cardimg);
    //check the exesting roduct is don't add one more time
    let prosuctstitles = { title, price, cardimg };
    if (itemlist.find((ele) => ele.title == prosuctstitles.title)) {
        alert('Product is Already Added')
        return;
    } else {
        itemlist.push(prosuctstitles);
    }
    let productelements = getcartitems(title, price, cardimg);
    let element = document.createElement('div');
    element.innerHTML = productelements;
    let productbox = document.querySelector('.product_container');
    productbox.append(element);
    loadedcontent()
}
function getcartitems(title, price, cardimg) {
    return `
    <div class="product_box">
                    <div class="product_img">
                        <img src="${cardimg}" alt="">
                    </div>
                    <div class="products_text">
                        <div class="col_01">
                            <h4 class="title">${title}</h4>
                        </div>
                        <div class="price_box">
                            <p class="Price">${price}</p>
                            <p class="inc_Price">${price}</p>
                        </div>
                        <div class="price_count">
                            <input type="number" class="number" name="number" value="1">
                            <ion-icon name="trash-bin-outline" class="product_delete_icon"></ion-icon>
                        </div>
                    </div>
                </div>
    
    `;
}

function updatedprice() {
    const cartbox = document.querySelectorAll('.product_box')
    const totalPrice = document.querySelector('.total_amt')

    let total = 0;
    cartbox.forEach(products => {
        let Price = products.querySelector('.Price');
        let amtfilter = parseFloat(Price.innerHTML.replace('Rs.', ''));
        let qty = products.querySelector('.number').value;
        total += (amtfilter * qty);
        products.querySelector('.inc_Price').innerText = "Rs." + (amtfilter * qty);
    });
    totalPrice.innerHTML = 'Rs.' + total;

    //add product count in cart
    const cartcount = document.querySelector('.count');
    let lengths = itemlist.length;
    cartcount.innerHTML = lengths;
}
