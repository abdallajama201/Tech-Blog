// Accesses api post endpoint
const update = async (event) => {
    event.preventDefault();
    const postContent = document.querySelector('#post-area').value.trim();
    const postTitle = document.querySelector('#title').value.trim();
    const urlArr = window.location.href.split("/");
    const postId = urlArr[urlArr.length - 1];

    const response = await fetch(`/api/posts`, {
        method: 'PUT',
        body: JSON.stringify({ postContent, postTitle, postId }),
        headers: {
        'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.href="/dashboard";
    } else {
        alert('Failed to update post');
    }
};

// Accesses api post endpoint
const deletePost = async (event) => {
    event.preventDefault();
    const urlArr = window.location.href.split("/");
    const postId = urlArr[urlArr.length - 1];

    const response = await fetch(`/api/posts`, {
        method: 'DELETE',
        body: JSON.stringify({ postId }),
        headers: {
        'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.href="/dashboard";
    } else {
        alert('Failed to update post');
    }
};


document.querySelector('#update').addEventListener('click', update);
document.querySelector('#delete').addEventListener('click', deletePost);