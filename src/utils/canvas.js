/**
 * 画线段
 * @param ctx canvas绘制上下文
 * @param drawData 点的坐标[{x:xx,y:xx},{x:xx,y:xx}]
 **/
export function drawStraightLine(ctx, drawData) {
    ctx.beginPath()
    ctx.moveTo(drawData[0].x, drawData[0].y)
    ctx.lineTo(drawData[1].x, drawData[1].y)
    ctx.stroke()
    ctx.closePath()
}

/**
 * 画曲线
 * @param ctx canvas绘制上下文
 * @param drawData 点的坐标信息
 **/
export function drawCurveLine(ctx, drawData) {
    ctx.beginPath()
    ctx.moveTo(drawData.x1, drawData.y1)
    ctx.quadraticCurveTo(drawData.x2, drawData.y2, drawData.x3, drawData.y3)
    ctx.stroke()
    ctx.closePath()
}

/**
 * 恢复曲线，连续绘制
 * @param ctx canvas绘制上下文
 * @param drawData 点的坐标[{x:xx,y:xx},{x:xx,y:xx}]
 **/
export function drawCurveLineByPoints(ctx, drawData) {
    let nowPoint = null
    let newPoint = null
    if (drawData.length >= 3) {
        ctx.beginPath()
        for (let i = 0; i < drawData.length - 2; i++) {
            newPoint = {
                x: (drawData[i + 1].x + drawData[i + 2].x) / 2,
                y: (drawData[i + 1].y + drawData[i + 2].y) / 2
            }
            if (nowPoint) {
                drawCurveLine(ctx, {
                    x1: nowPoint.x,
                    y1: nowPoint.y,
                    x2: drawData[i + 1].x,
                    y2: drawData[i + 1].y,
                    x3: newPoint.x,
                    y3: newPoint.y
                })
            } else {
                drawCurveLine(ctx, {
                    x1: drawData[i].x,
                    y1: drawData[i].y,
                    x2: drawData[i + 1].x,
                    y2: drawData[i + 1].y,
                    x3: newPoint.x,
                    y3: newPoint.y
                })
            }
            nowPoint = newPoint
        }
        ctx.closePath()
    }
}

/**
 * 插入图片
 * @param ctx canvas绘制上下文
 * @param drawData 点的坐标{x:xx,y:xx,w:xx,h:xx,imageUrl:xxx}
 **/
export async function asyncDrawImage(ctx, drawData) {
    return new Promise(resolve => {
        let {
            x,
            y,
            w,
            h,
            imageUrl
        } = drawData
        let image = new Image()
        image.crossOrigin = "*"
        image.src = imageUrl
        image.onload = () => {
            ctx.drawImage(image, x, y, w, h)
            resolve(image)
        }
    })
}

/**
 * 画菱形
 * @param ctx canvas绘制上下文
 * @param drawData 点的坐标{x1:xx,y1:xx,x2:xx,y2:xx,x3:xx,y3:xx,x4:xx,y4:xx}
 **/
export function drawDiamond(ctx, drawData, isFill) {
    ctx.beginPath()
    let {
        x1,
        y1,
        x2,
        y2,
        x3,
        y3,
        x4,
        y4
    } = drawData
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.lineTo(x3, y3)
    ctx.lineTo(x4, y4)
    ctx.lineTo(x1, y1)
    isFill ? ctx.fill() : ctx.stroke()
}

/** 
 * 画矩形
 * @param ctx canvas绘制上下文
 * @param drawData 绘制信息{x:xx,y:xx,w:xx,h:xx}
 * @param isFill 是否填充
 **/
export function drawRect(ctx, drawData, isFill) {
    ctx.beginPath()
    isFill ? ctx.fillRect(drawData.x, drawData.y, drawData.w, drawData.h) : ctx.strokeRect(drawData.x, drawData.y, drawData.w, drawData.h)
    ctx.closePath()
}

/** 
 * 画圆形
 * @param ctx canvas绘制上下文
 * @param drawData 圆心坐标 {x:xx,y:xx}
 * @param isFill 是否填充
 **/
export function drawCircle(ctx, drawData, isFill) {
    ctx.beginPath()
    ctx.arc(drawData.x, drawData.y, drawData.r, 0, Math.PI * 2, true)
    isFill ? ctx.fill() : ctx.stroke()
    ctx.closePath()
}

/** 
 * 画三角形
 * @param ctx canvas绘制上下文
 * @param drawData 三角形三个点坐标{x1,y1,x2,y2,x3,y3}
 * @param isFill 是否填充
 **/
export function drawTriangle(ctx, drawData, isFill) {
    ctx.beginPath()
    let {
        x1,
        y1,
        x2,
        y2,
        x3,
        y3
    } = drawData
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.lineTo(x3, y3)
    ctx.lineTo(x1, y1)
    isFill ? ctx.fill() : ctx.stroke()
    ctx.closePath()
}


/**
 * 绘制带有箭头的直线
 * @param cavParam canvas画布变量
 * @param fromX/fromY 起点坐标
 * @param toX/toY 终点坐标
 * @param color 线与箭头颜色
 **/
export function drawLineArrow(ctx, drawData) {
    let fromX = drawData[0].x
    let fromY = drawData[0].y
    let toX = drawData[1].x
    let toY = drawData[1].y
    let headlen = 20 //自定义箭头线的长度
    let theta = 40 //自定义箭头线与直线的夹角45°
    let arrowX, arrowY //箭头线终点坐标
    // 计算各角度和对应的箭头终点坐标
    let angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI
    let angle1 = (angle + theta) * Math.PI / 180
    let angle2 = (angle - theta) * Math.PI / 180
    let topX = headlen * Math.cos(angle1)
    let topY = headlen * Math.sin(angle1)
    let botX = headlen * Math.cos(angle2)
    let botY = headlen * Math.sin(angle2)
    ctx.beginPath()
    //画直线
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY)

    arrowX = toX + topX
    arrowY = toY + topY
    //画上边箭头线
    ctx.moveTo(arrowX, arrowY)
    ctx.lineTo(toX, toY)

    arrowX = toX + botX
    arrowY = toY + botY
    //画下边箭头线
    ctx.lineTo(arrowX, arrowY)
    ctx.stroke()
}