import {
    tooltip
} from "/src/components/tooltip"
import {
    popover
} from "/src/components/popover"
import borderGif from "/src/assets/image/border.gif"
import {
    whiteBoardDataSet
} from "../../utils"
import {
    domAppendChild
} from "/src/utils/index"
let colorTypeList = whiteBoardDataSet.colorList
//画板渲染
export function renderCanvas() {
    let canvas = document.createElement("canvas")
    canvas.className = "bupu-canvas"
    return canvas
}

//临时画板渲染
export function renderTemporaryCanvas() {
    let canvas = document.createElement("canvas")
    canvas.className = "bupu-temporary-canvas"
    return canvas
}

//画板容器渲染
export function renderContainer() {
    let container = document.createElement("div")
    container.className = "bupu-container"
    return container
}

//渲染画板图形工具
export function renderDraw() {
    let dom = document.createElement("div")
    dom.id = "toolbar-draw"
    dom.className = "bupu-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-duobianxing"></span>`
    tooltip(dom, {
        content: "画图",
        placement: "right"
    })
    popover(dom, {
        content: getPopoverDom()
    })

    function getPopoverDom() {
        let drawTypeList = [`<span class="iconfont icon-juxing"></span>`, `<span class="iconfont icon-xingzhuang-sanjiaoxing"></span>`, `<span class="iconfont icon-radio-on"></span>`, `<span class="iconfont icon-tubiao"></span>`]
        let popoverDom = document.createDocumentFragment()
        //切换图形形状
        let popover1 = document.createElement("div")
        popover1.className = "bupu-module"
        popover1.id = "bupu-draw-shapetype"
        drawTypeList.forEach((item, index) => {
            let popover1Item = document.createElement("div")
            if (index == 0) {
                popover1Item.className = "bupu-module-item is-selected"
            } else {
                popover1Item.className = "bupu-module-item"
            }
            popover1Item.setAttribute("shapeType", index)
            popover1Item.innerHTML = item
            popover1.appendChild(popover1Item)
        })
        //切换画图是的线条粗细
        let popover2 = document.createElement("div")
        popover2.className = "bupu-range"
        let rangeInput = document.createElement("input")
        rangeInput.type = "range"
        rangeInput.value = 20
        rangeInput.id = "bupu-draw-linewidth"
        popover2.appendChild(rangeInput)
        //切换颜色
        let popover3 = document.createElement("div")
        popover3.className = "bupu-module"
        popover3.id = "bupu-draw-color"

        colorTypeList.forEach((item, index) => {
            let popover3Item = document.createElement("div")
            popover3Item.setAttribute("color", item)
            let popover3ItemContent = document.createElement("div")
            if (index == 0) {
                popover3Item.className = "bupu-module-item is-selected"
            } else {
                popover3Item.className = "bupu-module-item"
            }
            popover3ItemContent.className = "bupu-module-color"
            popover3ItemContent.style.backgroundColor = item
            popover3Item.appendChild(popover3ItemContent)
            popover3.appendChild(popover3Item)
        })
        domAppendChild(popoverDom, [popover1, popover2, popover3])
        return popoverDom
    }

    return dom
}

//渲染画板书写工具
export function renderWrite() {
    let dom = document.createElement("div")
    dom.id = "toolbar-write"
    dom.className = "bupu-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-qianbipencil84"></span>`

    tooltip(dom, {
        content: "书写",
        placement: "right"
    })

    popover(dom, {
        content: getPopoverDom()
    })

    function getPopoverDom() {
        let drawTypeList = [`<span class="iconfont icon-ziyouquxian"></span>`, `<span class="iconfont icon-straight"></span>`]
        let popoverDom = document.createDocumentFragment()
        //切换图形形状
        let popover1 = document.createElement("div")
        popover1.className = "bupu-module"
        popover1.id = "bupu-write-linetype"
        drawTypeList.forEach((item, index) => {
            let popover1Item = document.createElement("div")
            if (index == 0) {
                popover1Item.className = "bupu-module-item is-selected"
            } else {
                popover1Item.className = "bupu-module-item"
            }
            popover1Item.setAttribute("lineType", index)
            popover1Item.innerHTML = item
            popover1.appendChild(popover1Item)
        })
        //切换画图是的线条粗细
        let popover2 = document.createElement("div")
        popover2.className = "bupu-range"
        let rangeInput = document.createElement("input")
        rangeInput.id = "bupu-write-linewidth"
        rangeInput.type = "range"
        rangeInput.value = 20
        popover2.appendChild(rangeInput)
        //切换颜色
        let popover3 = document.createElement("div")
        popover3.className = "bupu-module"
        popover3.id = "bupu-write-color"
        colorTypeList.forEach((item, index) => {
            let popover3Item = document.createElement("div")
            popover3Item.setAttribute("color", item)
            let popover3ItemContent = document.createElement("div")
            if (index == 0) {
                popover3Item.className = "bupu-module-item is-selected"
            } else {
                popover3Item.className = "bupu-module-item"
            }
            popover3ItemContent.className = "bupu-module-color"
            popover3ItemContent.style.backgroundColor = item
            popover3Item.appendChild(popover3ItemContent)
            popover3.appendChild(popover3Item)
        })
        domAppendChild(popoverDom, [popover1, popover2, popover3])
        return popoverDom
    }

    return dom
}

