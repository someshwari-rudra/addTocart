
const ShowProductsDiv = document.getElementById("ShowProducts");
const searchInput = document.getElementById("searchInput");
const SearchBtn = document.getElementById("SearchBtn");
const cartID = document.getElementById("cartID");
const showPriceDetails = document.getElementById("showPriceDetails");
let CartTotal=0;
let productTotal = 0;



const EcommerceData = [
    {
        id:1,
        productName:"women's T-shirt",
        price:2000, 
        totalProducts:0,
        img:"/images/women/women1.jpeg",
        category:"women"
    },
    {
        id:2,
        productName:"women fancy shirt",
        price:3500,
        img:"/images/women/women2.jpeg",
        category:"women"
    },
    {
        id:3,
        productName:"women's Hoodies ",
        price:1800,
        img:"/images/women/women3.png",
        category:"women"
    },
    {
        id:4,
        productName:"women's office shirt",
        price:2000,
        img:"/images/women/women4.png",
        category:"women"
    },
    {
        id:5,
        productName:"men's T-shirt",
        price:2000,
        img:"/images/mens/men1.jpeg",
        category:"men"
    },
    {
        id:6,
        productName:"men's simple T-shirt",
        price:1500,
        img:"/images/mens/men2.jpeg",
        category:"men"
    },
    {
        id:7,
        productName:"men's fancy T-shirt",
        price:1000,
        img:"/images/mens/men3.png",
        category:"men"
    },
    {
        id:8,
        productName:"mens's T-shirt",
        price:1000,
        img:"/images/mens/men4.jpeg",
        category:"men"
    },
    {
        id:9,
        productName:"kids's Traditional",
        price:1400,
        img:"/images/kids/kid1.png",
        category:"kids"
    },
    {
        id:10,
        productName:"kids's indo-Western",
        price:4000,
        img:"/images/kids/kid2.png",
        category:"kids"
    },
]


function showProducts(data){
    let html = ""
    data.forEach((currProduct)=>{
        return(
            html += `<div class="col-12 col-md-6 col-xl-3">
            <div class="card my-2 p-2">
                <img src="${currProduct.img}" alt="" class="img-fluid">
                <div class="d-flex justify-content-between align-content-center">
                    <h4 class="card-title my-2">${currProduct.productName}</h4>
                    <p class="my-2">₹ ${currProduct.price}</p>
                </div>
                <button class="btn btn-warning" onclick="AddToCart(${currProduct.id})">Add To cart</button>
            </div>
        </div>`
        )
    })
    ShowProductsDiv.innerHTML = html
}

showProducts(EcommerceData)

function AddToCart(id){
    productTotal++;
    event.srcElement.innerHTML="added to Cart"
    event.srcElement.style.background="red  "
 event.srcElement.disabled = true
  addDetails =  EcommerceData.filter((ele)=>{
        return(ele.id === id)
    })
    let productDetails ={
        id:addDetails[0].id,
        name:addDetails[0].productName,
        price:addDetails[0].price,
        img:addDetails[0].img,
        totalProducts:addDetails[0].totalProducts
    }
   selectedProducts = localStorage.getItem("addToCart")
    if( selectedProducts == null){
        addToCartArray = []
    }else{
        addToCartArray = JSON.parse(selectedProducts)
    }
    CartTotal += parseInt(productDetails.price);
    console.log("carttotal",CartTotal)
    addToCartArray.push(productDetails)
   
    localStorage.setItem("addToCart" ,JSON.stringify(addToCartArray))
    showCartDetails()   
}

function showCartDetails (){
    selectedProducts = localStorage.getItem("addToCart")
    if(selectedProducts == null){
        addToCartArray = []
    }else{
        addToCartArray = JSON.parse(selectedProducts)
        console.log(addToCartArray)
    }

   let html = "";
   jsonObject = addToCartArray.map(JSON.stringify);

   uniqueSet = new Set(jsonObject);
   uniqueArray = Array.from(uniqueSet).map(JSON.parse);

   console.log("uniqe",uniqueArray);

   uniqueArray.forEach((ele)=>{
        return(
            html+=` <div class="card p-3">
            <div class="row">
                <div class="col-md-3">
                    <img src="${ele.img}" alt="" class="img-fluid">
                </div>
                <div class="col-md-9">
                    <h1>${ele.name} </h1>
                    <p>price: ₹${ele.price}</p>
                    <div class="d-flex justify-content-between align-item-center">
                        <div class="div">
                            <span class="btn btn-secondary me-2" onclick="incrementProduct(${ele.id})">+</span>
                            <span>${0+1}</span>
                            <span class="btn btn-secondary ms-2">-</span>
                        </div>
                        <button class="btn btn-warning" onclick="itemRemove(${ele.id})">Remove</button>
                    </div>       
                </div>
            </div>
        </div>`
        )
    })
    if(addToCartArray.length != 0){
        cartID.innerHTML = html
    }else{
        cartID.innerHTML = ""
    }

    const totalItem = addToCartArray.length;

  let priceDetails = "";
  priceDetails += ` <p>price(${totalItem}item) ${CartTotal}</p>
<div class="d-flex justify-content-between align-content-center">
  <p>Delivery Charges </p> 
  <span class="text-success">FREE</span>
</div>
<hr>
<div class="d-flex justify-content-between align-item-center">
  <h4>Total Price:</h4>
  <h5>₹ ${CartTotal}</h5>
</div>`;

  showPriceDetails.innerHTML = priceDetails;
}//finish showCartDetails


function itemRemove(index){
    let i;
    let removeProduct=[];
   selectedProducts = localStorage.getItem("addToCart")
   if(selectedProducts.length == null){
    addToCartArray = []
   }else{
    addToCartArray = JSON.parse(selectedProducts)
   }
   filteredData =  addToCartArray.filter((ele)=>{
    return(ele.id === index)
   })
   for(i=0; i<filteredData.length; i++){
    CartTotal= CartTotal - parseInt(filteredData[i].price);
    console.log("price",parseInt(filteredData[i].price))
    removeProduct.push(filteredData[i].id)
   }
   console.log("filtered",filteredData)

   for (i = 0; i < addToCartArray.length; i++) {
    var obj = addToCartArray[i];
    if (removeProduct.indexOf(obj.id) !== -1) {
        addToCartArray.splice(i, 1);
        i--;
    }
    console.log("add",addToCartArray)
}   
   localStorage.setItem("addToCart",JSON.stringify(addToCartArray))
  showCartDetails()
}

function incrementProduct(id){
    AddToCart(id)
    
}





// search on input keyup "filtered products" will be called
function filterProducts (){
    keyword = searchInput.value.toLowerCase()
    filtered = EcommerceData.filter((product)=>{
        product =product.productName.toLowerCase()
        return(product.indexOf(keyword) > -1)
    })
    showProducts(filtered)
}
searchInput.addEventListener("keyup", filterProducts)


//filter based on dropdown
function filterBasedOnDropdown(category){
    if(category === "All"){
        showProducts(EcommerceData)
        return
      }
   filtered = EcommerceData.filter((ele)=>{
    return(ele.category === category)
    })
    showProducts(filtered)
}







