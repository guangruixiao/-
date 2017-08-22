

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

			// 通过实例得到一个新数组
			map: function( fn ) {
			    return jQuery.map( this, fn );
			},


			// 获取指定下标的元素，获取的是原生DOM
			get: function( i ) {
			 
			    // null、undeinfed
			    if ( i == null ) {
			        return this.toArray();
			    }

			    // 其他
			    if ( i >= 0 ) {
			        return this[ i ];
			    }else {
			        return this[ this.length + i ];
			    }
			},	

			// 截取实例的部分元素，构成一个新的jQuery实例返回
			slice: function() {
			    /*
			     * 1、通过数组的slice截取部分元素(slice返回的是数组)，
			     * 2、把截取到的元素转换为实例对象返回。
			     * */

			    // 因为slice的参数会有变化，所以需要是arguments，
			    // 我们要把arguments中的每一项传给数组的slice，所以需要借用apply平铺传递过去，
			    // 最后把slice返回数组，通过jQuery工厂保证成实例返回。
			    var nodes = [].slice.apply( this, arguments );
			    return jQuery( nodes );
			},
		
			// 获取指定下标的元素，获取的是jQuery类型的实例对象。
			eq: function( i ) {
			    /*
			     * 1、如果传入null或undefined，返回一个新实例，
			     * 2、如果传入的是正数，按照指定的下标获取元素，再包装成新实例返回
			     * 3、如果传入的是负数，按照下标倒着( this.length + 负数 )获取元素，再包装成新实例返回
			     * */

			    // null、undefined得到新实例
			    if( i == null ) {
			        return jQuery();
			    }

			    if( i >= 0 ) {
			        return jQuery( this[ i ] );
			    }else {
			        return jQuery( this[ this.length + i ] );
			    }
			}

		
	};

	//把静态方法和实例方法均放入extend
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

		     

		     // DOM已经构造完毕，fn可以直接执行
		     if ( document.readyState === 'complete' ) {
		         fn();
		     }

		     // 如果DOM没有构造完毕，那么判断addEventListener是否兼容
		     else if( document.addEventListener ) {
		         document.addEventListener( 'DOMContentLoaded', fn );
		     }

		    
		     else {
		         document.attachEvent( 'onreadystatechange', function() {
		             if( document.readyState === 'complete' ) {
		                 fn();
		             }
		         } );
		     }
		}

	});

	// 添加实例方法
	jQuery.fn.extend( {

      // 1 DOM操作

	    // 清空所有元素的内容
	    empty: function() {
	     
	        for ( var i = 0, len = this.length; i < len; i++ ) {
	            this[ i ].innerHTML = '';
	        }
	    },


	    // 删除所有的元素
	    remove: function() {
	     
	        for( var i = 0, len = this.length; i < len; i++ ) {
	            this[ i ].parentNode.removeChild( this[ i ] );
	        }
	    },


	    // 设置所有元素的内容，获取第一个元素的内容
	    html: function( html ) {
	     
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

	//init与jQuery指向同一个原型,让实例可以调用jQuery原型上的方法
	init.prototype=jQuery.fn;


	// 真正的构造函数，入口函数的处理
	var init = jQuery.fn.init = function( selector ) {

	    // null、undefined、NaN、0、false、''
	    if ( !selector ) {
	        return this;
	    }

	    // function
	    if ( jQuery.isFunction( selector ) ) {

	        
	        jQuery.ready( selector );
	    }

	    // string ==> ( html || selector )
	    else if( typeof(selector)==="string" ) {

	        selector = jQuery.trim( selector );

	        // html
	        if( jQuery.ishtml( selector ) ) {

	            
	            var tempDiv = document.createElement( 'div' );
	            tempDiv.innerHTML = selector;
	            [].push.apply( this, tempDiv.childNodes );

	        }

	        // selector
	        else {

	            try {
	                [].push.apply( this, document.querySelectorAll( selector ) );
	            }catch(e) {
	                一个length属性，代表没有获取到任何元素
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

	
	//暴露两个变量		
	w.jQuery = w.$ = jQuery;
	
}(window))




	
	

	