export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = []
        this.current = null
    }
    select($el) {
        this.clear()
        this.group.push($el)
        this.current = $el
        $el.addClass(TableSelection.className).focus()
    }
    get selectedIds() {
        return this.group.map($el => $el.id())
    }
    clear() {
        this.group.forEach( $i => $i.removeClass(TableSelection.className))
        this.group = []
    }

    selectGroup($group) {
        this.clear()
        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }
    applyStyle(style) {
        this.group.forEach($el => $el.css(style))
    }
}