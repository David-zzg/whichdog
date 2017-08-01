import sha1 from "./sha1"
export function loadScript(url,callback) {
    var script = document.createElement('script')
    script.src = url
    script.onload = callback
    document.body.appendChild(script)
}

export function createWXParams(addpid,jsapi_ticket) {
    var timestamp = Math.floor(Date.now()/1000)
    var nonceStr = 'petzman'
    var arr = []
    arr.push(`jsapi_ticket=${jsapi_ticket}`)
    arr.push(`noncestr=${nonceStr}`)
    arr.push(`timestamp=${timestamp}`)
    arr.push(`url=${window.location.toString().replace(/#.*$/,'')}`)
    var value = arr.join('&')
    console.log(sha1(value))
}