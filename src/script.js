/** 
 * 1. Как ограничивать кол-во элементов на странице?
 * 2. UI - пагинация, количество кружков.
 * 3. Форма инпут (делать через промисы?)
 * 4. 
*/

// GET json from youtube API
const site = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=15&fields=nextPageToken,items(id(videoId))&q=';
let url
let nextPage, items;
nextPage ?  url  + '&pageToken=' + nextPage : url
const createCards = () => {
  container.innerHTML = '';
fetch(url)
  .then(response => response.json())
  .then(json => {
	nextPage = json.nextPageToken;
  fetch('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=' + json.items.map( el => el.id.videoId ).join(',') + '&part=snippet,statistics&fields=items(id,%20snippet(title,description,channelTitle,publishedAt,thumbnails(medium(url))),statistics(viewCount))')
  .then(response => response.json())
  .then(json => {
    items = json.items;
    
    
    items.forEach(element => {

      //create card
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      container.appendChild(card);

      const img = document.createElement('img');
      card.appendChild(img);

      const anchor = document.createElement('a');
      card.appendChild(anchor);

      const author = document.createElement('div');
      const iAuthor = document.createElement('i')
      iAuthor.setAttribute('class', 'fas fa-male')
      author.appendChild(iAuthor);
      card.appendChild(author);
      const authorName = document.createElement('p');
      authorName.setAttribute('class', 'author');
      author.appendChild(authorName);

      const date = document.createElement('div');
      const idate = document.createElement('i')
      idate.setAttribute('class', 'fas fa-calendar-alt')
      date.appendChild(idate);
      card.appendChild(date);
      const dateName = document.createElement('p');
      dateName.setAttribute('class', 'date');
      date.appendChild(dateName);

      const counter = document.createElement('div');
      const icounter = document.createElement('i')
      icounter.setAttribute('class', 'fas fa-eye')
      counter.appendChild(icounter);
      card.appendChild(counter);
      const counterName = document.createElement('p');
      counterName.setAttribute('class', 'counter');
      counter.appendChild(counterName);

      const description = document.createElement('p');
      description.setAttribute('class', 'description');

      card.appendChild(description);
      img.src = element.snippet.thumbnails.medium.url;
      anchor.innerText = element.snippet.title;
      anchor.href = 'https://www.youtube.com/watch?v=' + element.id;
      authorName.innerText = element.snippet.channelTitle;
      dateName.innerText = element.snippet.publishedAt.slice(0,10);
      counterName.innerText = element.statistics.viewCount;
      description.innerText = element.snippet.description.substring(0, 150) + '...';
    });
  }).catch(ex => console.log('error to get IDs', ex))
  }).catch(ex => console.log('error to get query', ex)) };
// END request

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);
const app = document.querySelector('#root');

// Create input element
const input = document.createElement('input');
input.type = 'search';
input.placeholder = 'Search...';
app.appendChild(input);
input.addEventListener('keypress', function(event){
  if (event.code === "Enter") {
    url = site + input.value;
    createCards();
    input.value = '';
  }
})



// Create container div
const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);