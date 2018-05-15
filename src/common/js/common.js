//获取页面高度
function pageHeight(dom){
    const inHeight = window.screen.height
    let content = document.querySelector(dom)
    content.style.minHeight = inHeight + 'px'
}

//时间戳转日期
function timestamp(time){
    
    let i = time + ''
    if(i.length != 10){
        return time;
    }
    let date = new Date(time * 1000);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + '  ';
    let h = date.getHours() + ':';
    let m = date.getMinutes();
    if(m < 10){
        m = "0" + m  + ':'
    }else{
        m = m  + ':'
    }
    let s = date.getSeconds(); 
    if(s < 10){
        s = "0" + s
    }
    return Y+M+D+h+m+s
}

export {
    pageHeight,
    timestamp,
}