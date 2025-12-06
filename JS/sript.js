async function books(url){
    try{
        const response = await fetch(url); //chiama all'API
        const data = await response.json(); //promise -> json
        console.log(data);
        const works = data.works; //
        console.log(works);
        
        works.forEach(element => {
            console.log(element.title)

        //salvati tutti gli autori di in libro 
            let authors = "";
            let i=0;
            element.authors.forEach(name => {
                if(i==0){
                    authors = authors + name.name;
                    i++;
                }else if(i>1){
                    authors = authors + "..."
                    i=-1;
                }else if(i==-1){
                
                }else{
                    authors = authors + ", " +  name.name;
                    i++;
                }   
            })

        //creazione dinamica di una sezione per ogni libro con le sue specifiche 
            let card = document.createElement('div');
            card.classList.add('card');
            cardsContainer.appendChild(card)

            let bookImgContainer = document.createElement('div'); //contenitore copertina libro
            bookImgContainer.classList.add('book-img-container');
            card.appendChild(bookImgContainer)

            let bookInfoContainer = document.createElement('div'); //contenitore titolo, autore e genere libro 
            bookInfoContainer.classList.add('book-info-container');
            card.appendChild(bookInfoContainer);

            let descriptionContainer = document.createElement('div'); //contenitore descrizione libro
            descriptionContainer.classList.add('description-container');
            card.appendChild(descriptionContainer);

            let bookCover = document.createElement('img'); //immagine di copertina
            bookCover.classList.add('book-cover');
            bookCover.src = `https://covers.openlibrary.org/b/id/${element.cover_id}-L.jpg`; //recupera dinamicamente la copertina
            bookImgContainer.appendChild(bookCover);

            let faSolid = document.createElement('i'); //icona genere libro
            if(element.subject.includes('romance')){
                faSolid.classList.add('fa-solid', 'fa-heart');
            }else if(element.subject.includes('fantasy')){
                faSolid.classList.add('fa-solid', 'fa-dragon');
            }else if(element.subject.includes('horror')){
                faSolid.classList.add('fa-solid', 'fa-ghost');
            }else if(element.subject.includes('thriller')){
                faSolid.classList.add('fa-solid', 'fa-mask');
            }else if(element.subject.includes('adventure')){
                faSolid.classList.add('fa-solid', 'fa-map');
            }else if(element.subject.includes('humor')){
                faSolid.classList.add('fa-solid', 'fa-laugh');
            }else{
                faSolid.classList.add('fa-solid', 'fa-book');
            }

            let bookTitle = document.createElement('h5'); //titolo del libro
            bookTitle.classList.add('book-title');
            bookTitle.textContent = element.title;
            let bookAuthors = document.createElement('span'); //autori del libro 
            bookAuthors.classList.add('book-authors');
            bookAuthors.textContent = "di ";

            let authorsName = document.createElement('strong'); //autori del libro 
            authorsName.textContent = authors;
            bookAuthors.appendChild(authorsName);
            
            let btnDescription = document.createElement('button'); //pulsante per descrizione 
            btnDescription.classList.add('description-btn');
            btnDescription.textContent = "+"
            btnDescription.id = `${element.key}`; //id del pulsante = chiave univoca del libro 

            bookInfoContainer.appendChild(btnDescription); 
            bookInfoContainer.appendChild(faSolid);
            bookInfoContainer.appendChild(bookTitle);
            bookInfoContainer.appendChild(bookAuthors)
        });

    }catch(error){ //in caso la fetch fallisca 
        console.error("Si è verificato un errore:", error);
        return null;
    }
} 

async function booksDescription(url){
    try {
        const response = await fetch(url);
        console.log(response)
        const data = await response.json();
        console.log(data);
        const descriptionData = data.description;
        return descriptionData;
    } catch (error) {
        console.error("Si è verificato un errore:", error);
        return null;
    }
}

//evento al click del pulsante 
let cardsContainer = document.getElementById('cards-container');
cardsContainer.addEventListener("click", async function(e) {
    if(e.target.classList.contains('description-btn')){
        if(e.target.textContent === '+'){
            e.target.textContent = '-';
            let descriptionUrl = `https://openlibrary.org${e.target.id}.json`
            const description = await booksDescription(descriptionUrl);
            console.log(description);

            const card = e.target.closest('.card');
            const descriptionContainer = card.querySelector('.description-container');

            let descriptionText = document.createElement('p'); //paragrafo descrizione libro 
            descriptionText.classList.add('description-text');
            descriptionContainer.appendChild(descriptionText);
            descriptionText.textContent = description;
        }else{
            const card = e.target.closest('.card');
            const descriptionContainer = card.querySelector('.description-container');
            descriptionContainer.querySelector('.description-text').remove();
            e.target.textContent = '+';
        }
    }
})

//barra di ricerca stile Google 
const barNaigationBtn = document.getElementById('bar-navigation-btn')
const navigationBar = document.getElementById('navigation-bar');
barNaigationBtn.addEventListener("click", e => {
    e.preventDefault();
    if(navigationBar.value === ''){ //verifica che l'input non sia vuoto 
        alert("Inserisci la categoria e premi invio");
    } else{
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.classList.remove("none"); //scompare la barra di ricerca

        const navigationContainer = document.getElementById('navigation-container');
        navigationContainer.classList.add("none"); //compare la sezione del catalogo

        const researchInput = document.getElementById('research-input');
        researchInput.textContent = `"${navigationBar.value}"`; //ribadito l'input

        let url = `https://openlibrary.org/subjects/${navigationBar.value}.json`;
        books(url);
        navigationBar.value = ""; //ripulito il campo di input
    }
});

//pulsante che riapre la barra di ricerca 
const resultsNavigationBtn = document.getElementById('results-navigation-btn');
resultsNavigationBtn.addEventListener("click", e => {
    e.preventDefault;
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.classList.add("none"); //scompare la sezione del catalogo

    const navigationContainer = document.getElementById('navigation-container');
    navigationContainer.classList.remove("none"); //compare la sezione di ricerca

    cardsContainer.querySelectorAll(".card").forEach(card => card.remove());
    console.log("ciao")
});

