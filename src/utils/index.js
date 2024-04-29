export * from "./canvas"
export * from "./var"

//将文件对象转化为url
export function fileToUrl(file) {
    let url = null
    if (window.createObjectURL) {
        url = window.createObjectURL(file)
    } else if (window.URL) {
        url = window.URL.createObjectURL(file)
    } else if (window.webkitURL) {
        url = window.webkitURL.createObjectURL(file)
    }
    return url
}

//将文件对象转化为base64流
export function fileToBase64(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    return new Promise((resolve, reject) => {
        reader.onload = function (e) {
            if (this.result) {
                resolve(this.result)
            } else {
                reject("读取失败")
            }
        }
    })
}

//批量插入子节点
export function domAppendChild(dom, domList) {
    domList.forEach(childDom => {
        dom.appendChild(childDom)
    })
    return dom
}

//获取鼠标点击或者触摸的位置坐标
export function getPos(event) {
    let isTouch = event.type.indexOf("touch") >= 0
    let x = isTouch ? event.touches[0].pageX : event.offsetX + event.target.offsetLeft
    let y = isTouch ? event.touches[0].pageY : (event.offsetY + event.target.offsetTop)
    return {
        x,
        y
    }
}

//计算两个点之间矩形四点区域坐标
export function getRectAreaData(x1, y1, x2, y2) {
    //防止在同一条线段上的情况 偏差修正
    if (x1 == x2) {
        x1 = x1 + 5
        x2 = x2 - 5
    }
    if (y1 == y2) {
        y1 = y1 + 5
        y2 = y2 - 5
    }
    let result = {
        w: Math.abs(x1 - x2),
        h: Math.abs(y1 - y2),
        area: Math.abs((x1 - x2) * (y1 - y2))
    }
    //方位判断
    //左上角
    if (x1 > x2 && y1 > y2) {
        Object.assign(result, {
            x1: x2,
            y1: y2,
            x2: x1,
            y2: y2,
            x3: x1,
            y3: y1,
            x4: x2,
            y4: y1
        })
    }

    //左下角
    else if (x1 > x2 && y1 < y2) {
        Object.assign(result, {
            x1: x2,
            y1: y1,
            x2: x1,
            y2: y1,
            x3: x1,
            y3: y2,
            x4: x2,
            y4: y2
        })
    }
    //右上角
    else if (x1 < x2 && y1 > y2) {
        Object.assign(result, {
            x1: x1,
            y1: y2,
            x2: x2,
            y2: y2,
            x3: x2,
            y3: y1,
            x4: x1,
            y4: y1
        })
    }
    //右下角
    else if (x1 < x2 && y1 < y2) {
        Object.assign(result, {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y1,
            x3: x2,
            y3: y2,
            x4: x1,
            y4: y2
        })
    }
    for (let key in result) {
        result[key] = Math.floor(result[key])
    }
    return result
}

//计算一群点当中囊括的矩形四点区域坐标
export function getPointsAreaData(pointsList) {
    if (!pointsList.length) return
    let _pointsList = JSON.parse(JSON.stringify(pointsList))
    _pointsList.sort((a, b) => {
        return a.x - b.x
    })
    let xPoint1 = _pointsList[0]
    let xPoint2 = _pointsList[_pointsList.length - 1]
    _pointsList.sort((a, b) => {
        return a.y - b.y
    })
    let yPoint1 = _pointsList[0]
    let yPoint2 = _pointsList[_pointsList.length - 1]
    let result = {
        x1: xPoint1.x,
        x2: xPoint2.x,
        x3: xPoint2.x,
        x4: xPoint1.x,
        y1: yPoint1.y,
        y2: yPoint1.y,
        y3: yPoint2.y,
        y4: yPoint2.y,
        w: Math.abs(xPoint1.x - xPoint2.x),
        h: Math.abs(yPoint1.y - yPoint2.y),
        area: Math.abs((xPoint1.x - xPoint2.x) * (yPoint1.y - yPoint2.y))
    }
    for (let key in result) {
        result[key] = Math.floor(result[key])
    }
    return result
}

//切换选中
export function changeIsSelected(domList, selectDom) {
    for (let i = 0; i < domList.length; i++) {
        domList[i].classList.remove("is-selected")
    }
    selectDom.classList.add("is-selected")
}

//根据一个坐标和两个对角线坐标判断该点是否在该矩形区域中
export function isInRectArea(x1, y1, x2, y2, x, y) {
    return ((x >= x1 && x <= x2) && (y >= y1 && y <= y2)) || ((x >= x2 && x <= x1) && (y >= y1 && y <= y2)) || ((x >= x2 && x <= x1) && (y >= y2 && y <= y1)) || ((x >= x1 && x <= x2) && (y >= y2 && y <= y1))
}

//为一个对象循环添加属性
export function setObjAttributes(obj, options) {
    if (!obj || !options) return
    for (let key in options) {
        obj[key] = options[key]
    }
}

//初始化位置信息
export function initPosition(dom) {
    dom.style.left = "0px"
    dom.style.right = "0px"
    dom.style.top = "0px"
    dom.style.bottom = "0px"
}

//判断是否为移动端
//判断是否在真移动设备中
export function isMobile() {
    return /(iPhone|iPad|iPod|iOS|Android|Linux armv8l|Linux armv7l|Linux aarch64)/i.test(navigator.platform);
}

//阻止默认事件
export function preventDefaultEvents(e) {
    e.stopPropagation && e.stopPropagation()
    e.preventDefault && e.preventDefault()
    return false
}