function startGame(){
    let maximum = prompt("최대값을 지정해주세요")
    let randomNumber = Math.floor(Math.random() * maximum) + 1;
    // 1~100 까지 숫자 입력 
    // Math.floor(버림)을 뜻함
    // Math.ceil (올림) / Math.round(반올림)

    console.log("랜덤 정수 : " + randomNumber);
    let inputNumber = prompt("1에서 "+maximum+"까지의 숫자를 입력해주세요!");
    let attempts = 1;

    while (parseInt(inputNumber) !== randomNumber) {
        if (inputNumber === 'q') break
        attempts++
        if(inputNumber < randomNumber) {
            inputNumber = prompt("지정 값보다 작습니다. 큰 값을 입력해주세요.")
        } else if (inputNumber > randomNumber) {
            inputNumber = prompt("지정 값보다 큽니다. 작은 값을 입력해주세요.") 
        }
    }

    if(inputNumber === 'q' ){
        alert("게임을 종료합니다. 안녕히 가세요-!");
        document.getElementById('result').innerText = " 정답은 " + randomNumber + " 입니다.";
    }else {
        if (inputNumber == randomNumber ){
            alert(`정답입니다. ${attempts} 번 만에 성공하였습니다.`);
            document.getElementById('result').innerText = "입력한 최종 값은 " + inputNumber + " 입니다";
        }
    }
}