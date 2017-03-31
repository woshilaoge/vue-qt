<template>
    <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
        <div class="menu_section">
            <ul class="nav side-menu">
                <li v-for="nav in navList">
                    <a v-bind:href="nav.href"> <i v-bind:class="nav.icon"></i> {{nav.name}}
                        <span class="fa fa-chevron-right" v-if="nav.subNav"></span>
                    </a>
                    <ul class="nav child_menu" v-if="nav.subNav">
                        <li v-for="subnav in nav.subNav">
                            <a v-bind:href="subnav.href">{{subnav.name}}
							<span class="fa fa-chevron-right" v-if="subnav.thirdNav"></span>
							</a>
                            <ul class="nav child_menu" v-if="subnav.thirdNav">
                                <li v-for="thirdnav in subnav.thirdNav">
                                    <a v-bind:href="thirdnav.href">{{thirdnav.name}}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';

import Service from './common';

export default {
    name: 'menu',
    data() {
        return {
            navList: []
        };
    },
    created() {
        let _vm = this;
        Service.nav().then((data) => {
            _vm.navList = data;
        });
    },
    mounted() {


        var CURRENT_URL = window.location.href.split('?')[0],
            $BODY = $('body'),
            $MENU_TOGGLE = $('#menu_toggle'),
            $SIDEBAR_MENU = $('#sidebar-menu'),
            $SIDEBAR_FOOTER = $('.sidebar-footer'),
            $LEFT_COL = $('.left_col'),
            $RIGHT_COL = $('.right_col'),
            $NAV_MENU = $('.nav_menu'),
            $FOOTER = $('footer');

        // Sidebar
        $(document).ready(function() {
            // TODO: This is some kind of easy fix, maybe we can improve this
            var setContentHeight = function() {
                // reset height
                $RIGHT_COL.css('min-height', $(window).height());

                var bodyHeight = $BODY.outerHeight(),
                    footerHeight = $BODY.hasClass('footer_fixed') ? 0 : $FOOTER.height(),
                    leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
                    contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

                // normalize content
                contentHeight -= $NAV_MENU.height() + footerHeight;

                $RIGHT_COL.css('min-height', contentHeight);
            };

            $SIDEBAR_MENU.find('a').on('click', function(ev) {
                var $li = $(this).parent();

                if ($li.is('.active')) {
                    $li.removeClass('active active-sm');
                    $('ul:first', $li).slideUp(function() {
                        setContentHeight();
                    });
                } else {
                    // prevent closing menu if we are on child menu
                    if (!$li.parent().is('.child_menu')) {
                        $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                        $SIDEBAR_MENU.find('li ul').slideUp();
                    }

                    $li.addClass('active');

                    $('ul:first', $li).slideDown(function() {
                        setContentHeight();
                    });
                }
            });

            // toggle small or large menu
            $MENU_TOGGLE.on('click', function() {
                if ($BODY.hasClass('nav-md')) {
                    $SIDEBAR_MENU.find('li.active ul').hide();
                    $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
                } else {
                    $SIDEBAR_MENU.find('li.active-sm ul').show();
                    $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
                }

                $BODY.toggleClass('nav-md nav-sm');

                setContentHeight();
            });

            // check active menu
            $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

            $SIDEBAR_MENU.find('a').filter(function() {
                return this.href == CURRENT_URL;
            }).parent('li').addClass('current-page').parents('ul').slideDown(function() {
                setContentHeight();
            }).parent().addClass('active');

            // recompute content when resizing
            $(window).smartresize(function() {
                setContentHeight();
            });

            setContentHeight();

            // fixed sidebar
            if ($.fn.mCustomScrollbar) {
                $('.menu_fixed').mCustomScrollbar({
                    autoHideScrollbar: true,
                    theme: 'minimal',
                    mouseWheel: {
                        preventDefault: true
                    }
                });
            }
        });
        // /Sidebar


        /**
         * Resize function without multiple trigger
         * 
         * Usage:
         * $(window).smartresize(function(){  
         *     // code here
         * });
         */
        (function($, sr) {
            // debouncing function from John Hann
            // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
            var debounce = function(func, threshold, execAsap) {
                var timeout;

                return function debounced() {
                    var obj = this,
                        args = arguments;

                    function delayed() {
                        if (!execAsap)
                            func.apply(obj, args);
                        timeout = null;
                    }

                    if (timeout)
                        clearTimeout(timeout);
                    else if (execAsap)
                        func.apply(obj, args);

                    timeout = setTimeout(delayed, threshold || 100);
                };
            };

            // smartresize 
            $.fn[sr] = function(fn) {
                return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
            };

        })(jQuery, 'smartresize');
    }
}
</script>
