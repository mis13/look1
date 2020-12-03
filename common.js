var _active_group = $('body').data('active_group'); 
var _active_prod  = $('body').data('active_producer');
var _active_srl   = $('body').data('active_serial');
var _active_part  = $('body').data('active_partition');

if(_active_group>1){
    _setActiveMenu($('.side-ul__li[data-gid="'+_active_group+'"]'));
}
else if(_active_prod!=''){
    _setActiveMenu($('.side-ul__li[data-prod="'+_active_prod+'"]'));
}

function _setActiveMenu(_gr){
    _addcls = "side-ul__li--active";
    if(_gr.hasClass('side-ul__li--has-chld')){
        _addcls = "side-ul__li--open side-ul__li--active";
        _gr.children('.side-ul').show();
    }
    _gr.addClass(_addcls);

    if(_gr.closest('.side-ul').length){
        _clsst = _gr.closest('.side-ul').closest('.side-ul__li');
        _setActiveMenu(_clsst);
    }
}

var main_protocol = 'https:';
if(window.location.protocol!='https:')
    main_protocol = 'http:';

var main_domain = main_protocol +'//www.santehtop.ru';

var _site = window.location.hostname; // ex: www.santehtop.ru

/* */
var _to;
var _to2;
var _top = 0;
var _cart_itog_fix = $('.cart-block__tofix');
var _cif_check = 0; //_cart_itog_fix.length;
var _fastorder = $('.fastorder');
var checkArrayExprs = Array(); // вложенный массив: min max expr errorMessage
    checkArrayExprs[0]= Array(3,150,'(^[^<>\/:\^\%\&]+) *$','Поле пусто или заполненно неверно. Поле не должно быть короче 3 и длиннее 50 символов, не должно содержать :, &quot;, &rsquo;, <, >, \\ и \/.'); // проверка имени
    // checkArrayExprs[1]= Array(7,50,'^[a-zA-Z0-9]+([_\.-][a-zA-Z0-9]*)*[a-zA-Z0-9]@[a-zA-Z0-9]+([_\.-][a-zA-Z0-9]*)*[a-zA-Z0-9]+[\.]+[a-zA-Z]{2,4}$','Поле пусто или заполненно неверно. Поле не должно быть короче 7 и длиннее 50 символов и должно содержать корректный Email адрес.'); // проверка email
    // checkArrayExprs[1]= Array(7,50,'^[a-zA-Z0-9]*([_\.-][a-zA-Z0-9]*)*@[a-zA-Z0-9]*([_\.-][a-zA-Z0-9]*)*[\.]+[a-zA-Z]{2,4}$','Поле пусто или заполненно неверно.Поле не должно быть короче 7 и длиннее 50 символов и должно содержать корректный Email адрес.'); // проверка email
    // UPD 05-03-2020: по письму на support@: уберите все проверки почты кроме того чтоб не было пусто. Даже если поставят одну букву не только латинскую но и русскую.
    checkArrayExprs[1]= Array(1,50,'(^[^<>\/:\^\%\&]+) *$','Поле пусто или заполненно неверно. Поле не должно быть короче 2 и длиннее 50 символов, не должно содержать :, &quot;, &rsquo;, <, >, \\ и \/.'); // проверка email только на 1 символ
    checkArrayExprs[2]= Array(10,50,'^[0-9\-\(\) +]+$','Поле пусто или заполненно неверно. Поле не должно быть короче 10 и длиннее 50 символов и должно содержать корректный номер телефона.'); // проверка телефона
    checkArrayExprs[3]= Array(4,500,'(^[^<>\^\%\&]+) *$','Поле пусто или заполненно неверно. Поле не должно быть короче 4 и длиннее 500 символов, не должно содержать :, &quot;, &rsquo;, <, >, \\ и \/.'); // проверка текстового сообщения
    checkArrayExprs[4]= Array(5,5,'[a-zA-Z0-9]',''); // проверка текстового сообщения
    checkArrayExprs[5]= Array(10,12,'[0-9]','Поле пусто или заполненно неверно. Поле должно быть длиной 10 или 12 символов и должно содержать корректный ИНН.'); // проверка ИНН
    checkArrayExprs[6]= Array(9,9,'[0-9]','Поле пусто или заполненно неверно. Поле должно быть длиной 9 символов и должно содержать корректный КПП.'); // проверка КПП
    checkArrayExprs[7]= Array(25,100,'^(4{1})([0-9]{19})([^\\x00-\\x1F\\x22<>\^]+([^<>\^]+) *)$','Поле пусто или заполненно неверно. Поле не должно быть короче 25 и длиннее 100 символов и должно содержать корректный рс и наименование банка.'); // проверка рс и банка
    checkArrayExprs[8]= Array(9,9,'[0-9]','Поле пусто или заполненно неверно. Поле должно быть длиной 9 символов и должно содержать корректный БИК.'); // проверка БИК
    checkArrayExprs[9]= Array(20,25,'^(4{1})([0-9]{19}[0-9]{0,5})$','Поле пусто или заполненно неверно. Поле не должно быть короче 20 и длиннее 100 символов и должно содержать корректный рс.'); // проверка рс и банка

/* basket elements (start) */
var _promocodeInput = $('#promocodeInput');
var _promocodeDiscount = $('#promocodeDiscount');
var _bonusRow = $('#bonusRow');
var _bonusInput = $('#bonusInput');
var _bonusSummInput = $('#bonusSummInput');
var _bonusPayMax = 0;
/* basket elements (end) */

/* param filter elements (start) */
var _bfilter    = $('.b-filter'); // param filter block
var _sort       = $('.sort');
var _body       = $('body');
var _finded     = $('#finded');
var _catcont    = $('#catcont');
var _catpagtop  = $('#catpagtop');
var _pagstr     = $('.pagination__list');
var _chckblock  = $('.b-filter__checked-options'); // block for checked characts
var _h1         = $('#h1_descr1');
var _ann2       = $('#ann2');
var _ann        = $('#ann');
var _lblock     = $('.left-block');
var _lsrchgs    = $('#lastSearchGoods'); // block for last search goods
if(_catcont.length)
    var _cph    = _catcont.find('.catalog-goods__page-hit'); // all page hits
/* param filter elements (end) */

/* param filter classes (start) */
var _loading_class = 'processing';
var _active_class = 'active';
var _part_class = 'part';
var _grey_class = 'grey';
var _loading_class = 'processing';
var _changed_class = 'changed';
var _fix_lgoods = 'fix_last_goods';
var _ascrl = 'auto_scroll';

var _rs_open = 'b-filter__ready-solutions-open'; // show ready solutions
/* param filter classes (end) */

/* param filter triggers (start) */
var _canscrl = _body.hasClass('can_scroll');

/* param filter triggers (end) */

/* param filter ajax (start) */
var _sended_ajax;
var _sended_ajax_scroll;
var _sended_ajax_paging;
/* param filter ajax (end) */

/* param filter values (start) */
var _newscroll = 1; // 0


var count_pages = 0;
if(_catcont.length && _cph.length)
    count_pages = _cph.length;
var _gtid = _body.data('group');
var _gurl = _body.data('gurl');
var _gid = _body.data('gid');
var _url_arr = {};
var _charid_arr = {};
var _depprnt_arr = {};
var _depprnt_cnt = 0;
var _price = '';
var _sale = '';
var _page = 1;
var _click = 0;
var _s = '';
var many = '';
var _to_url_str = undefined;
var need_next_page_height;
if(_catcont.length)
    var catcont_top = _catcont.offset().top;
if(_catpagtop.length)
    var catpagtop_offset_top =  _catpagtop.offset().top;
var _catalogid = '/catalog/';
var dont_show_finded = 0;
var page_hit_array = new Array();
var scroll_top_ajax = 0;
var scroll_side = '';
var check_active_page = 0;
var ontopme = 0;
var ontopfilter = 0;
var scroll_margin = -112;
var ls_height = 0;
var leftblock_bottom = 0;
var is_bottom_click = 0;
var _act_page = 1;
var check_position = 0;
var last_n =0;

var url_to_ajax  = location.href;

var load_page_trigger = 0; //таймер для запроса, id интервала, порог посылки запроса

var catpagtop_height = 62; //_catpagtop.height(); // высота постраничного вывода
var height_sum = catpagtop_height+100;   // получем сумму высот
if(_lsrchgs.length) ls_height = _lsrchgs.height();
if(_lblock.length) leftblock_bottom =  _lblock.offset().top+_lblock.height()-ls_height;

if(_pagstr.find('.pagination__li--active').length)
    _act_page = _pagstr.find('.pagination__li--active').data('page');
//console.log(_act_page);
if(_act_page!=1 && _cph){
    _cph.addClass(_ascrl);
    _catcont.find('.catalog-goods__page-hit[data-page="'+_act_page+'"]').removeClass(_ascrl);
    //console.log(_catcont.find('.catalog-goods__page-hit[data-page="'+_act_page+'"]'));
}
/* param filter values (end) */

/* param filter timeout (start) */
var _ajax_timeout;
/* param filter timeout (end) */

var WidgetEvent = window.WidgetEvent = function(name, data){

    if ( this instanceof WidgetEvent ) {
        var event = $.Event(name,{
            __customData: data,
            getData: function(field) {
                if (field) {
                    return this.__customData[field];
                }
                return this.__customData;
            },
            fire: function(el){
                $(el).trigger(this)
            }
        });
        return event;
    } else
        return new WidgetEvent(name, data);
};
        
