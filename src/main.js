import {
    initScreenShot,
    initWhiteBoard,
    unmountWhiteBoard,
    unmountScreenShot
} from "./index"
import "./styles/style.css"
import "./styles/popover.css"
import "./styles/tooltip.css"
import "./styles/common.css"
import "./assets/iconfont/iconfont.css"


let dom = document.getElementById("app")

function getUrlParams() {
    const paramString = window.location.search.substr(1); // 移除查询字符串开始的问号
    const paramArray = paramString.split('&'); // 将字符串分割成键值对数组
    const params = {};
    for (let i = 0; i < paramArray.length; i++) {
        const pair = paramArray[i].split('='); // 分割键和值
        if (pair.length === 2) { // 确保键值对正确分割
            const key = decodeURIComponent(pair[0]);
            const value = decodeURIComponent(pair[1]);
            params[key] = value;
        }
    }
    return params;
}

let mode = getUrlParams()["mode"] || "screenshot"

if (mode === "screenshot") {
    initScreenShot(dom, {
        imageUrl: "test.png",
        toolbarPosition: "bottom",
        successHandler: (v) => {
            console.log("成功的回调用", v)
        },
        exitHandler: () => {
            console.log("失败的回调")
        }
    })
    // setTimeout(unmountScreenShot,3000)
    // setTimeout(()=>{
    //     initScreenShot(dom, {
    //         imageUrl: "http://192.168.1.5:5173/test.png",
    //         toolbarPosition: "bottom",
    //         successHandler: (v) => {
    //             console.log("成功的回调用", v)
    //         },
    //         exitHandler:()=>{
    //             console.log("失败的回调")
    //         }
    //     })
    // },5000)
} else if (mode === "whiteboard") {
    initWhiteBoard(dom, {
        addCanvasHistoryHandler: (v) => {
            console.log(v)
            // let obj = {
            //     cid: Date.now(),
            //     type: "NOTICE",
            //     conversationType: conversationType,
            //     toId: toId,
            //     content: v
            // }
            // ws.value.webSocketSendMessage(obj)
        }
    })
}

