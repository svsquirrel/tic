const createPlayer = (name, marker) => {
    return {name, marker};
};

const playObject = (square, marker) =>{
    return {square, marker};
};


/*********Determines what the user sees **********/
function gameboard(){
    const grid = document.querySelectorAll('.item');
        grid.forEach(square => {
        square.addEventListener('click', () => {
            play.getClick(square.id);
        }, {once:true});
        });
    return{ grid };
};
gameboard();
/**********Determines whose turn and if the game is over *******/
const play = (() => {
    let keyArray = [];
    const moves = [];
    const player1 = createPlayer('Me', 'X');
    const player2 = createPlayer('Droid', 'O');
    let activePlayer = player1;
    
    const winningCombos = [
        ['1','2','3'],
        ['4','5','6'],
        ['7','8','9'],
        ['1','4','7'],
        ['3','6','9'],
        ['2','5','8'],
        ['1','5','9'],
        ['3','5','7'],
    ];

    function getClick(square){
        sq = square.slice(5);
        whoseTurn();
        const playermove = playObject(sq, activePlayer.marker);
        console.log(playermove);
        moves.push(playermove);
        isEligible();
        display(playermove.marker, square);
        return {moves};
    };

    function whoseTurn(){
        let count = moves.length;
        if (count % 2 == 0){
            activePlayer = player1;
        }else{
            activePlayer = player2;
        }
       
    };  
    
    function display(marker, square){
         document.querySelector('#'+square)
        .textContent = marker;
    };
   
    function isEligible(){
        playermoves = moves.filter(player => player.marker == activePlayer.marker);
        if (playermoves.length >=3){
        keyArray = playermoves.map(function(item) { return item['square']; });
        checkIfWinner(keyArray, activePlayer);
        }; 
    }; 
    
    function checkIfWinner(){
        winningCombos.forEach(index =>{
            if(index.every(val => keyArray.includes(val)==true)){
                if (activePlayer.name == 'Me'){
                    document.querySelector('.whatsup1').textContent = 'You Won!';
                    console.log(activePlayer.name);
                }else if (activePlayer.name == 'Droid'){
                    document.querySelector('.whatsup2').textContent = 'You Won!';
                    console.log(activePlayer.name);
                };
            let reset =document.querySelector('.reset')
            reset.style.backgroundColor = '#cc0000';
            };
        });
     };

     
    return {
        activePlayer,
        getClick,
        isEligible,
        checkIfWinner,
        whoseTurn,
        moves,
     
};
    
}) ();



  
