$(document).ready(function(){
    $('.result-wrap').hide();
    $('.btn-wrap .btn').click(function(){
        // data 속성으로 값추출해도 되고, text값으로 받아도 되나, 속성값으로 처리하였음
        //var btnVal = $(this).text();
        var btnDataVal = $(this).data("type");
        console.log("data-type : " + btnDataVal);

        accountData(btnDataVal);
    });
});


var accountData = function(type){
    let typeVal = type;
    alert(`${typeVal} 계산을 시작합니다.`);
    let val1 = parseInt(prompt("첫번째 값을 입력해주세요."));
    let val2 = parseInt(prompt("두번째 값을 입력해주세요."));
    const RESULT_VAL = 0;

    valChk(val1,val2,RESULT_VAL,typeVal);

    //벡틱 사용. - es6
    //resultVal = `${val1} ${typeVal} ${val2}`;

    $('.result-wrap').show();
}

function valChk (val1,val2,result,operator){
    switch(operator){
        case '+' :
            result = val1 + val2;
            alert("계산된 값은 : " + result);
            document.querySelector(".result-wrap > p > .total").innerHTML = result;
            break;
        case '-' :
            result = val1 - val2;
            alert("계산된 값은 : " + result);
            document.querySelector(".result-wrap > p > .total").innerHTML = result;
            break;
        case '*' :
            result = val1 * val2;
            alert("계산된 값은 : " + result);
            document.querySelector(".result-wrap > p > .total").innerHTML = result;
            break;
        case '/' :
            result = val1 / val2;
            alert("계산된 값은 : " + result);
            document.querySelector(".result-wrap > p > .total").innerHTML = result;
            break;
        case '%' :
            result = val1 % val2;
            alert("계산된 값은 : " + result);
            document.querySelector(".result-wrap > p > .total").innerHTML = result;
            break;
    }
}