// Fetch load and show categories
const loadCategoryVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category))
    .catch((error) => console.log(error))
}
function timeCalculation(time) {
    const minute = Math.round(time / 60);
    
    const hours = Math.round(minute/60);
    const restMinute = minute % 60;
    const finalUploadTime = hours + ' hrs ' + restMinute + ' min ago';
    return finalUploadTime;
    }
    
// create load categories
const loadCategories = () => {
    // fetch data 
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
}
// create display categories
const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories');
    for(category of categories) {
        // creating button
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button onclick='loadCategoryVideos(${category.category_id})' class="btn">
        ${category.category}
        </button>
        `
        // add button to category container
        categoriesContainer.appendChild(buttonContainer);
        
    }
}
loadCategories()

const loadVideos = () => {
    // fetch data 
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error))
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";
    if(videos.length === 0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = ` 
        <div class="min-h-[600px] flex flex-col gap-5 justify-center items-center">

        <img src="assests/Icon.png">
        <h2 class= "text-center text-2xl font-extrabold">
        No videos in this category!!!
        </h2>
        </div>
        `;
        return;
    } else {
        videoContainer.classList.add('grid')
    }
    for(const video of videos) {
        console.log(video);
        // creating card
        const div = document.createElement('div');
        div.classList = 'card card-compact';
        div.innerHTML = `
        <figure class="h-[300px] relative">
    <img class="h-full object-cover"
      src= ${video.thumbnail}
       />
       ${video.others.posted_date?.length == 0? "" : `<span class="absolute text-xs lg:right-2 lg:bottom-2 
        md:right-3 md:bottom-3 right-4 bottom-4 bg-black text-white rounded p-1">${timeCalculation(video.others.posted_date)}</span>`
        
        }
       
  </figure>
  <div class="px-0 py-2 flex gap-3">
  <div class="h-10 w-10">
  <img class="h-full w-full rounded-full object-cover"
      src= ${video.authors[0].profile_picture}
       /> 
    </div>
  <div> 
    <h2 class="card-title">${video.title}</h2>
    <div class="flex gap-2 items-center">
    <p>${video.authors[0].profile_name}</p>
    
    ${video.authors[0].verified === true ? '<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png">': ""}
    </div>
    <p></p>
    
    
      
    </div>
  </div>
        `;
        // add div to category container
        videoContainer.appendChild(div);
        
    }
}

loadVideos()