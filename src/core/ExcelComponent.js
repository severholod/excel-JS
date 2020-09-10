import {DomListener} from '@/core/DomListener'

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []

        this.prepare()
    }
    // Настраиваем компонент до init
    prepare() {}
    // Возвращает шаблон компонента
    toHTML() {
        return ''
    }
    // Уведомляем слушателей о событии event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }
    // Подписываемся на event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    // Инициализируем компонент
    // Добавляем слушатели
    init() {
        this.initDOMListeners()
    }
    // Удаляем слушатели и компонент
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}