document.addEventListener("DOMContentLoaded", function() {
	const header = document.querySelector("header");

	if (header) {
		header.innerHTML = `
      <div class="logo">Composer, Yasuhisa Tsugata</div>
      <nav>
        <ul id="header-menu" class="menu-list"></ul>
      </nav>
    `;
	}

	// メニュー読み込み
	const directory = location.pathname.replace(/\/+$/, "").split('/').pop();
	fetch("../assets/data/menu.json")
		.then(res => res.json())
		.then(menuItems => {
			const menuLists = document.querySelectorAll(".menu-list");

			menuLists.forEach(list => {
				menuItems.forEach(item => {
					if (list.closest(`#${item.href}`)) return;
					const li = document.createElement("li");
					const a = document.createElement("a");
					a.href = `/en/${item.href}`;
					a.textContent = item.label;

					li.appendChild(a);
					list.appendChild(li);
				});
			});
			// Headerにenを追加
			const headerLi = document.getElementById("header-menu");

			const jpLi = document.createElement("li");
			const jpA = document.createElement("a");
			jpA.style = "font-size: 0.8rem;";
			jpA.href = "/" + directory;
			jpA.textContent = "[JAPANESE]";

			jpLi.appendChild(jpA);
			headerLi.appendChild(jpLi);
		})
		.catch(err => console.error("メニュー読み込み失敗:", err));

	// ヘッダー表示制御
	if (directory == "home") {
		const scrollTarget = document.querySelector("#scrollContainer") || window;

		scrollTarget.addEventListener("scroll", () => {
			let scrollTop;
			if (scrollTarget === window) {
				scrollTop = window.scrollY;
			} else {
				scrollTop = scrollTarget.scrollTop;
			}

			if (scrollTop > 100) {
				header.style.top = "0px"; // 表示
			} else {
				header.style.top = "-100px"; // 非表示
			}
		});
	}

});