$(document).ready(function(){
    _setcrumbs();
	_buy();
	_bindacts();
	_bindcounter();
	_bindbasket();
	_bindordercreation();
	_bindfastordercheckbox();
    _bindparam();
    _bindcallme();
    _bindgift();
    _bindbonus();
    if($('.plus-minus-block').length){
        _correctingItog();
        _setBonusAction();
    }

    if($('.b-product__image-list.b-product__image-item').length>3)
        $('.b-product__image-list').addClass('small-list');

	$('.delivery-row .b-checkbox__input').unbind().bind('change',function(){
        _chngDlv();
    });

    $('.delivery-row .b-checkbox__input:checked').trigger('change');

	_scroll_actions($(document).scrollTop());

	$('.side-ul__li--has-chld i').click(function(){
		$(this).parent().children('.side-ul--l2,.side-ul--l3').slideToggle(500);
		$(this).parent().toggleClass('side-ul__li--open');
	});
	$('.side-menu__tab a').click(function(){
		$('.side-menu__tab a').removeClass('side-ul__li--active');
		$(this).addClass('side-ul__li--active');
	});
	$('.open-menu').click(function(){
		_lblock.toggleClass('left-block--show');
	});
	$('.side-menu__tab-but').click(function(){
		var _ths = $(this);
		var _tab = _ths.data('tab');
		if(!$('.side-menu').hasClass('side-menu__active-'+_tab)){
			$('.side-menu').removeClass('side-menu__active-producers side-menu__active-groups');
			$('.side-menu').addClass('side-menu__active-'+_tab);
		}
		if(_lblock.hasClass('left-block__full') && !_lblock.hasClass('left-block--show'))
			_lblock.addClass('left-block--show');
	});

    $(window).scroll(function(e) {
        if(e.originalEvent.pageY)
            div = e.originalEvent.pageY;
        else
            div = $(document).scrollTop();

        _scroll_actions(div);

        if(_catcont.length){
            catcont_top = _catcont.offset().top;
                
            // если мы ниже определённой позиции добавляем класс скролла к <body>
            if(_canscrl){
                if(height_sum + div > catcont_top && check_position==0){
                    check_position = 1;
                    _body.removeClass('scroll_catalog').addClass('scroll_catalog');
                }

                if(height_sum + div <= catcont_top && check_position==1){
                    check_position =0;
                    _body.removeClass('scroll_catalog');
                }
            }
        }
        
        if(_canscrl && _catcont.length){
            _scroll_goods(div);
        }
        
    });
	/*
	$('.finderB').click(function(){
		$('.finderOth').addClass('open');
	});
	$('.content').click(function(){
		$('.finderOth').removeClass('open');
	});
    */
	$('.info-block__fullbut').click(function(){
		$('.info-block').addClass('info-block__full--show');
	});
	$('.info-block__shortbut').click(function(){
		$('.info-block').removeClass('info-block__full--show');
	});
    if($('.banners_new.banners_new--slider').length){
        $('.banners_new.banners_new--slider').owlCarousel({
              autoPlay: 10000,
              items : 1,
              paginationy:true,
              dots:true,
              navigation : false,
            });
    }

    if($('.gr-carousel').length){
        $('.gr-carousel').owlCarousel({
              autoPlay: 10000,
              items : 1,
              paginationy:true,
              dots:true,
              navigation : false,
              loop: true,
            });
    }

    
    if($(".cntct-owl").length){
        $(".cntct-owl").owlCarousel({
          autoPlay: 10000, //Set AutoPlay to 3 seconds
          items : 1,
          paginationy:true,
          dots:true,
          navigation : false,
        });
    }

    if($('#lastgoodsslider').length && $('#lastgoodsslider .prod').length > 4){
        $("#lastgoodsslider .prod-box").owlCarousel({
          autoPlay: 10000, //Set AutoPlay to 3 seconds
          items : 5,
          paginationy:true,
          dots:true,
          navigation : false,
        });
    }

    if($('.prod-boxes__slider').length && $('.prod-boxes__slider .prod').length > 5){
        $(".prod-boxes__slider").owlCarousel({
          autoPlay: 10000, //Set AutoPlay to 3 seconds
          items : 5,
          paginationy:true,
          dots:true,
          navigation : false,
        });
    }

	$("#slider-blocks").owlCarousel({
      autoPlay: 10000, //Set AutoPlay to 3 seconds
      items : 1,
      paginationy:false,
      navigation : true,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]
  	});
  	$(".next").click(function(){
    	owl.trigger('owl.next');
	});
  	$(".prev").click(function(){
    	owl.trigger('owl.prev');
  	});

  	$(".phone-input").mask("+7 (999) 999-99-99");

    $('.b-product__big-image').click(function(){
    	var _ths = $(this);
        var _num = _ths.data('number');
        var _url = $('.b-product__image-item[data-number="'+_num+'"]').data('fancy');
        var _img = {}; // my object
        var _imgs =  []; // my array
        $('.b-product__image-item').each(function(i){
            _type = 'image';
            _href = $(this).data('fancy');
            if($(this).hasClass('__video')){
                _type = 'iframe';
                console.log($(this));
                console.log($(this).data('href'));
                _href = $(this).data('href');
            }

            //'https://www.youtube.com/embed/6DbreKetcdI';
            _thumbnail = _href;
            if($(this).hasClass('__video')){
                _thumbnail = _thumbnail.replace('/www.', '/img.');
                _thumbnail = _thumbnail.replace('/embed/', '/vi/');
                _thumbnail = _thumbnail+'/1.jpg';
            }
            _img = {
                    href :_href, 
                    title :$('.prod-title').html(),
                    type :_type,
                    thumb: _thumbnail
                };
            _imgs.push(_img);
        });
        console.log(_imgs);
        _fancy = $.fancybox.open(_imgs,{
            index: _num-1,
            beforeLoad: function(){
                $('body').addClass('popup__active');
            },
            afterClose: function(){
                $('body').removeClass('popup__active');
                js_gcnt = 0;
                if($('.cart-badge').length)
                    js_gcnt = $('.cart-badge').html()-0;
                _fastorderlink(js_gcnt, 0);
                _scroll_actions($(document).scrollTop());
                _bindfastordercheckbox();  
            },
            helpers : {
                title   : {
                    type: 'inside'
                },
                thumbs  : {
                    width   : 30,
                    height  : 30,
                    source   : function ( item ) {  // function to obtain the URL of the thumbnail image
                        var href;

                        if (item.element) {
                            href = $(item.element).find('img').attr('src');
                        }

                        if (!href && item.type === 'image' && item.href) {
                            href = item.href;
                        }
                        if(item.thumb){
                            href = item.thumb
                        }

                        return href;
                    }
                }

            }
        });
        return false;
    });

    $('.b-product__image-item').click(function(){
        var _ths = $(this);
        var _num = _ths.data('number');
        var _src = _ths.data('src');
        var _b = $('.b-product__big-image');
        if(_ths.hasClass('__video')){
            var _vlnk= _ths.data('href');
            $.fancybox.open({
                width: '80%',
                minHeight: '70%',
                padding : 0,
                href:_vlnk,
                type:'iframe',
                beforeLoad: function(){
                    $('body').toggleClass('popup__active');
                },
                afterClose: function(){
                    $('body').toggleClass('popup__active');
                }
            });
        }
        else{
            _b.data('number', _num).prop('data-number', _num);
            _b.prop('src', _src);
            $('.b-product__image-item').removeClass('b-product__image-item-active');
            _ths.addClass('b-product__image-item-active');
        }
    });

    $('.callme').fancybox({
		prevEffect		: 'none',
		nextEffect		: 'none',
		afterShow: function(){
		    /*$('.order-checkbox__input').trigger('click');*/
		},
	});

    $('.cart-toggle').on("click",function(){
        var _ths = $(this);
        var _type= _ths.data('type');
        $('#maincontent .cart').removeClass('cart-user--active cart-comp--active').addClass('cart-'+_type+'--active');
        _checkButtonStatus();
    });

    $('.finder .finder-form__input').devbridgeAutocomplete({
        serviceUrl: '/ajaxsearchautocomplete/',
        dataType: 'json',
        type: 'POST',
        groupBy: 'category',
        minChars:3,
        deferRequestBy:100,
        maxHeight:500,
        width:'auto',
        appendTo:'.finder-form fieldset',
        triggerSelectOnValidInput: false,
        onSearchStart: function (query) { $('.finder').addClass('processing')},
        onSearchComplete: function (query, suggestions) {$('.finder').removeClass('processing')},
        onSearchError: function (query, jqXHR, textStatus, errorThrown) {$('.finder').removeClass('processing')},
        onHint: function (hint) {
            $('#autocomplete-ajax-x').val(hint);
        }
    });

    $('.prod-img__wrap').sortablePhotos({
      selector: '> .prod-image',
      sortable: false,
      padding: 6
    });

    $('.side-menu__fastfilter-input').keyup(function(){
        var _ths = $(this);
        var _val = _ths.val();
        var _txt = $.trim(_val.toLowerCase());
        var _prnt = $('.side-menu__tab-producers')
        var _li = _prnt.find('.side-ul__li');
            if(_txt.length>0){
                $('.side-ul__li-letter').hide();
                _ths.addClass('side-menu__fastfilter--active');
                _prnt.find('.side-ul__li').closest('li').addClass('side-ul__li--hide');
                //console.log(_txt);
                //console.log('.side-ul__li[data-text*="'+_txt+'"]');
                //console.log(_prnt.find('.side-ul__li[data-text*="'+_txt+'"]'));
                _prnt.find('.side-ul__li[data-text*="'+_txt+'"]').removeClass('side-ul__li--hide');
            }
            else{
                $('.side-ul__li-letter').show();
                _ths.removeClass('side-menu__fastfilter--active');
                _li.removeClass('side-ul__li--hide');
            }
    });

    $('.header__block-address','.header__block-mid').click(function(){
        document.location.href= main_protocol +'//'+ _site + $(this).data('link');
    });

    $('.footer-block__to-fullversion').click(function(e){
        var _ths = $(e.currentTarget);
        var _version = 0;
        if(_ths.hasClass('b-full-version'))
            _version = 1;
        setCookie("showMain", _version, 2, "/", '.santehtop.ru', true);
        location.reload();
        return false;
    });



function _setcrumbs(){
    if($('.prod-box').length){
        var groupId = $('.prod-box').data('gid');
        var _b = $('.crumbs');
        var url = '/ajaxloadgroups/'+groupId+'/';
        var options = {
            url : url,
            type : 'POST',
            dataType : 'json',
            beforeSend : function(){
                _b.removeClass('crumbs--error').addClass('crumbs--loading');
            },
            success :  function(js){
                _b.replaceWith($(js.data));
                _b.removeClass('crumbs--loading');
                /*$('.crumbs-ul__li').hover(function(){$(this).toggleClass('crumbs-ul__li--hover')},function(){$(this).toggleClass('crumbs-ul__li--hover')});*/
            },
            error : function(){
                _b.removeClass('crumbs--loading').addClass('crumbs--error');
            },
            cache : false,
            async : true
        }
        if(groupId)
            $.ajax(options);
    }
}

function _bindacts(){
    $('.prod-catalog .prod-img-li').unbind('click').bind('click', function(){
        var _pil = $(this);
        var _pilsrc = _pil.data('src');
        if(!_pil.hasClass('prod-img-li--active')){
            _pil.closest('.prod-img-list').find('.prod-img-li').removeClass('prod-img-li--active');
            _pil.addClass('prod-img-li--active');
            _pil.closest('.prod-catalog').find('.prod-img img').attr('src',_pilsrc);
        }
    });

    $('.prod-catalog .prod-video-li a').unbind('click').bind('click', function(){
        var _pvl = $(this);
        var _vlnk= _pvl.attr('href');
        $.fancybox.open({
            width: '80%',
            minHeight: '70%',
            padding : 0,
            href:_vlnk,
            type:'iframe',
            beforeLoad: function(){
                $('body').toggleClass('popup__active');
            },
            afterClose: function(){
                $('body').toggleClass('popup__active');
            }
        });
        return false;
    });
    
    $('.iframe-link').unbind('click').bind('click',function(){
        var _href = '';
        if($(this).prop("tagName")=='A'){
            _href = $(this).attr('href');
        }
        else{
            _href = $(this).attr('data-href');
        }
        $.fancybox.open({
            width: '80%',
            minHeight: '70%',
            padding : 0,
            href:_href,
            type:'iframe',
            beforeLoad: function(){
                $('body').toggleClass('popup__active');
            },
            afterClose: function(){
                $('body').toggleClass('popup__active');
            }
        });
        return false;
    });

    $('.ls_group span').unbind('click').bind('click', function(){
        var _ths = $(this);
        var _chck = _ths.closest('.ls_group').hasClass('active');
        $('.ls_group.active').removeClass('active');
        $('.ls_goods_block.open').removeClass('open');
        if(!_chck){
            _grid = _ths.closest('.ls_group').data('group_id');
            $('.ls_group[data-group_id="'+_grid+'"]').addClass('active');
            $('.ls_goods_block[data-group_id="'+_grid+'"]').addClass('open');
        }
    });

    $('.lsg_toggle').unbind('click').bind('click', function(){
        $('.lsg_block').toggleClass('lsg_open');
    });

    bindMore();
}

function _bindcallme(){
        bindOrdCheckbox();

        $('.fast-order .fast-order__form-button').click(function(){
            _chckbx = $('#order-fast-check');
            if(_chckbx.length && (_chckbx.prop('checked')===true || _chckbx.attr('checked')=='checked' || _chckbx.prop('checked')=='checked'))
                _fastOrder();
            else
                _fastCall(); 
        });

        $('.fast-order .cm_field .cm_data').keyup(function(){
            ths = $(this);
            prnt = ths.closest('.cm_field');
            index = ths.data('check');
            check = _checkField(ths, index);
            prnt.removeClass('error ok');
            prnt.find('.cm_error_inform').html('');
            _class = "ok";
            if(!check)
                _class = "error";
            prnt.addClass(_class);
            _checkSend();
        });

        $('#callmeblock .toggle').bind('click',function(){
            ths = $(this);
            prnt = ths.closest('.cm_field');
            prnt.toggleClass('cm_hidden');
        });
    }

    function _checkSend(){
        error = 0;
        $('.fast-order .cm_field .cm_data').each(function(){
            if($(this).closest('.cm_field').hasClass('error')){
                error = 1;
                prnt.find('.cm_error_inform').html('');
            }
            if(!$(this).closest('.cm_field').hasClass('ok')){
                error = 1;
            }
        });
        $('.fast-order__form-button').removeClass('error');
        if(error==1)
            $('.fast-order__form-button').addClass('error');
    }

    function _fastCall(){
        var _ths = $('.fast-order__form-button');
        var _b = $('.fast-order');
        $('.callme_success').html('').hide();
        if(!$('.fast-order__form-button').hasClass('error') && !_b.hasClass('fastcall-loading')){
            var userName = $('.callme_name').val();
            var userPhone = $('.callme_phone').val();
            var userTxt = $('.callme_comment').val();
            var _url = "/ajaxcallmemaybe/";
            var options = {
                url : _url,
                type : 'POST',
                dataType : 'json',
                data: {
                    name: userName,
                    phone: userPhone,
                    txt: userTxt
                },
                beforeSend : function(){
                    _b.removeClass('fastcall-error').addClass('fastcall-loading');
                },
                success : function(js){
                    if(js.result==1){
                        $('.callme_success').show().html(js.orderText);
                        $('.fast-order__form-button').addClass('error');
                        $('.fast-order .cm_field').removeClass('error ok');
                        $('#callmeblock .cm_field .cm_data').val('');
                        bindOrdCheckbox();
                    }
                    else{
                        $('.callme_form').hide();
                        $('.callme_success').show().html('Ошибка отправки! Проверьте данные');
                    }
                    clearTimeout(_to);
                    _to = setTimeout(function(){
                        $('.callme_success').html('').hide();
                    },5000);
                    _b.removeClass('fastcall-loading');
                },
                error : function(){
                    _b.removeClass('fastcall-loading').addClass('fastcall-error');
                },
                cache : false,
                async : true
            };
            $.ajax(options);
        }
    }

    function _fastOrder(){
        var _ths = $('.fast-order__form-button');
        var _b = $('.fast-order');
        $('.callme_success').html('').hide();
        if(!$('.fast-order__form-button').hasClass('error') && !_b.hasClass('fastcall-loading')){
            var userName = $('.callme_name').val();
            var userPhone = $('.callme_phone').val();
            var userTxt = $('.callme_comment').val();
            var _url = "/ajaxfast/";
            var options = {
                url : _url,
                type : 'POST',
                dataType : 'json',
                data: {
                    name: userName,
                    phone: userPhone,
                    txt: userTxt
                },
                beforeSend : function(){
                    _b.removeClass('fastcall-error').addClass('fastcall-loading');
                },
                success : function(js){
                    if(js.result==1){
                        $('.callme_success').show().html(js.orderText);
                        $('#basket').html(js.basket);
                        $('#baskettop').html(js.basket);
                        $('#basketlabel').html(js.basket_label);
                        if($('#basketvklad').length){
                            $('#content').html(''); 
                        }
                        $('.fast-order__form-button').addClass('error');
                        $('.fast-order .cm_field').removeClass('error ok');
                        $('#callmeblock .cm_field .cm_data').val('');
                        bindOrdCheckbox();
                    }
                    else{
                        $('.callme_success').show().html('Ошибка отправки! Проверьте данные');
                    }
                    _b.removeClass('fastcall-loading');
                },
                error : function(){
                    _b.removeClass('fastcall-loading').addClass('b-fast-error');
                },
                cache : false,
                async : true
            };
            $.ajax(options);        
        }
    } 
    
    function bindOrdCheckbox(){
        $('.order-checkbox__input').unbind().bind('change',function(){
            var _ths = $(this);
            _title = 'заказать звонок';
            if(_ths.prop('checked')===true || _ths.attr('checked')=='checked' || _ths.prop('checked')=='checked'){
                _title = 'быстрый заказ';
            }
            $('.fast-order .fast-order__form-button').html(_title);
        });
    }

function _scroll_goods(div){
    
    catcont_top = _catcont.offset().top;
            
    // если мы ниже определённой позиции добавляем класс скролла к <body>
    if(_canscrl){
        if(height_sum + div > catcont_top && check_position==0){
            check_position = 1;
            _body.removeClass('scroll_catalog').addClass('scroll_catalog');
        }

        if(height_sum + div <= catcont_top && check_position==1){
            check_position =0;
            _body.removeClass('scroll_catalog');
            if($('#pageHit_1').html()==''){
                addGoodsInEmptyBlock(1, 1);
            }
            else{
                paging = getScrollPaging(1, count_pages);
                _pagstr.html(paging);
                bindPaging();
                _catcont.find('.catalog-goods__page-hit:not(.'+_ascrl+')').addClass(_ascrl);
                _catcont.find('.catalog-goods__page-hit[data-page="'+1+'"]').removeClass(_ascrl);
                getSeoAndUrl(1);
            }
        }
    }
    /*
    if(height_sum + div >= leftblock_bottom){
        _body.removeClass(_fix_lgoods).addClass(_fix_lgoods);
    }
    else{
        _body.removeClass(_fix_lgoods);
    }
    */
    // добавляем класс к <body> для направления скролла
    last_n = _scrollDirection(last_n, div);
    // для каждого дива page_hit
    $.each(page_hit_array, function(key, el){
        
        // проверяем, чтобы прокручиваемые не учитывались
        check_class = !el[0].hasClass(_ascrl);
        //console.log(div+">="+el[1]+" && "+div+"<"+el[2]+" && "+el[2]+"!="+el[1]);
        // если наше положение совпадает с определённым дивом
        if(div>=el[1] && div<el[2] && el[2]!=el[1] && check_class){

            _cph.removeClass(_ascrl);
            check_class = !el[0].hasClass("loading_page");
            check_html = (el[0].html()=='');
            //console.log(check_html);
            // и див не загружается или пустой
            if(!check_html || check_class){
                    
                if(!el[0].hasClass("activePageHit")){
                    // удаляем классы
                    _cph.removeClass('activePageHit nextPageHit prevPageHit');
                    // добавляем класс активности
                    el[0].addClass('activePageHit');
                    if(el[0].html()==''){
                        if(_newscroll==0)
                            _ajaxparam(0, el[3], 1);
                        else
                            _ajaxscrollnew(el[3]);
                    }
                    // создаем paging
                    paging = getScrollPaging(el[3], count_pages);
                    // если не последняя страница
                    //console.log(el[3]+' '+count_pages);
                    if(el[3]!=count_pages){
                        page_elem = _catcont.find('.catalog-goods__page-hit[data-page="'+(el[3]+1)+'"]');
                        // добавляем класс следующего элемента
                        page_elem.addClass('nextPageHit');
                        side = 0;
                        // если скролл вниз
                        if(_body.hasClass('scroll_down'))
                            side = 1;
                        // если блок пустой добавляем товары
                        if(page_elem.html()==''){
                            scroll_side = 'down';
                            if(_newscroll==0)
                                _ajaxparam(0, el[3]+1, 1);
                            else
                                _ajaxscrollnew(el[3]+1);
                        }
                    }
                    // если не первая страница
                    if(el[3]!=1){
                        page_elem = _catcont.find('.catalog-goods__page-hit[data-page="'+(el[3]-1)+'"]')
                        // добавляем класс предыдущего элемента
                        page_elem.addClass('prevPageHit');
                        side = 0;
                        // если скролл вверх
                        if(_body.hasClass('scroll_up'))
                            side = 1;
                        // если блок пустой добавляем товары
                        if(page_elem.html()==''){
                            scroll_side = 'up';
                            if(_newscroll==0)
                                _ajaxparam(0, el[3]-1, 1);
                            else
                                _ajaxscrollnew(el[3]-1);
                            
                        }
                    }
                    // добавляем paging
                    _pagstr.html(paging);
                    if(check_active_page!=el[3]){
                        getSeoAndUrl(el[3]);
                    }
                    // подключаем скрипты
                    bindPaging();
                    return false;
                }
            }
        }
    });
}

function _scroll_actions(_top){
	_fix_top = 70,
	_height = 65,
    _pos_top = 0,
	_fsize = 16,
	_padding1 = 3,
	_padding2 = 3,
	_width = 180,
	_margin1 = 6,
	_margin2 = 70,
	_margin3 = 23,
	_borderb = 0,
	_opacity = 0;
    if(_top < 65){
    	_variable = (_top / 65);
    	_height = 130 - _top;
        _pos_top = 0 - _top/1.3; /* with ann 24 */
		_fsize = 18 - 2 * _variable;
		_padding1 = 25 - 22 * _variable;
		_padding2 = 40 - 37 * _variable;
		_width = 233 - 53 * _variable;
		_margin1 = 25 - 19 * _variable;
		_margin2 = 40 + 30 * _variable;
		_margin3 = 0 + 23 * _variable;
		_borderb = 1;
		_opacity = 1 - 1 * _variable;
        if(_pos_top<=0){
            _pos_top = 0;
        }
    }
    if(_cif_check){
    	if(_top > 160 && !_cart_itog_fix.hasClass('cart-block__tofix--fixed')){
    		_cart_itog_fix.addClass('cart-block__tofix--fixed');
    	}
    	else if(_top <= 160 && _cart_itog_fix.hasClass('cart-block__tofix--fixed')){
    		_cart_itog_fix.removeClass('cart-block__tofix--fixed');
    	}
    	_el = $('.cart-block-left');  //record the elem so you don't crawl the DOM everytime  
		_el_btm = _el.position().top + _el.outerHeight(true);
		_cart_itog_fix_btm = _top + _cart_itog_fix.outerHeight(true);
		
		if(_el_btm<=_cart_itog_fix_btm){
			_new_fix_top = _fix_top-_cart_itog_fix_btm+_el_btm;
			_cart_itog_fix.css('top',_new_fix_top+'px');
		}
		else{
			_cart_itog_fix.removeAttr('style');	
		}
    }
	$('.header').css('height',_height+'px'); /* height from: 130 height to: 65 */
    $('.header').css('top',_pos_top+'px'); /* top from: 24 to: 0 */
	$('.fastorder').css('font-size',_fsize+'px'); /* font-size from: 18px font-size to: 16px */
	$('.header .cart').css('padding',_padding1+'px 0 '+_padding2+'px 0'); /* padding from: 25px 0 40px 0 padding to: 3px 0 3px 0 */
	$('.header-logo img').css('width',_width+'px'); /* width from: 233 width to: 180 */
	$('.header-logo img').css('margin',_margin1+'px auto 0');  /* margin from: 25px 40px 0 0; margin to: 6px 70px 0 23px;  */
	$('.header__block-midtop').css('border-bottom',_borderb+'px solid #b4b1ab');
	$('.before-main').css('opacity',_opacity);
}

function _fastorderlink(_check, _hard){
	if(_hard==1){

	}
	else{
		txt = 'Быстрый заказ';
		_fastorder.removeClass('fastorder-call');
		if(_check==0){
			_fastorder.addClass('fastorder-call');
			txt = 'Заказать звонок';
		} 
		_fastorder.html('<span>'+txt+'</span>');
	}           
}

/* ==========================================================================
    Buying function
    ========================================================================== */
function _buy(){
    $('.prod-buy__button').unbind().bind('click',function(e){
        var _b = $(e.currentTarget);
        var _gid = _b.data('gid');
        var _count = _b.data('cnt');
            if($('.value[data-gid="'+_gid+'"]').length)
                _count = $('.value[data-gid="'+_gid+'"]').html();
        var _plus = 1;
        var _url = '/addgoodtobasket/';
        var options = {
            url : _url,
            type : 'POST',
            dataType : 'json',
            data: {
                gid: _gid,
                count: _count,
                plus: _plus,
                n: 1
            },
            beforeSend : function(){
                _b.removeClass('buy-error').addClass('buy-loading');
            },
            success : function(js){
                var isInIframe = (window.location != window.parent.location) ? true : false;
                _b.removeClass('buy-loading');

                $('.nearestgift').html('');
                if(js.nearestgift)
                    $('.nearestgift').html('<div class="total-row futuregift nearestgift"><span class="total-row__label">До ПОДАРКА не хватает</span><span id="toGiftSum" class="total-row__value rubl">'+js.nearestgift+'</span></div>'); 

                if(isInIframe){
                    $('.header .cart', $(parent.document)).replaceWith($(js.bm));
                    $('#basketlabel', $(parent.document)).html(js.bl);
                }
                else{
                    $('.header .cart').replaceWith($(js.bm));
                    $('#basketlabel').html(js.bl);
                    _fastorderlink(js.goodsCount, 0);
                    _scroll_actions($(document).scrollTop());
                    _bindfastordercheckbox(); 

                    if(js.bempty!='' && $('#maincontent').length && $('.cart').length){
                        $('#maincontent').html(js.bempty);
                    } 
                }
                _b.closest('.prod-buy').addClass('prod-buy--success');
                setTimeout(function () {
                    _b.closest('.prod-buy').removeClass('prod-buy--success');
                }, 2000);
            },
            error : function(){
                _b.removeClass('buy-loading').addClass('buy-error');
            },
            cache : false,
            async : true
        };
        _flyPhoto(e, _b, _gid); /* Перелеталка в корзину */

        $.ajax(options);
    });
}

    function _flyPhoto(ev, el, goodId){

        // console.log('1');

        if($('#fp_block_'+goodId).length>0 || $('#fp_catalog_'+goodId).length>0 || $('#fp_good_'+goodId).length>0){
            var div = $(document).scrollTop();
            var wid = $(document).width();
            var dWid = $('#wrapper').width();
            $('.clone').remove();
            $('.sp_clone').remove();

            var newleft = 0;
            var newtop = 0;

            var imgLeft = '0px';
            var imgTop = '25px';
        }

        if($('#fp_block_'+goodId).length>0){

            var curWidth = $('#fp_block_'+goodId).width();
            var curHeight = $('#fp_block_'+goodId).height();

            var ofsTop = $('#fp_block_'+goodId).offset().top;
            var ofsLeft = $('#fp_block_'+goodId).offset().left;
            
            newtop = div - ofsTop;
            newleft = dWid - ofsLeft;

            curLeft = 0 ;
            curTop = (226 - curHeight)/2;
            // console.log('screenHeight='+document.screenHeight);
            // console.log('curTop='+curTop);
            // console.log('ofsTop='+ofsTop);
            // console.log('ofsLeft='+ofsLeft);
            // console.log('dWid='+dWid);
            // console.log('newleft='+newleft);
            // console.log('div='+div);
            // console.log('tab_t='+tab_t);
            // console.log('offt='+el.offset().top);
            // console.log('newtop='+newtop);
            // var newleft = wid - 450; //  $(this).offset().left +117; //-201+
            // console.log('curLeft='+curLeft);
            // console.log('wid='+wid);
            // console.log('offl='+el.offset().left);
            // console.log('newleft='+newleft);
            newleft = newleft+'px';
            newtop = newtop+'px';

            curLeft = curLeft+'px';
            curTop = curTop+'px';
            curWidth = curWidth+'px';
            
            $('#fp_block_'+goodId)
                .clone()
                .addClass("clone")
                .insertAfter('#fp_block_'+goodId)
                .attr('src',$('#fp_block_'+goodId).attr('rel'))
                .css({'top':(curTop),'left':(curLeft),'width':(curWidth)})
                .fadeIn('fast')
                .animate({ 
                            width: "20px",
                            height: "20px",
                            opacity: 0,
                            left: newleft,
                            top: newtop
                        }, 700 )
                ;
            // alert($(this).offset().left +'='+ $(this).offset().top +'='+div);
        }

        if($('#fp_catalog_'+goodId).length>0){
            var curWidth = $('#fp_catalog_'+goodId).width();
            var curHeight = $('#fp_catalog_'+goodId).height();

            var ofsTop = $('#fp_catalog_'+goodId).offset().top;
            var ofsLeft = $('#fp_catalog_'+goodId).offset().left;

            curLeft = ofsLeft - 80; // curWidth/2;
            curTop = ofsTop - curHeight/2;

            newtop = div-80; // ofsTop - div;
            newleft = dWid - 150;

            curLeft = curLeft+'px';
            curTop = curTop+'px';
            curWidth = curWidth+'px';

            newleft = newleft+'px';
            newtop = newtop+'px';

            $('#fp_catalog_'+goodId)
                .clone()
                .addClass("clone")
                .insertAfter('#bCatalog')
                /*.insertAfter('#fp_catalog_'+goodId)*/
                .attr('src',$('#fp_catalog_'+goodId).attr('rel'))
                .css({'top':(curTop),'left':(curLeft),'width':(curWidth)})
                .fadeIn('fast') /* ; */
                .animate({ 
                            width: "20px",
                            height: "20px",
                            opacity: 0,
                            left: newleft,
                            top: newtop
                        }, 700 );
                ;
                /* */

        }

        if($('#fp_good_'+goodId).length>0){
            var curWidth = $('#fp_good_'+goodId).width();
            var curHeight = $('#fp_good_'+goodId).height();

            var ofsTop = $('#fp_good_'+goodId).offset().top;
            var ofsLeft = $('#fp_good_'+goodId).offset().left;

            curLeft = ofsLeft -50; //  - curWidth/2;
            curTop = ofsTop - 100; //  - curHeight/2 + 70;

            newtop = div-80; // ofsTop - div;
            newleft = dWid - 150;

            curLeft = curLeft+'px';
            curTop = curTop+'px';
            curWidth = curWidth+'px';

            newleft = newleft+'px';
            newtop = newtop+'px';

            $('#fp_good_'+goodId)
                .clone()
                .addClass("clone")
                .insertAfter('#fp_good_'+goodId)
                .attr('src',$('#fp_good_'+goodId).attr('rel'))
                .css({'top':(curTop),'left':(curLeft),'width':(curWidth)})
                .fadeIn('fast')
                .animate({ 
                            width: "20px",
                            height: "20px",
                            opacity: 0,
                            left: newleft,
                            top: newtop
                        }, 700 )
                ;
        }
    }

/*  ========================================================================== */

/* ==========================================================================
    Counter function
    ========================================================================== */

    function _bindcounter(){
        $('.plus-minus-block .minus').unbind().bind('click',function(e){
            var _b = $(e.currentTarget);
            var _prnt = _b.closest('.plus-minus-block');
            _setcnt(_b, -1*_prnt.data('lcm'), 0);
        });

        $('.plus-minus-block .plus').unbind().bind('click',function(e){
            var _b = $(e.currentTarget);
            var _prnt = _b.closest('.plus-minus-block');
            _setcnt(_b, 1*_prnt.data('lcm'), 0);
        });

        $('.delete-good').unbind().bind('click',function(e){
            var _b = $(e.currentTarget);
            var _gid = _b.data('gid');
            _setcnt($("#count"+_gid), $("#count"+_gid).html()*(-1), 1);
        });
    }

    function _setcnt(_b, _val, _del){
        var _prnt = _b.closest('.plus-minus-block');
        var _gid = _prnt.data('gid');
        var _is_basket = 0;
        if($('#bc_good'+_gid).length)
            _is_basket = 1;

        var _count = _prnt.find('.value').html()*1;
        _result = _count+_val;
        if(_result==0 && _is_basket==0)
            _result = 1;
        if(_result>0 || _del==1){
            _prnt.find('.value').html(_result);
            if(_is_basket)
                _bchange();
        }
    }

    function _bchange(){
        var _b = $('.cart-goods');
        var _gid = '';
        var _count = '';
        var _plus = '';
        var _rows = _b.find('.plus-minus-block .value');
        _rows.each(function(e){
            _gid += ((e!=0)?',':'') + $(this).data('gid');
            _count += ((e!=0)?',':'') + $(this).html();
            _plus += ((e!=0)?',':'') + 0;
        });
                
        var _url = '/addgoodtobasket/';
        var options = {
            url : _url,
            type : 'POST',
            dataType : 'json',
            data: { 
                gid: _gid,
                count: _count,
                plus: _plus,
                n: 1,
                full: 1
            },
            beforeSend : function(){
                _b.removeClass('basket-error').addClass('basket-loading');
            },
            success : function(js){
                _b.removeClass('basket-loading');

                 $('.header .cart').replaceWith($(js.bm));
                _fastorderlink(js.goodsCount, 0);
                $('#basketlabel').html(js.bl);
				_bindfastordercheckbox();

                if(js.addgift && $('.cart-goods').length){
                    location.reload();
                    return true;
                }

                $('.nearestgift').html('');
                if(js.nearestgift)
                    $('.nearestgift').html('<div class="total-row futuregift nearestgift"><span class="total-row__label">До ПОДАРКА не хватает</span><span id="toGiftSum" class="total-row__value rubl">'+js.nearestgift+'</span></div>'); 

				_scroll_actions($(document).scrollTop());

                if(js.bempty!=''){
                    if($('#maincontent').length && $('.cart').length){
                        $('.cart').replaceWith($(js.bempty));
                    } 
                }
                else{
                    $('.cart-good__row').addClass('to_del');
                    $('#goodsCount').html(js.allcount);
                    $('#bonusSummInput').val('');

                    $('.prod-price__old').remove();
                    $.each(js.goods, function(_id, _g){
                        // full cart
                        if(_g._oprice!=0)
                            $('#bc_'+_id+' .prod-price__now').before('<span class="prod-price__old">'+_g._oprice+'</span>');

                        $('#bc_'+_id+' .prod-price__now').html(_g._bprice);
                        $('#bc_'+_id+' .cart-price__total').html(_g._bcost);
                        $('#bc_'+_id).removeClass('to_del');
                    });
                    $('.to_del').remove();
                    _correctingItog();
                }
            },
            error : function(){
                _b.removeClass('basket-loading').addClass('basket-error');
            },
            cache : false,
            async : true
        };
        $.ajax(options);
    }
/*  ========================================================================== */

    function _getDiscountFromStr(dsc,sum){
        rd = 0;
        var incr = $.trim(dsc);
        var isProc = incr.slice(-1);    // определение: процент ли?
        if(isProc=='%'){
            incr = incr.substr(0, (incr.length-1));
            incr = incr-0;
            rd = Math.floor(sum*incr/100);
        }
        else{
            rd = incr;
        }
        return rd;
    }

    function _correctingItog(){
        var _itog = 0;
        var _bitog = 0;
        var _dsc_itog = 0;
        var _allCount = 0;

        var _promocode = '';
            if(_promocodeInput.length){
                _promocode = _promocodeInput.val();
                _promocode = $.md5(_promocode);
            }
        var _dsc_pr = 0;
        var promo_dsc=0;
        var _bpd = '';
            _bonusPayMax = 0;
        if(promodata && promodata[_promocode])
            _bpd = promodata[_promocode];
        var _databonuspay = 0;
        var _length = $('.plus-minus-block').length;
        var _dv = 1000000000;
        _giftprc = 0;
        $('.plus-minus-block').each(function(){
            _ths = $(this);
            _cnt = _ths.find('.value').html()*1;
            if(_ths.closest('.cart-good__row').find('.cart-gift').length)
                _giftprc += 1*_cnt;
            _databonuspay = $.trim( _ths.data('bonuspay') );
            _tmpprc = _prc = _ths.closest('.cart-good__row').find('.prod-price__now').html().replace(/[^0-9]/g, '')*1;
            tdv = _ths.data('dv');
            if(_dv>tdv);
                _dv = tdv;
            promo_dsc_tmp = 0;
            if(_bpd){
                _dsc_pr = 0;
                _el_prod = _ths.data('prod');
                _el_glst = _ths.data('grtids');
                _el_no = _ths.data('no');

                _pd_code = _bpd.code;
                _dsc_pr = _pd_dsc = _bpd.dsc;
                _pd_nodsc = _bpd.nodsc;
                _pd_norrc = _bpd.norrc;
                _pd_frml = _bpd.frml;
                if(_pd_nodsc==1 && _el_no!='' && _el_no.charAt(0)==1)
                    _dsc_pr = 0;
                if(_pd_norrc==1 && _el_no!='' && _el_no.charAt(1)==1)
                    _dsc_pr = 0;
                //console.log(_dsc_pr);
                if(_pd_frml.length){
                    var _stop_each = 0;
                    $.each(_pd_frml, function(_frmlk, _frmlv){
                        _grsrch = ','+_frmlv.gr+',';
                        _no = _frmlv.no;
                        _false = 0;
                        if(_frmlv.gr!='' && _el_glst.indexOf(_grsrch)===false)
                            _false = 1;
                        //console.log(_false);
                        if(_frmlv.pr!='' && _frmlv.pr!=_el_prod)
                            _false = 1;
                        //console.log(_false);
                        //console.log(_false+' '+_frmlv.pr+' '+_el_prod);
                        if(_no.charAt(0)==1 && _el_no.charAt(0)==1)
                            _false = 1;
                        //console.log(_false);
                        if(_no.charAt(1)==1 && _el_no.charAt(1)==1)
                            _false = 1;
                        //console.log(_false);
                        //console.log(_frmlv.dsc);
                        if(_stop_each==0){
                            if(!_false){
                                _dsc_pr = _frmlv.dsc;
                                _stop_each = 1;
                            }else
                                _dsc_pr = 0;
                        }
                    });
                }
                //console.log(_el_no+' '+tmp+' '+_dsc_pr);
                if(_dsc_pr=='0')
                    promo_dsc_tmp = 0;
                else
                    promo_dsc_tmp = _getDiscountFromStr(_dsc_pr, _tmpprc)*1;
                //console.log(promo_dsc_tmp);
            }
            //console.log(promo_dsc);
            promo_dsc += promo_dsc_tmp*1*_cnt;

            _bonuspay = _bonusRow.data('bpay');
            if(_databonuspay!=''){
                _bonuspay = _databonuspay;
            }
            //console.log(_bonuspay+' '+ (tmp*count) +' '+_getDiscountFromStr(_bonuspay, tmp*count))
            _bonusPayMax += _getDiscountFromStr(_bonuspay, _tmpprc*_cnt);
            _itog += (_cnt * _tmpprc);
            if(_ths.data('nodsc')==0)
                _dsc_itog += (_cnt * _tmpprc);

            _allCount += (1 * _cnt);
        });


    /**************************************************************************************************************/

        _itog = _itog.toFixed(0);
        _itog = _itog-0;

        _dscTitle = "";
        _dscValue = 0;
        _realdsc = 0;

        if(!promosumm)
            promosumm = 0;

        itog_text = 'ВСЕГО';

        if((promosumm==1 || _realdsc==0) && promo_dsc!=0){
            itog_text += ' + ПРОМОКОД';
            _realdsc += promo_dsc;
            _dscTitle += ' + Промокод ('+_promocodeInput.val()+')'; // +' - '+_dsc_pr
            _dscValue = _realdsc;
        }

        $('.total-final-row__label').html(itog_text);
        $('#dscttl').val(_dscTitle);
        $('#dscval').val(_dscValue);

        _promocodeDiscount.removeClass('rubl promominus').html('');
        if(_dscValue!=0)
            _promocodeDiscount.addClass('rubl promominus').html(_dscValue);

        if(_realdsc!=0){
            _itog = _itog - _realdsc;
        }
        _bitog = _itog;

        if(_bonusSummInput.val()!=0 && _bonusRow.hasClass('bonus-ok')){
            _itog = _itog - _bonusSummInput.val()*1;
            $('#bonusNumber').val(_bonusInput.val());
        }
        
        $('.tbonus').hide();
        $('#bonusAdd').val(0);
        _bmin = _bonusRow.data('bmin');
        _bval = _bonusRow.data('bval');

        if(_bmin<=_itog){
            if(_bval!=''){
                _tobvalgood = 0;
                _getfromitog = 0;
                _tobval = 0;
                _bvalarr = _bval.split(',');
                $('.plus-minus-block').each(function(){
                    var _ths = $(this);
                    var _cnt = _ths.find('.value').html()*1;
                    var _tmpprc = _prc = _ths.closest('.cart-good__row').find('.prod-price__now').html().replace(/[^0-9]/g, '')*1;

                    var _bnsval = _ths.data('bonusval');
                    if(_bnsval!='' && _bnsval){
                        _tobval += _cnt*_getDiscountFromStr(_bnsval, _tmpprc);
                    }
                    else{
                        _tobval_tmp = 0;
                        $.each(_bvalarr, function(_karr, _varr){
                            _bv = _varr.split('=');
                            if(_bv[0]*1<=_tmpprc*1){
                                _tobval_tmp = _getDiscountFromStr(_bv[1], _tmpprc*_cnt);
                            }
                        });
                        _tobval += _tobval_tmp;
                    }
                });   
                if(_tobval!=0){
                    $('#bonusAdd').val(_tobval);
                    $('.tbonus span').html("+"+_tobval+" бонусов на карту");
                    $('.tbonus').show();
                }
            }
        }

        if(_bonusSummInput.val()!=0){
            _tobval = _bonusSummInput.val();
            $('#bonusValue').val(_tobval);
        }

        $('#goodsPrice').html(number_format(_itog, 0, '.', ' ')); 
		_bs = $('#dostSumm').val()*1;
		_to_dlv = _dv; //$('#dostPriceDef').val()*1;
		_to_free = _bs-_itog;
		if(_itog>_bs){
			_to_free = 0;
			_to_dlv = 0;
		}
        _fdtr = $('.free-delivery-price').closest('.total-row');
        if(_to_free==0){
            _fdtr.hide();
        }
        else{
            _fdtr.show();
        }

		$('.free-delivery-price').html(number_format(_to_free, 0, '.', ' '));
		$('.delivery-row .dlv_lbl .b-radio__input').val(_to_dlv);
        $('.delivery-row .reg_lbl .b-radio__input').val(_to_dlv);
        $('.delivery-row .dlv_lbl .value').removeClass('rubl');
        if(_to_dlv==0){
            $('.delivery-row .dlv_lbl .value').html('бесплатно');
            $('.delivery-row .reg_lbl .value').html('0');
        }
        else{
            $('.delivery-row .dlv_lbl .value').addClass('rubl');
            $('.delivery-row .dlv_lbl .value').html(number_format(_to_dlv, 0, '.', ' '));
            $('.delivery-row .reg_lbl .value').html(number_format(_to_dlv, 0, '.', ' '));
        }	

        _dostValue = $('.delivery-row input:checked').val().replace(/[^0-9]/g, '')*1;
        $('.fDelivPrice').val(_dostValue);

        $('.total-gift-row__label').html('')
        
        if(_giftprc>0){
            $('.total-gift-row__label').html('включая подарки ('+_giftprc+')');
        }

        _itog = _itog + _dostValue + _giftprc;
        $('#itog').html(number_format(_itog, 0, '.', ' ')); 

        return _bitog;
    }

    function _chngDlv(){
        console.log(1);
        var _obj = $('.delivery-row input:checked');
        var _fld = _obj.data('confirm');
        var _url = '/ajaxsavebasketdata/';
        var options = {
            url : _url,
            type : 'POST',
            dataType : 'json',
            data: {
                val: _obj.data('toajax'),
                fld: _obj.data('confirm')
            },
            beforeSend : function(){
                _obj.removeClass('save-error').addClass('save-loading');
            },
            success : function(js){
                _obj.addClass('saved');
                _obj.removeClass('save-loading');
            },
            error : function(){
                _obj.removeClass('save-loading').addClass('save-error');
            },
            cache : false,
            async : true
        };
        $.ajax(options);

        dlvType = 5;
        if($('.delivery-row input:checked').hasClass('sam'))
        	dlvType = 1;

        adr ='';
        if(dlvType==1){
            adr ='САМОВЫВОЗ';
        }
        city='';
        if(dlvType==1){
            city ='МОСКВА';
        }
        if($('.delivery-row input:checked').hasClass('msk'))
            city ='МОСКВА';

        $('#idfAdr').prop('disabled', false);
        $('#idfCity').prop('disabled', false);

        if($.trim($('#idfAdr').val().toLowerCase() )!='самовывоз' && $.trim($('#idfAdr').val().toLowerCase() )!='')
            adr = $('#idfAdr').val();

        if($.trim($('#idfCity').val().toLowerCase() )!='москва' && $.trim($('#idfCity').val().toLowerCase() )!='')
            city = $('#idfCity').val();

        if(dlvType==5 && adr == 'САМОВЫВОЗ'){
            adr ='';
        }

        $('#idfAdr').val(adr).trigger('change');
        $('#idfCity').val(city).trigger('change');

        if(adr=='САМОВЫВОЗ' && dlvType==1)
            $('#idfAdr').prop('disabled', true);

        if(city=='МОСКВА' && dlvType==1)
            $('#idfCity').prop('disabled', true);
        
        _dostPr = $('.delivery .delivery-row input:checked').val()
        $('.fDelivTypeId').val(dlvType);
        $('.fDelivPrice').val(_dostPr);

        _correctingItog();
    }

    function number_format(number, decimals, dec_point, thousands_sep ) {
        var i, j, kw, kd, km;
        if( isNaN(decimals = Math.abs(decimals)) ){
            decimals = 2;
        }
        if( dec_point == undefined ){
            dec_point = ",";
        }
        if( thousands_sep == undefined ){
            thousands_sep = ".";
        }

        i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

        if( (j = i.length) > 3 ){
            j = j % 3;
        } else{
            j = 0;
        }
        km = (j ? i.substr(0, j) + thousands_sep : "");
        kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
        kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
        return km + kw + kd;
    }

    function setCookie(name, value, expires, path, domain, secure) {
        var expire_date = new Date();
            expire_date.setDate(expire_date.getDate() + expires);
            
        document.cookie = name + "=" + escape(value) +
            ((expires) ? "; expires=" + expire_date : "") +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            ((secure) ? "; secure" : "");
    }

/*  ========================================================================== */

/* ==========================================================================
    Basket function
    ========================================================================== */

    

function _bindbasket(){
    $('.cart-input_rcheck').each(function(){
        _checkObj($(this));
    });

    $('.cart-input_rcheck').unbind().bind('keyup',function(e){
        _checkObj($(this));
    }).bind('change',function(e){
        _checkObj($(this));
    });

    $('.b-order-form__agreement input').unbind().bind('change',function(e){
        _checkButtonStatus();
    });

    $('.cart-input_bf_field').bind('change',function(){
        var _obj = $(this);
        var _fld = _obj.data('confirm');
        var _url = '/ajaxsavebasketdata/';
        var options = {
            url : _url,
            type : 'POST',
            dataType : 'json',
            data: {
                val: _obj.val(),
                fld: _obj.data('confirm')
            },
            beforeSend : function(){
                _obj.removeClass('save-error').addClass('save-loading');
            },
            success : function(js){
                _obj.addClass('saved');
                _obj.removeClass('save-loading');
            },
            error : function(){
                _obj.removeClass('save-loading').addClass('save-error');
            },
            cache : false,
            async : true
        };
        $.ajax(options);
    })
}

function _checkObj(obj){
    var checkResult = _checkField(obj,obj.data('cid'));
    var currentCheckElement = checkArrayExprs[obj.data('cid')];
    var currentErrorMessage = currentCheckElement[3];
    prnt = obj.closest('.cart-input__block');
    if (checkResult) {
        prnt.removeClass('cart-input__error').addClass('cart-input__ok');
        obj.prop('title','');
    }
    else {
        prnt.removeClass('cart-input__ok').addClass('cart-input__error');
        obj.prop('title',currentErrorMessage);
    }

    /* физ лицо */
    _checkButtonStatus();
}

/* UPD 12-12-2019: для ЮР лица оставить только имя,телефон,почта  по письму support@ 10-12-2019 в 15:55 */
/* WAS : ($('.cart-comp--active').length && $('.cart-input__block.cart-input__block-main.cart-input__ok').length==10) */
function _checkButtonStatus(){
    if( (
        ($('.cart-user--active').length && $('.cart-input__block.cart-input__block-main.cart-input__ok').length>=4) 
        || 
        ($('.cart-comp--active').length && $('.cart-input__block.cart-input__block-main.cart-input__ok').length>=3)
        ) 
        && 
        $('.b-order-form__agreement input:checked').length
    ){
        $('.cart-form__button-block').removeClass('cart-form__button--inactive');
    } else {
        $('.cart-form__button-block').addClass('cart-form__button--inactive');
    }
}

function _checkField(fieldObjToTest, checkArrayIndex){ //, divObjToError, errorMessage){
    var curExpr = checkArrayExprs[checkArrayIndex];
    var re = new RegExp(curExpr[2]);
    var bad = false;
    var _val = $.trim(fieldObjToTest.val());
    if (!re.test(_val) && curExpr[0]>0) 
        bad = true;

    if(_val.length < curExpr[0] || _val.length > curExpr[1])
        bad = true;
    if(bad)
        return false;

    return true;
}

/* ========================================================================== */

/* =========================================================================
Gift function
========================================================================== */

function _bindgift(){
    $('.giftselradio').change(function(){
        var _ths = $(this);
        var _prnt = _ths.closest('.item');
        var _url = '/ajaxchangegiftsum/';
        if(!_prnt.hasClass('active') && !_prnt.hasClass('giftsum-loading')){
            var options = {
                url : _url,
                type : 'POST',
                dataType : 'json',
                data: { 
                    gid: _ths.data('gid')
                },
                beforeSend : function(){
                    _prnt.removeClass('giftsum-error').addClass('giftsum-loading');
                },
                success : function(js){
                    _prnt.removeClass('giftsum-loading');
                    $('.select-gift .item').removeClass('active');
                    _prnt.addClass('active');
                },
                error : function(){
                    _prnt.removeClass('giftsum-loading').addClass('giftsum-error');
                },
                cache : false,
                async : true
            };
            $.ajax(options);
        }
    });
}

/* ========================================================================== */

/* =========================================================================
Bonus function
========================================================================== */
    function _bindbonus(){
        _bonusInput.bind('change',_setBonusCard);
        _bonusRow.bind('change', _setBonusAction);
        _promocodeInput.bind('change',_setPromoDcs);
    }

    function _setBonusCard(){
        var _ths = $(this);
        _confirm = _bonusInput.data('confirm');
        to_ajax = _bonusInput.val();
        if(to_ajax=='')
            to_ajax='-';
        _url = main_protocol +'//'+ _site + '/ajaxsavebasketdata/';
        var options = {
            url : _url,
            type : 'POST',
            dataType : 'json',
            data: {
                val: to_ajax,
                fld: _confirm
            },
            beforeSend : function(){
                _ths.removeClass('basket-error').addClass('basket-loading');
            },
            success : function(js){
                _ths.removeClass('basket-loading');
                if(js.field=='idfbonus'){
                    $('#bonusRow').removeClass('bonus-ok').addClass('bonus-error');
                    $('#bonusInput').data('bonusfull', '');
                    $('#bonusInput').prop('data-bonusfull', '');
                    if(js.bonusstat==1){
                        $('#bonusRow').removeClass('bonus-error').addClass('bonus-ok');;
                        $('#bonusInput').data('bonusfull', js.bonusval);
                        $('#bonusRow').trigger('change');
                    }
                }
            },
            error : function(){
                _ths.removeClass('basket-loading').addClass('basket-error');
            },
            cache : false,
            async : true
        };
        $.ajax(options);
    }

function _setBonusAction(){
    _fullhtml = _bonusRow.find('#bonusInput').data('bonusfull');
    if(_bonusInput.val()!=''){
        if(_fullhtml!=0){
            _linkhtml = '<i class="bvalue-link bvalue-link__max">max</i> <i class="bvalue-link bvalue-link__all">все</i>';
            _bonusRow.find('.bvalue-links').html(_linkhtml);
        }

        _bonusRow.find('.bvalue-full').html(_fullhtml);
    }

    $('.bvalue-link').unbind().bind('click', function(){
        var _ths = $(this);
        _correctBonusInput(_ths);
    });

    _bonusSummInput.unbind().bind('change', function(){
        var _ths = $(this);
        _correctBonusInput(_ths);
    });

    _correctingItog();
}

function _correctBonusInput(_ths){
    var _max = 0;
    var _set = 0;
    var _itg = _correctingItog(0, 1);
    var _bpaymin = _bonusRow.data('bpaymin')*1;
    var _bpay = _bonusRow.data('bpay');
    var _bfull = _bonusRow.find('#bonusInput').data('bonusfull');
    
    if(_itg>_bpaymin){
        _max = _getDiscountFromStr(_bpay, _itg);
        if(_bonusPayMax!=0)
            _max = _bonusPayMax;
        if(_ths.hasClass('bvalue-link__max')){
            _set = _max;
            if(_max>_bfull)
                _set = _bfull;
        }
        else if(_ths.hasClass('bvalue-link__all')){
            if(_bfull<=_max)
                _set = _bfull;
            else
                _set = _max;
        }
        else{
            _set = _bonusSummInput.val();
            if(_set>_bfull)
                _set = _bfull;
            if(_max<_set)
                _set = _max;
        }
        _bonusSummInput.val(_set);
        _correctingItog();
    }
    else{
        _bonusSummInput.val(0);
    }
}

function _setPromoDcs(){
    if(_promocodeInput.length){
        _prcd = _promocodeInput.val();
    
        _prcd = $.md5(_prcd);
        _promocodeInput.data('discount','').attr('data-discount','').prop('data-discount','');

        _confirm = _promocodeInput.data('confirm');
        to_ajax = _promocodeInput.val();

        if(to_ajax=='')
            to_ajax='-';

        _url = main_protocol +'//'+ _site + '/ajaxsavebasketdata/';
        var options = {
            url : _url,
            type : 'POST',
            dataType : 'json',
            data: {
                val: to_ajax,
                fld: _confirm
            },
            beforeSend : function(){
                _promocodeInput.removeClass('basket-error').addClass('basket-loading');
            },
            success : function(js){
                _promocodeInput.removeClass('basket-loading');
                _correctingItog();
            },
            error : function(){
                _promocodeInput.removeClass('basket-loading').addClass('basket-error');
            },
            cache : false,
            async : true
        };
        $.ajax(options);
    }
}
/* ========================================================================== */

/* =========================================================================
Create order function
========================================================================== */

function _bindfastordercheckbox(){
    $('#order-fast-check').unbind().bind('change',function(){
    	_fastorderlink($('#order-fast-check:checked').length, 1);
    });
}

function _bindordercreation(){
    $('.create_order').unbind().bind('click',function(e){
        var _b = $(e.currentTarget);
        var is_call = 0;
        var error = 0;
        var phone = '';
        var _fio = 'Быстрый заказ';
        var _email = '';
        var _addr = '';
        var _city = '';
        var phone2 = '';
		var _com = '';
		var _uzn = '';
		var _inn = '';
		var _kpp = '';
		var _legaddr = '';
		var _bankacc = '';
		var _corracc = '';
		var _banknumb = '';
        var _fDelType = 0;
        var _fDelZaMkad = '';
        var _dscttl = '';
        var _dscval = '';
        var _bonusval = '';
        var _bonusadd = '';
        var _bonusnmb = '';
        var _fPmntType = 0;
        var _fPmntTxt = 'Наличными';
        var _pmnt = $('.pmnt .b-radio__input:checked');
        if(_pmnt.length){
            _fPmntType = _pmnt.val();

            _fPmntTxt = _pmnt.closest('.b-checkbox').find('.b-checkbox__label').html();
        }
        var _fLiftType = 0;
        var _fLiftTxt = 'Не нужен';
        var _lift = $('.lift .b-radio__input:checked');
        if(_lift.length){
            _fLiftType = _lift.val();
            _floor = '';
            if(_fLiftType!=0)
                _floor = $('#lift'+_fLiftType+'flr').val();
            _fLiftTxt = _lift.closest('.b-checkbox').find('.b-checkbox__label').html();
            if(_floor!='')
                _fLiftTxt += ' ('+_floor+' этаж)';
        }
        var _fMntgType = 0;
        var _fMntgTxt = 'Не нужна';
        var _mntg = $('.mntg .b-radio__input:checked');
        if(_mntg.length){
            _fMntgType = _mntg.val();

            _fMntgTxt = _mntg.closest('.b-checkbox').find('.b-checkbox__label').html();
        }
        if($('.fDelivTypeId').length)
        	_fDelType = $('.fDelivTypeId').val();

        console.log('_fDelType='+_fDelType);

        if($('#zaMkadflr').length && _fDelType=='5')
            _fDelZaMkad = $('#zaMkadflr').val();

        console.log('_fDelZaMkad='+_fDelZaMkad);



        var _dostPrice = 0;
        if($('.fDelivPrice').length)
        	_dostPrice = $('.fDelivPrice').val();
        if(_b.hasClass('fast_menu')){
            is_call = 1;
            _fio = 'Заказ звонка';
            if($('#order-fast-check:checked').length){
                is_call = 2;
                _fio = 'Быстрый заказ';
            }
            phone = $('.fast_menu_phone').val();
            if(phone=='')
                error = 1;
        }
        if(_b.hasClass('fast_phone')){
            is_call = 2;   
            phone = $('.fast_phone_val').val();
            if(phone=='')
                error = 1;
        }
        if(_b.hasClass('full_order')){
            if(_b.hasClass('grey')){
                error = 1;
            }else{
                phone = $.trim($('#idfTel').val());
                phone2 = $.trim($('#idfTel2').val());
                _fio = $.trim($('#idfName').val());
                _email = $.trim($('#idfMail').val());
                _addr = $.trim($('#idfAdr').val());
                _com = $.trim($('#idfComment').val());
                _city = $.trim($('#idfCity').val());
                
                _uzn = '';
                if($('.cart-form__uznali input:checked').length)
                	_uzn = $('.cart-form__uznali input:checked').val();
                if($('#idfCompName').length)
                    _cname = $('#idfCompName').val();
                if($('#idfCompInn').length)
                    _inn = $('#idfCompInn').val();
				if($('#idfCompKpp').length)
                    _kpp = $('#idfCompKpp').val();
				if($('#idfCompLegAddr').length)
                    _legaddr = $('#idfCompLegAddr').val();
				if($('#idfCompBankAcc').length)
                    _bankacc = $('#idfCompBankAcc').val();
				if($('#idfCompCorrAcc').length)
                    _corracc = $('#idfCompCorrAcc').val();
				if($('#idfCompBankNumb').length)
                    _banknumb = $('#idfCompBankNumb').val();

                if($('#dscttl').length)
                    _dscttl = $('#dscttl').val();
                if($('#dscval').length)
                    _dscval = $('#dscval').val();
                if($('#bonusValue').length)
                    _bonusval = $('#bonusValue').val();
                if($('#bonusAdd').length)
                    _bonusadd = $('#bonusAdd').val();
                if($('#bonusNumber').length)
                    _bonusnmb = $('#bonusNumber').val();
                
            }
        }
        goodid = 0;
        if($('#goodForCreate').length){
        	goodid = $('#goodForCreate').val();
        }
        if($('.cart-form__button-block').hasClass('cart-form__button--inactive'))
            error = 1;
        if(_b.hasClass('co_loading'))
            error = 2;

        if(_fDelZaMkad!=''){
            if(_com!='')
                _com += "\r\n";
            _com += 'За МКАД : '+_fDelZaMkad+' км. ';
        }

        if(_fPmntTxt!=''){
            if(_com!='')
                _com += "\r\n";
            _com += 'Способ оплаты: '+_fPmntTxt+'. ';
        }

        if(_fLiftTxt!=''){
            if(_com!='')
                _com += "\r\n";
            _com += 'Подъем: '+_fLiftTxt+'. ';
        }

        if(_fMntgTxt!=''){
            if(_com!='')
                _com += "\r\n";
            _com += 'Установка: '+_fMntgTxt+'. ';
        }


        

        if(error == 0 && phone!='' && !_b.hasClass('basket-loading')){
            var _url = '/ajaxcreateorder/';
            var options = {
                url : _url,
                type : 'POST',
                dataType : 'json',
                data: { 
                    ismob: 0,
                    iscall: is_call,
                    phone: phone,
                    fio: _fio,
                    email: _email,
                    addr: _addr,
                    city: _city,
                    phone2: phone2,
					com: _com,
					uzn: _uzn,
                    cname: _cname,
					inn: _inn,
					kpp: _kpp,
					legaddr: _legaddr,
					bankacc: _bankacc,
					corracc: _corracc,
					banknumb: _banknumb,
                    dscttl: _dscttl,
                    dscval: _dscval,
                    bonusval: _bonusval,
                    bonusadd: _bonusadd,
                    bonusnmb: _bonusnmb,
					iscomp: ($('.cart-comp--active').length),
                    goodid: goodid,
                    fDelType: _fDelType,
                    fDelZaMkad: _fDelZaMkad,
                    fPmntType: _fPmntType,
                    fMntgType: _fMntgType,
					dostPrice: _dostPrice
                },
                beforeSend : function(){
                    _b.removeClass('basket-error').addClass('basket-loading');
                },
                success : function(js){
                    if(js.iscall==1)
                        $('.order-fast').html(js.orderText);
                    else
                        location.href = js.returnpath;
                },
                error : function(){
                    _b.removeClass('basket-loading').addClass('basket-error');
                },
                cache : false,
                async : true
            };
            $.ajax(options);
        }
        return false;
    });
}


/*  ========================================================================== */

   function _bindparam(){

        var _check_page = $('.pagination__li--active a').html();
        if(_check_page!=1){
            element = $('#pageHit_'+_check_page);
            if(element.length && $('#pagtop').length && $(document).scrollTop()<$('#pagtop').offset().top){
                $(document).scrollTop(element.offset().top+117);
            }
        }
        
        $(window).bind('popstate', function() {
            href = location.href;
            if(_bfilter.length){
                // href =  href.replace('http://'+_site,'');
                href =  href.replace(main_domain,'');
                var _regex = /\/[0-9]*\/$/;
                new_href = href.replace(_regex,'/');
                old_url = "/getajaxparamsearch/"+$('.ps_link_button').attr('text_id_group');
                new_url = $('.ps_link_button').attr('new_url_group');
                // url_to_ajax = 'http://'+_site+ new_href.replace(new_url,old_url);
                url_to_ajax = main_domain + new_href.replace(new_url,old_url);
                dont_show_finded = 1;
                _ajaxparam(url_to_ajax);
            }
        });

        bindAction();
        _bindCharCross();
        _bindSlider();

        $('.b-filter__clear').click(function(){
            $('.b-filter__charact_span.active').trigger('click');
            _slider = $('.b-filter__param.control4');
            _slider.each(function(){
                _ths = $(this);
                _input_from = _ths.find('.b-input_from').data('start');
                _input_to = _ths.find('.b-input_to').data('start');
                _ths.find('input.b-input_from').attr('value',_input_from).prop('value',_input_from).val(_input_from);
                _ths.find('input.b-input_to').attr('value',_input_to).prop('value',_input_to).val(_input_to);
                _ths.find('.b-input_from').trigger('change');
            });                        
        });

        $(".b-filter__charact_span").unbind('click').bind('click', function(e){
            var _ths = $(this);
            var _prnt =  _ths.closest('.b-filter__param');
            var _control = _prnt.data('control');
            var _check_class = _ths.hasClass(_active_class);
            var _depend = _ths.data('depend');
            var _charid = _ths.data('charid');
            
            _ths.addClass(_loading_class);

            if(_control==1)
                _prnt.find('.b-filter__charact_span').removeClass(_active_class);
            
            if(_check_class)
                _ths.removeClass(_active_class);
            else
                _ths.addClass(_active_class);
            /*
            if(_control == 5){
                if(_depend !== undefined){
                    _child_length = _prnt.find('.b-filter__charact_span[data-depend="'+_depend+'"]').length;
                    _prnt_active = _prnt.find('.b-filter__charact_span[data-depend="'+_depend+'"].'+_active_class).length;
                    _add_class = '';
                    if(_prnt_active==_child_length)
                        _add_class = _active_class;
                    else if(_prnt_active != 0)
                        _add_class = _part_class;
                    _prnt.find('.b-filter__charact_span[data-charid="'+_depend+'"]').removeClass(_part_class+' '+_active_class).addClass(_add_class);
                }
                else{
                    if(_ths.hasClass(_active_class)){
                        if(_ths.hasClass(_part_class))
                            _ths.removeClass(_part_class);
                        _prnt.find('.b-filter__charact_span[data-depend="'+_charid+'"]').addClass(_active_class);
                    }
                    else{
                        _prnt.find('.b-filter__charact_span[data-depend="'+_charid+'"]').removeClass(_active_class);
                        
                    }
                }
            }
            */
            _to_url_str = undefined;
            _ajaxparam(0, 1, 0);

            if(!$('.b-filter--whlinks').length)
            return false;
        });

        $('.control5').each(function(){
            var _ths = $(this);
            var _prnt = _ths.closest('.b-filter__new_row.line');
            //console.log(_prnt.height());
            _ths.css('height',_prnt.height()+'px');
        });

        $('.b-ready-solutions__categories-item').bind('click', function(e){
            var _nav = $('.b-ready-solutions__categories-item');
            var _cnt = $('.b-ready-solutions__tab ');
            _nav.removeClass('b-ready-solutions__categories-item-active');
            _cnt.removeClass('b-ready-solutions__tab-active');

            var index = _nav.index($(this));

            _nav.eq(index).addClass('b-ready-solutions__categories-item-active');
            _cnt.eq(index).addClass('b-ready-solutions__tab-active');
            return false;
        });

        $(".b-filter__has_childs i").unbind('click').bind('click', function(e){
            e.stopPropagation();
            var _ths = $(this).closest('.b-filter__has_childs');
            var _charid = _ths.data('charid');
            var _block = $('.b-filter__charact_value-sub-list[data-depend="'+_charid+'"]');
            var _prnt = _ths.closest('.b-filter__charact_value-item');
            if(_block.length && !_prnt.hasClass('b-show_by_fast')){
                _ths.toggleClass('opened');
                _block.stop().clearQueue().slideToggle();
            }

            return false;
        });
        $(".b-filter__trigger[data-block]").unbind('click').bind('click', function(e){
            var _ths = $(this);
            var _block = $(_ths.data('block'));
            _ths.toggleClass('b-filter__trigger-open');
            _block.stop().clearQueue().slideToggle();
        });

        $(".b-filter__ready-solution-trigger").unbind('click').bind('click', function(e){
            e.stopPropagation();
            _bfilter.toggleClass(_rs_open);
        });

        $(".b-filter__title").unbind('click').bind('click', function(e){
            _close_rs();
        });
        
        $('.b-filter--toggle .b-filter__title').click(function(){
            _bfilter.toggleClass('b-filter--close');
            if (supports_history_api_from_ready() && _catcont.length && _cph.length){
                bindScroll();
            }
        });

        $(".b-filter__categories-search-input").unbind('keyup').bind('keyup', function(){
            var _ths = $(this);
            var _val = _ths.val();
            var _txt = $.trim(_ths.val().toLowerCase());
            var _rounder = _ths.closest('.b-filter__container');

            var _listspan = '.b-filter__charact_value-list .b-filter__charact_span';

            _rounder.find('.b-to_hide').removeClass('b-to_hide');
            _rounder.find('.b-show_by_fast').removeClass('b-show_by_fast');
            _rounder.find(_listspan+' em').contents().unwrap();
            if(_txt.length>2){
                _rounder.addClass('b-active_rounder');
                _rounder.find(_listspan).closest('li').addClass('b-to_hide');
                _rgexp = new RegExp(_val, 'gi');

                findAndReplaceDOMText(document.getElementById(_rounder.prop('id')), {
                  find: _rgexp,
                  wrap: 'em'
                });
                _rounder.find(_listspan+'[data-text*="'+_txt+'"]').closest('li').removeClass('b-to_hide');
                _rounder.find(_listspan+'[data-depend][data-text*="'+_txt+'"]').closest('.b-filter__charact_value-item').addClass('b-show_by_fast').removeClass('b-to_hide');
            }
            else{
                _rounder.removeClass('b-active_rounder');
                _rounder.find('.b-to_hide').removeClass('b-to_hide');
                _rounder.find('.b-show_by_fast').removeClass('b-show_by_fast');
            }
        });

        $(window).unbind('click').bind('click', function(e){
            e.stopPropagation();
            _close_rs();
        });

        _body.unbind('click').bind('click', function(e){
            e.stopPropagation();
            _close_rs();
        });
    }

    function _close_rs(){ // close ready solutions
        if(_bfilter.hasClass(_rs_open))
            _bfilter.removeClass(_rs_open);
    }



    // выбор ползунка
    function _bindSlider(){
        var _range = $('.b-range');
        
        $('.control4').each(function(){
            var _ths = $(this);
            var _range = _ths.find('.b-range');
            var el = _ths.find(".b-range__inner");
            //console.log(el);
            //console.log(el.prop('id'));
            var slider = document.getElementById(el.prop('id'));
            //console.log(slider);
            var options = {
                start: eval(_range.data('start')),
                step:parseInt(_range.data('step'))
            };

            if (_range.data('range')) {
                options.range = _range.data('range');
            } else {
                options.range = {
                    'min': parseInt(_range.data('min')),
                        'max': parseInt(_range.data('max'))
                }
            }
            options.behaviour = "tap";
            options.connect =   true;
            options.direction = "ltr";
            options.orientation =   "horizontal";
            options.step =  1;
            if (options.start.length > 1) {
                options.connect = true;
            }
            noUiSlider.create(slider, options);

            handle0 = el.find(".noUi-origin.noUi-connect");
            handle1 = el.find(".noUi-origin.noUi-background");

            handle1.removeClass('noUi-background');
            correctShift(handle0, handle1);
            slider.noUiSlider.on('update', function( values, handle ) {
                el.trigger(WidgetEvent("update", {
                    values : values
                }));
                //console.log(values);
            })
            slider.noUiSlider.on('slide', function( val, handle, val_ ) {
                if (handle == 1) {
                    correctShift(handle0, handle1);
                }
                _ths.find('.b-input_from').val(val[0]-0);
                _ths.find('.b-input_to').val(val[1]-0);
                
            });
            slider.noUiSlider.on('change', function( values, handle ) {
                _ths.find('.b-input_from').val(values[0]-0);
                _ths.find('.b-input_to').val(values[1]-0);
                _ths.find('.b-input_from').trigger('change');
            })

            _ths.find('.b-input-value__input').change(function(){
                var input = $(this);
                charid = _ths.data('charid');
                _input_from = _ths.find('input.b-input_from').val()-0;
                _slider_from = _ths.find('input.b-input_from').data('val')-0;
                _input_to = _ths.find('input.b-input_to').val()-0;
                _slider_to = _ths.find('input.b-input_to').data('val')-0;
                if(_input_from<_slider_from && input.hasClass('b-input_from'))
                    _input_from = _slider_from;
                if(_input_to>_slider_to && input.hasClass('b-input_to'))
                    _input_to = _slider_to;
                if(_input_from>_input_to && input.hasClass('b-input_from'))
                    _input_from = _input_to;
                if(_input_from>_input_to && input.hasClass('b-input_to'))
                    _input_to = _input_from;
                
                _ths.find('input.b-input_from').attr('value',_input_from).prop('value',_input_from).val(_input_from);
                _ths.find('input.b-input_to').attr('value',_input_to).prop('value',_input_to).val(_input_to);
                if(_input_from!=_ths.find('input.b-input_from').data('start') && input.hasClass('b-input_from'))
                    _ths.find('.b-filter__price-from .b-input-value__clear').show();
                if(_input_from!=_ths.find('input.b-input_to').data('start') && input.hasClass('b-input_to'))
                    _ths.find('.b-filter__price-to .b-input-value__clear').show();
                _to_url_str = undefined;
                slider.noUiSlider.set([_input_from,_input_to]);
                _ths.addClass(_loading_class);
                _ajaxparam(0, 1, 0);
            });

            _ths.find('.b-filter__fast_slider_span').bind('click', function(){
                fast = $(this);
                charid = _ths.data('charid');
                _input_from = _ths.find('input.b-input_from');
                _input_to = _ths.find('input.b-input_to');
                _slider_from = _ths.find('input.b-input_from').data('val')-0;
                _slider_to = _ths.find('input.b-input_to').data('val')-0;
                _fv = fast.data('fv')+'';
                
                _ths.find('.b-filter__fast_slider_span').removeClass('clicked');
                fast.addClass('clicked');
                _fv_arr = _fv.split("-");
                if(_fv_arr.length>1){
                    if(_fv_arr[0]=='')
                        _fv_arr[0] = _slider_from;
                    if(_fv_arr[1]=='')
                        _fv_arr[1] = _slider_to;
                    _from = _fv_arr[0];
                    _to = _fv_arr[1];
                }
                else{
                    _from = _fv*0.95;
                    _to = _fv*1.05; 
                }

                _input_from.attr('value',_from).prop('value',_from).val(_from);
                _input_to.attr('value',_to).prop('value',_to).val(_to);
                _input_from.trigger('change');
            });
        });       
    }

    function correctShift(handle0, handle1){
        var self = this;
        //console.log(handle1);
        var right = 100 - parseFloat(/left:\s*(.*)?%/gi.exec(handle1.attr('style'))[1]);
        handle0.css('right',right+'%' );
    }


    function bindPaging(){
        var self = this;
        $('.pagination__list .pagination__link').unbind('click').bind('click', function(){
            ths = $(this);
            if(!ths.parents('.pagination__li').hasClass('pagination__li--active')){
                _pag = ths.data('page');
                _cph.addClass(_ascrl);
                page_hit = _catcont.find('.catalog-goods__page-hit[data-page="'+_pag+'"]');
                page_hit.removeClass(_ascrl);
                if(page_hit.html() != '' && page_hit.find('.prod').length && supports_history_api_from_ready()){
                    scroll_elem = '#catcont .catalog-goods__page-hit[data-page="'+_pag+'"]';
                    if(_pag==1 || _pag=='1')
                        scroll_elem = '#pagtop';
                    if(ontopme==1)
                        scroll_elem = '1px';
                    if (supports_history_api_from_ready()){
                        $.scrollTo(
                            scroll_elem,
                            {
                                duration:'slow', 
                                offset: {top: scroll_margin}
                            }
                          );
                    }
                    ontopme = 0;
                }
                else{
                    _click = 1;
                    paging = getScrollPaging(_pag, count_pages);
                    _pagstr.html(paging);
                    bindPaging();
                    _ajaxscrollnew(_pag);//_ajaxpagingnew(_pag);
                }
                dont_show_finded = 1;
                if(!_canscrl)
                    getSeoAndUrl(_pag);
            }
            return false;
        });
    }

    function bindMore(){
        $('.more-btn').unbind('click').bind('click', function(){
            var ths = $(this);
            var _page=$('.pagination__list .pagination__li.pagination__li--active .pagination__link').data('page');
            _page++;
            console.log(1);
            if($('.pagination__list .pagination__link[data-page="'+_page+'"]').length){
                _href = $('.pagination__list .pagination__link[data-page="'+_page+'"]').attr('href');
                console.log(_href);
                if(ths.closest('.more').hasClass('more--pl')){
                    console.log(2);
                    location.href = _href;
                }
                else{
                    $('.pagination__list .pagination__link[data-page="'+_page+'"]').trigger('click');    
                }
            }
        });
    }

    function bindAction(){
        if (supports_history_api_from_ready() && _catcont.length && _cph.length){
            bindScroll();
        }
        if(_gid!=1){
            bindPaging();
            bindSort();
        }
        bindView();
        _ontopme();
    }

    function bindView(){
        $('.view-lnk').click(function(){
            if(!$(this).hasClass('__a')){
                $('#bCatalog').removeClass('ctlg-blcks');
                _setcls = 'ctlg-blcks';
                _view = 'blck';
                if($(this).hasClass('view-lnk--line')){
                    _setcls = '';
                    _view = 'line';
                }
                setCookie("goodView", _view, 2, "/", '.santehtop.ru', true);

                $('#bCatalog').addClass(_setcls);

                $('.view-lnk').removeClass('__a');
                $(this).addClass('__a');

                bindScroll();
            }

            return false;
        });
    }

    function bindSort(){
        var self = this;
        $('.sort .sort__link').unbind('click').bind('click', function(){
            var ths = $(this);
            var _type = ths.data('type');
            var _check_class = ths.hasClass('sort__link--active');
            var _addC = '';
            if(_check_class){
                _addC = 'sort__link--down';
                if(ths.hasClass('sort__link--down'))
                    _addC = 'sort__link--up';
            }else{
                _addC = 'sort__link--down';
            }
            _data_url = 'sort='+_type;
            if(_addC=='sort__link--up')
                _data_url += ' desc';
            $('.sort .sort__link').removeClass('sort__link--active sort__link--down sort__link--up');
            ths.attr('data-url',_data_url).addClass('sort__link--active '+_addC);
            if(_body.hasClass('scroll_catalog'))
                ontopme=1;
            _to_url_str = undefined;
            _ajaxparam(0, 1, 0);
            return false;
        });
    }

    function _ontopme(){
        $('.b-pagination__first').unbind('click').bind('click', function(){
            ontopme = 1;
            $('.pagination__link[data-page="1"]').trigger('click');
            return false;
        });
    }

    function bindScroll(){
        if(_cph)
            count_pages = _cph.length;
        if(_canscrl){
            var self = this;
            // Получаем количество страниц по числу добавленных дивов
            
            // получаем наше положение на странице
            div = $(document).scrollTop();
            // переменная для запоминания последнего положения. Чтобы узнать направление скрола
            last_n =0;
            // если мы ниже определённой позиции добавляем класс скролла к <body>
            if(height_sum + div > catpagtop_offset_top){
                check_position = 1;
                _body.removeClass('scroll_catalog').addClass('scroll_catalog');
            }else{
                check_position = 0;
            }
            
            // собираем массив значений для поиска нашего положения относительно дивов
            page_to_load = 0;
            need_next_page_height = _catcont.find('.catalog-goods__page-hit:first').height();
            //console.log(need_next_page_height);
            //console.log('start');
            _cph.each(function(e){
                //console.log('check');
                ths = $(this);
                elem_arr = new Array();
                elem_arr[0] = ths;
                elem_arr[1] = ths.offset().top+scroll_margin-5;
                elem_arr[2] = ths.outerHeight(false)+ths.offset().top+scroll_margin-5;
                elem_arr[3] = ths.data('page');
                //console.log(ths.outerHeight(false)+"+"+ths.offset().top+"+"+scroll_margin+"-"+5);
                page_hit_array[e] = elem_arr;
                if(elem_arr[1]<= height_sum + div && elem_arr[2]> height_sum + div && ths.html()=='' && is_bottom_click!=1){
                    page_to_load = elem_arr[3];
                }
                if(page_to_load==0 && load_page_trigger==0 && ths.html()!='' && elem_arr[3]+1<=count_pages &&
                    elem_arr[2]-need_next_page_height<= height_sum + div && elem_arr[2]> height_sum + div  &&
                    $('#pageHit_'+(elem_arr[3]+1)).length && $('#pageHit_'+(elem_arr[3]+1)).html()==""
                ){
                    page_to_load = elem_arr[3]+1;
                }        
            }); 
            if(page_to_load!=0){
                addGoodsInEmptyBlock(page_to_load, 0);
            }
            load_page_trigger = 1;
            // подключаем скролл
        }
        
    }

    function _scrollDirection(last, next){
        var self = this;
        if(last<=next){
            last = next;
            _body.removeClass('scroll_up scroll_down').addClass('scroll_down');
        }
        else{
            last = next;
            _body.removeClass('scroll_up scroll_down').addClass('scroll_up');
        }
        return last;
    }

    function getScrollPaging(page, count){
        var self = this;
        url = _pagstr.data('url');
        add_to_str = '';
        add_prev = '<li class="pagination__li pagination__prev"><span class="pagination__link"><i class="fa fa-arrow-left" aria-hidden="true"></i></span></li>';
        if(page>1){
            add_prev = '<li class="pagination__li pagination__prev"><a class="pagination__link" href="#" data-page="'+(page-1)+'"><i class="fa fa-arrow-left" aria-hidden="true"></i></a></li>';
        }

        add_to_str += add_prev;
        add_to_str += _setPageCollectionNearest(page, count, url);

        add_next ='<li class="pagination__li pagination__next"><span class="pagination__link"><i class="fa fa-arrow-right" aria-hidden="true"></i></span></li><li class="clear"></li>';
        if(count>page){
            add_next ='<li class="pagination__li pagination__next"><a class="pagination__link" href="#" data-page="'+(page+1)+'"><i class="fa fa-arrow-right" aria-hidden="true"></i></a></li>';
        }
        add_to_str += add_next;
        return add_to_str;
    }
    
    function _setPageCollectionNearest(page, count, url) {
        var self = this;
        pageNumbersArray = new Array();
        pageNumbersArray[0] = 1;
        rangeStart = page - Math.floor(5 / 2);
        rangeEnd = page + Math.floor(5 / 2);
        if (rangeStart < 1) {
            rangeEnd += Math.abs(1 - rangeStart);
            rangeStart = 1;
        }
        if (rangeEnd > count) {
            rangeEnd = count;
        }
        firstRangeMiddle = Math.floor((1 + rangeStart) / 2);
        secondRangeMiddle = Math.floor((count + rangeEnd) / 2);
        if(pageNumbersArray[0]!=firstRangeMiddle)
        pageNumbersArray[1] = firstRangeMiddle;
        j =2;
        for (i = rangeStart; i <= rangeEnd; i++) {
            if(pageNumbersArray[0]!=i){
                pageNumbersArray[j] = i;
                j++;
            }
        }  
        if($.inArray(secondRangeMiddle, pageNumbersArray) == -1)
            pageNumbersArray[j] = secondRangeMiddle;
        if($.inArray(count, pageNumbersArray) == -1)
            pageNumbersArray[j+1] = count;
        
        page_collection ='';
        $.each(pageNumbersArray, function(key, paging){
            if (paging >= 1) {
                name = paging;
                if(((paging == firstRangeMiddle) || 
                    (paging==secondRangeMiddle)) && 
                    paging != 1 && paging != count){
                    name = '...';   
                }  
                curPageStyle ="";
                if(paging==page)
                    curPageStyle = ' pagination__li--active';    
                page_collection += '<li class="pagination__li'+curPageStyle+'" data-page="'+(paging)+'"><a class="pagination__link" href="#" data-page="'+(paging)+'">'+name+'</a></li>';     
            }
        });
        return page_collection;
    }

    function addGoodsInEmptyBlock(page_to_load, _seo){
        var self = this;
        _ajaxscrollnew(page_to_load);
        if(_seo==1){
            getSeoAndUrl(page_to_load);
            paging = getScrollPaging(page_to_load, count_pages);
            _pagstr.html(paging);
        }
        bindPaging();
        _catcont.find('.catalog-goods__page-hit:not(.'+_ascrl+')').addClass(_ascrl);
        _catcont.find('.catalog-goods__page-hit[data-page="'+page_to_load+'"]').removeClass(_ascrl);   
    }

    function getSeoAndUrl(page_to_load){
        var self = this;
        var url = $('#bCatalog').data('url');
        page = "/"+page_to_load+"/";
        if(page_to_load==1)
            page = "/";
        if(url){
            to_pushState = url.replace('/:pageNumber:/',page);
            to_pushState = _ajaxparam(1, page_to_load, 1);

            window.history.pushState(null, null,to_pushState);
        }
    }

    function _ajaxparam(geturl, page, scroll){
        clearTimeout(_ajax_timeout);
        
        if(_gid==1)
            return false;

        if(_to_url_str==undefined || scroll!=0){
            _bfilter.removeClass(_loading_class);
        if(!page)
            _page = 1;
        else
            _page = page;

        many = 0;
        _url_arr = {};
        _charid_arr = {};
        _depprnt_arr = {};
        _depprnt_cnt = 0;
        _price = '';
        last_char = '';
        _i = 0;
        _cc = 0;
        _s = '';
        _pl = '';
        $('.b-filter__param').removeClass('blue_line');
            /* all spans (begin) */
            
            $('.b-filter__charact_span.'+_active_class).each(function(e){
                ths = $(this);
                charid = ths.data('charid');
                if(charid!='sale'){
                    //_depend = ths.data('depend');
                    _prnt = ths.closest('.b-filter__param');
                    is_depend = 0;
                    /*
                    if(_depend !== undefined){
                        _child_length = _prnt.find('.b-filter__charact_span[data-depend="'+_depend+'"]').length;
                        _prnt_active = _prnt.find('.b-filter__charact_span[data-depend="'+_depend+'"].'+_active_class).length;
                        if(_prnt_active==_child_length)
                            is_depend = 1;
                    }
                    */
                    if(!_prnt.hasClass('blue_line'))
                        _prnt.addClass('blue_line');
                    if(is_depend!=1){
                        if(last_char!=ths.data('chartit')){
                            _i = 0;
                            last_char = ths.data('chartit');
                        }
                        if(!_url_arr[last_char]){
                            _url_arr[last_char] = new Array();
                            _charid_arr[ths.data('cid')] = new Array();
                            if($('.b-dep-charact__'+ths.data('cid')).length){
                                _depprnt_arr[ths.data('cid')] = ths.data('cid');
                                _depprnt_cnt++;
                            }
                        }
                        _url_arr[last_char][_i] = ths.data('charval');
                        _charid_arr[ths.data('cid')][_i] = ths.data('charid');
                        many++;
                        _i++;
                    }
                }

            });
            /* all spans (end) */
            /* all sliders (begin) */
            $('.control4').each(function(e){
                ths = $(this);
                charid = ths.data('charid');
                chartit = ths.data('chartit');
                _input_from = $('#sldr'+charid+' input.b-input_from');
                _input_to = $('#sldr'+charid+' input.b-input_to');
                _chck = (_input_from.val()) != (_input_from.data('start')) && (_input_from.val()) != (_input_from.data('val'));
                _chck2 = (_input_to.val()) != (_input_to.data('start'))  && (_input_to.val()) != (_input_to.data('val'));
                if(_chck || _chck2){
                    if(!_url_arr[chartit]){
                        _i = 0;
                        _url_arr[chartit] = new Array();
                        _charid_arr[ths.data('cid')] = new Array();
                    }
                    _url_arr[chartit][0] = (_input_from.val()-0)+'-'+(_input_to.val()-0);
                    if(charid==0){
                        _price = (_input_from.val()-0)+'-'+(_input_to.val()-0);
                        many++;
                        _i++;
                    }
                    else{
                        _arraystr = ths.find('.b-range_charids').val();
                        _array = _arraystr.split('|');
                        if(_array.length){
                            $.each(_array,function(key, charval){
                                elem = charval.split('_');
                                if(elem.length>1){
                                    if((_input_from.val()-0)<=elem[1] && (_input_to.val()-0)>=elem[1]){
                                        _charid_arr[ths.data('cid')][_i] = elem[0];
                                        many++;
                                        _i++;
                                    }
                                }
                            });
                        }
                        
                    }
                    
                }
            });
            /* all sliders (end) */
            /* sale (begin) */
            _sale = '';
            if($('.b-filter__charact_span[data-charid="sale"].'+_active_class).length){
                if(!_url_arr['sale'])
                    _url_arr['sale'] = new Array();
                _url_arr['sale'][0] = '1';
                _sale = '1';
            }
            /* sale (end) */
            /* many (begin) */
            if(many>1){
                if(!_url_arr['many'])
                    _url_arr['many'] = new Array();
                _url_arr['many'][0] = '1';
            }
            /* many (end) */
            _j = 0;
            _j2 = 0;
            to_url = new Array();
            to_url_check = new Array();
            if($('.sort').find('.sort__link--active[data-url!="sort=none"]').length){
                _s = $('.sort').find('.sort__link--active').data('url');
                to_url[_j] = _s;
                _j++;
            }
            _collapse_check = 0;
            _collapse_arr = {};
            _char_count = 0;
            $.each(_url_arr, function(_chartit, _charvals){
                to_url[_j] = _chartit+'='+_charvals.join(',');
                to_url_check[_j2] = _chartit+'='+_charvals.join(',');
                if($('.b-filter__param[data-chartit="'+_chartit+'"]').length && _chartit!='sale'){
                    _char_count++;
                    $.each(_charvals,function(_num,_val){
                        _collapse_check++;
                        if($('.b-filter__param[data-chartit="'+_chartit+'"]').hasClass('control4')){
                            _charid = $('.b-filter__param[data-chartit="'+_chartit+'"]').data('charid');
                            _charval = _val;
                        }
                        else if(_chartit=='sale'){
                            _charid = $('.b-filter__param[data-chartit="'+_chartit+'"]').data('charid');
                            _charval = 'да';
                        }
                        else{
                            _ths = $('.b-filter__charact_span[data-charval="'+_val+'"][data-chartit="'+_chartit+'"]');
                            _charid = _ths.data('charid');
                            _charval = _ths.html(); 
                        }
                        if(_chartit!='sale'){
                            if(!_collapse_arr[_chartit])
                                _collapse_arr[_chartit] = new Array();
                            _collapse_arr[_chartit][_num] = '<span class="b-slected-value" > '+_charval+' <span class="b-slected-value__remove" data-charvalid="'+_charid+'" data-control="'+$('.b-filter__param[data-chartit="'+_chartit+'"]').data('control')+'"></span> </span>';
                        }
                    });
                }
                _j++;
                _j2++;
            });
            if(_page==1){
                _collapse = '';
                _to_collapse = new Array();
                if(_collapse_check>0 || _sale){
                    _collapse = '<label class="b-filter__checked-options-label">Отмечено:</label><span class="g-link g-link-action b-filter__checked-options-values b-filter__checked-options-values-open">';
                    _k = 0;
                    _collapse_check = 0;
                    _collapse_items = '';
                    _collapse_arr_count = _char_count;
                    _collapse_counter = '';
                    if(_sale){
                        _k++;
                        _collapse_arr_count++;
                        _collapse += '<span class="_f">Акция</span>';
                        _collapse_items += '<p class="b-filter__checked-options-line">';
                        _collapse_items += '<label class="b-filter__checked-options-line-label">';
                        _collapse_items += '<span class="b-filter__checked-options-line-remove" data-charvalid="999" data-control="control2"></span>';
                        _collapse_items += 'Акция: </label>';
                        _collapse_items += '<span class="b-slected-value" > да <span class="b-slected-value__remove" data-charvalid="sale" data-control="control2"></span> </span>';
                        _collapse_items += '</p>';
                    }
                    $.each(_collapse_arr, function(_chartit,_charspans){
                        _collapse_check++;
                        _span = '_f';
                        if(_k>2)
                            _span = '_n';
                        if(_k<5)
                            _collapse += '<span class="'+_span+'">'+((_k==0)?'':', ')+$('.b-filter__param[data-chartit="'+_chartit+'"]').data('chartitmul')+'</span>';
                        if(_k==3)
                            _collapse_counter += '<span class="_f _e">и ещё '+(_collapse_arr_count-3)+'</span>';
                        if(_k==5)
                            _collapse_counter += '<span class="_n _e">и ещё '+(_collapse_arr_count-5)+'</span>';
                        
                        
                        _charid = $('.b-filter__param[data-chartit="'+_chartit+'"]').data('charid');
                        _chartitle = $('.b-filter__param[data-chartit="'+_chartit+'"]').data('chartitle');
                        _control = $('.b-filter__param[data-chartit="'+_chartit+'"]').data('control');
                        _collapse_items += '<p class="b-filter__checked-options-line">';
                        _collapse_items += '<label class="b-filter__checked-options-line-label">';
                        _collapse_items += '<span class="b-filter__checked-options-line-remove" data-charvalid="'+_charid+'" data-control="'+_control+'"></span>';
                        _collapse_items += _chartitle+((_charid==0)?', <span class="g-rouble"></span>':'')+': </label>';
                        _collapse_items += _charspans.join('');
                        _collapse_items += '</p>';
                        _k++;
                    });
                    if(_collapse_items){
                        _collapse += ' '+_collapse_counter;
                        _collapse += '</span><span class="g-link g-link-action b-filter__checked-options-values b-filter__checked-options-values-close">свернуть</span><div class="b-filter__checked-options-popup">';
                        _collapse += _collapse_items;
                        _collapse += '</div>';
                    }
                }
                else{
                }
                $('.b-filter__checked-options').html(_collapse);
                $('.b-filter__clear').removeClass('active');
                if(_collapse=='')
                    $('.b-filter__checked-options').removeClass('b-filter__checked-options-open');
                else
                    $('.b-filter__clear').addClass('active');
                _bindCharCross();
            }
        }



        _add_page = '';
        if(_page!=1)
            _add_page = _page+'/';
/*
        if(to_url && to_url.length){
            to_check = _gurl +'?'+to_url.join('&');
            if($('.fast-link--newurl[data-old="'+to_check+'"]').length){
                _to_url_str = $('.fast-link--newurl[data-old="'+to_check+'"]').attr('href')+_add_page;
            }
            else{
                _to_url_str = _gurl+_add_page;
                _to_url_str += '?'+to_url.join('&');
            }
        }
        else{
            _to_url_str = _gurl+_add_page;
        }
*/
        if(to_url && to_url.length){
            to_check = _gurl +'?'+to_url.join('&');
            to_check2 = _gurl +'?'+to_url_check.join('&');
            

            if(_fastoldurl && to_check in _fastoldurl){
                _to_url_str = _fastoldurl[to_check]+_add_page;
            }
            else if(_fastoldurl && to_check2 in _fastoldurl){
                _to_url_str = _fastoldurl[to_check2]+_add_page;
                if($('.sort').find('.sort__link--active[data-url!="sort=none"]').length){
                    _to_url_str += '?'+$('.sort').find('.sort__link--active').data('url');
                }
            }
            else{
                _to_url_str = _gurl+_add_page;
                _to_url_str += '?'+to_url.join('&');
            }
        }
        else{
            _to_url_str = _gurl+_add_page;
        }

/*
        _to_url_str = _gurl+_add_page;
        if(to_url && to_url.length)
            _to_url_str += '?'+to_url.join('&');
*/  
        if(geturl==0){
            if (!supports_history_api_from_ready()){
                // location.href = 'http://'+_site+_to_url_str;
                location.href = main_domain + _to_url_str;
            }
            else{
                if(scroll==0){
                    //console.log('http://'+_site+_to_url_str);
                    // window.history.pushState(null, null,'http://'+_site+_to_url_str);
                    window.history.pushState(null, null, main_domain + _to_url_str);
                    _ajax_timeout = setTimeout(_ajaxsender, 100);
                }
                else{
                    _ajaxscroll();
                }
            }
        }
        else{
            // return 'http://'+_site+_to_url_str;
            return main_domain + _to_url_str;
        }
    }

    function _ajaxscroll(){
        var _url = '/postajaxparamfilter/';
        var options = {
            url : _url,
            type : 'POST',
            dataType : 'json',
            data: {
                cvid: _charid_arr,
                price: _price,
                sale: _sale,
                sort: _s,
                page: _page,
                group_id: _gid,
                scroll: 1,
                click: _click
            },
            beforeSend : function(){
                _bfilter.removeClass('b-filter-error').addClass('b-filter-loading');
            },
            success : function(data){
                _click = 0;
                _catcont.find('.catalog-goods__page-hit[data-page="'+data.page+'"]').html(data.resultGoods).removeClass('loading_page');
                if(data.checkClick==1){
                    $('.pagination__list .pagination__link[data-page="'+data.page+'"]').html(data.page);
                    _catcont.find('.catalog-goods__page-hit[data-page="'+data.page+'"]').removeClass(_ascrl);
                    scroll_elem = '#catcont .catalog-goods__page-hit[data-page="'+data.page+'"]';
                        if(data.page==1 || data.page=='1')
                            scroll_elem = '#pagtop';
                    if(ontopme!=1){$.scrollTo(scroll_elem,{duration:'slow', offset: {top: scroll_margin}});}     
                }
                else
                    _cph.removeClass(_ascrl);

                _buy();
                _bindacts();
                //initListPaddings();
            },
            error : function(){
                _bfilter.removeClass('b-filter-loading').addClass('b-filter-error');
            },
            cache : false,
            async : true
        };
        _sended_ajax_scroll = $.ajax(options);
    }

    function _ajaxpagingnew(page){
        _page = 1;
        if(page)
            _page = page;
    
        _s = '';
        if($('.sort').find('.sort__link--down').length){
            _s = $('.sort').find('.sort__link--down').data('url').replace('sort=','');
        }
        if($('.sort').find('.sort__link--up').length){
            _s = $('.sort').find('.sort__link--up').data('url').replace('sort=','');
        }
    
        var _url = '/postajaxparamscroll/';
        var options = {
            url : _url,
            type : 'POST',
            dataType : 'json',
            data: {
                ids: $('#pageHit_'+_page).data('goodlist'),
                sort: _s,
                page: _page,
                scroll: 1,
                type: 0,
                group_id: _gid,
                click: _click
            },
            beforeSend : function(){
                _catcont.find('.catalog-goods__page-hit[data-page="'+_page+'"]').addClass('loading_page');
                _bfilter.removeClass('b-filter-error').addClass('b-filter-loading');
                _pagstr.addClass('pagination__list--processing');
            },
            success : function(data){
                _click = 0;
                //_catcont.find('.catalog-goods__page-hit').html('');
                _catcont.find('.catalog-goods__page-hit[data-page="'+data.page+'"]').html(data.resultGoods).removeClass('loading_page');
                //if(_body.hasClass('scroll_catalog')){$.scrollTo('#pagtop',{duration:'slow', offset: {top: scroll_margin}});}
                getSeoAndUrl(_page);
                _buy();
                _bindacts();
                clearTimeout(_to2);
                _to2 = setTimeout(function(){
                    _pagstr.removeClass('pagination__list--processing');
                },800);
                //_pagstr.removeClass('pagination__list--processing');
                
            },
            error : function(){
                _pagstr.removeClass('pagination__list--processing');
                _bfilter.removeClass('b-filter-loading').addClass('b-filter-error');
            },
            cache : false,
            async : true
        };
        if(_sended_ajax_paging)
            _sended_ajax_paging.abort();
        _sended_ajax_paging = $.ajax(options);
    }

    function _ajaxscrollnew(page){

        if(!page)
            _page = 1;
        else
            _page = page;

        _s = '';
        if($('.sort').find('.sort__link--down').length){
            _s = $('.sort').find('.sort__link--down').data('url').replace('sort=','');
        }
        if($('.sort').find('.sort__link--up').length){
            _s = $('.sort').find('.sort__link--up').data('url').replace('sort=','');
        }

        //console.log(_catcont.find('.catalog-goods__page-hit[data-page="'+_page+'"]'));
        var _url = '/postajaxparamscroll/';
        var options = {
            url : _url,
            type : 'POST',
            dataType : 'json',
            data: {
                ids: $('#pageHit_'+_page).data('goodlist'),
                sort: _s,
                page: _page,
                scroll: 1,
                group_id: _gid,
                click: _click
            },
            beforeSend : function(){
                if(!_canscrl){
                    _body.addClass('__loading');
                }
                _catcont.find('.catalog-goods__page-hit[data-page="'+_page+'"]').addClass('loading_page');
                _bfilter.removeClass('b-filter-error').addClass('b-filter-loading');
            },
            success : function(data){
                _body.removeClass('__loading');
                _click = 0;
                if(!_canscrl){
                    $('.catalog-goods__page-hit .prod').remove();
                    $('.catalog-goods__page-hit .catalog-goods__page-title').remove();
                    $('.catalog-goods__page-hit').removeAttr('style');
                }
                _catcont.find('.catalog-goods__page-hit[data-page="'+data.page+'"]').html(data.resultGoods).removeClass('loading_page');
                if(data.checkClick==1){
                    $('.pagination__list .pagination__link[data-page="'+data.page+'"]').html(data.page);
                     _catcont.find('.catalog-goods__page-hit[data-page="'+data.page+'"]').removeClass(_ascrl);
                    scroll_elem = '#catcont .catalog-goods__page-hit[data-page="'+data.page+'"]';
                        if(data.page==1 || data.page=='1')
                            scroll_elem = '#pagtop';
                    if(ontopme!=1){$.scrollTo(scroll_elem,{duration:'slow', offset: {top: scroll_margin}});}     
                }
                else
                    _cph.removeClass(_ascrl);

                _buy();
                _bindacts();
            },
            error : function(){
                _bfilter.removeClass('b-filter-loading').addClass('b-filter-error');
            },
            cache : false,
            async : true
        };
        _sended_ajax_scroll = $.ajax(options);
    }

    function _ajaxsender(){
        if(_sended_ajax)
            _sended_ajax.abort();
        var _url = '/postajaxparamfilter/';
        var options = {
            url : _url,
            type : 'POST',
            dataType : 'json',
            data: {
                cvid: _charid_arr,
                price: _price,
                sale: _sale,
                sort: _s,
                page: _page,
                group_id: _gid
            },
            beforeSend : function(){
                _bfilter.removeClass('b-filter-error').addClass('b-filter-loading');
                $('#pagtop').addClass(_loading_class);
                if ($("#loading_bar").length === 0) {
                    $(".b-filter__loadingbar").append("<div id='loading_bar' class='bg-gradient'></div>")
                    $("#loading_bar").addClass("waiting");
                    $('#loading_bar').width((30 + Math.random() * 30) + "%");
                }
            },
            success : function(data){
                $('.control4').removeClass(_loading_class);

                $('#pagtop').removeClass(_loading_class);

                $("#loading_bar").width("100%").delay(100).fadeOut(400, function() {
                    $(this).remove();
                });

                $('.b-filter__fast_slider_span').removeClass('clicked');
                if(data.resultNotGrey){// && data.resultCount!=0){
                    $('.b-filter__charact_span').removeClass(_loading_class).addClass(_changed_class);
                    $.each(data.resultNotGrey, function(_n,_charid){
                        $('#charid_'+_charid).removeClass(_grey_class+' '+_changed_class);
                    });
                    $('#charid_sale').removeClass(_grey_class+' '+_changed_class);
                    $('.control4').each(function(){
                        _c4 = $(this);
                        _vals = _c4.find('.b-range_charids').val();
                        _min = _c4.find('.b-input_to').data('val')-0; 
                        _max = _c4.find('.b-input_from').data('val')-0;
                        _charid = _c4.data('charid');
                        if(_vals!=''){
                            _array = _vals.split('|');
                            for(_i=0;_i<_array.length; _i++){
                                _cv_arr = _array[_i].split('_');
                                if($.inArray(_cv_arr[0], data.resultNotGrey)!==-1){
                                    if(_cv_arr[1]<_min)
                                        _min = _cv_arr[1]-0;
                                    if(_cv_arr[1]>_max)
                                        _max = _cv_arr[1]-0;
                                }   
                            }
                        }
                        //console.log(_min);
                        //console.log(_max);
                        if(_charid==0){
                            _min =  data.resultMinPrice-0;
                            _max =  data.resultMaxPrice-0;
                        }
                        if(_min == _c4.find('.b-input_to').data('val')-0 || _min==0)
                            _min = _c4.find('.b-input_from').data('val')-0;
                        if(_max == _c4.find('.b-input_from').data('val')-0 || _max==0)
                            _max = _c4.find('.b-input_to').data('val')-0;
                        _min_check = _min;
                        _max_check = _max;

                        _list = _c4.find('.b-range').data('rangearr');
                        _range = _c4.find('.b-range').data('range');
                        _rangearr = {};
                        _rangecount = _range.length;
                        _j = 0;


                        if(_c4.find('.b-input_from').data('val')-0==_min_check){
                            _min_check='_'; 
                        }
                        _to_max = ['',_max_check];
                        if(_c4.find('.b-input_from').data('val')-0==_max_check){
                            _max_check='_';
                        }
                        _rangearr[_j] = [0,_c4.find('.b-input_from').data('val')-0];
                        _j++;
                        _last = 'min';
                        _prcnt = 100/(_list.length-1);
                        $.each(_range,function(_prcnt,_valstep){
                            if(_prcnt!='min'){
                                _diff = (parseInt(_valstep[0])+'').length-(parseInt(_range[_last][0])+'').length;
                                _last = _prcnt;
                                if(_valstep[0]==_min_check)
                                    _min_check='_';
                                if(_valstep[0]==_max_check)
                                    _max_check='_';
                                if(_min_check!='_' && _valstep[0]>_min_check && _valstep[0]<_max_check){
                                    _rangearr[_j] = ['',_min_check];   
                                    _min_check='_'; 
                                    _j++;
                                }
                                if(_max_check!='_' && _valstep[0]>_max_check){
                                    _rangearr[_j] = _to_max;
                                    _max_check='_';
                                    _j++;
                                }
                                
                                _rangearr[_j] = ['',_valstep[0]];
                                _j++;
                            }
                        });
                        _all_steps = 0;
                        _k=1;
                        for(_i=1;_i<Object.keys(_rangearr).length;_i++){
                            _srtlen_last  = (parseInt(_rangearr[_i-1][1])+'').length-2;
                            //console.log('_rangearr - '+_rangearr[_i-1][1]);
                            //console.log('_srtlen_last - '+_srtlen_last);
                            if(_srtlen_last<1)
                                _srtlen_last=0;
                            //console.log('_srtlen_last - '+_srtlen_last);
                            //console.log('_rangearr[_i-1][1] - '+_rangearr[_i-1][1]);
                            //console.log('_rangearr[_i][1] - '+_rangearr[_i][1]);
                            _sc = (_rangearr[_i][1] - _rangearr[_i-1][1])/Math.pow(10, _srtlen_last);
                            //console.log('_sc - '+_sc);
                            _all_steps += _sc;
                            //console.log('_all_steps - '+_all_steps);
                            _rangearr[_i][2] = _all_steps;
                            //console.log('_all_steps - '+_all_steps);
                            if($.inArray(_rangearr[_i][1],_list)!==-1){
                                while(_k<=_i){
                                    _rangearr[_k][3] = _all_steps ;
                                    _key = $.inArray(_rangearr[_i][1], _list)-1;
                                    if(_key<0)
                                        _key = 0;
                                    _rangearr[_k][4] = _prcnt*_key;
                                    _k++;
                                }
                                _all_steps = 0;
                            }
                        }
                        //console.log(_rangearr);
                        _to_return = new Array();
                        for(_l=0;_l<Object.keys(_rangearr).length;_l++){
                            if(_rangearr[_l][1]==_min || _rangearr[_l][1]==_max){
                                _index = '';
                                if(_rangearr[_l][0]=='' && _rangearr[_l][3] && _rangearr[_l][2])
                                    _index = _rangearr[_l][2]/_rangearr[_l][3]*_prcnt + (_rangearr[_l][4]-0);
                                _key = 0;
                                
                                if(_rangearr[_l][0]+''!='')
                                    _index = _rangearr[_l][0];
                                if((_rangearr[_l][1]-0)==_max){
                                    _key = 1;
                                    _index = 100-_index;
                                }
                                //console.log(_index+' '+_rangearr[_l][0]+' '+_rangearr[_l][1]);
                                _to_return[_key] = _index+'%';
                            }
                        }   
                        _c4.find('.b-range__inner-allow').attr('style','left:'+_to_return[0]+'; right:'+_to_return[1]+';');
                    });
                    $('.b-filter__charact_span.'+_changed_class).removeClass(_changed_class).addClass(_grey_class);
                    
                }
                _bfilter.attr('class','b-filter');
                if(_depprnt_cnt>0){ 
                    $.each(_depprnt_arr, function(dpk,dpv){
                        //console.log(dpk);
                        _bfilter.addClass('b-sel-charact__'+dpk);
                    });
                    _depprnt_arr = {};
                    _depprnt_cnt = 0;
                }

                $('.control5').each(function(){
                    var _ths = $(this);
                    _ths.css('height','auto');
                    var _prnt = _ths.closest('.b-filter__new_row.line');
                    //console.log(_prnt.height());
                    _ths.css('height',_prnt.height()+'px');
                });
                
                //if(data.resultCount==0){
                //    $('.b-filter__charact_span').removeClass(_loading_class+' '+_changed_class).addClass(_grey_class);
                //}
                $('.pag-inner').html(data.resultPaging);
                if(data.resultGoods){
                    _catcont.find('.catalog-goods__list').html(data.resultGoods);
                }
                if(data.ann){
                    _ann.html(data.ann);
                }
                if(data.ann2){
                    _ann2.html(data.ann2);
                }
                if(data.h1){
                    _h1.html(data.h1);
                }
                if(data.titleGr){
                    document.title = data.titleGr;          
                }
                if(data.metaKeywords){
                    $('meta[name="keywords"]').attr('content',data.metaKeywords);   
                }
                if(data.metaDescription){
                    $('meta[name="description"]').attr('content',data.metaDescription);
                }
    
                if(data.resultCount){
                    $('.gCount').html(data.resultCount+' шт.');
                }
                _catcont = $('#catcont');
                _cph = _catcont.find('.catalog-goods__page-hit');
                _catpagtop  = $('#catpagtop');
                _pagstr = $('.pagination__list');
                bindAction();

                _buy();
                _bindacts();

                if(ontopme==1)
                    $(document).scrollTo('#pagtop',{duration:500, offset: {top: scroll_margin}, onAfter:function(){ _cph.removeClass(_ascrl); ontopme=0;}});
                if(ontopfilter==1)
                    $(document).scrollTo('.b-filter',{duration:500, offset: {top: -60}, onAfter:function(){ _cph.removeClass(_ascrl); ontopfilter=0;}});

            },
            error : function(){
                _bfilter.removeClass('b-filter-loading').addClass('b-filter-error');
            },
            cache : false,
            async : true
        };
        _sended_ajax = $.ajax(options);
    }

    function _bindCharCross(){
        $('.b-filter__checked-options-line-remove').unbind('click').bind('click',function(){
            var _ths = $(this);
            var _charvalid = _ths.data('charvalid');
            var _control = _ths.data('control');
            ontopfilter=1;
            if(_control!=4){
                $('.b-filter__charact_span[data-cid="'+_charvalid+'"].active').trigger('click');
            }
            else{
                _slider = $('.b-filter__param[data-cid="'+_charvalid+'"]');
                _input_from = _slider.find('.b-input_from').data('start');
                _input_to = _slider.find('.b-input_to').data('start');
                _slider.find('input.b-input_from').attr('value',_input_from).prop('value',_input_from).val(_input_from);
                _slider.find('input.b-input_to').attr('value',_input_to).prop('value',_input_to).val(_input_to);
                _slider.find('.b-input_from').trigger('change');
            }
        });

        $('.b-slected-value__remove').unbind('click').bind('click',function(){
            var _ths = $(this);
            var _charvalid = _ths.data('charvalid');
            var _control = _ths.data('control');
            ontopfilter=1;
            if(_control!=4){
                $('.b-filter__charact_span[data-charid="'+_charvalid+'"].active').trigger('click');
            }
            else{
                _slider = $('.b-filter__param[data-charid="'+_charvalid+'"]');
                _input_from = _slider.find('.b-input_from').data('start');
                _input_to = _slider.find('.b-input_to').data('start');
                _slider.find('input.b-input_from').attr('value',_input_from).prop('value',_input_from).val(_input_from);
                _slider.find('input.b-input_to').attr('value',_input_to).prop('value',_input_to).val(_input_to);
                _slider.find('.b-input_from').trigger('change');
            }
        });
        $(".b-filter__checked-options-values-open").unbind('click').bind('click', function(e){
            _chckblock.addClass('b-filter__checked-options-open');
        });

        $(".b-filter__checked-options-values-close").unbind('click').bind('click', function(e){
            _chckblock.removeClass('b-filter__checked-options-open');
        });
    }

    // проверка на ie
    function supports_history_api_from_ready() {
        return !!(window.history && history.pushState);
    }
 
});