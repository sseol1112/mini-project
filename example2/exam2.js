// 즉시 실행 함수
(function() {

})();
(function() {

}());

//함수표현식
var car = function(){

}

// 함수
function carFunc(){

}

// let과 const(전역변수로 사용할 수 없음 - 블록식에서 사용 es6 추가 문법)
// let; 정수
// const; 상수
function test() {
    let test = "테스트";
    const num = 10; 
}

function carNameTest() { //객체 리터럴 테스트
    let answer1 = document.getElementById("a1");
    let carName = { 
        manyCars : {
            a:"Sonata",
            b:"SM7", 
            c: "GV80" 
        }, 
        7 : "K5"
    };
    var result = "가장 인기있는 차종은 : " + carName.manyCars.c + ", 두번째 차종은 : " + carName[7];
    //answer1.find('p').append(result);
    //alert("가장 인기있는 차종은 : " + carName.manyCars.c + ", 두번째 차종은 : " + carName[7]);

    $(document).ready(function(){
        $('#a1').find('p').append(result + "<br>");
    });

    
}

function changing(){
    var c = document.getElementById("a2").children[0];
    var cval = document.getElementById("a2").children[0].textContent;
    //var result = document.getElementById("a2").children[1];
    var d = parseInt(cval);
    const MAX = 200; // 최대값 설정
    

    if(d === MAX){
        alert(`최대값 ${MAX}을 초과하였습니다. \n reset 버튼을 눌러 값을 초기화 시켜주세요.`);
    } else {
        d += 10;
    }
    //result.innerText = d;
    c.innerText = d;
}


function reset(){
    document.getElementById("a2").children[0].textContent = 0;
}

//jQuery
$(document).ready(function(){
    $("#resetBtn").click(function(){
        reset();
    });
});
