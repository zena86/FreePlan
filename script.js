"use strict";

document.addEventListener("DOMContentLoaded", function (event) {
	//burger	
	let burger = document.querySelector(".burger");
	let menu = document.querySelector(".menu");
	let body = document.querySelector("body");
	let bigMenu = document.querySelector(".menu-big");
	let contacts = document.querySelector(".contacts");
	burger.onclick = function () {
		burger.classList.toggle("active");
		menu.classList.toggle("active");
		menu.classList.toggle("lost");
		body.classList.toggle("lock");
		bigMenu.classList.toggle("active");
		contacts.classList.toggle("lost");
	};

	//portfolio	
	let items = document.querySelectorAll("body > .wrapper > section.photos > div > div.content-width > div > .item");
	let timerId;
	for (let i = 0; i < items.length; i++) {
		items[i].onmouseover = function (event) {
			timerId = setInterval(showSlide, 1000, items[i]);
		};
		items[i].onmouseout = function (event) {
			clearInterval(timerId);
		};
	}

});

	//popup
	const popupLinks = document.querySelectorAll(".popup-link");
	//const body = document.querySelector("body");
	const lockPadding = document.querySelectorAll(".lock-padding"); //нужен для фиксированных объетов

	let unlock = true; //Чтобы не было двойных нажатий

	const timeout = 800;//Для блокировки скрола

	if (popupLinks.length > 0) {
		for (let i = 0; i < popupLinks.length; i++) {
			const popupLink = popupLinks[i];
			popupLink.addEventListener("click", function (e) {
				const popupName = popupLink.getAttribute("href").replace("#", "");
				const curentPopup = document.getElementById(popupName);
				popupOpen(curentPopup);
				e.preventDefault(); //блокируем работу ссылки, чтобы не было перезагрузки
			});
		}
	}

	const popupCloseIcon = document.querySelectorAll(".close-popup");
	if (popupCloseIcon.length > 0) {
		for (let i = 0; i < popupCloseIcon.length; i++) {
			const el = popupCloseIcon[i];
			el.addEventListener("click", function (e) {
				popupClose(el.closest(".popup"));// объект .popup, ближайший к el
				e.preventDefault();
			});

		}
	}


//functions for portfolio
function showSlide(item) {
	let arr = item.dataset.slides.split(";");
	let index = item.dataset.index;
	item.querySelector("img").setAttribute("src", arr[index]);
	item.dataset.index++;
	if (item.dataset.index > arr.length - 1)
		item.dataset.index = 0;
}

//functions for popup
function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector(".popup.open");
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add("open");
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest(".popup-content")) { //отсекаем все кроме темной обл.т.е. если у нажатого родителя нет класса .popup-content, то...
				popupClose(e.target.closest(".popup"));//передаем ближайший объект с классом .popup в функцию закрытия
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {//Если popup в popup
	if (unlock) {
		popupActive.classList.remove("open");
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px"; //ширина скрола
	if (lockPadding.length > 0) {
		for (let i = 0; i < lockPadding.length; i++) {
			const el = lockPadding[i];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add("lock");

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let i = 0; i < lockPadding.length; i++) {
				const el = lockPadding[i];
				el.style.paddingRight = "0px";
			}
		}
		body.style.paddingRight = "0px";
		body.classList.remove("lock");
	}, timeout);
}
//Close popup Esc
document.addEventListener("keydown", function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector(".popup.open");
		popupClose(popupActive);
	}
});
//Polifill closest
(function() {
	// проверяем поддержку
	if (!Element.prototype.closest) {
	  // реализуем
	  Element.prototype.closest = function(css) {
		var node = this;
		while (node) {
			if (node.matches(css)) return node;
			else node = node.parentElement;
		}
		return null;
	  };
	}
 })();
//Polifill matches
(function() {
	// проверяем поддержку
	if (!Element.prototype.matches) {
	  // определяем свойство
	  	Element.prototype.matches = Element.prototype.matchesSelector ||
		Element.prototype.webkitMatchesSelector ||
		Element.prototype.mozMatchesSelector ||
		Element.prototype.msMatchesSelector;
	}
})();







