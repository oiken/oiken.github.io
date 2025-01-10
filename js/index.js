// 请确保兼容 IE 10+ 。同 purecss 3.0.0
'use strict';

const menuItemIdPrefix = 'menuItem';
const menuItemCountIdPrefix = 'menuItemCount';
const labelIdPrefix = 'menuLabel';
const categoryIdPrefix = 'categoryItem';

let currentState = {
	isEnglish: false,
	activeMenu: 'Work',
	activeLabel: '',

	viewJsonData: null,
	menuJsonData: null,
}

// 初始化
document.addEventListener('DOMContentLoaded', function () {
	requestJson('data/view.json', false, null,
		function (jsonData) {
			renderView(jsonData, currentState.isEnglish, currentState.activeMenu);
			currentState.viewJsonData = jsonData;
		},
		function (errMsg) {
			alert(errMsg);
		});
	requestJson('data/menu.json', false, null,
		function (jsonData) {
			renderMenu(jsonData, currentState.isEnglish, currentState.activeMenu, currentState.activeLabel);
			currentState.menuJsonData = jsonData;
			requestAndRenderCategory();
		},
		function (errMsg) {
			alert(errMsg);
		});
	initEvents();
});

// 点击处理
function initEvents() {
	const btnToStaticPagesId = "btnToStaticPages";
	const btnToStaticPages = document.getElementById(btnToStaticPagesId);
	btnToStaticPages.addEventListener('click', function (e) {
		const msg = currentState.isEnglish ? 'Not ready yet' : '还没有准备好';
		alert(msg);
	});
	const btnSwitchLanguageId = "btnSwitchLanguage";
	const btnSwitchLanguage = document.getElementById(btnSwitchLanguageId);
	btnSwitchLanguage.addEventListener('click', function (e) {
		if (currentState.viewJsonData != null && currentState.menuJsonData != null) {
			currentState.isEnglish = !currentState.isEnglish;
			const btnToStaticPagesText =
				currentState.isEnglish ? currentState.viewJsonData[btnToStaticPagesId].en : currentState.viewJsonData[btnToStaticPagesId].cn;
			btnToStaticPages.textContent = escape(btnToStaticPagesText);
			renderView(currentState.viewJsonData, currentState.isEnglish, currentState.viewJsonData.activeMenu);
			renderMenu(currentState.menuJsonData, currentState.isEnglish, currentState.activeMenu, currentState.activeLabel);
			requestAndRenderCategory();
		}
	});
	document.addEventListener('click', handleMenuEvent);
	// 添加新的事件监听器
	const menuList = document.getElementById('menuList');
	menuList.addEventListener('click', menuClickHandler);
	const categoryList = document.getElementById('categoryList');
	categoryList.addEventListener('click', categoryClickHandler);
}

// 渲染界面文字
function renderView(jsonData, isEnglish, activeMenu) {
	const menuLinkId = 'menuLink';
	const menuLink = document.getElementById(menuLinkId);
	const btnSwitchLanguageId = "btnSwitchLanguage";
	const btnSwitchLanguage = document.getElementById(btnSwitchLanguageId);
	if (isEnglish) {
		document.documentElement.lang = 'en';
		menuLink.text = escape(jsonData[menuLinkId].en);
		btnSwitchLanguage.textContent = escape(jsonData[btnSwitchLanguageId].en);
	} else {
		document.documentElement.lang = 'zh-CN';
		menuLink.text = escape(jsonData[menuLinkId].cn);
		btnSwitchLanguage.textContent = escape(jsonData[btnSwitchLanguageId].cn);
	}
}

