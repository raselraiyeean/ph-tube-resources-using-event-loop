// Fetch load and show categories
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
        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = category.category;
        // add button to category container
        categoriesContainer.appendChild(button);
        
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
       ${video.others.posted_date?.length == 0? "" : `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${timeCalculation(video.others.posted_date)}</span>`
        
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