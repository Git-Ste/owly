/*Funzione asincrona per chiamata a Open Library*/
async function booksSearch(url){    
    const loader = document.getElementById('loader-container');
    loader.classList.remove("display-none");
    try{

        /*Fetch*/ 
        const response = await fetch(url); //chiama all'API
        const data = await response.json(); //promise -> json
        const works = data.works; //estratti solo i libri


        //forzatura errore nel caso in cui 'works' è array vuoto
        if(works.length === 0){
            throw new Error('Errore, nessun libro trovato');
        }


        /*Cicolo che si compie per ogni libro*/
        works.forEach(element => {

            //contenitore generale del libro
            const card = document.createElement('div');
            card.classList.add('card');
            booksContainer.appendChild(card);

            //contenitore copertina libro
            const bookCoverContainer = document.createElement('div'); 
            bookCoverContainer.classList.add('book-cover-container');
            card.appendChild(bookCoverContainer)

            //contenitore informazioni sul libro
            const bookInfoContainer = document.createElement('div');
            bookInfoContainer.classList.add('book-info-container');
            card.appendChild(bookInfoContainer);

            //immagine di copertina
            const bookCover = document.createElement('img'); 
            bookCover.classList.add('book-cover');
            if(element.cover_id){ //verifica se la copertina è disponibile
                bookCover.src = `https://covers.openlibrary.org/b/id/${element.cover_id}-L.jpg`; //recupera dinamicamente la copertina
            }else{
                bookCover.src = 'img/noCover.png'
            }
            bookCoverContainer.appendChild(bookCover);

            //icona genere del libro
            const faSolid = document.createElement('i');
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
            bookInfoContainer.appendChild(faSolid);

            //titolo del libro
            const bookTitle = document.createElement('h5'); 
            bookTitle.classList.add('book-title');
            bookTitle.textContent = element.title;
            bookInfoContainer.appendChild(bookTitle);

            //autori del libro 
            let authors = ``;
            if(element.authors.length === 1){
                authors = `${element.authors[0].name}`;
            }else if(element.authors.length > 1){
                authors = `${element.authors[0].name}, ${element.authors[1].name}`;
                if(element.authors.length > 2){
                authors = `${authors}, ...`;
            }
            }

            const bookAuthors = document.createElement('span');
            bookAuthors.classList.add('book-authors');
            bookAuthors.textContent = "di ";
            bookInfoContainer.appendChild(bookAuthors);

            const authorsName = document.createElement('strong'); 
            authorsName.textContent = authors;
            bookAuthors.appendChild(authorsName);


            //pulsante per descrizione 
            const btnDescription = document.createElement('button'); 
            btnDescription.classList.add('description-btn');
            btnDescription.textContent = "+"
            btnDescription.id = `${element.key}`; //id del pulsante = chiave univoca del libro
            bookInfoContainer.appendChild(btnDescription);
        })
        //rimozione loader concluso il caricamento della fetch
        loader.classList.add("display-none")
    }catch(error){ //in caso la fetch fallisca 

        //rimozione loader concluso il caricamento
        loader.classList.add("display-none");

        //Comunica errore di ricerca all'utente
        const errorContainer = document.getElementById("error-contaiener");
        errorContainer.classList.remove("display-none");

        //Comunica errore in console
        console.error("Si è verificato un errore:", error);
        return null;
    } 
}


/*Funzione asincrona per generare la descrizione*/
async function booksDescription(url){
    try {
        const response = await fetch(url); //chiama Open Library
        const data = await response.json(); //promise -> json
        const descriptionData = data.description; //estrapola la descrizione
        return descriptionData; //restituisce la descrizione
    } catch (error) {
        descriptionText.textContent = "Caricamento descrizione non riuscito";
        console.error("Si è verificato un errore:", error);
        return null;
    }
}

/*Click pulsante di navigazione*/
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener("click", e => {
    e.preventDefault();
    //salvataggio ricerca utente in lowecase (minuscolo)
    const searchInput = searchBar.value.toLowerCase().trim();
    if(searchInput === ''){ //verifica se l'inpurt di ricerca è vuota
        alert(`Inserisci la categoria prima di premere "Invio" o cliccare l'apposito pulsante`); 
    } else{
    //rimossa sezione di ricerca
        const searchContainer = document.getElementById('search-container');
        searchContainer.classList.add("display-none"); 

    //aggiunta sezione del catalogo libri
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.classList.remove("display-none"); 
    
    //search query con input dell'utente
        const searchQuery = document.getElementById('search-query');
        searchQuery.textContent = `"${searchInput}"`; 

    //creazione dell'url dinamico 
        const url = `https://openlibrary.org/subjects/${searchInput}.json`; 
        booksSearch(url);

    //ripulito campo di input
        const searchForm = document.getElementById('search-form');
        searchForm.reset();
    }
})

/*Eventi scatenati dal click sul pulsante "+"*/
const booksContainer = document.getElementById('books-container');
booksContainer.addEventListener("click", async function(e) {
    const plusBtn = e.target; //pulsante scatenato eveneto
    const card = plusBtn.closest('.card'); //card che contiene pulsante

    if(plusBtn.classList.contains('description-btn')){ //verifica origine del click
        if(plusBtn.textContent === '+'){
            plusBtn.textContent = '-';

            //chiamata funzione asincrona che restituisce la descrizione 
            const descriptionUrl = `https://openlibrary.org${plusBtn.id}.json`; //url dinamico con key del libro 
            const description = await booksDescription(descriptionUrl);

            //creazione container della descrizione
            const descriptionContainer = document.createElement('div');
            descriptionContainer.classList.add('description-container');
            card.appendChild(descriptionContainer);
            
            //paragrafo descrizione libro 
            const descriptionText = document.createElement('p');
            descriptionText.classList.add('description-text');
            descriptionContainer.appendChild(descriptionText);
            if(typeof description === 'string'){ //descrizione è stringa
                descriptionText.textContent = description; 
            }else if(description !== null && typeof description === 'object'){ //descrizione è oggetto
                descriptionText.textContent = description["value"];
            }else{ //descrizione è null
                descriptionText.textContent = "Descrizione non disponibile per questo libro";
            } 

            //pulsante cross chiusura
            crossBtn = document.createElement('span');
            crossBtn.classList.add("cross-btn");
            crossBtn.textContent = "x";
            card.querySelector(".description-text").appendChild(crossBtn);
        }else{
            card.querySelector('.description-container').remove();
            plusBtn.textContent = "+";
        }
    }
})

/*Eventi per cross btn*/
booksContainer.addEventListener("click", async function(e) {
    const target = e.target;
    if (target.classList.contains("cross-btn")) {
        const card = target.closest(".card");
        const plusBtn = card.querySelector(".description-btn");

        card.querySelector(".description-container").remove();
        plusBtn.textContent = "+";
    }
})


/*Pulsante per riapertura barra di ricerca*/
const homeBtn = document.getElementById('results-search-btn');
homeBtn.addEventListener("click", e => {
    e.preventDefault;
    const resultsContainer = document.getElementById('results-container')
    resultsContainer.classList.add("display-none"); //scompare la sezione del catalogo

    const searchContainer = document.getElementById('search-container');
    searchContainer.classList.remove("display-none"); //compare la sezione di ricerca

    if(booksContainer.querySelector(".card")){
        booksContainer.querySelectorAll(".card").forEach(card => card.remove());
    }else{
        document.getElementById("error-contaiener").classList.add("display-none");
    }
});