//插入图片
export function renderImage() {
    let dom = document.createElement("div")
    dom.id = "toolbar-image"
    dom.className = "bupu-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-tupian"></span>`
    tooltip(dom, {
        content: "图片",
        placement: "right"
    })
    return dom
}

//渲染指针
export function renderPointer() {
    let dom = document.createElement("div")
    dom.id = "toolbar-pointer"
    dom.className = "bupu-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-pointer2"></span>`
    tooltip(dom, {
        content: "指针",
        placement: "right"
    })
    return dom
}

//渲染文本框
export function renderText() {
    let dom = document.createElement("div")
    dom.id = "toolbar-text"
    dom.className = "bupu-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-text"></span>`

    function getPopoverDom() {
        let popoverDom = document.createDocumentFragment()
        //切换文字大小
        let popover2 = document.createElement("div")
        popover2.className = "bupu-range"
        let rangeInput = document.createElement("input")
        rangeInput.id = "bupu-text-fontsize"
        rangeInput.type = "range"
        rangeInput.value = 30
        popover2.appendChild(rangeInput)
        //切换颜色
        let popover3 = document.createElement("div")
        popover3.className = "bupu-module"
        popover3.id = "bupu-text-color"
        colorTypeList.forEach((item, index) => {
            let popover3Item = document.createElement("div")
            popover3Item.setAttribute("color", item)
            let popover3ItemContent = document.createElement("div")
            if (index == 0) {
                popover3Item.className = "bupu-module-item is-selected"
            } else {
                popover3Item.className = "bupu-module-item"
            }
            popover3ItemContent.className = "bupu-module-color"
            popover3ItemContent.style.backgroundColor = item
            popover3Item.appendChild(popover3ItemContent)
            popover3.appendChild(popover3Item)
        })
        domAppendChild(popoverDom, [popover2, popover3])
        return popoverDom
    }

    tooltip(dom, {
        content: "文本",
        placement: "right"
    })
    popover(dom, {
        content: getPopoverDom()
    })

    return dom
}

//渲染撤销
export function renderUndo() {
    let dom = document.createElement("div")
    dom.id = "toolbar-undo"
    dom.className = "bupu-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-chexiao"></span>`
    tooltip(dom, {
        content: "撤销",
        placement: "right"
    })
    return dom
}

//渲染反撤销
export function renderRedo() {
    let dom = document.createElement("div")
    dom.id = "toolbar-redo"
    dom.className = "bupu-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-fanchexiao"></span>`
    tooltip(dom, {
        content: "反撤销",
        placement: "right"
    })
    return dom
}

//渲染橡皮
export function renderEraser() {
    let dom = document.createElement("div")
    dom.id = "toolbar-eraser"
    dom.className = "bupu-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-xiangpi1"></span>`
    tooltip(dom, {
        content: "橡皮",
        placement: "right"
    })
    return dom
}

