/**
 * Created by WQ on 2016/2/23.
 */

(function () {
    var querySelector = document.querySelector.bind( document );
    var querySelectorAll = document.querySelectorAll.bind( document );
    var bodyHeight;
    var sections = querySelectorAll( ".section" );
    var wrappers = querySelectorAll( ".wrapper" );
    var scrollWrapper = querySelector( ".scroll-wrapper" );
    var indicatorItems = querySelectorAll( ".indicator .item" );
    var curPageIndex = 0;
    var isScrolling = false;
    var yellowPhones = querySelectorAll( ".section .yellow-phone" );
    var tempWrapper = querySelector( ".temp-wrapper" );

    function loopArray( arr , func ) {
        for ( var i = 0; i < arr.length; i++ ) {
            func( arr[ i ] , i );
        }
    }

    function loop( count , func ) {
        for ( var i = 0; i < count; i++ ) {
            func( i );
        }
    }

    function bindEvent( el , type , func ) {
        el.addEventListener( type , func );
        return {
            remove : function () {
                el.removeEventListener( type , func );
            }
        }
    }

    function resize() {
        bodyHeight = document.body.offsetHeight;
        scrollWrapper.style.transform = "translate3d(0,-" + bodyHeight * curPageIndex + "px,0)";
        var cubeHeight = bodyHeight > 768 ? 768 : bodyHeight;
        loopArray( sections , function ( setction , i ) {
            setction.style.height = bodyHeight + "px";
            wrappers[ i ].style.width = wrappers[ i ].style.height = cubeHeight + "px";
            wrappers[ i ].style.marginLeft = wrappers[ i ].style.marginTop = -cubeHeight / 2 + "px"
        } );
        tempWrapper.style.width = tempWrapper.style.height = cubeHeight + "px";
        tempWrapper.style.marginLeft = tempWrapper.style.marginTop = -cubeHeight / 2 + "px"
    }


    function wheelScroll( direction ) {
        if ( isScrolling ) {
            return;
        }
        isScrolling = true;
        indicatorItems[ curPageIndex ] && indicatorItems[ curPageIndex ].classList.remove( "select" );
        if ( !(direction < 0 && curPageIndex == 5) ) {
            sections[ curPageIndex ] && sections[ curPageIndex ].classList.remove( "show" );
        }
        // 负数-向下翻-下一页，正数-向上翻-上一页
        if ( direction < 0 ) {
            // 下一页
            if ( curPageIndex != 6 ) {
                // 只要不是最后一页，都能继续往下翻
                sections[ curPageIndex ] && sections[ curPageIndex ].stop && sections[ curPageIndex ].stop();// 将当前页面的动画暂停
                curPageIndex += 1;
                sections[ curPageIndex ] && sections[ curPageIndex ].play && sections[ curPageIndex ].play();// 开始新页面的动画
            }
        }
        else {
            // 上一页
            if ( curPageIndex != 0 ) {
                // 只要不是第一页，都能往上翻
                sections[ curPageIndex ] && sections[ curPageIndex ].stop && sections[ curPageIndex ].stop();// 将当前页面的动画暂停
                curPageIndex -= 1;
                sections[ curPageIndex ] && sections[ curPageIndex ].play && sections[ curPageIndex ].play();// 开始新页面的动画
            }
        }
        loopArray( yellowPhones , function ( phone ) {
            phone.classList.add( "hide" );
        } );
        if ( (direction > 0 && curPageIndex == 0) || (direction < 0 && curPageIndex == 1) ) {
            yellowPhones[ 0 ].classList.remove( "hide" );
            tempWrapper.classList.add( "hide" );
        } else if ( (direction < 0 && curPageIndex == 6) || (direction > 0 && curPageIndex == 5) ) {
            yellowPhones[ 4 ].classList.remove( "hide" );
            tempWrapper.classList.add( "hide" );
        } else {
            yellowPhones[ curPageIndex - 1 ].classList.add( "hide" );
            tempWrapper.classList.remove( "hide" );
        }
        setTimeout( function () {
            isScrolling = false;
            if ( curPageIndex < 6 && curPageIndex > 0 ) {
                // 1,2,3,4,5
                yellowPhones[ curPageIndex - 1 ].classList.remove( "hide" );
                tempWrapper.classList.add( "hide" );
            }
        } , 1000 );
        if ( curPageIndex == 6 ) {
            transform( scrollWrapper , "translate3d(0,-" + (bodyHeight * 5 + 167) + "px,0)" );
        } else {
            indicatorItems[ curPageIndex ] && indicatorItems[ curPageIndex ].classList.add( "select" );
            sections[ curPageIndex ] && sections[ curPageIndex ].classList.add( "show" );
            transform( scrollWrapper , "translate3d(0,-" + bodyHeight * curPageIndex + "px,0)" );
        }
    }

    function animate( duration , frame , onEnd ) {
        var s = (new Date()).getTime();
        setTimeout( function () {
            var cur = (new Date()).getTime();
            if ( cur - s < duration ) {
                frame( (cur - s ) / duration );
                setTimeout( arguments.callee , 20 );
            } else {
                frame( 1 );
                onEnd();
            }
        } , 20 );
    }

    function Timer( duration , func ) {
        var timeID;
        timeID = setTimeout( function () {
            timeID = setTimeout( arguments.callee , duration );
            func();
        } , duration );
        return {
            remove : function () {
                clearTimeout( timeID );
            }
        }
    }

    function transform( el , style ) {
        el.style.webkitTransform = style;
        el.style.transform = style;
    }

    function concurrentTask( tasks , callback ) {
        var len = tasks.length , count = 0;
        tasks.forEach( function ( task ) {
            task( function () {
                ++count == len && callback();
            } );
        } );
    }

    function initPage0() {
        var curIndex = 0;
        var slideWrapper = querySelector( ".page0-img-border-wrapper" );
        var slideBorder = querySelector( ".page0-img-border" );
        var circles = querySelectorAll( ".page0-circle" );

        loopArray( querySelectorAll( ".page0-img-border-wrapper .item" ) , function ( item , i ) {
            item.style.left = 25 * i + "%";
        } );
        function slide() {
            circles[ curIndex ].classList.remove( "select" );
            circles[ curIndex + 1 == 3 ? 0 : curIndex + 1 ].classList.add( "select" );
            animate( 400 , function ( percent ) {
                slideWrapper.style.transform = "translate3d(-" + (25 * curIndex + 25 * percent * percent) + "%,0,0)"
                slideWrapper.style.webkitTransform = "translate3d(-" + (25 * curIndex + 25 * percent * percent) + "%,0,0)"
            } , function () {
                curIndex += 1;
                if ( curIndex == 3 ) {
                    // 从头开始
                    curIndex = 0;
                    slideWrapper.style.transform = "translate3d(0,0,0)"
                }
            } );
        }

        //定时轮播
        var timerHandler = Timer( 4000 , slide );

        sections[ 0 ].stop = function () {
            // 当页面移出时，要停止轮播图
            timerHandler.remove();
        };

        sections[ 0 ].play = function () {
            // 当页面重新移入时，要继续轮播图
            timerHandler.remove();
            timerHandler = Timer( 4000 , slide );
        };

    }

    function initPage2() {
        var page2Tags = querySelectorAll( ".page2-tag" );
        var imgBorders = querySelectorAll( ".page-2 .content-border-item" );
        var srcs = [ page2Tags[ 0 ].src , page2Tags[ 1 ].src ];
        var curIndex = 0;
        var switchHandler;
        // 定时轮播
        function switchImg() {
            // 关闭当前的
            imgBorders[ curIndex ].classList.add( "hide" );
            imgBorders[ curIndex ].classList.remove( "show" );
            page2Tags[ curIndex ].src = srcs[ curIndex ].slice( 0 , srcs[ curIndex ].length - 5 ) + "1.png";
            // 打开下一个
            curIndex = (curIndex + 1) % 2;
            imgBorders[ curIndex ].classList.remove( "hide" );
            imgBorders[ curIndex ].classList.add( "show" );
            page2Tags[ curIndex ].src = srcs[ curIndex ].slice( 0 , srcs[ curIndex ].length - 5 ) + "0.png";
        }

        loopArray( page2Tags , function ( tag , i ) {
            var isbad = true;
            tag.onmouseover = function () {
                // 选中当前
                isbad = false;
                curIndex = i;
                switchHandler.remove();
                page2Tags[ i ].src = srcs[ i ].slice( 0 , srcs[ i ].length - 5 ) + "0.png";
                page2Tags[ 1 - i ].src = srcs[ 1 - i ].slice( 0 , srcs[ 1 - i ].length - 5 ) + "1.png";
                imgBorders[ i ].classList.remove( "hide" );
                imgBorders[ i ].classList.add( "show" );
                imgBorders[ 1 - i ].classList.add( "hide" );
                imgBorders[ 1 - i ].classList.remove( "show" );
            };
            tag.onmouseout = function () {
                if ( isbad ) {
                    return;
                }
                switchHandler.remove();
                switchHandler = Timer( 5000 , switchImg );
            };
        } );
        sections[ 2 ].play = function () {
            switchHandler = Timer( 5000 , switchImg );
        };
        sections[ 2 ].stop = function () {
            switchHandler.remove();
        };
    }

    function initPage3() {
        var contentImages = querySelectorAll( ".page-3 .content-img" );
        var canvas = querySelector( ".page3-canvas" );
        var yellowPhone = querySelector( ".page-3 .yellow-phone" );
        var gc = canvas.getContext( "2d" );
        var clock = new Image() , clockPointer = new Image();
        var da = Math.PI / 180;
        var da0 = -Math.PI / 2;
        var slideHandler;

        function frame( angle ) {
            gc.clearRect( 0 , 0 , 86 , 86 );
            gc.fillStyle = angle == 360 ? "white" : "#ffecc4";
            gc.save();
            gc.beginPath();
            gc.moveTo( 43 , 43 );
            gc.lineTo( 43 , 13 );
            gc.arc( 43 , 43 , 29 , da0 , da0 + da * angle );
            gc.lineTo( 43 , 43 );
            gc.closePath();
            gc.fill();
            gc.drawImage( clock , 0 , 0 );
            gc.translate( 43 , 43 );
            gc.rotate( da * angle );
            gc.drawImage( clockPointer , -2 , -26 );
            gc.restore();
        }

        concurrentTask( [
            function ( done ) {
                clock.src = "img/clock.png";
                clock.onload = done;
            } , function ( done ) {
                clockPointer.src = "img/clock-pointer.png";
                clockPointer.onload = done;
            } ] , function () {
            frame( 0 );
        } );
        // 图片要能够轮播
        var curIndex = 0;
        var angle = 0;
        var dangle = 120;

        function slide() {
            contentImages[ curIndex ].classList.remove( "select" );
            curIndex = (curIndex + 1) % 3;
            contentImages[ curIndex ].classList.add( "select" );
            animate( 400 , function ( percent ) {
                frame( angle + dangle * percent * percent );
            } , function () {
                angle = curIndex == 0 ? 0 : angle + dangle;
                frame( angle );
            } );
        }

        var curindex = 0;
        var isOver;

        function beginSlide() {
            isOver = false;
            curindex = 0;
            slideHandler = Timer( 4000 , function () {
                slide();
                curindex++;
                console.log( curindex );
                if ( curindex == 3 ) {
                    slideHandler.remove();
                    isOver = true;
                }
            } );
        }

        canvas.onclick = function () {
            if ( isOver ) {
                beginSlide();
            }
        };

        sections[ 3 ].stop = function () {
            slideHandler.remove();
        };
        sections[ 3 ].play = function () {
            slideHandler && slideHandler.remove();
            beginSlide();
        };

    }

    function initPage4() {
        var contentImage = querySelectorAll( ".page-4 .content-img" );
        var circles = querySelectorAll( ".page4-circle" );
        var contentBorder = querySelector( ".page-4.content-border" );
        var curIndex = 0;
        var flyHandler;
        loopArray( contentImage , function ( img , i ) {
            img.zindex = img.style.zIndex = i;
            function onEnd() {
                // 将之前飞过去的清除
                loop( 5 , function ( num ) {
                    contentImage[ num ].zindex = (contentImage[ num ].zindex + 1) % 5;
                    contentImage[ num ].style.zIndex = contentImage[ num ].zindex;
                    if ( num != i ) {
                        contentImage[ num ].classList.remove( "fly" );
                    }
                } );
            }

            bindEvent( img , "webkitAnimationEnd" , onEnd );
            bindEvent( img , "animationend" , onEnd );
        } );

        function fly() {
            circles[ curIndex ].classList.remove( "select" );
            contentImage[ 4 - curIndex ].classList.add( "fly" );
            curIndex = (curIndex + 1) % 5;
            circles[ curIndex ].classList.add( "select" );
        }

        sections[ 4 ].play = function () {
            if ( !contentBorder.classList.contains( "tap" ) ) {
                flyHandler = Timer( 5000 , fly );
            }
        };

        contentBorder.onclick = function () {
            if ( curIndex == 4 && !contentBorder.classList.contains( "tap" ) ) {
                flyHandler.remove();
                contentBorder.classList.add( "tap" );
            } else if ( contentBorder.classList.contains( "tap" ) ) {
                flyHandler.remove();
                flyHandler = Timer( 5000 , fly );
                contentBorder.classList.remove( "tap" );
            }
        };

        sections[ 4 ].stop = function () {
            flyHandler.remove();
        };

    }

    function initPage5() {
        var page5Tags = querySelectorAll( ".page5-tag" );
        var imgBorders = querySelectorAll( ".page-5.content-border-item" );
        var srcs = [ page5Tags[ 0 ].src , page5Tags[ 1 ].src ];
        var curIndex = 0;
        var switchHandler;

        // 定时轮播
        function switchImg() {
            // 关闭当前的
            imgBorders[ curIndex ].classList.add( "hide" );
            page5Tags[ curIndex ].src = srcs[ curIndex ].slice( 0 , srcs[ curIndex ].length - 5 ) + "1.png";
            // 打开下一个
            curIndex = (curIndex + 1) % 2;
            imgBorders[ curIndex ].classList.remove( "hide" );
            page5Tags[ curIndex ].src = srcs[ curIndex ].slice( 0 , srcs[ curIndex ].length - 5 ) + "0.png";
        }

        //switchHandler = Timer( 5000 , switchImg );
        loopArray( page5Tags , function ( tag , i ) {
            var isbad = true;
            tag.onmouseover = function () {
                isbad = false;
                // 选中当前
                curIndex = i;
                switchHandler.remove();
                page5Tags[ i ].src = srcs[ i ].slice( 0 , srcs[ i ].length - 5 ) + "0.png";
                page5Tags[ 1 - i ].src = srcs[ 1 - i ].slice( 0 , srcs[ 1 - i ].length - 5 ) + "1.png";
                imgBorders[ i ].classList.remove( "hide" );
                imgBorders[ 1 - i ].classList.add( "hide" );
            };
            tag.onmouseout = function () {
                if ( isbad ) {
                    return;
                }
                switchHandler.remove();
                switchHandler = Timer( 5000 , switchImg );
            }
        } );

        sections[ 5 ].play = function () {
            switchHandler = Timer( 5000 , switchImg );
        };
        sections[ 5 ].stop = function () {
            switchHandler.remove();
        };

    }

    function init() {
        // loading
        var loadingTips = querySelector( ".loading-tips" );
        var contents = [ "正在加载" , "正在加载 ." , "正在加载 . ." , "正在加载 . . ." ];
        var index = -1;
        var loadingHandler = Timer( 500 , function () {
            index = (index + 1) % 4;
            loadingTips.textContent = contents[ index ];
        } );
        var page0Phone = querySelector( ".page0-phone" );
        page0Phone.src = page0Phone.getAttribute( "data-src" );
        page0Phone.onload = function () {
            sections[ 0 ].classList.add( "show" );
            loadingHandler.remove();
            document.querySelector( ".content" ).classList.remove( "hide" );
            window.onresize = function () {
                resize();
            };
        };

        bindEvent( document , "mousewheel" , function ( e ) {
            wheelScroll( e.wheelDelta );
        } );
        bindEvent( document , "DOMMouseScroll" , function ( e ) {
            wheelScroll( -e.detail );
        } );
        // 第一页的小图标，鼠标放上时候要变化
        loopArray( querySelectorAll( ".page1-icon" ) , function ( icon ) {
            var src = icon.src;
            var outScr = src.slice( 0 , src.length - 4 ) + "-1.png";
            icon.onmouseover = function () {
                icon.src = outScr;
            };
            icon.onmouseout = function () {
                icon.src = src;
            };
        } );
        // 给左侧导航按钮添加点击事件
        loopArray( indicatorItems , function ( item , i ) {
            item.onclick = function () {
                if ( !isScrolling ) {
                    loopArray( yellowPhones , function ( phone ) {
                        phone.classList.add( "hide" );
                    } );
                    var isNeedFixed = (curPageIndex < 6 && curPageIndex > 0 ) && (i < 6 && i > 0);
                    if ( isNeedFixed ) {
                        yellowPhones[ curPageIndex - 1 ].classList.add( "hide" );
                        tempWrapper.classList.remove( "hide" );
                    }
                    isScrolling = true;
                    indicatorItems[ curPageIndex ] && indicatorItems[ curPageIndex ].classList.remove( "select" );
                    sections[ curPageIndex ] && sections[ curPageIndex ].classList.remove( "show" );

                    sections[ curPageIndex ] && sections[ curPageIndex ].stop && sections[ curPageIndex ].stop();// 将当前页面的动画暂停
                    curPageIndex = i;
                    sections[ curPageIndex ] && sections[ curPageIndex ].play && sections[ curPageIndex ].play();// 开始新页面的动画

                    indicatorItems[ curPageIndex ].classList.add( "select" );
                    sections[ curPageIndex ] && sections[ curPageIndex ].classList.add( "show" );
                    scrollWrapper.style.transform = "translate3d(0,-" + bodyHeight * curPageIndex + "px,0)";
                    setTimeout( function () {
                        isScrolling = false;
                        if ( isNeedFixed ) {
                            yellowPhones[ curPageIndex - 1 ].classList.remove( "hide" );
                            tempWrapper.classList.add( "hide" );
                        }
                    } , 1000 );
                    if ( !isNeedFixed && (curPageIndex < 6 && curPageIndex > 0) ) {
                        // 1,2,3,4,5
                        yellowPhones[ curPageIndex - 1 ].classList.remove( "hide" );
                        tempWrapper.classList.add( "hide" );
                    }
                }
            }
        } );
        // page-0
        initPage0();
        // page-2
        initPage2();
        // page-3
        initPage3();
        // page-4
        initPage4();
        // page-5
        initPage5();
        resize();
    }

    init();
})();