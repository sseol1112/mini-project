var memo = {
    init : function(){
        var self = this;
        self.settings();
        self.bindEvents();
    },
    settings : function(){
        var self = this;
        self.$memos = [];
        self.$memo = JSON.parse(localStorage.getItem("memo"));
        self.$memoBox = $('.memo');
        self.$footerBox = $('.footer');
        self.$textBox = self.$memoBox.find("#txtBox");
        self.$infoBox = self.$memoBox.find("#info");
        self.$notiBox = self.$memoBox.find("#noti");
        self.$regMemoBtn = self.$memoBox.find("#regBtn");
        self.$saveBtn = self.$memoBox.find("#saveBtn");
        self.$clearBtn = self.$memoBox.find("#clearBtn");
        self.$loadBtn = self.$memoBox.find("#loadBtn");
        self.$viewBtn = self.$memoBox.find("#viewMemo");
        self.$delBtn = self.$memoBox.find(".del-btn");
        self.$allDelBtn = self.$footerBox.find("#allDelbtn");
        self.$viewMemoBox = self.$memoBox.find(".memo-view");
        
    },
    bindEvents : function(){
        var self = this;        
        memo.btnCheck();
        self.$clearBtn.on('click', function(){
            memo.clear();
        });
        
        self.$loadBtn.on('click', function(){
            memo.getMemo();
        });

        self.$textBox.on('keyup', function(){
            self.$notiBox.hide();
            memo.save();
        });

        // self.$textBox.on('focus', function(){
        //     self.$loadBtn.show();
        //     self.$viewBtn.hide();
        // })

        // self.$textBox.on('blur', function(){
        //     self.$loadBtn.hide();
        //     self.$viewBtn.show();
        // })

        self.$regMemoBtn.on('click', function(){
            if(!self.$textBox[0].value){
                self.$infoBox.hide();
                self.$notiBox.show();
                self.$notiBox.css("color","red");
            } else {
                self.$notiBox.hide();
                memo.insertMemo();
            }
        });

        //최근 작성 메모 불러오기
        self.$viewBtn.on('click', function(){
            var listLength = self.$viewMemoBox.find('ul.memo-area').children('li').length;
            if( listLength > 0 && listLength == self.$memo.length){
                alert("최근 작성 메모를 모두 불러온 상태입니다.");
            }else if(listLength != self.$memo.length){
                self.$viewMemoBox.find('ul.memo-area').children('li').remove();
                memo.viewMemo();
            }else{
                memo.viewMemo();
            }

        });

        // 선택 메모 삭제
        self.$viewMemoBox.on('click', '.del-btn', function(){
            $(this).closest('li').remove();
            var text = $(this).closest('li').find('p').html();
            // console.log(text);
            // memo.delMemo(text);
        });        

        //메모 전체 삭제
        self.$footerBox.on('click', '#allDelBtn', function(){
            memo.allDelMemo();
        });
        
    },
    //자동저장
    save : function(){
        var self = this;
        document.getElementById('info').style.display = "block";
        localStorage.setItem("autosave", self.$textBox[0].value);
        memo.btnCheck();
    },
    clear : function(){
        var self = this;
        self.$infoBox.hide();
        self.$notiBox.hide();
        self.$textBox[0].value = "";
        self.$textBox.html('');
        //localStorage.clear();
    },
    //자동저장 메모 가져오기
    getMemo : function(){
        var self = this;
        var getTextItem = localStorage.getItem("autosave");
        self.$textBox[0].value = getTextItem;
        self.$textBox.html(getTextItem);
    },
    //메모 추가 및 저장
    insertMemo : function () {
        var self = this;
        var html = '';
        
        let getText = localStorage.getItem("autosave");
        if(getText == '') {
            self.$viewMemoBox.hide();
        } else {
            html += '<li style="position:relative;">';
            html += '<p class="txt">' + getText + '</p>';
            html += '<button class="del-btn" style="float:right; padding:0 5px; position:absolute; top:5px; right:5px;">x</button>';
            html += '</li>';
            self.$viewMemoBox.find('.memo-area').append(html);
            self.$viewMemoBox.show();

            memo.pushData();
            memo.btnCheck();

            alert("메모가 등록되었습니다.");
        }
    },
    pushData : function() {
        var self = this;
        var memos = self.$memos;
        const memoValue = self.$textBox[0].value;
        self.$textBox[0].value = '';
        memos.push(memoValue);
        // 메모 추가할때마다 localStorage에 메모 쌓이도록 바꾸는 작업으로 변경 필요함.
        localStorage.setItem("memo", JSON.stringify(memos));
    },
    viewMemo : function() {
        var self = this;
        var html = '';
        var memoData = JSON.parse(localStorage.getItem("memo"));
        var memoArray = '' 

        if(!memoData){
            self.$viewMemoBox.hide();
            alert("저장된 메모가 없습니다.");
        }else{
            memoArray = memoData.splice(','); // , 기준으로 배열을 나눈다.
            if(memoArray.length > 1){
                for(var i=0; i<memoArray.length; i++){
                    html += '<li style="position:relative;">';
                    html += '<p class="txt">' + memoArray[i] + '</p>';
                    html += '<button class="del-btn" style="float:right; padding:0 5px; position:absolute; top:5px; right:5px;">x</button>';
                    html += '</li>';
                }
            } else {
                html += '<li style="position:relative;">';
                html += '<p class="txt">' + viewMemo + '</p>';
                html += '<button class="del-btn" style="float:right; padding:0 5px; position:absolute; top:5px; right:5px;">x</button>';
                html += '</li>';
            }
            self.$viewMemoBox.find('.memo-area').append(html);
            self.$viewMemoBox.show();
        }
    },
    // delMemo : function(text) {
    //     var obj = JSON.parse(localStorage.getItem("memo"));
    //     console.log(text);
    //     if(!obj.length){
    //         alert("test");
    //     }else {
    //         for(var i = 0; i<obj.length; i++) {
    //             if(text == obj[i]){
    //                 localStorage.removeItem('memo');
    //             }
    //         }
    //     }
    // },
    allDelMemo : function() {
        var self = this;
        self.$viewMemoBox.find('ul li').remove();
        localStorage.clear();
        memo.btnCheck();
    },
    btnCheck : function() {
        var self = this;
        //localStorage 변수
        var autoSaveData = localStorage.getItem('autosave');
        var memoData = JSON.parse(localStorage.getItem('memo'));
        if(!autoSaveData){
            self.$loadBtn.hide();
        }else{
            self.$loadBtn.show();
        }
        if(!memoData) {
            self.$viewBtn.hide();
        } else {
            self.$viewBtn.show();
        }
    }
}

$(function() {
    memo.init();
});