//渲染打开文件
export function renderOpenFile() {
    let dom = document.createElement("div")
    dom.id = "toolbar-open-file"
    dom.className = "bupu-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-wenjianjia"></span>`
    tooltip(dom, {
        content: "打开文件",
        placement: "right"
    })
    return dom
}

//渲染添加页面
export function renderAddPage() {
    let dom = document.createElement("div")
    dom.id = "toolbar-add-page"
    dom.className = "bupu-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-jiahao"></span>`
    tooltip(dom, {
        content: "添加页面",
        placement: "right"
    })
    return dom
}

//渲染删除页面
export function renderDeletePage() {
    let dom = document.createElement("div")
    dom.id = "toolbar-delete-page"
    dom.className = "bupu-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-shanchu"></span>`
    tooltip(dom, {
        content: "删除页面",
        placement: "right"
    })
    return dom
}

//渲染重置
export function renderReset() {
    let dom = document.createElement("div")
    dom.id = "toolbar-reset"
    dom.className = "bupu-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-zhongzhi"></span>`
    tooltip(dom, {
        content: "重置",
        placement: "right"
    })
    return dom
}

//渲染保存
export function renderSave() {
    let dom = document.createElement("div")
    dom.id = "toolbar-save"
    dom.className = "bupu-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-baocun"></span>`
    tooltip(dom, {
        content: "保存",
        placement: "right"
    })
    return dom
}

//渲染分页器
export function renderPagination() {
    let dom = document.createElement("div")
    dom.className = "bupu-toolbar-child bupu-toolbar-vertical"
    let prevDom = document.createElement("div")
    prevDom.id = "toolbar-pagination-prev"
    prevDom.className = "bupu-toolbar-content__item"
    prevDom.innerHTML = `<span class="iconfont  icon-shouqijiantouxiao"></span>`
    let nowPageDom = document.createElement("div")
    nowPageDom.id = "toolbar-pagination-page"
    nowPageDom.className = "bupu-pagination-page"
    let nextDom = document.createElement("div")
    nextDom.id = "toolbar-pagination-next"
    nextDom.className = "bupu-toolbar-content__item"
    nextDom.innerHTML = `<span class="iconfont icon-xialajiantouxiao"></span>`
    domAppendChild(dom, [prevDom, nowPageDom, nextDom])
    return dom
}

//渲染遮罩层
export function renderOverlay() {
    let dom = document.createElement("div")
    dom.className = "bupu-overlay"
    return dom
}

//渲染选中工具栏
export function renderMoveToolbar() {
    let selectToolbar = document.createElement("div")
    selectToolbar.id = "bupu-move-toolbar"
    let topDom = document.createElement("div")
    topDom.id = "move-toolbar-top"
    topDom.className = "bupu-move-toolbar__item"
    topDom.innerHTML = `<span class="iconfont  icon-set-top"></span>`
    tooltip(topDom, {
        content: "置顶",
        placement: "right"
    })
    let bottomDom = document.createElement("div")
    bottomDom.id = "move-toolbar-bottom"
    bottomDom.className = "bupu-move-toolbar__item"
    bottomDom.innerHTML = `<span class="iconfont  icon-set-bottom"></span>`
    tooltip(bottomDom, {
        content: "置底",
        placement: "right"
    })
    domAppendChild(selectToolbar, [topDom, bottomDom])
    return selectToolbar
}

//渲染选中范围
export function renderSelectRange() {
    let selectBox = document.createElement("div")
    selectBox.id = "bupu-select-range"
    let borderList = ["left", "right", "top", "bottom"]
    let blockList = ["left", "right", "top", "bottom", "leftTop", "leftBottom", "rightTop", "rightBottom"]
    borderList.forEach(item => {
        let borderDom = document.createElement("div")
        borderDom.className = "select-range-border__" + item
        borderDom.style.background = `url(${borderGif})`
        selectBox.appendChild(borderDom)
    })
    blockList.forEach(item => {
        let blockDom = document.createElement("div")
        blockDom.className = "select-range-block__" + item
        selectBox.appendChild(blockDom)
    })
    return selectBox
}

//更新分页器信息
export function updatePaginationText(v) {
    let paginationTextDom = document.getElementById("toolbar-pagination-page")
    if (paginationTextDom) {
        paginationTextDom.innerHTML = v
    }
}