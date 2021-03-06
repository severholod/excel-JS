class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }
    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }
    set text(text) {
        this.$el.textContent = text
    }
    get text() {
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value
        }
        return this.$el.textContent
    }
    clear() {
        this.html('')
        return this
    }
    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }
    removeListener(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }
    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }
    closest(selector) {
        return $(this.$el.closest(selector))
    }
    getCoords() {
        return this.$el.getBoundingClientRect()
    }
    get data() {
        return this.$el.dataset
    }
    addClass(classes) {
        this.$el.classList.add(classes)
        return this
    }
    removeClass(classes) {
        this.$el.classList.remove(classes)
        return this
    }
    toggleClass(classes) {
        console.log(this.$el.classList)
        this.$el.classList.contains(classes) ? this.removeClass(classes) : this.addClass(classes)
    }
    find(selector) {
        return $(this.$el.querySelector(selector))
    }
    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }
    css(styles = {}) {
        Object.keys(styles).forEach(key => this.$el.style[key] = styles[key])
    }
    id(parse) {
        if (parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        } else {
            return this.data.id
        }
    }
    attr(name, value) {
        if (value !== undefined) {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
    }
    focus() {
        this.$el.focus()
        return this
    }
    getStyles(styles = []) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s]
            return res
        }, {})
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}