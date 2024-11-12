let currentPostIndex = 0;
let posts = [];
let removedPosts = [];

async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        posts = await response.json(); 
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

function displayNextPost() {
    if (posts.length > 0 && currentPostIndex < posts.length) {
        const post = posts[currentPostIndex];

        const postElement = document.createElement('div');
        postElement.className = 'post';

        const postTitle = document.createElement('h2');
        postTitle.textContent = post.title;

        const postBody = document.createElement('p');
        postBody.textContent = post.body;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'removeBtn';
        removeButton.addEventListener('click', () => {
            const confirmed = confirm('Are you sure you want to remove this post?');
            if (confirmed) {
                removedPosts.push(post); 
                postElement.remove(); 
            }
        });
        postElement.appendChild(postTitle);
        postElement.appendChild(postBody);
        postElement.appendChild(removeButton);

        document.getElementById('postContainer').appendChild(postElement);
        currentPostIndex++; 
    } else {
        alert('No more posts to display.');
    }
}

function displayRemovedPosts() {
    const removedPostsContainer = document.getElementById('removedPostsContainer');
    removedPostsContainer.innerHTML = ''; 

    if (removedPosts.length > 0) {
        removedPosts.forEach(post => {
            const removedPostElement = document.createElement('div');
            removedPostElement.className = 'removedPost';

            const removedPostTitle = document.createElement('h3');
            removedPostTitle.textContent = post.title;

            const removedPostBody = document.createElement('p');
            removedPostBody.textContent = post.body;

            removedPostElement.appendChild(removedPostTitle);
            removedPostElement.appendChild(removedPostBody);
            removedPostsContainer.appendChild(removedPostElement);
        });
        const clearRemovedButton = document.createElement('button');
        clearRemovedButton.textContent = 'Clear All Removed Posts';
        clearRemovedButton.className = 'clearRemovedBtn';
        clearRemovedButton.addEventListener('click', clearAllRemovedPosts);
        removedPostsContainer.appendChild(clearRemovedButton);
    } else {
        removedPostsContainer.textContent = 'No posts have been removed yet.';
    }
}

function removeAllDisplayedPosts() {
    const postContainer = document.getElementById('postContainer');
    const displayedPosts = Array.from(postContainer.children);
    displayedPosts.forEach(postElement => {
        const title = postElement.querySelector('h2').textContent;
        const body = postElement.querySelector('p').textContent;
        removedPosts.push({ title, body });
        postElement.remove();
    });
    alert('All displayed posts have been removed.');
}

function clearAllRemovedPosts() {
    removedPosts = [];
    document.getElementById('removedPostsContainer').innerHTML = 'No posts have been removed yet.';
}

function setupButtons() {
    document.getElementById('loadPostBtn').addEventListener('click', displayNextPost);
    document.getElementById('viewRemovedBtn').addEventListener('click', displayRemovedPosts);
    document.getElementById('removeAllDisplayedBtn').addEventListener('click', removeAllDisplayedPosts);
}

async function init() {
    await fetchPosts();
    setupButtons();
}

init();
