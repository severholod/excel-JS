import {ExcelComponent} from '@/core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {findSelector, isCell, shouldResize} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'
import {range} from '@core/utils'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constans'
import {parse} from '@core/parse'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
        this.unsubs = []
    }

    toHTML() {
        return createTable(20, this.store.getState())
    }
    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        this.selectCell(this.$root.find('[data-id="1:1"]'))

        this.$on('formula:input', value => {
            this.selection.current.attr('data-value', value)
            this.selection.current.text = parse(value)
            this.updateTextInStore(value)
        })
        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })

        // this.$subscribe(state => {
        //     console.log('TableState', state)
        // })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
    }
    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }
    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            if (event.shiftKey) {
                const target = $(event.target).id(true)
                const current = this.selection.current.id(true)
                const cols = range(current.col, target.col)
                const rows = range(current.row, target.row)
                let ids = cols.reduce((acc, col) => {
                    rows.forEach(row => acc.push(`${row}:${col}`))
                    return acc
                }, [])
                ids = ids.map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup(ids)
            } else {
                this.selectCell($(event.target))
            }
        }
    }
    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown'
        ]
        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(findSelector(key, id))
            this.selectCell($next)
        }
    }
    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }
    onInput(event) {
        // this.$emit('table:input', $(event.target))
        const $target = $(event.target)
        $target.attr('data-value', $target.text)
        this.updateTextInStore($target.text)
    }
}

