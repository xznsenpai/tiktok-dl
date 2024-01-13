document.addEventListener('DOMContentLoaded', function() {
	const fetchButton = document.getElementById('fetchTikTok');
	const loadingSpinner = document.querySelector('.loading-spinner');

	fetchButton.addEventListener('click', function() {
		const tiktokUrlInput = document.getElementById('tiktokUrl');
		const tiktokContent = document.getElementById('tiktok-content');

		function formatK(num) {
			return new Intl.NumberFormat('en-US', {
				notation: 'compact',
				maximumFractionDigits: 1
			}).format(num);
		}

		loadingSpinner.style.display = 'block';
		fetch('https://skizo.tech/api/tttrending', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'https://skizo.tech'
				},
				body: JSON.stringify({
					region: tiktokUrlInput.value
				})
			})
			.then(response => response.json())
			.then(data => {
				loadingSpinner.style.display = 'none';
				if (data.data?.images?.length) {
					tiktokContent.innerHTML = "";
					for (var x = 0; x < data.images.length; x++) {
						tiktokContent.innerHTML += `<img src="${data.images[x]}" width="100%" height="25%"></img><br>`;
					}
				} else {
					tiktokContent.innerHTML = `
        <iframe src="${data.play}" width="100%" height="200px" frameborder="50"></iframe>
        <h5 class="card-title">${formatK(data.digg_count)} Likes, ${formatK(data.comment_count)} Comments. TikTok video from ${data.author.nickname} (@${data.author.unique_id}): ${data.title}. ${data.music_info.title}</h5>
        <p class="card-text download-buttons">
          <button class="btn btn-success" onclick="window.open('${data.play}', '_blank')">Download SD</button>
          <button class="btn btn-warning" onclick="window.open('${data.hdplay}', '_blank')">Download HD</button>
          <button class="btn btn-info" onclick="window.open('${data.music}', '_blank')">Download Music</button>
        </p>
      `;
				}
			})
			.catch(error => {
				loadingSpinner.style.display = 'none';
				tiktokContent.innerHTML = `ah sorry I couldn't find it`
				console.error('Error fetching TikTok data:', error);
			});
	});
});