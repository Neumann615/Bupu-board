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

let flag = 0
let dom = document.getElementById("app")

if (flag) {
    initScreenShot(dom, {
        imageUrl: "http://192.168.31.6:5173/test.png",
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
} else {
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

