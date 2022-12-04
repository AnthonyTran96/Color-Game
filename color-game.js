window.onload=function(){
    let result;
    const addColor='addcolor';
    let RBGColor=document.querySelector('.RBGColor');
    let rgb=document.querySelector('.rgb');
    let newColor=document.querySelector('.newColor');
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
    let resetRgb=function(){
        result=createColor();
        rgb.textContent=result;
        newColor.textContent='new color';
        tryAgain.textContent='';
        RBGColor.style.backgroundColor='#2C8E99';
    }
    let rowBox1=Array.from(row1.querySelectorAll('.box'));
    let rowBox2=Array.from(row2.querySelectorAll('.box'));
    let addResult=function(rowBox){
        let resultNumber=Math.floor(Math.random()*rowBox.length);
        rowBox[resultNumber].style.backgroundColor=result;
    }
    let addEasyLevel=function(){
        resetRgb();
        makeRowColor(rowBox1);
        addResult(rowBox1);
        row2.remove();
        easy.classList.add(addColor);
        hard.classList.remove(addColor);
        return rowBox1;
    }
    let addHardLevel=function(){
        resetRgb();
        row1.parentNode.appendChild(row2);
        let rowBox=[...rowBox1,...rowBox2];
        makeRowColor(rowBox);
        addResult(rowBox);
        hard.classList.add(addColor);
        easy.classList.remove(addColor);
        return rowBox;
    }
    let addNewColor=function(){
        resetRgb();
        let rowBox=[...rowBox1,...rowBox2];
        makeRowColor(rowBox);
        addResult(rowBox);
        return rowBox;
    }
    let makeBlackBox=function(box){
        box.style.backgroundColor='rgb(0,0,0)';
    }
    let play=function(event){
        let box=event.target;
        if(box.style.backgroundColor!==result){
            makeBlackBox(box);
            tryAgain.textContent='Try Again';
            return;
        }
        tryAgain.textContent='Correct';
        newColor.textContent='Play Again';
        rowBox.forEach(function(box){
            box.style.backgroundColor=result;
        })
        RBGColor.style.backgroundColor=result;
    };
    easy.addEventListener('click',addEasyLevel);
    hard.addEventListener('click',addHardLevel);
    newColor.addEventListener('click',addNewColor);
    let rowBox=addHardLevel();
    rowBox.forEach(function(box,index,rowBox){
        box.addEventListener('click',play);
    })

}