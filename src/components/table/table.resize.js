import {$} from '@core/dom'

export function resizeHandler($root, event) {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    let val
    $resizer.css({opacity: 1})

    document.onmousemove = e => {
        if ($resizer.data.resize === 'col') {
            const delta = e.pageX - coords.right
            val = coords.width + delta
            $resizer.css({right: -delta + 'px', bottom: '-5000px'})
        } else if ($resizer.data.resize === 'row') {
            const delta = e.pageY - coords.bottom
            val = coords.height + delta
            $resizer.css({bottom: -delta + 'px', right: '-5000px'})
        }
    }
    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        if ($resizer.data.resize === 'col') {
            $root
                .findAll(`[data-col="${$parent.data.col}"]`)
                .forEach($col => $($col).css({width: val + 'px'}))
        } else if ($resizer.data.resize === 'row') {
            $parent.css({height: val + 'px'})
        }
        $resizer.css({opacity: 0, bottom: 0, right: 0})
    }
}