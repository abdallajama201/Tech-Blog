const comment = async (event) => {
    event.preventDefault();
    const commentData = document.querySelector('#comment-area').value.trim();
    const postId = window.location.href[window.location.href.length - 1];

    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ commentData, postId }),
        headers: {
        'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to create comment');
    }
};

document.querySelector('#btn').addEventListener('click', comment);