fetch("https://raw.githubusercontent.com/HrayrMuradyan/personal-website/data-updates/youtube_data/channel_data.json")
  .then(res => {
    if (!res.ok) {
      throw new Error(`Failed to load: ${res.statusText}`);
    }
    return res.json();
  })
  .then(data => {
    // const extractedDescription = fullDescription.split("\ud83d\udd0d")[0];

    // Animate values
    animateValue("subscribers", 0, data.channel.subscribers, 1500);
    animateValue("views", 0, data.channel.views, 1500);
    animateValue("total-likes", 0, data.channel.total_likes, 1500);

    document.getElementById("logo").src = data.channel.thumbnail;
    document.getElementById("subscribe").href = `https://www.youtube.com/channel/UCj_ftUuFQwBOiKJicsE_72A?sub_confirmation=1`;

    const videoList = document.getElementById("video-list");
    data.videos.forEach(video => {
      const el = document.createElement("div");
      el.className = "video-card";
      el.innerHTML = `
        <a href="https://www.youtube.com/watch?v=${video.videoId}" target="_blank" class="thumbnail-link">
          <img src="${video.thumbnail}" alt="Thumbnail">
        </a>
        <div class="video-details">
          <h3><a href="https://www.youtube.com/watch?v=${video.videoId}" target="_blank">${video.title}</a></h3>
          <small>Published: ${new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }).format(new Date(video.publishedAt))}</small>
          <p>${video.description.split("\ud83d\udd25")[1].slice(0, 200)}...</p>
          <p>
            <i class="fas fa-eye"></i> ${video.views}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <i class="fas fa-thumbs-up"></i> ${video.likes}
          </p>
          
          
        </div>
      `;
      videoList.appendChild(el);
    });
  })
  .catch(error => {
    console.error("Error fetching JSON:", error);
  });

// Animation function
function animateValue(id, start, end, duration) {
  const el = document.getElementById(id);
  let startTime = null;

  function update(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    el.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
