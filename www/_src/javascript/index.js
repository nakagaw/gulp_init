    (function() {
    'use strict';

    // Knockout.js
    // ==================================

    define(['knockout'], function(ko){

        // モーダルウィンドウのマスクのカスタムバインディング
        ko.bindingHandlers.koModalMask = {
            update: function(element, valueAccessor, allBindings, viewModel, bindingContext){
                // 現状の値と、サブプロパティ一覧の取得
                var value = valueAccessor();
                // var allBindings = allBindings();
                var valueUnwrapped = ko.utils.unwrapObservable(value);

                // Modal操作
                if (valueUnwrapped == false){
                    $(element).fadeOut('fast');
                } else {
                    $(element).css({'width':'100%', 'height':'100%'});
                    $(element).css({'backgroundColor': '#000'});
                    $(element).css({'position': 'fixed', 'left': '0', 'top': '0'});
                    $(element).css({'z-index': '500'});
                    $(element).fadeTo('fast', 0.1);
                }
            }
        };

        // Toggle class / How to : http://goo.gl/ojHOnY
        // ==================================
        var viewModel = function(){
            var self = this;

            // Scroll fixed subHeader
            self.subHeadFixed = ko.observable(false);
            // Must set style=" height: 100%;  overflow: hidden; overflow-y: scroll;"
            self.pageScrolled = function(data, event) {
                // Calc Scroll Range
                var contentMain = event.target;
                var scroll = contentMain.scrollTop;
                var range = contentMain.scrollHeight - contentMain.offsetHeight;
                console.log( scroll + ":" + range);
                // add remove class
                if ( scroll < 50 ) {
                     self.subHeadFixed(false);
                } else {
                     self.subHeadFixed(true);
                };
            }

            // Close modal
            self.maskModal = ko.observable(false);
            self.closeModal = function(){
                self.maskModal(false);
                self.userNotificationActive(false);
                self.userSettingsActive(false);
            }

            // User notification slide
            self.userNotificationActive = ko.observable(false);
            self.toggleUserNotification = function(data, event){
                var onOff = !self.userNotificationActive(); //toggle value true/false
                self.userNotificationActive(onOff);
                self.userSettingsActive(false);
                // Modal Trigger
                self.maskModal(onOff);
            }

            // User settings menu
            self.userSettingsActive = ko.observable(false);
            self.toggleUserSettings = function(data, event){
                var onOff1 = !self.userSettingsActive();
                self.userSettingsActive(onOff1);
                self.userNotificationActive(false);
                // Modal Trigger
                self.maskModal(onOff1);
            }

            // Side navigation Icon toggle
            self.contentNavIcon = ko.observable(true);
            self.toggleContentNavIcon = ko.pureComputed(function() {
                return self.contentNavIcon() ? ' svg-rows' : 'svg-close';
            }, self);

            // Add class
            // ==================================
            //クッキー取得
            // var contentNavStretchCookie =  getCookie('js_xxx');
            // //もしtrueならture
            // if (contentNavStretchCookie == 'true') {
            //     self.contentNavStretch(true);
            // } else {
            //     self.contentNavStretch(false);
            //     self.contentNavIcon(false);
            // }
        }
        ko.applyBindings(new viewModel());

        // Set and Get Cookie
        // ==================================
        //クッキーを登録するsetCookie関数
        function setCookie(name, value, expires) {
            var newCook= ''; //クッキー文字列をいれる変数
            //name=valueとして追加
            newCook += name + '=' + encodeURIComponent(value);
            if(expires) { //有効期限があれば設定
                var exp = new Date();
                exp.setDate(exp.getDate() + expires);
                newCook += '; expires=' + exp.toGMTString();
            }
            document.cookie = newCook; //クライアントに書き込む
        }
        //指定されたクッキー値を取得するgetCookie関数
        function getCookie(name) {
            var cList = document.cookie.split(';'); //取得したクッキーを分割
            for (var i = 0; i < cList.length; i++) {
                //名前を順番に確認
                var cName = cList[i].split('=');
                //＝でクッキー情報を分割、名前が引数nameと同じなら
                //デコードして返す
                if(cName[0] == name) { return decodeURIComponent(cName[1]); }
            }
            return null; //該当する名前のクッキーがない場合、空で返す
        }


    });


    // jQuery
    // ==================================

    define(['jquery'], function($){
        require('chosen');
        $(".chosen-select").chosen()
    });


// //こういう書き方もできるようだ。
// define(['./modules/jquery'], function($){
//     $('body').css('background','blue');
//     console.log($().jquery);  // version 番号
// });


})();