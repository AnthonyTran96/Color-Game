window.onload=function(){
    const addColor='addcolor';
    let rgb=document.querySelector('.rgb');
    let play=document.querySelector('.newColor');
    let easy=document.querySelector('.easy');
    let hard=document.querySelector('.hard');
    let tryAgain=document.querySelector('.tryAgain');
    let row1=document.querySelector('.row1');
    let row2=document.querySelector('.row2');
    let createColor=function(){
        let rgb=[0,0,0];
        while(JSON.stringify(rgb)===JSON.stringify([0,0,0])){
            rgb[0]=Math.floor(Math.random()*256);
            rgb[1]=Math.floor(Math.random()*256);
            rgb[2]=Math.floor(Math.random()*256);
        }
        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    }
    let createBlackColor=function(){
        return `rgb(0, 0, 0)`
    }
    let makeRowColor=function(row){
        row.forEach(function(box,index,row){
            let boxColor=createColor();
            while(index){
                for(let i=0;i<index;i++){
                    if (row[i].style.backgroundColor===boxColor) {
                        boxColor=createColor();
                        continue;
                    }
                }
                break;
            }
            box.style.backgroundColor=boxColor;
        });
    }
    let makeBlackRowColor=function(row){
        row.forEach(function(box){
            box.style.backgroundColor=createBlackColor();
        })
    }
    let resetRgb=function(){
        let result=createColor();
        rgb.textContent=result;
    }
    let rowBox1=Array.from(row1.querySelectorAll('.box'));
    let rowBox2=Array.from(row2.querySelectorAll('.box'));
    let addEasyLevel=function(){
        makeRowColor(rowBox1);
        row2.remove();
        easy.classList.add(addColor);
        hard.classList.remove(addColor);
        resetRgb();
    }
    let addHardLevel=function(){
        if (row1.nextSibling!==1) row1.parentNode.appendChild(row2);
        let rowBox=[...rowBox1,...rowBox2];
        makeRowColor(rowBox);
        hard.classList.add(addColor);
        easy.classList.remove(addColor);
        resetRgb();
    }
    let addNewColor=function(){
        resetRgb();
        if (row1.nextSibling!==1) 
    }
    easy.addEventListener('click',addEasyLevel);
    hard.addEventListener('click',addHardLevel);
    play.addEventListener('click',addNewColor);
    resetRgb();
    addHardLevel();
}