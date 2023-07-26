let searchBar = document.querySelector('.search-bar');


const isURL = (str) => {
    const imageRegex = /^(https?:\/\/)?([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9_\-./?%&=]*)?(.png|.jpeg|.jpg)$/i;
    return imageRegex.test(str);
};

let searchURL;

searchBar.addEventListener('focus', ()=>{
    searchBar.addEventListener('input', () => {
        searchURL = searchBar.value;
    });
});

searchBar.addEventListener('keydown', (e)=>{
    if(e.key == "Enter"){
        if(isURL(searchURL)){
            urlSearch(searchURL);
        }else{
            alert("The url must be a valid image url with png, jpeg, jpg accepted")
        }
    }
});


const urlSearch = (url)=>{
    console.log("Yet to be implemented")
}