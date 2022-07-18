// worldwide_analytics/tagcommander/justdance/Now/wa_data_Now.js

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
if (!Date.prototype.toISOString) {
    (function () {

        function pad(number) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }

        Date.prototype.toISOString = function () {
            return this.getUTCFullYear() +
                '-' + pad(this.getUTCMonth() + 1) +
                '-' + pad(this.getUTCDate()) +
                'T' + pad(this.getUTCHours()) +
                ':' + pad(this.getUTCMinutes()) +
                ':' + pad(this.getUTCSeconds()) +
                '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
                'Z';
        };

    }
        ());
}

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON
const jsonDate = (new Date()).toJSON(); // 2015-10-26T07:46:36.611Z
const backToDate = new Date(jsonDate);

// uid generator
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}

function JustDanceGame() {
    var version = "0.2.2";

    // html DOM
    var jHTML = $('html'),
        jHead = $('head'),
        jBody = $('body'),
        jLanding = $('#landing'),
        jLandingContent = $('.landing__content'),
        jSecondScreen = $('#second-screen'),
        jSplash = $('.init-spinner--splash'),
        jCookieNotice = $('.site-message'),
        jSettings = $('#settings'),
        jAdminMenu = $('#landing-admin-menu'),
        jFeatures = $('.new-features'),
        jLandingModal = $('#landing-modal'),
        jRoomInfo = $('.room-info'),
        jCoverflow = $('#coverflow');

    // debug controlls
    var room = 1,
        isDebug = false,
        ignoreMaintenance = true,
        ErrorPopUp = false,
        newFeatures = false,
        isWeakDevice = true, // need update
        cookieShow = true;

    // url's
    var cdn = 'https://jdnowweb-s.cdn.ubi.com/demo/dev/20220506_1049',
        cdnLocal = 'http://127.0.0.1:5500',
        cdnGlitch = 'https://cdn.glitch.global/2adec185-ab6f-4021-8ea5-7def5fae509c',
        jdnApi = 'https://ire-prod-api.justdancenow.com';

    // abbreviations
    var visible = "visible",
        hidden = "hidden",
        window = document.documentElement,
        unixNowTime = Date.now();

    /////////////////////////////////////////////////////////////////////////////////
    ///
    ///     LAUNCH GAME
    ///
    /////////////////////////////////////////////////////////////////////////////////
    'use strict'

    var $loc8 = $("<script>const select=document.querySelector('select');const allLang=['en','ru','fr','ja'];select.addEventListener('change',changeURLLanguage);function changeURLLanguage(){let lang=select.value;location.href=window.location.pathname+'#'+lang;location.reload()}\
let hash=window.location.hash;hash=hash.substr(1);console.log('lang: '+hash);if(!allLang.includes(hash)){location.href=window.location.pathname+'#en';location.reload()}\
localStorage.setItem('lang',hash);select.value=hash;$('html').attr('lang',hash);\ </script>");

    $loc8.appendTo(jHead);

    // LOCALIZATION
    function loc8() {
        const select = document.querySelector('select');
        const allLang = ['en', 'ru', 'fr', 'ja']
        select.addEventListener('change', changeURLLanguage);

        function changeURLLanguage() {
            let lang = select.value;
            location.href = window.location.pathname + '#' + lang;
            location.reload();
        }

        let hash = window.location.hash;
        hash = hash.substr(1);
        console.log('lang: ' + hash);
        if (!allLang.includes(hash)) {
            location.href = window.location.pathname + '#en';
            location.reload();
        }
        localStorage.setItem("lang", hash);
        select.value = hash;
        jHTML.attr('lang', hash);
    }

    function mobileNotification() {
        var $notificationTemplate = $('<div class="pop-up__wrapper pop-up--hidden"><div class="pop-up"><h1 class="pop-up__title"></h1><p class="pop-up__content">loc[4140]</p><div class="pop-up__footer"><button class="pop-up__btn pop-up__btn--cancel">loc[NO]</button> <button class="pop-up__btn pop-up__btn--validate">loc[YES]</button><div class="pop-up__timer"></div></div></div></div>');

        var $POP_UP_wrapper = $('.pop-up__wrapper');
        var $POP_UP = $('.pop-up');
        var $title = $POP_UP.find('.pop-up__title');
        var $content = $POP_UP.find('.pop-up__content');

        var $cancel = $('.pop-up__btn--cancel');
        var $validate = $('.pop-up__btn--validate');
        var $timer = $('.pop-up__timer');

        $notificationTemplate.appendTo(jLanding);

        jHTML.addClass('popUp-noSupport');
        $('.pop-up__wrapper').addClass("landing-popUp-noSupport").removeClass("pop-up--hidden");
        $('.pop-up').addClass("landing-popUp-noSupport");

        $('.pop-up__content').html(loc['347'][hash]);
        $('.pop-up__btn--cancel').html(loc['348'][hash]);
        $('.pop-up__btn--validate').html("OK");

        $('.pop-up__btn--validate').on('click', function () {
            $('.pop-up__wrapper').hide();
            jHTML.removeClass('popUp-noSupport');
        });

    }

    function deviceDetect() {
        var IS_MOBILE = false;

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            jHTML.addClass("mobile");
            jHTML.attr('device', 'mobile');
            IS_MOBILE = true;
        } else {
            jHTML.addClass("desktop");
            jHTML.attr('device', 'desktop');
            IS_MOBILE = false;
        }

        if (IS_MOBILE === true) {
            mobileNotification();
            $('button.main-button').remove();
            jRoomInfo.hide();
        }

    }
    deviceDetect();

    // not work
    function maintenace() {

        // set storageTime
        localStorage.setItem("currentBannerTime", unixNowTime);
        localStorage.setItem("bootTime", jsonDate);

        var $cssTemplate = $('<link rel="stylesheet" type="text/css" href="https://spice-marsh-haircut.glitch.me/css/static_pageV1.css"/>');
        var $jsTemplate = $('<script src="https://spice-marsh-haircut.glitch.me/js/maintenance.js"/>');

        $.getJSON(cdnLocal + "/v1/maintenance", function (data) {
            $.each(data, function (key, id) {
                if (unixNowTime < id.startTime) {
                    ignoreMaintenance = false;

                    if (ignoreMaintenance === false) {
                        jBody.attr('remove', true);
                        jLanding.remove();
                        //jPopUp.remove();
                        jCookieNotice.remove();

                        // append
                        $cssTemplate.appendTo(jBody);
                        $jsTemplate.appendTo(jBody);
                    }
                }
            });
        });

    }

    maintenace();

    var $landingH1 = $('.landing-text__title');
    var $landingH2 = $('.landing-text__subtitle');
    var $mainButton = $('.main-button span');

    $landingH1.html(loc['165'][hash]);
    $landingH2.html(loc['166'][hash]);
    $mainButton.html(loc['168'][hash]);

    function verNotification() {
        var content_en = "New update " + version + " is out. Please update the Just Dance Now app on your device!"; // loc(345)
        if (version === "0.2.2") {
            var $NEW_UPDATE_MESSAGE = $('<div class="new_update"><div class="message">' + content_en + '</div></div>');
            $NEW_UPDATE_MESSAGE.appendTo(jLandingContent)
        } else {
            console.log('The message is not shown')
        }
         
        if (isWeakDevice === true) {
            $NEW_UPDATE_MESSAGE.addClass('animation-stop')
        }
    }

    // audio
    // const {Howl, Howler} = require('howler');
    var UI_Search_a01 = new Howl({
        src: [cdnGlitch + "/UI_Search_a01.wav"],
    });
    var UI_Lobby_ContinueDance = new Howl({
        src: [cdnGlitch + "/UI_Lobby_ContinueDance.wav"],
    });
    var Jingle_JDMainMenu = new Howl({
        src: [cdnGlitch + "/Jingle_JDMainMenu.wav"],
    });
    var UI_CoverFlow_Enter = new Howl({
        src: [cdnGlitch + "/UI_CoverFlow_Enter.wav"],
    });
    var UI_Snap_01 = new Howl({
        src: [cdnGlitch + "/UI_Snap_01.wav"],
    });
    var UI_Snap_Back_01 = new Howl({
        src: [cdnGlitch + "/UI_Snap_Back_01.wav"],
    });
    var UI_TransitionPage = new Howl({
        src: [cdnGlitch + "/UI_TransitionPage.wav"],
    });
    var audioFilename = "sfx-sprite";
    var audioSFX = new Howl({
        src: [cdnGlitch + '/' + audioFilename + '.ogg', cdnGlitch + '/' + audioFilename + '.mp3'],
        sprite: {
            'dance-transition-in': [0, 3000],
            'dance-transition-out': [3000, 2000],
            'goldmove-intro': [4999, 1729],
            'goldmove': [6729, 1683],
            'unlock-game': [8982, 2410],
            'coach-selected-1': [11403, 1067],
            'coach-selected-2': [12472, 1067],
            'coach-selected-3': [13543, 1067],
            'coach-selected-4': [14614, 1067],
            'coach-selected-5': [15685, 1067],
            'coach-selected-6': [16752, 1066],
            'crowd-cheering': [17818, 2957],
            'crowd-sad': [20775, 1471],
            'coverflow-whoosh': [21854, 1715],
            'coverflow-right': [23584, 250],
            'coverflow-left': [23857, 277],
            'avatar-appears-1': [24135, 648],
            'avatar-appears-2': [24783, 720],
            'avatar-appears-3': [25503, 696],
            'avatar-appears-4': [26199, 696],
            'flag-appears-1': [26895, 528],
            'flag-appears-2': [27423, 504],
            'flag-appears-3': [27927, 504],
            'flag-appears-4': [28431, 432],
            'coach-selection': [28863, 2952],
            'ghost-planet-appears': [31815, 1920],
            'score-count': [33735, 5586],
            'after-dance-jingle': [39322, 5856],
            'after-dance-winner': [45178, 6624],
            'star-1': [51802, 2040],
            'star-2': [53842, 2040],
            'star-3': [55882, 2040],
            'star-4': [57922, 2544],
            'star-5': [60466, 3048],
            'snap': [63514, 550],
            'coverflow-click': [64074, 106],
            'coach-leave-1': [64190, 920],
            'config-window-open': [65110, 465],
            'config-window-close': [65592, 225],
            'connect-info-pannel': [65834, 666]
        },
        onload: function () {
            console.log('Audio SFX sprite has been successfully loaded');
        },
        onloaderror: function () {
            console.log('An error with Howler has occured ');
        }
    });

    function initLandingPage() {
        function debug() {
            if (isDebug === true) {
                jHTML.addClass('debug');
                jBody.append('<div id="in-game-fps"><span id="fps-result"></span> FPS</div>');
                var fps = document.getElementById("fps-result");
                var startTime = Date.now();
                var frame = 0;

                function fpsCounter() {
                    var time = Date.now();
                    frame++;
                    if (time - startTime > 1000) {
                        fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
                        startTime = time;
                        frame = 0;
                    }
                    window.requestAnimationFrame(fpsCounter);
                }

                // detect Browser, Engine, OS, CPU, and Device type/model
                var parser = new UAParser();
                localStorage.setItem('device', JSON.stringify(parser.getResult()));

                function jsAnimationTemplate() {
                    var $animTestDiv = $('<div>')
                        .addClass('animation-play')
                        .appendTo(jLandingContent);

                    $animTestDiv.html(loc['343'][hash]);

                    $animTestDiv.on('click', function () {
                        console.log('animation played')
                    });
                }

                if (isDebug === true) {
                    fpsCounter();
                    jsAnimationTemplate()
                }
            }
        }

        function platformChecker() {
            if (isWeakDevice === true) {
                jHTML.addClass('weak');
                $('.preload-assets').remove();
            }
        }

        var roomGenerator = function () {
            var $danceRoomSpan = $('.room-info span');
            const roomNumberGenerator = (left, right) => Math.floor(Math.random() * (right - left + 1) + left);

            $danceRoomSpan.html(loc['167'][hash]);

            const roomNUMBER = roomNumberGenerator(22, 9999);
            if (isDebug === true) {
                document.getElementById('room-number').innerHTML = room;
                var qrcode = new QRCode(document.getElementById("room-qrcode"), {
                    text: cdnLocal + ":80/r?r=" + room,
                    width: 112,
                    height: 112,
                    colorDark: "#800080",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.L
                });
                localStorage.setItem("roomNr", room);
                var rmHash = md5(room);
                var roomHmac = {
                    "value": "s=" + room + "~hmac=" + rmHash,
                    "expires": unixNowTime
                }
                localStorage.setItem("room", JSON.stringify(roomHmac));
                var uuiGen = uuidv4();
                var scrnHash = md5("EUS=" + room);
                var screenHmac = {
                    "value": "s=EUS" + uuiGen + "~hmac=" + scrnHash,
                    "expires": unixNowTime
                }
                localStorage.setItem("screen", JSON.stringify(screenHmac));
            } else {
                document.getElementById('room-number').innerHTML = roomNUMBER;
                console.log('room number: ' + roomNUMBER);
                var qrcode = new QRCode(document.getElementById("room-qrcode"), {
                    text: cdnLocal + ":80/r?r=" + roomNUMBER,
                    width: 112,
                    height: 112,
                    colorDark: "#800080",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.L
                });
                localStorage.setItem("roomNr", roomNUMBER);
                var rmHash = md5(roomNUMBER);
                var roomHmac = {
                    "value": "s=" + roomNUMBER + "~hmac=" + rmHash,
                    "expires": unixNowTime
                }
                localStorage.setItem("room", JSON.stringify(roomHmac));
                var uuiGen = uuidv4();
                var scrnHash = md5("EUS=" + roomNUMBER);
                var screenHmac = {
                    "value": "s=EUS" + uuiGen + "~hmac=" + scrnHash,
                    "expires": unixNowTime
                }
                localStorage.setItem("screen", JSON.stringify(screenHmac));
            }
        }

        function landingToast() {
            var isSHOW = false;
            var $newFeatures = $('.new-features');

            var html = '<div class="game-description">';
            html += '<div class="title">';
            html += '<span></span>';
            html += '</div>';
            html += '<div class="content"></div>';
            html += '</div>';
            html += '<div class="button__close">X</div>';
            $newFeatures.html(html);

            var $TITLE = $newFeatures.find('.title');
            var $CONTENT = $newFeatures.find('.content');

            $TITLE.html(loc['313'][hash]);
            $CONTENT.html(loc['314'][hash]);

            var $DIALOG_CLOSE = $newFeatures.find('.button__close');

            if (newFeatures === true) {
                isSHOW = true;
                jFeatures.show();
                $DIALOG_CLOSE.on('click', function () {
                    isSHOW = false;
                    jFeatures.hide();
                });
            } else {
                isSHOW = false;
                jFeatures.remove();
            }
        }

        function popUp() {
            var $MESSAGE = $('<div class="pop-up">\
                                <div class="message__content">\
                                    <p>'+ loc['315'][hash] + '</p>\
                                </div>\
                                <div class="close__button">OK</div>\
                            </div>');
            $MESSAGE.appendTo(jBody);

            var $pop_up = $('.pop-up');
            var $content = $('.message__content');
            var $content_p = $('.message__content p');
            var $close_button = $('.close__button');

            if (ErrorPopUp === true) {
                $pop_up.addClass(visible).removeClass(hidden);
            }
            $close_button.on('click', function () {
                $pop_up.removeClass(visible).addClass(hidden);
            });
        }

        function adminMenu() {
            var adminShow = false;

            var $adminPanel = $('#landing-admin-menu');
            var $adminHeader = $('.menu__header');

            var $adminButton = ('.toggle-settings');
            var $adminClose = $adminPanel.find('.close');

            var $settingsTitle = $adminHeader.find('.title h1');
            var $langtitle = $('.language-changer .title');

            var $graphics = $('.graphics-changer');
            var $graphtitle = $graphics.find('.title');
            var $graphhig = $graphics.find('option[value="high"]');
            var $graphlow = $graphics.find('option[value="medium"]');
            var $graphmed = $graphics.find('option[value="low"]');

            var $fullScreen = $('.full-screen');
            var $fullstitle = $fullScreen.find('.title');
            var $fullscheck = $fullScreen.find('.check');

            var $bottomItems = $('a.legacy-item')
            var $bottomauthors = $bottomItems.find('.authors');
            var $bottomlicense = $bottomItems.find('.license');
            var $bottomfaq = $bottomItems.find('.faq');

            var $socialLinks = $('.social-links');
            var $title = $socialLinks.find('.menu__txt');

            $settingsTitle.html(loc['319'][hash]);
            $langtitle.html(loc['320'][hash]);

            $graphtitle.html(loc['321'][hash]);
            $graphhig.html(loc['322'][hash]);
            $graphmed.html(loc['323'][hash]);
            $graphlow.html(loc['324'][hash]);

            $fullstitle.html(loc['330'][hash]);
            $fullscheck.html(loc['on'][hash]);

            $bottomauthors.html(loc['336'][hash]);
            $bottomlicense.html(loc['337'][hash]);
            $bottomfaq.html(loc['338'][hash]);

            $title.html(loc['350'][hash]);

            function panelShow() {
                UI_Snap_01.play();
                UI_TransitionPage.play();
                jHTML.addClass("dialog");
                jAdminMenu.show().addClass(visible);
            }

            function panelHidden() {
                UI_Snap_Back_01.play();
                jHTML.removeClass("dialog");
                jAdminMenu.hide().removeClass(visible);
            }

            jSettings.on('click', function () {
                adminShow = true;
                panelShow()
            });

            $adminClose.on('click', function () {
                adminShow = false;
                panelHidden();
            });

            $(document).keydown(function (a) {
                switch (a.keyCode) {
                    case 27:
                        if (adminShow === true) {
                            adminShow = false;
                            panelHidden();
                        }
                        break;
                }
            })

            var window = document.documentElement;
            var screen = false;
            var darkTheme = false; // unused

            function openFullscreen() {
                if (screen === false) {
                    //go full
                    if (window.requestFullscreen) {
                        window.requestFullscreen();
                    } else if (window.webkitRequestFullscreen) { /* Safari */
                        window.webkitRequestFullscreen();
                    } else if (window.msRequestFullscreen) { /* IE11 */
                        window.msRequestFullscreen();
                    }
                    screen = true;
                    document.querySelector(".fullscreen-toggle").classList.add('active');
                } else {
                    //go windowed
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) { /* Safari */
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) { /* IE11 */
                        document.msExitFullscreen();
                    }
                    screen = false;
                    document.querySelector(".fullscreen-toggle").classList.remove('active');
                }
            }
            $('.full-screen .check').on('click', function () {
                openFullscreen();
                jHTML.toggleClass('full-screen'); // UNUSED
            });
        }

        function landingModal() {
            var modalShow = false;

            var $landingModal = $('#landing-modal');
            var $modalHeader = $('.modal__header');
            var $modalOpen = $('.help__tutorial'),
                $modaltitle = $modalHeader.find('.title'),
                $modalClose = $landingModal.find('.close'),
                $modalSteps = $landingModal.find(".modal_position"),
                $modalStep1 = $landingModal.find(".modal_position_1"),
                $modalStep1content = $landingModal.find(".modal_position_1 .modal_description"),
                $modalStep2 = $landingModal.find(".modal_position_2"),
                $modalStep2content = $landingModal.find(".modal_position_2 .modal_description"),
                $modalStep3 = $landingModal.find(".modal_position_3"),
                $modalStep3content = $landingModal.find(".modal_position_3 .modal_description");

            $modalOpen.html(loc['340'][hash]);
            $modaltitle.html(loc['331'][hash]);
            $modalStep1content.html(loc['332'][hash]);
            $modalStep2content.html(loc['333'][hash]);
            $modalStep3content.html(loc['334'][hash]);

            function modalVisible() {
                UI_Search_a01.play();
                UI_Snap_01.play();
                jHTML.addClass("modalActive");
                jLandingModal.addClass(visible).show();
                setTimeout(() => $(function () {
                    $modalStep1.addClass(visible);
                    UI_TransitionPage.play();
                }), 500);
                setTimeout(() => $(function () {
                    $modalStep2.addClass(visible);
                    UI_TransitionPage.play();
                }), 1000);
                setTimeout(() => $(function () {
                    $modalStep3.addClass(visible);
                    UI_TransitionPage.play();
                }), 1500);
            }

            function modalHidden() {
                UI_Snap_Back_01.play();
                jHTML.removeClass("dialog").removeClass("modalActive");
                jLandingModal.removeClass(visible).hide();
                $modalSteps.removeClass(visible)
            }
            $modalOpen.on('click', function () {
                modalShow = true;
                modalVisible()
            });
            $modalClose.on('click', function () {
                modalShow = false;
                modalHidden()
            });
            $(document).keydown(function (e) {
                switch (e.keyCode) {
                    case 27: // esc
                        if (modalShow === true) {
                            modalShow = false;
                            modalHidden();
                        }
                        break;
                }
            })
        }

        function landingPlayButton() {
            var $mainButton = $('.main-button');
            $mainButton.hover(function () {
                jHTML.addClass("play-button-hover");
            }, function () {
                jHTML.removeClass("play-button-hover");
            });
        }

        function createProfile() {
            var ftueVisible = false;

            // state-1
            var htmls1 = '';
            htmls1 += '<div class="state-title">Select name</div>';
            htmls1 += '<p><b>Your name:</b><br /><input type="text" size="30" /></p>';
            htmls1 += '<div class="next-state_button">Next</div>';

            // state-2
            var htmls2 = '';
            htmls2 += '<div class="state-title">Select avatar</div>';
            htmls2 += '<div class="avatar-list"></div>';
            htmls2 += '<div class="next-state_button">Next</div>';

            // state-3
            var htmls3 = '';
            htmls3 += '<div class="state-title">Select color</div>';
            htmls3 += '<div class="color-list"></div>';
            htmls3 += '<div class="next-state_button">Next</div>';

            // states
            var htmlb = '';
            htmlb += '<div class="states">';
            htmlb += '<div class="state state-name">' + htmls1 + '</div>';
            htmlb += '<div class="state state-avatar">' + htmls2 + '</div>';
            htmlb += '<div class="state state-color">' + htmls3 + '</div>';
            htmlb += '</div>';

            // header pos 1
            var htmlp1 = '<div class="name progress_1 focused">Select name</div>';
            // header pos 2
            var htmlp2 = '<div class="avatar progress_2">Select avatar</div>';
            // header pos 3
            var htmlp3 = '<div class="color progress_3">Select color</div>';

            // main body
            var html = '<div id="create-account">';
            html += '<div class="header">'
            html += '<div class="progress_line">' + htmlp1 + htmlp2 + htmlp3 + '</div>';
            html += '</div>';
            html += '<div class="account body">' + htmlb + '</div>';
            html += '</div>';

            var $createAccount = $("#create-account");
            var $stateName = $(".state.state-name");
            var $stateAvatars = $(".state.state-avatar");
            var $stateColors = $(".state.state-color");
            var $progressList1 = $(".name.progress_1");
            var $progressList2 = $(".avatar.progress_2");
            var $progressList3 = $(".color.progress_3");
            var $nextBtnStateName = $(".state-name .next-state_button");
            var $nextBtnStateAvatars = $(".state-avatars .next-state_button");
            var $nextBtnStateColors = $(".state-colors .next-state_button");

            var $htmlBuild = $('<div id="create-account"> <div class="header"> <div class="progress_line"> <div class="name progress_1 focused">Select name</div><div class="avatar progress_2">Select avatar</div><div class="color progress_3">Select color</div></div></div><div class="account body"> <div class="states"> <div class="state state-name"> <div class="state-title">Select name</div><p><b>Your name:</b><br><input type="text" size="30"> </p><div class="next-state_button">Next</div></div><div class="state state-avatar"> <div class="state-title">Select avatar</div><div class="avatar-list"></div><div class="next-state_button">Next</div></div><div class="state state-color"> <div class="state-title">Select color</div><div class="color-list"></div><div class="next-state_button">Next</div></div></div></div></div>');

            function statesSlide() {
                // function slide to avatars
                $nextBtnStateName.on('click', function () {
                    $stateName.css({
                        'display': 'none'
                    });
                    $stateAvatars.css({
                        'display': 'block'
                    });
                    $stateColors.css({
                        'display': 'none'
                    });
                    $progressList1.removeClass('focused');
                    $progressList2.addClass('focused');
                });
                // function slide to colors
                $nextBtnStateAvatars.on('click', function () {
                    $stateName.css({
                        'display': 'none'
                    });
                    $stateAvatars.css({
                        'display': 'none'
                    });
                    $stateColors.css({
                        'display': 'block'
                    });
                    $progressList2.removeClass('focused');
                    $progressList3.addClass('focused');
                });
                // function exit
                $nextBtnStateColors.on('click', function () {
                    $stateName.css({
                        'display': 'block'
                    });
                    $stateAvatars.css({
                        'display': 'none'
                    });
                    $stateColors.css({
                        'display': 'none'
                    });
                    $createAccount.remove();
                    jHTML.removeClass('dialog');
                });
            }

            function ftueHidden() {
                $('#create-account').remove();
                jHTML.removeClass('dialog');
            }
            $(".landing-arrow").show();
            $(".landing-arrow").on('click', function () {
                ftueVisible = false;
                jHTML.addClass('dialog');
                statesSlide();
                $createAccount.appendTo(jLanding).html(html);
            });
            $(document).keydown(function (e) {
                switch (e.keyCode) {
                    case 27: // esc
                        if (ftueVisible === true) {
                            ftueVisible = false;
                            ftueHidden();
                        }
                        break;
                }
            })
        }

        function cookieMessage() {
            var $cookieTemplate = $('<div class="cookie-wrapper"><div class="cookie-content"></div><div class="cookie-close"><button class="cookie-close-btn">OK</button></div></div>');

            if (cookieShow === true) {
                $cookieTemplate.appendTo('.site-message');

                if (cookieAccept === false) {
                    $('.site-message').addClass('show')
                }

                $('.site-message').addClass('cookie-notice');

                var $cookieWrapper = $('.cookie-notice');
                var $cookieContent = $('.cookie-content');
                var $cookieClose = $('.cookie-close .cookie-close-btn');

                $cookieContent.html(loc['341'][hash]);

                localStorage.setItem("cookieAccept", "false");
                var cookieAccept = false;
                $cookieClose.on('click', function () {
                    localStorage.setItem("cookieAccept", "true");
                    //Creating cookies                  term =>7d   *page*
                    $.cookie('cookieAccept', 'true', { expires: 3, path: '/' });
                    cookieAccept = true;
                    $cookieWrapper.remove();
                });
                $('.main-button').on('click', function () {
                    localStorage.setItem("cookieAccept", "true");
                    $.cookie('cookieAccept', 'true', { expires: 3, path: '/' });
                    cookieAccept = true;
                    $cookieWrapper.remove();
                });
            } else {
                $cookieWrapper.remove();
            }
        }

        function goSecondScreen() {
            let $screenConstruction = $('<div id="second-screen" role="second-screen" style="transform:translateY(100%)"><div class="title">LOC 344</div><div class="screenshots"><div class="items-list"><div class="screenshot map-mapID"><img src="https://placehold.jp/3d4070/ffffff/1024x512.png"> <span>Song Name #1</span></div><div class="screenshot map-mapID"><img src="https://placehold.jp/3d4070/ffffff/1024x512.png"> <span>Song Name #2</span></div><div class="screenshot map-mapID"><img src="https://placehold.jp/3d4070/ffffff/1024x512.png"> <span>Song Name #3</span></div><div class="screenshot map-mapID"><img src="https://placehold.jp/3d4070/ffffff/1024x512.png"> <span>Song Name #4</span></div></div><div class="title-more">And many, many more!</div></div></div>');
            $screenConstruction.appendTo(jBody).show();

            let SECOND_SCREEN_ACTIVE = false;
            let $SECOND_SCREEN = $('#second-screen');
            let $ARROW = jLanding.find('.landing-arrow');

            $ARROW.on('click', function () {
                SECOND_SCREEN_ACTIVE = true;
                $SECOND_SCREEN.show();
                jHTML.addClass('second-screen');
                jLanding.css({
                    'transform': 'translateY(-100%)',
                    'transition': 'transform 0.5s ease'
                });
                $SECOND_SCREEN.css({
                    'transform': 'translateY(0%)',
                    'transition': 'transform 0.5s ease'
                });
                secondScreenPrepare();
            });

            if (SECOND_SCREEN_ACTIVE = true) {
                $(document).keydown(function (s) {
                    switch (s.keyCode) {
                        case 27: // esc
                            jLanding.css({
                                'transform': 'translateY(0%)',
                                'transition': 'transform 0.5s ease'
                            });
                            $SECOND_SCREEN.css({
                                'transform': 'translateY(100%)',
                                'transition': 'transform 0.5s ease'
                            });
                            jHTML.removeClass('second-screen');
                            break;
                    }
                })
            }

            function secondScreenPrepare() {
                // screen
                var $SECOND_SCREEN = $('#second-screen');
                var $title = $SECOND_SCREEN.find('.title');

                $title.html(loc['344'][hash]);
            }
            secondScreenPrepare();
        }

        // Notification
        // Added a new song // Unused
        function getNewSong() {
            jHTML.addClass('messageShow');

            var $newSongPush = $('<div id="new-song-popup"></div>');

            var $newSong_Template = $('\
                <div class="title" loc-id="349">loc 349</div>\
                <div class="item"></div>\
                <div class="button--validate">OK</div>\
            ');

            $.getJSON(cdnLocal + "/v1/songs/getNewSong", function (data) {
                var html = '';
                $.each(data, function (key, song) {
                    html += '<div class="item-container new-map ' + song.id + '">';
                    html += '<div class="song__decoration song__tag--' + song.tags + '">';
                    html += '<img class="song__cover" src="' + song.assets.base + '/assets/app/' + song.id.toLowerCase() + '_cover%402x.jpg">';
                    html += '<div class="jdgame-version">from Just Dance ' + song.jdVersion + '</div>';
                    html += '</div>';
                    html += '<div class="description-container">' + loc['351'][hash] + '</div>';
                    html += '<div class="title-container" theme="' + song.defaultColors.lyricsColor + '">';
                    html += '<div class="caption title">' + song.name + '</div>';
                    html += '<div class="caption artist">' + song.artist + '</div>';
                    html += '</div>';
                    html += '</div>';
                    return html;
                });

                $newSongPush.appendTo(jBody);
                $newSong_Template.appendTo($newSongPush);

                var $title = $newSongPush.find(".title");
                var $itemContainer = $newSongPush.find(".item");
                var $btnClose = $newSongPush.find(".button--validate");

                var $description = $(".description-container");

                $title.html(loc['349'][hash]); // loc 4066

                $itemContainer.html(html).addClass('song-loaded');

                $btnClose.on('click', function () {
                    $newSongPush.addClass('hide-animation');
                    setTimeout(() => $newSongPush.hide(), 300);
                    UI_Snap_Back_01.play();
                    jHTML.removeClass('messageShow');
                    //Creating cookies                          *time*=>7d   *page*
                    document.cookie = "NEW_SONG_MESSAGE_CLOSE = true";

                    var firstName = getCookie("NEW_SONG_MESSAGE_CLOSE");

                    if (firstName === 'true') {
                        $newSongPush.hide();
                        jHTML.removeClass('messageShow');
                    }

                });

                $('.room-info', '#settings', '.help__tutorial').on('click', function () {
                    $newSongPush.hide().addClass('hide-animation');
                    UI_Snap_Back_01.play();
                    jHTML.removeClass('messageShow');
                });
            });
        }

        // running on pc only
        // TODO: make an activator
        //! setTimeout(() => getNewSong(), 600);

        // SetUp
        verNotification();
        debug();
        platformChecker();
        roomGenerator();
        landingToast();
        popUp();
        adminMenu();
        landingModal();
        landingPlayButton();
        setTimeout(cookieMessage, 1000);
    };

    initLandingPage();

    function innerGameSplash() {

        if (isWeakDevice === false) {
            function finalSplashInner() {
                var $splashWithCoaches = $('<div class="init-spinner--splash"><div class="splash-logo"></div><div class="splash-coaches"><div class="splash-coach-1 splash-coach-div"></div><div class="splash-coach-2 splash-coach-div"></div><div class="splash-coach-3 splash-coach-div"></div><div class="splash-coach-4 splash-coach-div"></div></div><div class="init-spinner"></div></div>');
                var $splash = $('<div class="init-spinner--splash"><div class="splash-logo"></div><div class="init-spinner"></div></div>');
                $splash.appendTo($('body'));
                $splash.appendTo(jBody).delay(2500).show(function () {
                    $splash.remove()
                })
            }
            finalSplashInner()
        } else {
            // FOR CHROMECAST AND OTHER OLD GEN PLATFORMS 
            // Will be used for consoles and old gen devices
            function finalSplashWeak() {
                var $spinner = $('<div class="init-spinner--splash"><div class="init-spinner__spinner"></div></div>');
                $spinner.appendTo(jBody).delay(2500).show(function () {
                    $spinner.remove()
                })
            }
            finalSplashWeak()
        }
    }

    /////////////////////////////////////////////////////////////////////////////////
    ///
    ///     PREPARE GAME & GET ALL DEPENDENCIES & VERY DEMO ❤
    ///
    /////////////////////////////////////////////////////////////////////////////////
    function initMainMenu() {
        var PCWEB_ESCAPE = 27;
        var PCWEB_RETURN = 8;
        var PCWEB_ENTER = 12;
        var PCWEB_ARROW_UP = 38;
        var PCWEB_ARROW_DOWN = 40;
        var PCWEB_ARROW_LEFT = 37;
        var PCWEB_ARROW_RIGHT = 39;
        var PCWEB_PAGE_UP = 33;
        var PCWEB_PAGE_DOWN = 34;

        var loadGameHTML = function (jd) {
            return $.get(cdnLocal + '/html/gui.html').then(function (guiHtml) {
                jBody.append(guiHtml);
                var $guiCss = $('<link rel="stylesheet" type="text/css" href="/css/game.css"/>');
                $guiCss.appendTo($('head'));
            });
        };

        function calculateAspectRatio() {
            var aspectRatio = '16:9';
            // Batch DOM reads
            var win = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
            // Aspect ratio default is 16:9
            var cRatio, w, h, r;
            if (aspectRatio === '4:3') {
                cRatio = 4 / 3;
                w = win.width;
                h = win.height;
                r = w / h;
            } else {
                cRatio = 16 / 9;
                w = win.width;
                h = win.height;
                r = w / h;
            }
            // For older android tablets whose resolution is diff.
            // Still need to take up the entire width
            function getXSize() {
                return Math.round(h * cRatio);
            }
            var ySize, yOffset, xSize, xOffset;
            if (r > cRatio) {
                ySize = win.height;
                yOffset = 0;
                xSize = getXSize();
                xOffset = Math.floor((w - xSize) / 2);
            } else {
                xSize = win.width;
                xOffset = 0;
                ySize = Math.round(w / cRatio);
                yOffset = Math.floor((h - ySize) / 2);
            }
            // Batch DOM writes
            // Set aspect-ratio and position of main container and video player
            $('#just-dance-now').css({
                width: xSize,
                marginLeft: xOffset,
                height: ySize,
                marginTop: yOffset
            });
            // Set a base font size and use font % in css for sub-elements
            $('html').css({
                fontSize: Math.round((xSize / 1280) * 125)
            })
            this.containerScale = xSize / 1920;
            window.onresize = calculateAspectRatio;
        };

        function getSongCatalog() {
            $.getJSON(cdnLocal + "/v1/songs/published", function (data) {
                var html = '';
                $.each(data, function (key, song) {
                    html += '\
                    <div class="song ' + song.id + '">\
                    <div class="song__decoration song__tag">\
                    <img class="song__cover" src="' + song.base + '/assets/web/' + song.id.toLowerCase() + '_small.jpg">\
                    </div>\
                    <div class="title-container">\
                    <div class="caption title">' + song.name + '</div>\
                    <div class="caption artist">' + song.artist + '</div>\
                    </div>\
                    </div>';
                });
                $.each(data, function (key, song) {
                    $('.song-cover--hi-res').css('background-image', 'url(' + song.base + '/assets/web/' + song.id.toLowerCase() + '.jpg)');
                    $('.song-cover--low-res').css('background-image', 'url(' + song.base + '/assets/web/' + song.id.toLowerCase() + '_small.jpg)');
                });
                $('.songlist--x').html(html);
                $('.category').attr("data-name", "WEB PLAYLIST TEST");
                var x = 0;
                var y = 0;
                $(document).keydown(function (e) {
                    switch (e.keyCode) {
                        case PCWEB_ARROW_UP:
                            if (x > 0) {
                                y--;
                                $(".song").addClass('top');
                            }
                            break;
                        case PCWEB_ARROW_DOWN:
                            if (x < 52) {
                                y++;
                                $(".song").addClass('bottom');
                            }
                            break;
                        case PCWEB_ARROW_LEFT:
                            audioSFX.play('coverflow-left');
                            x--;
                            $(".song").removeClass('song--focused');
                            document.querySelector(".song:nth-child(" + -x + ")").classList.add('song--focused');
                            break;
                        case PCWEB_ARROW_RIGHT:
                            audioSFX.play('coverflow-right');
                            x++;
                            $(".song").removeClass('song--focused');
                            document.querySelector(".song:nth-child(" + +x + ")").classList.add('song--focused');
                            break;
                    }
                })
            });
        }

        function songItemManipulation() {
            const items = document.querySelectorAll(".song");
            // Song selected
            items.forEach(function (item) {
                item.addEventListener("click", function () {
                    audioSFX.play('coverflow-click');
                    let itemSelected = item;
                    items.forEach(function (item) {
                        item.classList.remove('song--focused');
                    });
                    itemSelected.classList.add('song--focused');
                });
            });
        }

        function gamePrepareSecond() {
            jHTML.addClass('state-songselection');
            getSongCatalog();
            jCoverflow.addClass(visible);
        }

        var $gameApplication = $('<script type="text/javascript" src="/dist/js/game.js" async></script>')

        $(function () {
            $(".main-button, .room-info").on('click', function () {
                audioSFX.play('coverflow-click');
                setTimeout(() => jLanding.remove(), 500);
                setTimeout(() => $('#second-screen').remove(), 500);
                // innerGameSplash();
                loadGameHTML();
                jHTML.removeClass('play-button-hover');
                jCoverflow.css({ 'display': 'block' });
                $('.cookie-notice').remove();
                innerGameSplash();
                setTimeout(gamePrepareSecond, 1000);
                setTimeout(songItemManipulation, 2000);
                setTimeout(calculateAspectRatio, 2000);
                setTimeout($gameApplication.appendTo($('body')), 2000);
            });
        });
    }

    initMainMenu();
}
JustDanceGame();