// Takes the values from the title and content dields
// sends the data to post api endpint
const post = async (event) => {
    event.preventDefault();
    const postContent = document.querySelector('#post-area').value.trim();
    const postTitle = document.querySelector('#title').value.trim();

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ postContent, postTitle }),
        headers: {
        'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to create post');
    }
};

document.querySelector('#btn').addEventListener('click', post);