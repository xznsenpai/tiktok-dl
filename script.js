document.addEventListener('DOMContentLoaded', function () {
  const fetchButton = document.getElementById('fetchTikTok');
  const loadingSpinner = document.querySelector('.loading-spinner');

  fetchButton.addEventListener('click', function () {
    const tiktokUrlInput = document.getElementById('tiktokUrl');
    const tiktokContent = document.getElementById('tiktok-content');

    function formatK(num) {
      return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1
      }).format(num);
    }

    loadingSpinner.style.display = 'block';
    fetch('https://skizo.tech/api/tiktok', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'https://skizo.tech'
      },
      body: JSON.stringify({
        url: tiktokUrlInput.value
      })
    })
    .then(response => response.json())
    .then(data => {
      loadingSpinner.style.display = 'none';
      tiktokContent.innerHTML = `
        <iframe src="${data.data.play}" width="100%" height="200px" frameborder="50"></iframe>
        <h5 class="card-title">${formatK(data.data.digg_count)} Likes, ${formatK(data.data.comment_count)} Comments. TikTok video from ${data.data.author.nickname} (@${data.data.author.unique_id}): ${data.data.title}. ${data.data.music_info.title}</h5>
        <p class="card-text download-buttons">
          <button class="btn btn-success" onclick="window.open('${data.data.play}', '_blank')">Download SD</button>
          <button class="btn btn-warning" onclick="window.open('${data.data.hdplay}', '_blank')">Download HD</button>
          <button class="btn btn-info" onclick="window.open('${data.data.music}', '_blank')">Download Music</button>
        </p>
      `;
    })
    .catch(error => {
      loadingSpinner.style.display = 'none';
      console.error('Error fetching TikTok data:', error);
    });
  });
});