// 渲染菜单
function renderMenu(jsonData, isEnglish, activeMenuKey, activeLabel) {
	const menuList = document.getElementById('menuList');
	let menuHTML = '';

	if (jsonData.menu.hasOwnProperty(activeMenuKey)) {
		if (isEnglish) { // 修改网页标题
			document.title = escape(jsonData.menu[activeMenuKey].en
				+ ': ' + jsonData.menu[activeMenuKey].desc);
		} else {
			document.title = escape(jsonData.menu[activeMenuKey].cn
				+ ': ' + jsonData.menu[activeMenuKey].descCn);
		}
	}
	// 添加分类菜单
	for (let key in jsonData.menu) {
		if (jsonData.menu.hasOwnProperty(key)) {
			const itemId = menuItemIdPrefix + key;
			const menuItemCountId = menuItemCountIdPrefix + key;
			const pureMenuActive = activeMenuKey === key ? ' pure-menu-active' : '';
			const item = jsonData.menu[key];
			const text = isEnglish ? item.en : item.cn;
			const desc = isEnglish ? item.desc : item.descCn;

			menuHTML += '<li class="pure-menu-item' + pureMenuActive + '">'
				+ '<a id="' + itemId + '"'
				+ ' href="#" class="pure-menu-link" title="' + escape(desc) + '">'
				+ escape(text)
				+ ' <span id="' + menuItemCountId + '" class="email-count">'
				+ '</span></a></li>';
		}
	}

	if (jsonData.hasOwnProperty("menuHeadLabel")) {
		// 添加标签分隔符
		const menuHeadLabelText = isEnglish ? jsonData.menuHeadLabel.en : jsonData.menuHeadLabel.cn;
		menuHTML += '<li id="menuHeadLabel" class="pure-menu-heading">' + escape(menuHeadLabelText) + '</li>';
	}

	// 添加标签菜单
	for (let labelKey in jsonData.label) {
		if (jsonData.label.hasOwnProperty(labelKey)) {
			const itemId = labelIdPrefix + labelKey;
			const labelActive = activeLabel === labelKey ? ' pure-menu-active' : '';
			const labelItem = jsonData.label[labelKey];
			const labelText = escape(isEnglish ? labelItem.en : labelItem.cn);
			const symbolTitle = escape(isEnglish ? labelItem.symbolTitle : labelItem.symbolTitleCn);
			menuHTML += '<li class="pure-menu-item' + labelActive + '">' +
				'<a id="' + itemId + '" href="#" class="pure-menu-link" title="' + symbolTitle + '">' +
				'<span class="email-label" style="background-color: #ffffff;">' + labelItem.symbol + '</span>' +
				escape(labelText) + '</a></li>';
		}
	}

	menuList.innerHTML = menuHTML;
}

// 定义事件处理函数
function menuClickHandler(event) {
	// 阻止事件冒泡和默认行为
	event.preventDefault();
	event.stopPropagation();

	if (event.target && event.target.matches('.pure-menu-link')) {
		const targetId = event.target.id;
		console.log(targetId + ' 被点击了');

		// 使用 requestAnimationFrame 来避免在同一帧内多次渲染
		requestAnimationFrame(() => {
			if (targetId.startsWith(menuItemIdPrefix)) {
				const key = targetId.substring(menuItemIdPrefix.length);
				if (currentState.activeMenu !== key) {
					currentState.activeMenu = key;
					renderMenu(currentState.menuJsonData, currentState.isEnglish,
						currentState.activeMenu, currentState.activeLabel);
					requestAndRenderCategory();
				}
			} else if (targetId.startsWith(labelIdPrefix)) {
				const key = targetId.substring(labelIdPrefix.length);
				if (currentState.activeLabel === key) {
					currentState.activeLabel = '';
				} else {
					currentState.activeLabel = key;
				}
				renderMenu(currentState.menuJsonData, currentState.isEnglish,
					currentState.activeMenu, currentState.activeLabel);
			}
		});
	}
}

function categoryClickHandler(event) {
	// 阻止事件冒泡和默认行为
	event.preventDefault();
	event.stopPropagation();

	// 使用 closest() 查找最近的 .email-item 祖先元素
	const emailItem = event.target.closest('.email-item');

	if (emailItem) {
		const targetId = emailItem.id;
		console.log(targetId + ' 被点击了');

		// 使用 requestAnimationFrame 来避免在同一帧内多次渲染
		requestAnimationFrame(() => {
			if (targetId.startsWith(categoryIdPrefix)) {
				const key = targetId.substring(categoryIdPrefix.length);
				if (currentState.activeMenu !== key) {
					currentState.menuJsonData.menu[currentState.activeMenu].activeCategory = key;
					requestAndRenderCategory();
				}
			}
		});
	}
}

// 获取json，渲染目录
function requestAndRenderCategory() {
	const menuItem = currentState.menuJsonData.menu[currentState.activeMenu];
	const labelData = currentState.menuJsonData.label;
	const isEnglish = currentState.isEnglish;
	const jsonPath = menuItem.category;
	requestJson(jsonPath, false, null,
		function (jsonData) {
			if (menuItem.activeCategory.length === 0) {
				let firstKey = "";
				for (let key in jsonData) {
					if (jsonData.hasOwnProperty(key)) {
						firstKey = key;
						break;
					}
				}
				menuItem.activeCategory = firstKey;
			}
			let activeCategory = menuItem.activeCategory;
			renderCategory(jsonData, labelData, isEnglish, activeCategory);
			setCategoryNumOfMenu(jsonData);
		},
		function (errMsg) {
			alert(errMsg);
		});
}

