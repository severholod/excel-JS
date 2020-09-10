export function shouldResize(event) {
    return event.target.dataset.resize
}
export function isCell(event) {
    return event.target.dataset.type === 'cell'
}
export function findSelector(key, {col, row}) {
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowLeft':
            if (col == 1) {
                break
            }
            col--
            break
        case 'ArrowUp':
            if (row == 1) {
                break
            }
            row--
            break
    }
    return `[data-id="${row}:${col}"]`
}