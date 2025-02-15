
async function getData() {
    const url = "https://stalewall.spacefell.workers.dev?res=2560x1440";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const backgoundUrl = await response.json();
        console.log(backgoundUrl.url);
        try{
            const imgResponse = await fetch(backgoundUrl.url);
            if (!imgResponse.ok) {
                throw new Error(`Response status: ${imgResponse.status}`);
            }
            const imgBlob = await imgResponse.blob();
            const reader = new FileReader();

            reader.onload = (event) => {
                localStorage.setItem("background", event.target.result);
                document.body.style.background = "url(" + event.target.result + ")"; 
            }

            reader.readAsDataURL(imgBlob);
        }
        catch(error2){
            console.error(error2.message);  
        }
        document.body.style.backgroundSize = "cover";
        document.body.style.display = "inline";

    } catch (error) {
        console.error(error.message);
    }
}

if(localStorage.getItem("background") === null){
    getData();
}else{
    const cookieUrl = localStorage.getItem("background");
    document.body.style.background = "url(" + cookieUrl + ")";
    document.body.style.backgroundSize = "cover";
    document.body.style.display = "inline";
}
