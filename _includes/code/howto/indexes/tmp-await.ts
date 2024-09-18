
const sleep = async(waitTime: number) =>
 new Promise(resolve => setTimeout(resolve, waitTime));

function fast01(){
 console.log("Start fast01")
 console.log("End fast01")
 return true
}

async function slow01(){
 console.log("Start slow01")
 await sleep(3000)
 console.log("End slow01")
 return true
}

async function fast02(){
 console.log("Start fast02")
 await sleep(1000)
 console.log("End fast02")
 return true
}


async function main(){

 await slow01()
 fast02()
 fast01()
}

main()