document.addEventListener("DOMContentLoaded",()=>{
    const form = document.querySelector(".modern-form");
    form.addEventListener("submit",(event)=>{
        const name = document.getElementById("name").value.trim();
        const instrument = document.getElementById("instrument").value.trim();
        const file = document.getElementById("file").files[0];

        if (!name){
            alert("Please enter name");
            event.preventDefault();
            return;
        }

        if (!instrument){
            alert("Please enter instrument");            
            event.preventDefault();
            return;
        }

        if(!file){
            alert("Please upload the file");
            event.preventDefault();
            return;
        }

        const allowedType = 'audio/mpeg';
        if(file.type != allowedType){
            alert("The audio file type is not supported");
            event.preventDefault();
            return;
        }
    });
});