// 修改菜单上对应的数字
function setCategoryNumOfMenu(jsonData) {
	let sum = 0;
	for (let key in jsonData) {
		if (jsonData.hasOwnProperty(key)) {
			const item = jsonData[key];
			if (item.visible === 'true') sum += 1;
		}
	}
	const menuItemCountId = menuItemCountIdPrefix + currentState.activeMenu;
	const menuItemCount = document.getElementById(menuItemCountId);
	menuItemCount.textContent = '(' + sum + ')';
}

// 渲染目录
function renderCategory(jsonData, labelData, isEnglish, activeCategory) {
	function isEmptyJsonObject(obj) {
		// 首先确保是对象且不是 null
		if (typeof obj !== 'object' || obj === null) {
			return true;
		}
		return Object.keys(obj).length === 0;
	}

	const categoryList = document.getElementById('categoryList');
	if (isEmptyJsonObject(jsonData)) {
		const noCategory = isEnglish ? 'No Category Yet.' : '还没有目录';
		const noContent = isEnglish ? 'No Content Yet.' : '还没有内容';
		categoryList.innerHTML = '<p class="pure-u-1" style="text-align: center;">' + noCategory + '</p>';
		const main = document.getElementById('main');
		main.style.display = 'none';
	} else {
		const main = document.getElementById('main');
		main.style.display = 'block';
		let html = '';

		// 添加标签菜单
		for (let key in jsonData) {
			if (jsonData.hasOwnProperty(key)) {
				const item = jsonData[key];
				if (item.visible === 'false') continue;
				const itemId = categoryIdPrefix + key;
				let isActive = activeCategory === key;
				let activeItem = '';
				if (isActive) activeItem = 'email-item-selected';
				const runOn = isEnglish ? '  runs on  ' : '  运行在  '
				const runOnPlatform = runOn + item.platform
				const name = isEnglish ? item.name : item.nameCn;
				const desc = isEnglish ? item.desc : item.descCn;

				const labelItem = labelData[item.label];
				const labelText = isEnglish ? labelItem.en : labelItem.cn;
				const symbolTitle = isEnglish ? labelItem.symbolTitle : labelItem.symbolTitleCn;
				html += '<div id="' + itemId + '" class="email-item ' + activeItem + ' pure-g">'
					+ '<div class="pure-u-1-6">'
					+ '<div class="pure-g"><span class="email-label" style="margin: 0.3em;" title="'
					+ symbolTitle + '">' + labelItem.symbol + '</span>'
					+ '<text class="pure-u-1" style="font-size: 0.5em;">' + escape(labelText) + '</text></div>'
					// + '<img width="64" height="64" alt="' + escape(logoAlt) + '"'
					// + ' class="email-avatar" src="' + item.logoFile + '">'
					+ '</div>'
					+ '<div class="pure-u-5-6">'
					+ '<h5 class="email-name">' + escape(item.language) + '</h5>'
					+ '<h5 class="email-name">' + escape(runOnPlatform) + '</h5>'
					+ '<h4 class="email-subject">' + escape(name) + '</h4>'
					+ '<p class="email-desc">' + escape(desc) + '</p>'
					+ '</div></div>';

				if (isActive) {
					const mainTitle = document.getElementById('main-title');
					mainTitle.innerHTML = escape(name);
					const subtitle = document.getElementById('main-subtitle');
					if (isEnglish)
						subtitle.innerHTML = '<span>Type is</span> <a>' + escape(item.kind) + ', </a>'
							+ ' <span>Developed from</span> ' + escape(item.devFrom) + ' <span>to</span> ' + escape(item.devTo);
					else
						subtitle.innerHTML = '<span>类型是：</span><a href="#">' + escape(item.kindCn) + ' </a>'
							+ ' <span>开发时间从</span> ' + escape(item.devFrom) + ' <span>到</span> ' + escape(item.devTo);
					// 把 md 文件装载到组件：
					const markdownDiv = document.getElementById('div-markdown-file');
					markdownDiv.innerHTML = '';
					const mdFilePath = isEnglish ? item.mdFilePath : item.mdFilePathCn;
					requestMarkdownFile(mdFilePath, false, null,
						function (markdownFile) {
							// 转换 markdown 为 HTML 并显示
							var markdownToHtml = marked.parse(markdownFile);
							const markdownDiv = document.getElementById('div-markdown-file');
							markdownDiv.innerHTML = markdownToHtml;
						},
						function (errMsg) {
							alert(errMsg);
						}
					)
				}
			}
		}
		categoryList.innerHTML = html;
	}
}

