let whiteBoardDataSet = {
    colorList: ["#007FFF", "#00B042", "#FF5219", "#FF9200", "#999"],
    addCanvasHistoryHandler: null,
    uploadFileHandler: null,
    uploadImageHandler: null,
}

let screenShotDataSet = {
    colorList: ["#007FFF", "#00B042", "#FF5219", "#FF9200", "#999"],
    imageUrl: "",
    successHandler: null,
    exitHandler: null,
    toolbarPosition: "left"
}

let nowModule = "whiteboard"

//更新白板变量
export function updateWhiteBoardVar(object) {
    for (let key in object) {
        whiteBoardDataSet[key] = object[key]
    }
    nowModule = "whiteboard"
}

//更新截屏变量
export function updateScreenShotVar(object) {
    for (let key in object) {
        screenShotDataSet[key] = object[key]
    }
    nowModule = "screenshot"
}

export {
    whiteBoardDataSet,
    screenShotDataSet,
    nowModule
}