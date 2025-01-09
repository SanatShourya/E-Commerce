let books;

async function renderBooks(filter) {
    const booksWrapper = document.querySelector('.books__wrapper');
    
    booksWrapper.classList.add("data__loading");
    if(!books){
       books = await getBooks();
    }
    booksWrapper.classList.remove("data__loading");

    if(filter === "LtoH"){
        books.sort((a,b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
    }
    else if(filter === "HtoL"){
        books.sort((a,b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
    }
    else if(filter === "Rating"){
        books.sort((a,b) => b.rating - a.rating);
    }

    const booksHTML = books.map(book => {
        return `
        <div class="books__feature">
          <div class="books__feature--wrapper">
            <img
              src="${book.url}"
              alt=""
              class="books__feature--image"
            />
            <h1 class="books__feature--heading">${book.title}</h1>
            <div class="rating">${ratingsHTML(book.rating)}</div>
            <div class="featbooks__span--container">
              $${pricingOrder(book.originalPrice, book.salePrice)}
            </div>
          </div>
        </div>`
    }).join('');
    booksWrapper.innerHTML = booksHTML;
}

function filterBooks(event) {
    renderBooks(event.target.value);
}

function ratingsHTML(rating) {
    let stars = ''
    for(let i = 0; i < Math.floor(rating); ++i) {
        stars += '<i class="fas fa-star"></i>';
    }
    if(!Number.isInteger(rating)) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    return stars;
}


function pricingOrder(originalPrice, salePrice) {
    if(!salePrice){
        return originalPrice.toFixed(2);
    }
    return `<span class="featbooks__span--style">$${originalPrice.toFixed(2)}</span>
    <span class="featbooks__span--style2"><b>$${salePrice.toFixed(2)}</b></span>`
}

setTimeout(() => {
    renderBooks();
});


// FAKE DATA
function getBooks() {
  return new Promise((resolve) => 
    setTimeout(() => {
        resolve([{
            id: 1,
            title: "Crack the Coding Interview",
            url: "assets/crack the coding interview.png",
            originalPrice: 49,
            salePrice: 14,
            rating: 4.5,
          },
          {
            id: 2,
            title: "Atomic Habits",
            url: "assets/atomic habits.jpg",
            originalPrice: 39,
            salePrice: null,
            rating: 5,
          },
          {
            id: 3,
            title: "Deep Work",
            url: "assets/deep work.jpeg",
            originalPrice: 29,
            salePrice: 12,
            rating: 5,
          },
          {
            id: 4,
            title: "The 10X Rule",
            url: "assets/book-1.jpeg",
            originalPrice: 44,
            salePrice: 19,
            rating: 4.5,
          },
          {
            id: 5,
            title: "Be Obsessed Or Be Average",
            url: "assets/book-2.jpeg",
            originalPrice: 32,
            salePrice: 17,
            rating: 4,
          },
          {
            id: 6,
            title: "Rich Dad Poor Dad",
            url: "assets/book-3.jpeg",
            originalPrice: 70,
            salePrice: 12.5,
            rating: 5,
          },
          {
            id: 7,
            title: "Cashflow Quadrant",
            url: "assets/book-4.jpeg",
            originalPrice: 11,
            salePrice: 10,
            rating: 4,
          },
          {
            id: 8,
            title: "48 Laws of Power",
            url: "assets/book-5.jpeg",
            originalPrice: 38,
            salePrice: 17.95,
            rating: 4.5,
          },
          {
            id: 9,
            title: "The 5 Second Rule",
            url: "assets/book-6.jpeg",
            originalPrice: 35,
            salePrice: null,
            rating: 4,
          },
          {
            id: 10,
            title: "Your Next Five Moves",
            url: "assets/book-7.jpg",
            originalPrice: 40,
            salePrice: null,
            rating: 4,
          },
          {
            id: 11,
            title: "Mastery",
            url: "assets/book-8.jpeg",
            originalPrice: 30,
            salePrice: null,
            rating: 4.5,
          }
        ])
    }, 1000));
}
