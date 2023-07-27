let searchBar = document.querySelector('.search-bar');
let fileInput = document.querySelector('#fileInput');

let rowImages = `
                <div class="col-md-4 img">
                <div class="thumbnail">
                    <img src="/static/imageDB/x.pagespeed.ic.zwzMtRDpsS.jpg" alt="Image 1" class="result-image">
                </div>
                </div>
                <div class="col-md-4 img">
                <div class="thumbnail">
                    <img src="/static/imageDB/cars26.jpg" alt="Image 2" class="result-image">
                </div>
                </div>
                <div class="col-md-4 img">
                <div class="thumbnail">
                    <img src="/static/imageDB/car14.jpeg" alt="Image 3" class="result-image">
                </div>
                </div>
        `;

let container = document.querySelector('#imageSection');


const clearResults = () => {
    container.innerHTML = "";
};

const appendRow = (images) => {
    let row = document.createElement('div')
    row.classList.add('row');
    row.classList.add('my-3');
    row.innerHTML = rowImages;

    let imageSections = row.querySelectorAll('.img');

    for (let i = 0; i < images.length; i++) {
        const element = imageSections[i].querySelector('img');
        element.src = images[i];
    }

    container.append(row);
};

const isURL = (str) => {
    const imageRegex = /^(https?:\/\/)?([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9_\-./?%&=]*)?(.png|.jpeg|.jpg|.webp)$/i;
    return imageRegex.test(str);
};

let searchURL;

searchBar.addEventListener('focus', () => {
    searchBar.addEventListener('input', () => {
        searchURL = searchBar.value;
    });
});

searchBar.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        if (isURL(searchURL)) {
            urlSearch(searchURL);
        } else {
            alert("The url must be a valid image url with png, jpeg, jpg accepted")
        }
    }
});


const urlSearch = async (url) => {
    let image = await fetch(url);
    let blob = await image.blob();

    sendImage(blob);
}

const sendImage = async (image) => {
    let form = new FormData();
    form.append('image', image);

    let response = await fetch(
        '/searchImage', {
        method: 'POST',
        body: form
    }
    );

    await handleResult(response);
}

const handleResult = async (response) => {
    let result = await response.json();

    clearResults();

    result.forEach(element => {
        appendRow(element);
    });
};

fileInput.addEventListener('change', ()=>{
    let image = fileInput.files[fileInput.files.length-1];

    sendImage(image);
});