// HTML 转义函数
function escape(str) {
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

// 从服务器获取数据并渲染
function requestMarkdownFile(filePath, isPost, postJson, onSuccess, onFail) {
	const xhr = new XMLHttpRequest();
	if (isPost) {
		xhr.open('POST', filePath, true);
	} else {
		xhr.open('GET', filePath, true);
	}

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				onSuccess(xhr.responseText);
			} else {
				onFail('加载 ' + filePath + ' 失败: ' + xhr.status);
			}
		}
	};

	xhr.onerror = createXhrErrorHandler(xhr, onFail);

	if (isPost) {
		xhr.send(postJson ? JSON.stringify(postJson) : null);
	} else {
		xhr.send();
	}
}

function requestJson(filePath, isPost, postJson, onSuccess, onFail) {
	const xhr = new XMLHttpRequest();
	if (isPost) {
		xhr.open('POST', filePath, true);
		xhr.setRequestHeader('Content-Type', 'application/json'); // 添加请求头
	} else {
		xhr.open('GET', filePath, true);
	}

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let data = null;
				try {
					data = JSON.parse(xhr.responseText);
				} catch (e) {
					onFail('数据 ' + filePath + ' 解析错误：' + e);
				};
				if (data != null) { onSuccess(data); }
			} else {
				onFail('加载 ' + filePath + ' 失败: ' + xhr.status);
			}
		}
	};

	xhr.onerror = createXhrErrorHandler(xhr, onFail);

	if (isPost) {
		xhr.send(postJson ? JSON.stringify(postJson) : null);
	} else {
		xhr.send();
	}
}

// 完全独立的错误处理函数
function createXhrErrorHandler(xhr, onFail) {
	return function (e) {
		var errorDetails = collectXhrErrorDetails(xhr, e);
		onFail(errorDetails.message);
		console.error('XHR Error:', errorDetails.debug);
	};
}

function collectXhrErrorDetails(xhr, e) {
	var errorMsg = '网络错误';
	var debugInfo = {
		event: e,
		status: xhr.status,
		statusText: xhr.statusText,
		responseURL: xhr.responseURL || '',
		responseText: xhr.responseText
	};

	// 添加错误事件信息
	if (e && e.type) {
		errorMsg += ' [' + e.type;
		if (e.bubbles !== undefined) {
			errorMsg += ', bubbles=' + e.bubbles;
		}
		if (e.cancelable !== undefined) {
			errorMsg += ', cancelable=' + e.cancelable;
		}
		errorMsg += ']';
	}

	// 添加状态码
	if (xhr.status) {
		errorMsg += ' (状态码: ' + xhr.status + ')';
	}

	// 处理响应文本
	if (xhr.responseText) {
		try {
			var response = JSON.parse(xhr.responseText);
			if (response.message) {
				errorMsg += ' - ' + response.message;
			}
		} catch (e) {
			if (xhr.responseText.length < 100) {
				errorMsg += ' - ' + xhr.responseText;
			}
		}
	}

	// 添加 URL 信息
	if (xhr.responseURL) {
		errorMsg += ' (URL: ' + xhr.responseURL + ')';
	}

	return {
		message: errorMsg,
		debug: debugInfo
	};
}

// 以下是菜单的点击事件，重要的是点击其它界面，会让 menu 收拢起来
// Script to make the Menu link work
// Just stripped down version of the js/ui.js script for the side-menu layout
function getMenuElements() {
	return {
		menu: document.getElementById('nav'),
		menuLink: document.getElementById('menuLink')
	};
}

function toggleClass(element, className) {
	const classes = element.className.split(/\s+/);
	const length = classes.length;
	for (let i = 0; i < length; i++) {
		if (classes[i] === className) {
			classes.splice(i, 1);
			break;
		}
	}
	// The className is not found
	if (length === classes.length) {
		classes.push(className);
	}

	element.className = classes.join(' ');
}

function toggleMenu() {
	const active = 'active';
	const elements = getMenuElements();

	toggleClass(elements.menu, active);
}

function handleMenuEvent(e) {
	const elements = getMenuElements();

	if (e.target.id === elements.menuLink.id) {
		toggleMenu();
		e.preventDefault();
	} else if (elements.menu.className.indexOf('active') !== -1) {
		toggleMenu();
	}
}