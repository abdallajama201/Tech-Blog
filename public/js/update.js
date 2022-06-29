const update = async (event) => {
    event.preventDefault();
    const postContent = document.querySelector('#post-area').value.trim();
    const postTitle = document.querySelector('#title').value.trim();
    const postId = window.location.href[window.location.href.length - 1];

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

const deletePost = async (event) => {
    event.preventDefault();
    const postId = window.location.href[window.location.href.length - 1];

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