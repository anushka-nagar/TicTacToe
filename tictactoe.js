let indexmap = {"box1" : {i: 0,j: 0}, "box2" : {i: 0,j: 1}, "box3" : {i: 0,j: 2}, "box4" : {i: 1,j: 0}, "box5" : {i: 1,j: 1}, "box6" : {i: 1,j: 2}, "box7" : {i: 2,j: 0}, "box8" : {i: 2,j: 1}, "box9" : {i: 2,j: 2}};
let boxmap = {0 : {0 : "box1", 1 : "box2", 2 : "box3"}, 1 : {0 : "box4", 1 : "box5", 2 : "box6"}, 2 : {0 : "box7", 1 : "box8", 2 : "box9"}};
let ttt = [];
for(let i=0; i<3; i++){
    ttt[i] = [0,0,0];
}
let turn = 0;
let available = [];
let flag = 0;

function play(ele){ 
    turn++;
    let eleid = ele.id;
    let indobj = indexmap[eleid];
    ele.innerHTML = "X";
    ele.style.backgroundColor = "azure";
    ttt[indobj.i][indobj.j] = 1;
    ele.setAttribute("onclick", "");
    let winner = checkWinner(ttt, turn);
    if(winner == 'Tie'){
        document.getElementById("winner").innerHTML = "It's a " + winner;
        $("#result").modal("show");
        gameover();
    }else if(winner){
        document.getElementById("winner").innerHTML = winner + " is the Winner!!";
        $("#result").modal("show");
        gameover();
    }
    flag = Math.floor(Math.random()*10);
    if(flag > 5){
        aibot();
        flag = 1;
    }else{
        randombot();
        flag = 0;
    }
    
}

function aibot(){
    turn++;
    let bestscore = -Infinity;
    let x, y;
    for(let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
            if(ttt[i][j] == 0){
                ttt[i][j] = 2;
                let score = minimax(ttt, turn, false);
                ttt[i][j] = 0;
                console.log(score + " " + bestscore);
                if(score > bestscore){
                    bestscore = score;
                    x = i;
                    y = j;
                }
            }
        }
    }
    
    ttt[x][y] = 2;
    let tempi = boxmap[x];
    let box = tempi[y];
    console.log(box);
    let ele = document.getElementById(box);
    ele.innerHTML = "O";
    ele.style.backgroundColor = "azure";
    ele.setAttribute("onclick", "");
    let winner = checkWinner(ttt, turn);
    if(winner){
        document.getElementById("winner").innerHTML = winner + " is the Winner!!";
        $("#result").modal("show");
        gameover();
    }
}

let scores = {
    'X' : -10,
    'O' : 10,
    'Tie': 0, 
}

function minimax(board, depth, isMaximising){
    let result = checkWinner(board, depth);
    if(result !== null){
        //console.log(scores[result]);
        return scores[result];
    }

    if(isMaximising){
        let bestscore = -Infinity;
        for(let i = 0; i<3; i++){
            for(let j = 0; j<3; j++){
                if(board[i][j] == 0){
                    board[i][j] = 2;
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = 0;
                    if(score > bestscore){
                        bestscore = score;
                    }
                }
            }
        }
        return bestscore;
    }else{
        let bestscore = Infinity;
        for(let i = 0; i<3; i++){
            for(let j = 0; j<3; j++){
                if(board[i][j] == 0){
                    board[i][j] = 1;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = 0;
                    if(score < bestscore){
                        bestscore = score;
                    }
                }
            }
        }
        return bestscore;
    }
}

function randombot(){
    turn++;
    available = [];
    for(let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
            if(ttt[i][j] == ""){
                available.push({i,j});
            }
        }
    }

    let comp = available[Math.floor(Math.random()*available.length)];
    let tempi  = boxmap[comp["i"]];
    let box = tempi[comp["j"]];
    ttt[comp["i"]][comp["j"]] = 2;
    let ele = document.getElementById(box);
    ele.innerHTML = "O";
    ele.style.backgroundColor = "azure";
    ele.setAttribute("onclick", "");
    let winner = checkWinner(ttt, turn);
    if(winner == 'Tie'){
        document.getElementById("winner").innerHTML = "It's a " + winner;
        $("#result").modal("show");
        gameover();
    }else if(winner){
        document.getElementById("winner").innerHTML = winner + " is the Winner!!";
        $("#result").modal("show");
        gameover();
    }
}

function checkWinner(bboard, turn){
    let x = 0, y= 0, one = 0, two = 0, winx = 0, wino = 0;
    for(x=0; x<3; x++){
        one = 0;
        two = 0;
        for(y=0; y<3; y++){
            if(bboard[x][y] == 1){
                one++;
            }else if(bboard[x][y] == 2){
                two++;
            }
        }
        if(one == 3){
            winx = 1;
            return 'X';
        }else if(two == 3){
            wino = 1;
            return 'O';
        }
    }

    for(y=0; y<3; y++){
        one = 0;
        two = 0;
        for(x=0; x<3; x++){
            if(bboard[x][y] == 1){
                one++;
            }else if(bboard[x][y] == 2){
                two++;
            }
        }
        if(one == 3){
            winx = 1;
            return 'X';
        }else if(two == 3){
            wino = 1;
            return 'O';
        }
    }

    one = 0;
    two = 0;
    for(x=0; x<3;  x++){
        if(bboard[x][x] == 1){
            one++;
        }else if(bboard[x][x] == 2){
            two++;
        }
    }

    if(one == 3){
        winx = 1;
        return 'X';
    }else if(two == 3){
        wino = 1;
        return 'O';
    }

    one = 0;
    two = 0;
    for(x=0; x<3; x++){
        if(bboard[x][2-x] == 1){
            one++;
        }else if(bboard[x][2-x] == 2){
            two++;
        }
    }

    if(one == 3){
        winx = 1;
        return 'X';
    }else if(two == 3){
        wino = 1;
        return 'O';
    }

    if(winx == 0 && wino == 0 && turn == 9){
        return 'Tie';
    }

    return null;
}

function gameover(){
    let spans = document.getElementsByTagName("span");
    for(let i=0; i<spans.length; i++){
        spans[i].setAttribute("onclick", "");
    }
}

function reset(){
    for(let i=0; i<3; i++){
        ttt[i] = [0,0,0];
    }
    turn = 0;
    available = [];
    flag = 0;
    let spans = document.getElementsByTagName("span");
    for(let i=0; i<spans.length; i++){
        spans[i].setAttribute("onclick", "play(this);");
        spans[i].innerHTML = "";
        spans[i].style.backgroundColor = "";
    }
    $("#result").modal("hide");
}

function end(){
    $("#result").modal("hide");
    //will only close parent window 
    window.close();
}

console.log(ttt);