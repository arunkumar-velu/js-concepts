const cachedAPI = (cacheTime)=>{
    const cache = {}
    return async (url, config={})=>{
        const key = `${url}${JSON.stringify(config)}`
        const entry = cache[key];
        if(entry && (Date.now() - entry.time) < cacheTime ){
            console.log("entry", cache, Date.now() - entry.time)
            console.log("Cached API")
            return Promise.resolve(cache[key].res)
        }

        try{
            const res = await fetch(url)
            const result = res.json()
            cache[key] = {res: result, time: Date.now()}
            console.log("Fetch API")
            return Promise.resolve(result)
        }
        catch(e){
            console.log(e)
        }
        
    }
}


const call = cachedAPI(1500)
call("https://dummyjson.com/products?limit=10", {}).then((res)=>{ console.log(res)})
setTimeout(()=>{
    console.log("after 1 ")
    call("https://dummyjson.com/products?limit=10", {}).then((res)=>{ console.log(res)})
}, 1000)