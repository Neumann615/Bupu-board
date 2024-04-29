//选择绘制区域
import {
    containerDom,
    screenShotBackgroundDom,
    screenShotCutDom,
    screenShotOverlayDom,
    screenShotSelectRangeDom,
    screenShotToolbarDom
} from "./core"
import {
    getPos,
    getRectAreaData,
    isInRectArea,
    preventDefaultEvents,
    screenShotDataSet
} from "/src/utils/index"

let canvas = null
let ctx = null
let temporaryCanvas = null
let temporaryCtx = null
export let screenShotPosition = null

//重置截图数据
export function resetScreenShotData() {
    canvas = null
    ctx = null
    temporaryCanvas = null
    temporaryCtx = null
    screenShotPosition = null
}

//绘制选中框
function drawSelect(x1, y1, x2, y2) {
    let rect = getRectAreaData(x1, y1, x2, y2)
    screenShotSelectRangeDom.style.left = rect.x1 + "px"
    screenShotSelectRangeDom.style.top = rect.y1 + "px"
    screenShotSelectRangeDom.style.width = Math.abs(rect.x1 - rect.x2) + "px"
    screenShotSelectRangeDom.style.height = Math.abs(rect.y1 - rect.y3) + "px"
    //裁剪图片
    screenShotCutDom.style.left = -rect.x1 + "px"
    screenShotCutDom.style.top = -rect.y1 + "px"
}

//清除选中状态
export function clearSelect() {
    screenShotSelectRangeDom.style.left = -1000 + "px"
    screenShotSelectRangeDom.style.top = -1000 + "px"
}

//显示背景色
export function showBackground() {
    screenShotBackgroundDom.style.opacity = "0.6"
}

//隐藏背景色
function hideBackground() {
    screenShotBackgroundDom.style.opacity = "1"
}

//定位工具栏
function positionScreenShotToolbar(flag) {
    //显示
    if (flag) {
        screenShotToolbarDom.style.visibility = "visible"
        let {
            toolbarPosition
        } = screenShotDataSet
        let {
            x1,
            y1,
            x3,
            y3
        } = screenShotPosition
        let toolbarWidth = screenShotToolbarDom.clientWidth
        let toolbarHeight = screenShotToolbarDom.clientHeight
        let containerWidth = containerDom.clientWidth
        let containerHeight = containerDom.clientHeight
        if (toolbarPosition === "left") {
            //宽度
            if (x1 - toolbarWidth >= 0) {
                screenShotToolbarDom.style.left = x1 - toolbarWidth - 5 + "px"
            } else if (x3 + toolbarWidth <= containerWidth) {
                screenShotToolbarDom.style.left = x3 + 5 + "px"
            } else {

                screenShotToolbarDom.style.left = x1 + 5 + "px"
            }
            //高度
            if (y1 + toolbarHeight > containerHeight) {
                screenShotToolbarDom.style.top = containerHeight - toolbarHeight + "px"
            } else {
                screenShotToolbarDom.style.top = y1 + "px"
            }
        } else if (toolbarPosition === "right") {
            //宽度
            if (x3 + toolbarWidth <= containerWidth) {
                screenShotToolbarDom.style.left = x3 + 5 + "px"
            } else if (x1 - toolbarWidth >= 0) {
                screenShotToolbarDom.style.left = x1 - toolbarWidth - 5 + "px"
            } else {
                screenShotToolbarDom.style.left = x3 - toolbarWidth - 5 + "px"
            }
            //高度
            if (y1 + toolbarHeight > containerHeight) {
                screenShotToolbarDom.style.top = containerHeight - toolbarHeight + "px"
            } else {
                screenShotToolbarDom.style.top = y1 + "px"
            }
        } else if (toolbarPosition === "top") {
            //高度
            if (y1 >= toolbarHeight) {
                screenShotToolbarDom.style.top = y1 - toolbarHeight - 5 + "px"
            } else if (y3 + toolbarHeight <= containerHeight) {
                screenShotToolbarDom.style.top = y3 + 5 + "px"
            } else {
                screenShotToolbarDom.style.top = y1 + 5 + "px"
            }
            //宽度
            if (x3 - toolbarWidth < 0) {
                screenShotToolbarDom.style.left = 0 + "px"
            } else {
                screenShotToolbarDom.style.left = x3 - toolbarWidth + "px"
            }

        } else if (toolbarPosition === "bottom") {
            //高度
            if (y3 + toolbarHeight <= containerHeight) {
                screenShotToolbarDom.style.top = y3 + 5 + "px"
            } else if (y1 >= toolbarHeight) {
                screenShotToolbarDom.style.top = y1 - toolbarHeight - 5 + "px"
            } else {
                screenShotToolbarDom.style.top = y3 - toolbarHeight - 5 + "px"
            }
            //宽度
            if (x3 - toolbarWidth < 0) {
                screenShotToolbarDom.style.left = 0 + "px"
            } else {
                screenShotToolbarDom.style.left = x3 - toolbarWidth + "px"
            }
        }
    }
    //隐藏
    else {
        screenShotToolbarDom.style.visibility = "hidden"
    }
}

//获取画板对象的数据
export function getScreenShotCanvasObject(canvas1, temporaryCanvas1) {
    canvas = canvas1
    temporaryCanvas = temporaryCanvas1
    ctx = canvas1.getContext("2d")
    temporaryCtx = temporaryCanvas1.getContext("2d")
}

export function resetSelect() {
    screenShotPosition = null
    temporaryCanvas.style.zIndex = "-1"
    screenShotOverlayDom.style.zIndex = "50"
    screenShotOverlayDom.style.cursor = "crosshair"
    positionScreenShotToolbar(false)
    clearSelect()
    hideBackground()
}

