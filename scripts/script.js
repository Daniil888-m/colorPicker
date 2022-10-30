let cols = document.querySelectorAll('.col');


document.addEventListener('keydown', function (e) {
	e.preventDefault();
	if (!e.repeat) {
		if (e.code == 'Space') {
			setRandomColors();
		}
	}

})

document.addEventListener("click", function (e) {
	e.preventDefault();
	const type = e.target.dataset.type;
	if (type === 'lock') {
		const node = e.target.tagName.toLowerCase() === 'i' ? e.target : e.target.children[0];
		console.log(node)
		node.classList.toggle('fa-lock-open');
		node.classList.toggle('fa-lock');
	}
	if (type === 'copy') {
		copyToClipboard(e.target.textContent);
	}

	if (type === 'refresh') {

		if (!e.target.classList.contains('_hold')) {

			e.target.classList.add('_hold');

			setTimeout(() => {
				setRandomColors();
			}, 100);

			e.target.addEventListener('transitionend', function (e) {
				this.classList.remove('_hold');
			})
		}

	}
});
// function generateRandomColor() {
// 	//RGB

// 	const hexCodes = '0123456789ABCDEF';
// 	let color = '';
// 	for (let i = 0; i < 6; i++) {
// 		color += hexCodes[Math.floor(Math.random() * hexCodes.length)]

// 	}
// 	return '#' + color;

// }
function getRandomColor() {
	let color = '#';
	const values = '0123456789ABCDEF';

	for (let i = 0; i < 6; i++) {

		color += values[Math.floor(Math.random() * values.length)];
	}

	return color;
}
function setRandomColors(isInitial) {
	const colors = isInitial ? getColorsFromHash() : [];
	cols.forEach((col, index) => {
		const isLocked = col.querySelector('i').classList.contains('fa-lock')
		const text = col.querySelector('h2');
		const button = col.querySelector('button');

		if (isLocked) {
			colors.push(text.textContent);
			return;
		}
		const color = isInitial ? colors[index] ? colors[index] : chroma.random() : chroma.random()

		if (!isInitial) colors.push(color);



		text.textContent = color;
		setTextColor(text, color);
		setTextColor(button, color);
		col.style.background = color;
	});
	updateColorsHash(colors);
}

setRandomColors(true);
function setTextColor(text, color) {
	const luminance = chroma(color).luminance();
	text.style.color = luminance > 0.5 ? 'black' : 'white';

}
async function copyToClipboard(text) {
	const result = await navigator.clipboard.writeText(text);
	return result;
}

function updateColorsHash(colors = []) {
	console.log('updeate', colors)
	colors = colors.map(item => item.toString().slice(1)).join('-');
	document.location.hash = colors.toString();
}

function getColorsFromHash() {
	if (document.location.hash.length > 1) {
		return document.location.hash.slice(1).split('-').map(color => '#' + color);
	}
	return [];
}