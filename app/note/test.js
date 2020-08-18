deepClone
promise
call apply bind
instanceof
throttle
debounce
function debounce(fn, delay = 500) {
	let timer = null
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(this, args)
		}, delay)
	}
}
function throttle(fn, delay = 500) {
	let flag = true
	return (...args) => {
		if (!flag) { return }
		flag = false
		setTimeout(() => {
			fn.apply(this, args)
		}, delay)
	}
}