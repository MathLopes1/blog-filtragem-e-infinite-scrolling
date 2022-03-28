const postsContainer = document.querySelector('#posts-container')
const loaderContainer = document.querySelector('.loader')

let page = 1

const getPosts = async () => { 
 const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`);
 return response.json()
}

const addPostsIntoDOM = async () => {
    const posts = await getPosts();
    const postsTemplate = posts.map(({id, title, body}) => `
    <div class="post">
      <div class="number">${id}</div>
      <div class="post-info">
      <h2 class="post-title">${title}</h2>
      <p class="post-body">${body}</p>
      </div>
    </div>
    `).join('')

    postsContainer.innerHTML += postsTemplate;
}

addPostsIntoDOM()

const removeLoeader = () => {
    setTimeout(()=> {
        loaderContainer.classList.remove('show')
    }, 1000)
}

const showLoader = () => {
  loaderContainer.classList.add('show')
  removeLoeader()
}

window.addEventListener('scroll', () =>{
   const { clientHeight, scrollHeight, scrollTop } = document.documentElement
   const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10
   if(isPageBottomAlmostReached) {
    showLoader()
   }
})