//初始化选中需要编辑的边框
export function selectDrawRect() {
    temporaryCanvas.style.zIndex = "-1"
    screenShotOverlayDom.style.zIndex = "50"
    screenShotOverlayDom.style.cursor = "crosshair"
    positionScreenShotToolbar(false)
    let mousePress = false
    let first = null
    let last = null
    let spaceX = null
    let spaceY = null
    let isStretch = false
    let nowType = null

    function begin(event) {
        if (event) {
            positionScreenShotToolbar(false)
            let xy = getPos(event)
            if (screenShotPosition) {
                if (isInRectArea(screenShotPosition.x1, screenShotPosition.y1, screenShotPosition.x3, screenShotPosition.y3, xy.x, xy.y) && !(event.srcElement.className.indexOf("select-range-block") !== -1 || event.srcElement.className.indexOf("select-range-border") !== -1)) {
                    nowType = "move"
                    isStretch = false
                } else if (event.srcElement.className.indexOf("select-range-block") !== -1 || event.srcElement.className.indexOf("select-range-border") !== -1) {
                    nowType = "stretch"
                    isStretch = event.srcElement.className.split("__")[1]
                } else {
                    nowType = "draw"
                    screenShotPosition = null
                    clearSelect()
                    showBackground()
                }
            } else {
                nowType = "draw"
                screenShotPosition = null
                clearSelect()
                showBackground()
            }
            mousePress = true
            first = xy
            setTimeout(() => {
                screenShotOverlayDom.onmousemove = move
            }, 0)
        }
        preventDefaultEvents(event)
    }

    function move(event) {
        if (mousePress && first) {
            positionScreenShotToolbar(false)
            if (nowType === "draw") {
                if (event.srcElement.className === "wxx-overlay") {
                    last = getPos(event)
                    //drawSelect(first.x, first.y, last.x, last.y)
                    // console.log(Math.abs((first.x - last.x) * (first.y - last.y)), first, last, first.x - last.x, first.y - last.y)
                    if (Math.abs((first.x - last.x) * (first.y - last.y)) > 600) {
                        drawSelect(first.x, first.y, last.x, last.y)
                    }
                }
            } else if (nowType === "move") {
                let {
                    x1,
                    y1,
                    x3,
                    y3
                } = screenShotPosition
                last = getPos(event)
                spaceX = last.x - first.x
                spaceY = last.y - first.y
                //修正坐标  防止移出去
                if (x1 + spaceX - 5 <= 0) {
                    spaceX = 5 - x1
                }
                if (y1 + spaceY - 5 <= 0) {
                    spaceY = 5 - y1
                }
                if (x3 + spaceX + 5 >= containerDom.clientWidth) {
                    spaceX = containerDom.clientWidth - x3 - 5
                }
                if (y3 + spaceY + 5 >= containerDom.clientHeight) {
                    spaceY = containerDom.clientHeight - y3 - 5
                }
                drawSelect(x1 + spaceX, y1 + spaceY, x3 + spaceX, y3 + spaceY)
            } else if (nowType === "stretch") {
                if (event.srcElement.className.indexOf("select-range-block") === -1 && event.srcElement.className.indexOf("select-range-border") === -1) {
                    let {
                        x1,
                        y1,
                        x3,
                        y3
                    } = screenShotPosition
                    last = getPos(event)
                    switch (isStretch) {
                        case "left":
                            drawSelect(last.x, y1, x3, y3)
                            screenShotPosition.x1 = last.x
                            break
                        case "right":
                            drawSelect(x1, y1, last.x, y3)
                            screenShotPosition.x3 = last.x
                            break
                        case "top":
                            drawSelect(x1, last.y, x3, y3)
                            screenShotPosition.y1 = last.y
                            break
                        case "bottom":
                            drawSelect(x1, y1, x3, last.y)
                            screenShotPosition.y3 = last.y
                            break
                        case "leftTop":
                            drawSelect(last.x, last.y, x3, y3)
                            screenShotPosition.x1 = last.x
                            screenShotPosition.y1 = last.y
                            break
                        case "leftBottom":
                            drawSelect(last.x, y1, x3, last.y)
                            screenShotPosition.x1 = last.x
                            screenShotPosition.y3 = last.y
                            break
                        case "rightTop":
                            drawSelect(x1, last.y, last.x, y3)
                            screenShotPosition.y1 = last.y
                            screenShotPosition.x3 = last.x
                            break
                        case "rightBottom":
                            drawSelect(x1, y1, last.x, last.y)
                            screenShotPosition.x3 = last.x
                            screenShotPosition.y3 = last.y
                            break
                    }
                }
            }
        }
    }

    function end() {
        mousePress = false
        if (!last || Math.abs((first.x - last.x) * (first.y - last.y)) < 600) {
            if (first && !screenShotPosition) {
                hideBackground()
                positionScreenShotToolbar(false)
            }
            return
        }
        if (nowType == "draw") {
            screenShotPosition = getRectAreaData(first.x, first.y, last.x, last.y)
        } else if (nowType == "move") {
            let {
                x1,
                y1,
                x3,
                y3
            } = screenShotPosition
            screenShotPosition = getRectAreaData(x1 + spaceX, y1 + spaceY, x3 + spaceX, y3 + spaceY)
        } else if (nowType == "stretch") {
            let {
                x1,
                y1,
                x3,
                y3
            } = screenShotPosition
            screenShotPosition = getRectAreaData(x1, y1, x3, y3)
        }
        positionScreenShotToolbar(true)
        screenShotOverlayDom.onmousemove = null
        last = null
        first = null
        spaceX = null
        spaceY = null
        nowType = null
        isStretch = false
    }

    screenShotOverlayDom.onmousedown = begin
    screenShotOverlayDom.onmouseup = end
    window.onmouseup = end
}