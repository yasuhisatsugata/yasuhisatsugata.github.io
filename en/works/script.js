// /works/script.js

document.addEventListener("DOMContentLoaded", function() {
	var worksList = document.getElementById("works-list");
	var overlay = document.getElementById("works-detail");
	var overlayContent = overlay.querySelector(".overlay-content");

	// JSON読み込み
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "../assets/data/works.json", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var works = JSON.parse(xhr.responseText);

			// 一覧の生成
			works.forEach(function(work, index) {
				var card = document.createElement("div");
				card.className = "piece-card";
				card.innerHTML = `
          <h3>${work.title}</h3>
          <p>for ${work.instrumentation}</p>
        `;
				card.addEventListener("click", function() {
					openOverlay(work);
					history.pushState({ id: index }, "", "#work-" + index);
				});
				worksList.appendChild(card);
			});

			// 戻る操作に対応
			window.addEventListener("popstate", function() {
				closeOverlay();
			});
		}
	};
	xhr.send();

	// 詳細表示
	function openOverlay(work) {
		overlayContent.innerHTML = `
      <div class="overlay-header">
        <button class="back-btn" onclick="closeOverlay()">← 一覧に戻る</button>
      </div>
      <div class="overlay-body">
        <h2>${work.title}</h2>
        <p class="instrumentation">for ${work.instrumentation}</p>
        ${work["fp-year"] ? `
          <div class="first-performance">
            <h3>＜初演＞</h3>
            <p>${work["fp-year"]}年 ${work["fp-month"]}月 ${work["fp-date"]}日</p>
            <p>「${work["fp-name"]}」（${work["fp-place"]}）</p>
            <p>${work["fp-performer"]}</p>
          </div>
        ` : ""}
		${work["youtube-id"] ? `
			<div class="youtube-viewer">
				<iframe 
				width="100%" height="315"
				src="https://www.youtube.com/embed/${work["youtube-id"]}"
				title="YouTube video player" frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen></iframe>
			</div>
` : ""}
        <div class="pdf-viewer">
          <iframe 
            src="https://drive.google.com/file/d/${work["pdf-id"]}/preview"
            width="100%" allow="autoplay"></iframe>
        </div>
      </div>
    `;
		overlay.classList.remove("hidden");
	}

	// 詳細を閉じる
	window.closeOverlay = function() {
		overlay.classList.add("hidden");
		history.pushState({}, "", location.pathname);
	};
});
