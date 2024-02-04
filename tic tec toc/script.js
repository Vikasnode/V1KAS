let boxs = document.getElementsByClassName('box');
let Winner = document.getElementById('winner');
let clickMusic = new Audio('click.mp3');
let btn = document.getElementById('btn');



// Check Win logic
checkWin = () => {
    let possibility = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i of possibility) {
        if ((boxs[i[0]].value == boxs[i[1]].value) && (boxs[i[1]].value == boxs[i[2]].value) && (boxs[i[0]].value !== '')) {
            Winner.innerText = boxs[i[0]].value
            boxs[i[0]].style.background = 'Red'
            boxs[i[1]].style.background = 'Red'
            boxs[i[2]].style.background = 'Red'
        }

    }
}

let turn = true;
let mouseLeaveOff = true;
Array.from(boxs).forEach((box) => {
    box.addEventListener('click', () => {
        console.log('click')
        mouseLeaveOff = false;
        if (turn) {
            box.value = 'X';
            turn = false;
            clickMusic.play();
            checkWin()
            box.disabled = true;
        }
        else if (!turn) {
            box.value = 'O'
            turn = true;
            clickMusic.play();
            checkWin()
            box.disabled = true;
        }
    });
    box.addEventListener('mouseenter', () => {
        console.log('Enter')
        mouseLeaveOff = true;
        if (turn && box.value == "") {
            box.value = 'X';
        }
        else if (!turn && box.value == "") {
            box.value = 'O'
        }
    });
    box.addEventListener('mouseleave', () => {
        if (mouseLeaveOff && !box.disabled) {
            console.log('Leave')
            console.log(mouseLeaveOff)
            box.value = '';
        }
    });
});


//Reset Button
btn.addEventListener('click',()=>{
    Array.from(boxs).forEach((box)=>{
        box.value = '';
        box.removeAttribute('disabled')
        box.style.background  = 'none';
    })
    Winner.innerText = "";
    turn = true;

})