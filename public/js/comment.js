// Takes post id from the query paramater
// as well as the comment field and
// sends it to the comments api endpoint
const comment = async (event) => {
    event.preventDefault();
    const commentData = document.querySelector('#comment-area').value.trim();
    const urlArr = window.location.href.split("/");
    const postId = urlArr[urlArr.length - 1];

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