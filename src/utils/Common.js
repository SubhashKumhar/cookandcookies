export const updateProducts = async(data,quantity=1,price=0) => {
    
    
    let products = localStorage.getItem('products') ===null ? [] : JSON.parse(localStorage.getItem('products'))
    let tempP = products.filter((f) => f._id === data._id)
    if(tempP.length ===1){  
         tempP[0].quantity = await parseInt(tempP[0].quantity) + parseInt(quantity)
        tempP[0].price = parseInt(data.price) * parseInt(tempP[0].quantity)
    }else{
        data.quantity = parseInt(quantity)
        data.price = parseInt(quantity) * parseInt(price)
        data.initial_price = parseInt(price)
        products.push(data)
    }
    
    localStorage.setItem('products',JSON.stringify(products))
}

export const staticData = {
    "mobile_no":"+919461771993 | +918239734359",
    "email":"cookndcookies@gmail.com",
    "fb_link":"https://www.facebook.com/skr1195",
    "insta_link":"https://www.facebook.com/skr1195",
    "twitter_link":"https://www.facebook.com/skr1195/about",
    "google_plus_link":'https://www.facebook.com/skr1195/about',
    "linkdin_link":'https://www.facebook.com/skr1195/about',
    'address':"154, Prajapati bhawan, Janta nagar, Sodala, Jaipur,302006",
    'aboutus':"About Us",
    "business_hour":"10:00 AM - 10:00 PM",
    "delivery_note":'** Delivery charges will be extra if your ordered amount below ₹500 or for more detail contact to owner at Mob. +919461771993 | +918239734359'
    // "business_hour":[{'monday':{'start':"08:00",'end':'08:00'}},{'tuesday':{'start':"08:00",'end':'08:00'}},{'wednesday':{'start':"08:00",'end':'08:00'}},{'thursday':{'start':"08:00",'end':'08:00'}},{'friday':{'start':"08:00",'end':'08:00'}},{'saturday':{'start':"08:00",'end':'08:00'}},{'sunday':{'start':"08:00",'end':'08:00'}}]
} 

export const validation = {
    email:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
}

