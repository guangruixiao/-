

(function(w) {

	function jQuery( selector ) {
	    return new jQuery.fn.init( selector );
	}

    //简写jQuery的原型并添加方法
	jQuery.fn=jQuery.prototype={

		    constructor: jQuery,

          

            // 代表所有实例默认的选择器，也代表实例是一个jQuery类型的对象
            selector: '',

            // 代表所有实例默认的长度
            length: 0,

            // 把实例转换为数组返回
            toArray: function() {
                return [].slice.call( this );
            },

          	 //迭代封装                	    
	        each:function ( arr, fn ){ 
			  for ( var i = 0; i < arr.length; i++ ) {
				if ( fn.call( arr[ i ], i, arr[ i ] ) === false ) {
					break;
				}
			  }
			},
	};

	//把方法放入extend,jQuery却可以直接使用
	jQuery.extend=jQuery.fn.extend =function(obj) {

		for (var key in obj){
			this[key]=obj[key];
		}			

	}

	//jQuery添加静态方法
	jQuery.extend({

		// 去掉首尾空白字符
        trim: function( str ) {

            // null、undefined、NaN、0、false、''
            if ( !str ) {
                return str;
            }

            // 优先使用原生的
            if ( str.trim ) {
                return str.trim();
            }

            return str.replace( /^\s+|\s+$/g, '');
        },
        // 判断是不是函数
        isFunction: function( fn ) {
            if ( typeof fn === 'function' ) {
                return true;
            }
            return false;
        },
        //判断是不是字符串片段
        ishtml:function(str) {

				if (str.charAt(0)==="<"&&str.charAt(str.length-1)===">"&&str.length>=3) {
					return true;

				}else{
					return false;
				}				
		},
		ready: function( fn ) {

		     // 先统一判断DOMContentloaded有没有触发，
		     // 通过document.readyState === 'complete'判断
		     // 如果为true，fn可以直接调用。

		     // 如果为false，那么判断支不支持addEventListener，
		     // 如果支持，绑定DOMContentLoaded事件

		     // 如果不支持，使用attchEvent绑定onreadystatechang事件,
		     // 注意，需要在里面判断document.readyState === 'complete'才执行fn。
		     // 防止fn多次执行。

		     // DOM已经构造完毕，fn可以直接执行
		     if ( document.readyState === 'complete' ) {
		         fn();
		     }

		     // 如果DOM没有构造完毕，那么判断addEventListener是否兼容
		     else if( document.addEventListener ) {
		         document.addEventListener( 'DOMContentLoaded', fn );
		     }

		     // 如果不兼容addEventListener，那么采取attachEvent的方式，
		     // 同时事件变为了onreadystatechange，为了防止这个事件多次触发造成的fn多次执行，
		     // 所以需要一个包装函数来进行过滤。
		     else {
		         document.attachEvent( 'onreadystatechange', function() {
		             if( document.readyState === 'complete' ) {
		                 fn();
		             }
		         } );
		     }
		}

	});
		

	// 给原型扩展DOM操作方法，这样jQ实例就可以使用了
	jQuery.fn.extend( {

	    // 清空所有元素的内容
	    empty: function() {
	        /*
	         * 实现思路：
	         * 1、遍历likeArray（ 可以考虑使用for遍历，也可以考虑使用each遍历 ）
	         * 2、遍历到的每一个元素清除其内容（ 元素.innerHTML = '' ）
	         * */
	        for ( var i = 0, len = this.length; i < len; i++ ) {
	            this[ i ].innerHTML = '';
	        }
	    },


	    // 删除所有的元素
	    remove: function() {
	        /*
	         * 实现思路：
	         * 1、遍历likeArray（ 可以考虑使用for遍历，也可以考虑使用each遍历 ）
	         * 2、遍历到的每一个元素要删除掉
	         * （ 通过parentNode获取该元素的父元素，然后父元素.removeChild( 被删除元素 ) ）
	         * */
	        for( var i = 0, len = this.length; i < len; i++ ) {
	            this[ i ].parentNode.removeChild( this[ i ] );
	        }
	    },


	    // 设置所有元素的内容，获取第一个元素的内容
	    html: function( html ) {
	        /*
	         * 实现思路：
	         * 1、先通过arguments.length判断有没有传参
	         * 2、没有传，则获取第一个元素，然后返回这个元素的innnerTHML内容
	         * 3、如果传了，则遍历likeArray（ 可以考虑使用for遍历，也可以考虑使用each遍历 ）
	         * 4、再设置每一个元素的innerTHML为传入的参数。
	         * */

	        // 如果只传入的要操作的元素，那么就直接返回第一个元素的innerHTML
	        if ( arguments.length === 0 ) {
	            return this[ 0 ].innerHTML;
	        }

	        // 如果传参了，那么遍历所以元素，分别设置其innerTHML值为传入的html
	        else if( arguments.length >= 1 ) {

	            for ( var i = 0, len = this.length; i < len; i++ ) {
	                this[ i ].innerHTML = html;
	            }
	        }
	    },

	 
	    // 设置所有元素的文本内容，获取所有元素的文本内容
	    text: function( text ) {
	        /*
	         * 实现思路：
	         * 1、先通过arguments.length判断有没有传参
	         * 2、没有传，则遍历likeArray（ 可以考虑使用for遍历，也可以考虑使用each遍历 ）
	         * 3、把每一个元素的innerText加在一起返回
	         * 4、则遍历likeArray（ 可以考虑使用for遍历，也可以考虑使用each遍历 ）
	         * 5、再设置每一个元素的innerText为传入的参数。
	         * */

	        var result = '';

	        // 没有传参，获取所有元素的所有文本，然后返回
	        if ( arguments.length === 0 ) {

	            for ( var i = 0, len = this.length; i < len; i++ ) {
	                result += this[ i ].innerText;
	            }

	            return result;
	        }

	        // 如果传参数了，那么设置所有元素的文本
	        else {
	            for ( var i = 0, len = this.length; i < len; i++ ) {
	                this[ i ].innerText = text;
	            }
	        }
	    },


	    // 所有元素添加新的class
	    addClass:function(name) {

	    	//补充判断个数

	    	for (var i = 0; i < this.length; i++) {
	    		this[i].className=name
	    	}
	    	
	    },

	    removeClass:function() {
	    	for (var i = 0; i < this.length; i++) {
	    		this[i].className=""
	    	}
	    },

	    css:function(attr,value) {

	 		if (value==null) {
	 			
	 			/*if (attr=="color") {
	 				 
	 				return this[0].style.color
	 			}*/

	 			var styleObj=this[0].style;
	 			for (var key in styleObj){
	 				if (attr==key) {
	 					 
	 				return  getComputedStyle(this[0], false)[key]
	 				}
	 			}
	 		}
	 		else{

	 			for (var i = 0; i < this.length; i++) {

	 				if (attr=="color") {
	 					 
	 					 this[i].style.color=value
	 				}	 			  
	 			}
	 		}	    	
	    }
	   
	} );

	// 这是真正的构造函数，同时把构造函数放在了原型中
	var init = jQuery.fn.init = function( selector ) {

	    // null、undefined、NaN、0、false、''
	    if ( !selector ) {
	        return this;
	    }

	    // function
	    if ( jQuery.isFunction( selector ) ) {

	        // 打包给ready静态方法处理
	        jQuery.ready( selector );
	    }

	    // string ==> ( html || selector )
	    else if( typeof(selector)==="string" ) {

	        // 为了用户友好体验，先去掉首尾空白字符
	        selector = jQuery.trim( selector );

	        // html
	        if( jQuery.ishtml( selector ) ) {

	            // 利用一个临时的div来创建DOM，
	            // 然后把创建好的DOM依次push给实例。
	            var tempDiv = document.createElement( 'div' );
	            tempDiv.innerHTML = selector;
	            [].push.apply( this, tempDiv.childNodes );

	        }

	        // selector
	        else {

	            try {
	                [].push.apply( this, document.querySelectorAll( selector ) );
	            }catch(e) {
	                // 如果报错了，那么手动补一个length属性，代表没有获取到任何元素
	                this.length = 0;
	            }
	        }
	    }

	    // array || likeArray
	    else if( jQuery.isLikeArray( selector ) ) {
	        [].push.apply( this, [].slice.call( selector ) );
	    }

	    // 其它
	    else {
	        this[0] = selector;
	        this.length = 1;
	    }
    };

	//为了让实例可用插件，init与jQuery指向同一个原型
	init.prototype=jQuery.fn;

	//暴露两个变量		
	w.jQuery = w.$ = jQuery;
	
}(window))




	
	

	