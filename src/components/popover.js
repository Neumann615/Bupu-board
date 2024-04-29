import {domAppendChild, initPosition, nowModule, screenShotDataSet} from "../utils/index";

let isPopover = false

export function popover(dom, params) {
    let {placement, content} = params
    let popoverDom = document.createElement("div")
    popoverDom.className = "bupu-popover"
    let arrowDom = document.createElement("span")
    arrowDom.className = "bupu-popover-arrow"
    let contentDom = document.createElement("div")
    contentDom.className = "bupu-popover-content"
    contentDom.appendChild(content)
    domAppendChild(popoverDom, [arrowDom, contentDom])
    dom.addEventListener("click", (e) => {
        let rect = dom.getBoundingClientRect()
        document.body.appendChild(popoverDom)
        arrowDom.style = null
        if (nowModule === "whiteboard") {
            popoverDom.style.left = rect.x + rect.width + 20 + "px"
            popoverDom.style.top = rect.y + (rect.height - popoverDom.clientHeight) / 2 + "px"
            arrowDom.style.left = "-5px"
        } else if (nowModule === "screenshot") {
            if (screenShotDataSet.toolbarPosition === "left" || screenShotDataSet.toolbarPosition === "right") {
                popoverDom.style.top = rect.y + (rect.height - popoverDom.clientHeight) / 2 + "px"
                arrowDom.style.top = popoverDom.clientHeight / 2 - 5 + "px"
                if (rect.x + rect.width + 20 + popoverDom.clientWidth > document.body.clientWidth) {
                    popoverDom.style.left = rect.x - 20 - popoverDom.clientWidth + "px"
                    arrowDom.style.right = "-5px"
                } else {
                    popoverDom.style.left = rect.x + rect.width + 20 + "px"
                    arrowDom.style.left = "-5px"
                }
            } else if (screenShotDataSet.toolbarPosition === "top" || screenShotDataSet.toolbarPosition === "bottom") {
                popoverDom.style.left = rect.x + (rect.width - popoverDom.clientWidth) / 2 + "px"
                arrowDom.style.left = popoverDom.clientWidth / 2 - 5 + "px"
                if (rect.y + rect.height + 20 + popoverDom.clientHeight > document.body.clientHeight) {
                    popoverDom.style.top = rect.y - 20 - popoverDom.clientHeight + "px"
                    arrowDom.style.bottom = "-5px"
                } else {
                    popoverDom.style.top = rect.y + rect.height + 20 + "px"
                    arrowDom.style.top = "-5px"
                }
            }
        }
        setTimeout(() => {
            isPopover = true
        }, 200)
    })
}

document.body.addEventListener("mousedown", (e) => {
    if (isPopover) {
        let isRemove = true
        e.composedPath()?.forEach(item => {
            item.classList && item.classList.length && item.classList.forEach(className => {
                if (className == "bupu-popover") {
                    isRemove = false
                }
            })
        })
        if (isRemove) {
            let popoverList = document.getElementsByClassName("bupu-popover")
            if (popoverList && popoverList.length) {
                document.body.removeChild(popoverList[0])
                isPopover = false
            }
        }
    }
})

document.body.addEventListener("touchstart",(e)=>{
    if (isPopover) {
        let isRemove = true
        e.composedPath()?.forEach(item => {
            item.classList && item.classList.length && item.classList.forEach(className => {
                if (className == "bupu-popover") {
                    isRemove = false
                }
            })
        })
        if (isRemove) {
            let popoverList = document.getElementsByClassName("bupu-popover")
            if (popoverList && popoverList.length) {
                document.body.removeChild(popoverList[0])
                isPopover = false
            }
        }
    }
})