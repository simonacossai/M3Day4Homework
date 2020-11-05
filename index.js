


async function getBooks() {
    let url = 'https://striveschool-api.herokuapp.com/books';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderBooks() {
    let books = await getBooks();
    let html = '';
    books.forEach(book => {
        let htmlSegment = `
        <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card" style="width: 18rem;" >
        <img src="${book.img}" class="card-img-top" height="400px" alt="...">
        <div class="card-body">
        <a href="detail.html?id=${book.title}|${book.img}|${book.price}" style="color: black; text-decoration: none"> <h5 class="card-title title">${book.title}</h5></a>
         
          <small class="text-muted">$${book.price}</small>
          <a  class="btn btn-sm btn-primary card-btn" onclick="addToCart()">Add <i class="fas fa-cart-plus ml-1"></i></a>
          <a  class="btn btn-sm btn-primary card-btn1" onclick="skip()">Skip <i class="fas fa-trash ml-1"></i></a>
        </div>
      </div>
      </div>`;
        html += htmlSegment;
    });
    let container = document.querySelector('#books');
    container.innerHTML = html;
}

renderBooks();
let cart = document.querySelector(".cart-books");
let newCardArray=[];
let deleteButton = document.querySelector(".delete");
const addToCart=()=> {
    let card = event.currentTarget.parentNode.parentNode;
    let cardToAdd = card.cloneNode(true);
    card.classList.toggle("added");
    if(!newCardArray.includes(cardToAdd) && cardToAdd.classList!== "added"){
        newCardArray.push(cardToAdd);
    }else{
        newCardArray.pop(cardToAdd);

    }
    
  for(let i=0; i<newCardArray.length; i++){   
  cart.appendChild(newCardArray[i]);
  
  //sessionStorage.setItem("newCardArray", JSON.stringify(newCardArray));

}
}



  const skip=()=> {
    let cardToSkip = event.currentTarget.parentNode.parentNode;
    cardToSkip.remove();
    
  }


