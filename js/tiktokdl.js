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
				if (data.data?.images?.length) {
					tiktokContent.innerHTML = "";
					for (var x = 0; x < data.data.images.length; x++) {
						tiktokContent.innerHTML += `<img src="${data.data.images[x]}" width="100%" height="25%"></img><br>`;
					}
				} else {
					let result = `<div class="card-body">
      	<div class="d-flex align-items-center mb-3">
      		<a href="#">
      			<img src="${data.data.author.avatar}" alt="" width="50" class="rounded-circle">
      		</a>
      		<div class="flex-fill ps-2">
      			<div class="fw-bold">
      				<a href="#" class="text-decoration-none">${data.data.author.nickname}</a>
      				<a href="#" class="text-decoration-none">${data.data.author.unique_id}</a>
      			</div>
      			<div class="small text-inverse text-opacity-50">${data.data.id}</div>
      		</div>
      	</div>
      	<p>${data.data.title}</p>
      	<div class="ratio ratio-16x9">
      		<iframe src="${data.data.play}"></iframe>
      	</div>
      	<hr class="mb-1">
      	<div class="row text-center fw-bold">
      		<div class="col"> Like <br> ${formatK(data.data.digg_count)} </div>
      		<div class="col"> Comment <br> ${formatK(data.data.comment_count)} </div>
      		<div class="col"> Share <br> ${formatK(data.data.share_count)} </div>
      	</div>
      	<hr class="mb-3 mt-1">
      	<div class="row text-center fw-bold">
      		<div class="col">
      			<a href="${data.data.hdplay}" type="button" class="btn btn-success btn-sm" target="_self"> HD PLAY </a>
      			<a href="${data.data.play}" type="button" class="btn btn-danger btn-sm" target="_self"> SD PLAY </a>
      			<a href="${data.data.music}" type="button" class="btn btn-warning btn-sm" target="_self"> MUSIC </a>
      		</div>
      	</div>
      </div>`
					tiktokContent.innerHTML = result
				}
			})
			.catch(error => {
				loadingSpinner.style.display = 'none';
				tiktokContent.innerHTML = `ah sorry I couldn't find it`
				console.error('Error fetching TikTok data:', error);
			});
	});
});