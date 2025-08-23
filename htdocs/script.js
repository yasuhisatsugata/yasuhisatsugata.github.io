document.addEventListener("DOMContentLoaded", function () {
	// ヘッダー表示制御
	const header = document.querySelector("header");
	const firstSection = document.querySelector(".hero");

	if ("IntersectionObserver" in window) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					header.style.top = entry.isIntersecting ? "-100px" : "0px";
				});
			},
			{ threshold: 0.6 }
		);
		if (firstSection && header) observer.observe(firstSection);
	} else {
		window.addEventListener("scroll", () => {
			if (firstSection.getBoundingClientRect().bottom < 50) {
				header.style.top = "0px";
			} else {
				header.style.top = "-100px";
			}
		});
	}
	
	fetch("assets/data/menu.json")
    .then(response => response.json())
    .then(menuItems => {
      const headerMenu = document.getElementById("header-menu");
      const menuContainer = document.getElementById("menu-container");

      menuItems.forEach(item => {
        // ヘッダー用 li > a
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.label;
        li.appendChild(a);
        headerMenu.appendChild(li);

        // menu-section 用 a.menu-item
        const menuLink = document.createElement("a");
        menuLink.href = item.href;
        menuLink.textContent = item.label;
        menuLink.classList.add("menu-item");
        menuContainer.appendChild(menuLink);
      });
    })
    .catch(err => console.error("メニュー読み込み失敗:", err));
	
});