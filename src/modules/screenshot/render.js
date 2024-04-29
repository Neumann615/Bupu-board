import {
    tooltip
} from "/src/components/tooltip"
import {
    popover
} from "/src/components/popover"
import borderGif from "/src/assets/image/border.gif"
import {
    screenShotDataSet,
    domAppendChild
} from "/src/utils/index"

let colorTypeList = screenShotDataSet.colorList

//画板渲染
export function renderCanvas() {
    let canvas = document.createElement("canvas")
    canvas.className = "wxx-canvas"
    return canvas
}

//临时画板渲染
export function renderTemporaryCanvas() {
    let canvas = document.createElement("canvas")
    canvas.className = "wxx-temporary-canvas"
    return canvas
}

//画板容器渲染
export function renderContainer() {
    let container = document.createElement("div")
    container.className = "wxx-container"
    return container
}

//渲染画板图形工具
export function renderDraw() {
    let dom = document.createElement("div")
    dom.id = "toolbar-draw"
    dom.className = "wxx-toolbar-content__item"
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
        popover1.className = "wxx-module"
        popover1.id = "wxx-draw-shapetype"
        drawTypeList.forEach((item, index) => {
            let popover1Item = document.createElement("div")
            if (index == 0) {
                popover1Item.className = "wxx-module-item is-selected"
            } else {
                popover1Item.className = "wxx-module-item"
            }
            popover1Item.setAttribute("shapeType", index)
            popover1Item.innerHTML = item
            popover1.appendChild(popover1Item)
        })
        //切换画图是的线条粗细
        let popover2 = document.createElement("div")
        popover2.className = "wxx-range"
        let rangeInput = document.createElement("input")
        rangeInput.type = "range"
        rangeInput.value = 30
        rangeInput.id = "wxx-draw-linewidth"
        popover2.appendChild(rangeInput)
        //切换颜色
        let popover3 = document.createElement("div")
        popover3.className = "wxx-module"
        popover3.id = "wxx-draw-color"
        colorTypeList.forEach((item, index) => {
            let popover3Item = document.createElement("div")
            popover3Item.setAttribute("color", item)
            let popover3ItemContent = document.createElement("div")
            if (index == 0) {
                popover3Item.className = "wxx-module-item is-selected"
            } else {
                popover3Item.className = "wxx-module-item"
            }
            popover3ItemContent.className = "wxx-module-color"
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
    dom.className = "wxx-toolbar-content__item"
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
        popover1.className = "wxx-module"
        popover1.id = "wxx-write-linetype"
        drawTypeList.forEach((item, index) => {
            let popover1Item = document.createElement("div")
            if (index == 0) {
                popover1Item.className = "wxx-module-item is-selected"
            } else {
                popover1Item.className = "wxx-module-item"
            }
            popover1Item.setAttribute("lineType", index)
            popover1Item.innerHTML = item
            popover1.appendChild(popover1Item)
        })
        //切换画图是的线条粗细
        let popover2 = document.createElement("div")
        popover2.className = "wxx-range"
        let rangeInput = document.createElement("input")
        rangeInput.id = "wxx-write-linewidth"
        rangeInput.type = "range"
        rangeInput.value = 30
        popover2.appendChild(rangeInput)
        //切换颜色
        let popover3 = document.createElement("div")
        popover3.className = "wxx-module"
        popover3.id = "wxx-write-color"
        colorTypeList.forEach((item, index) => {
            let popover3Item = document.createElement("div")
            popover3Item.setAttribute("color", item)
            let popover3ItemContent = document.createElement("div")
            if (index == 0) {
                popover3Item.className = "wxx-module-item is-selected"
            } else {
                popover3Item.className = "wxx-module-item"
            }
            popover3ItemContent.className = "wxx-module-color"
            popover3ItemContent.style.backgroundColor = item
            popover3Item.appendChild(popover3ItemContent)
            popover3.appendChild(popover3Item)
        })
        domAppendChild(popoverDom, [popover1, popover2, popover3])
        return popoverDom
    }

    return dom
}

//渲染指针
export function renderPointer() {
    let dom = document.createElement("div")
    dom.id = "toolbar-pointer"
    dom.className = "wxx-toolbar-content__item"
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
    dom.className = "wxx-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-text"></span>`

    function getPopoverDom() {
        let popoverDom = document.createDocumentFragment()
        //切换文字大小
        let popover2 = document.createElement("div")
        popover2.className = "wxx-range"
        let rangeInput = document.createElement("input")
        rangeInput.id = "wxx-text-fontsize"
        rangeInput.type = "range"
        rangeInput.value = 30
        popover2.appendChild(rangeInput)
        //切换颜色
        let popover3 = document.createElement("div")
        popover3.className = "wxx-module"
        popover3.id = "wxx-text-color"
        colorTypeList.forEach((item, index) => {
            let popover3Item = document.createElement("div")
            popover3Item.setAttribute("color", item)
            let popover3ItemContent = document.createElement("div")
            if (index == 0) {
                popover3Item.className = "wxx-module-item is-selected"
            } else {
                popover3Item.className = "wxx-module-item"
            }
            popover3ItemContent.className = "wxx-module-color"
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
    dom.className = "wxx-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-chexiao"></span>`
    tooltip(dom, {
        content: "撤销",
        placement: "right"
    })
    return dom
}

//渲染保存
export function renderSave() {
    let dom = document.createElement("div")
    dom.id = "toolbar-save"
    dom.className = "wxx-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-baocun"></span>`
    tooltip(dom, {
        content: "保存",
        placement: "right"
    })
    return dom
}

//渲染遮罩层
export function renderOverlay() {
    let dom = document.createElement("div")
    dom.className = "wxx-overlay"
    return dom
}

//渲染选中工具栏
export function renderMoveToolbar() {
    let selectToolbar = document.createElement("div")
    selectToolbar.id = "wxx-move-toolbar"
    let topDom = document.createElement("div")
    topDom.id = "move-toolbar-top"
    topDom.className = "wxx-move-toolbar__item"
    topDom.innerHTML = `<span class="iconfont  icon-set-top"></span>`
    tooltip(topDom, {
        content: "置顶",
        placement: "right"
    })
    let bottomDom = document.createElement("div")
    bottomDom.id = "move-toolbar-bottom"
    bottomDom.className = "wxx-move-toolbar__item"
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
    selectBox.id = "wxx-select-range"
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

//渲染截图选中范围
export function renderScreenShotSelectRange(domList) {
    let selectBox = document.createElement("div")
    selectBox.id = "wxx-select-range"
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
    let selectContentBox = document.createElement("div")
    selectContentBox.className = "wxx-select-content"
    if (domList && domList.length) {
        domAppendChild(selectContentBox, domList)
    }
    let childList = [selectContentBox]
    domAppendChild(selectBox, childList)
    return selectBox
}

//更新分页器信息
export function updatePaginationText(v) {
    let paginationTextDom = document.getElementById("toolbar-pagination-page")
    if (paginationTextDom) {
        paginationTextDom.innerHTML = v
    }
}

//渲染截屏背景
export function renderScreenShotBackground() {
    let bgDom = document.createElement("img")
    bgDom.className = "wxx-screen-shot__background"
    bgDom.src = `${screenShotDataSet.imageUrl}`
    return bgDom
}

//渲染右键菜单
export function renderContextmenu() {

}

//裁剪选中范围
export function renderScreenShotCut() {
    let bgDom = document.createElement("img")
    bgDom.className = "wxx-screen-shot__cut"
    bgDom.src = `${screenShotDataSet.imageUrl}`
    return bgDom
}

//退出截图
export function renderExitScreenShot() {
    let dom = document.createElement("div")
    dom.id = "toolbar-exit"
    dom.className = "wxx-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-chacha"></span>`
    tooltip(dom, {
        content: "退出",
        placement: "right"
    })
    return dom
}

//截图成功
export function renderSuccessScreenShot() {
    let dom = document.createElement("div")
    dom.id = "toolbar-success"
    dom.className = "wxx-toolbar-content__item"
    dom.innerHTML = `<span class="iconfont icon-duigou"></span>`
    tooltip(dom, {
        content: "完成",
        placement: "right"
    })
    return dom
}