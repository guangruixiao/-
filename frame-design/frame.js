

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
		},

		// 获取样式，已经处理了兼容性
		getStyle: function( dom, style ) {

		    // 优先判断支不支持现代样式的获取方式
		    if( window.getComputedStyle ) {
		        return window.getComputedStyle( dom )[ style ];
		    }

		    // IE8兼容处理
		    else {
		        return dom.currentStyle[ style ];
		    }
		},

		// 兼容添加事件
		addEvent: function( ele, type, fn ) {

		    if( !ele.nodeType || !jQuery.isString( type ) || !jQuery.isFunction( fn ) ) {
		        return;
		    }

		    // 兼容绑定事件
		    if( ele.addEventListener ) {
		        ele.addEventListener( type, fn );
		    }else {
		        ele.attachEvent( 'on' + type, fn );
		    }
		},

		// 兼容移除事件
		removeEvent: function( ele, type, fn ) {

		    // ele必须是DOM，type必须是字符串，fn必须是函数，
		    // 有一个不是，那就直接return
		    if( !ele.nodeType || !jQuery.isString( type ) || !jQuery.isFunction( fn ) ) {
		        return;
		    }

		    // 兼容移除事件
		    if( ele.removeEventListener ) {
		        ele.removeEventListener( type, fn );
		    }else {
		        ele.detachEvent( 'on' + type, fn );
		    }
		},


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


	  // 2 属性 样式 class操作

	  	// 设置或者获取元素的属性节点值
	  	attr: function( attr, val ) {
	  	  

	  	    // 不是字符串也不是对象，直接返回this
	  	    if( !jQuery.isString( attr ) && !jQuery.isObject( attr ) ) {
	  	        return this;
	  	    }

	  	    // 如果是字符串
	  	    if( jQuery.isString( attr ) ) {

	  	        // 如果length为1，则直接返回第一个元素的属性节点值
	  	        if( arguments.length === 1 ) {
	  	            return this.get( 0 ).getAttribute( attr );
	  	        }

	  	        // 如果length为多个(2和及2个以上)
	  	        // 则遍历所有的元素，分别设置属性节点值
	  	        else {
	  	            for( var i = 0, len = this.length; i < len; i++ ) {
	  	                this[ i ].setAttribute( attr, val );
	  	            }
	  	        }
	  	    }

	  	    // 如果是对象
	  	    // 遍历这个对象，和所有的元素，分别添加遍历到的属性节点值
	  	    else {

	  	        // 遍历得到所有的属性节点和属性节点值
	  	        for( var key in attr ) {

	  	            // 遍历得到所有的元素
	  	            for( var i = 0, len = this.length; i < len; i++ ) {
	  	                this[ i ].setAttribute( key, attr[ key ] );
	  	            }

	  	        }
	  	    }

	  	    // 链式编程
	  	    return this;
	  	},
	 
	  	// 设置或者获取属性
	  	prop: function( attr, val ) {
	  	  
	  	    // 不是字符串也不是对象，那么就走吧
	  	    if( !jQuery.isString( attr ) && !jQuery.isObject( attr ) ) {
	  	        return this;
	  	    }

	  	    if( jQuery.isString( attr ) ) {

	  	        // 如果只有一个参数为字符串，那么返回第一个元素指定的属性值
	  	        if( arguments.length === 1 ) {
	  	            return this[ 0 ][ attr ];
	  	        }

	  	        // 如果多个参数，那么给所有元素设置指定的属性值
	  	        else if( arguments.length >= 2 ){
	  	            for( var i = 0, len = this.length; i < len; i++ ) {
	  	                this[ i ][ attr ] = val;
	  	            }
	  	        }
	  	    }

	  	    // 如果传入的attr是对象
	  	    else {

	  	        // 遍历attr得到所有的属性
	  	        for( var key in attr ) {

	  	            // 遍历所有的元素
	  	            for( var i = 0, len = this.length; i < len; i++ ) {

	  	                // 给每一个元素设置属性
	  	                this[ i ][ key ] = attr[ key ];
	  	            }
	  	        }
	  	    }

	  	    // 链式编程
	  	    return this;
	  	},

	  	// 设置或者获取元素的value属性值
	  	val: function( value ) {
	  	  
	  	    // 没有传参，返回第一个元素的value属性值
	  	    if( arguments.length === 0 ) {
	  	        return this[ 0 ].value;
	  	    }

	  	    // 否则给所有元素分别设置value值
	  	    else {
	  	        for( var i = 0, len = this.length; i < len; i++ ) {
	  	            this[ i ].value = value;
	  	        }
	  	    }

	  	    // 链式编程
	  	    return this;
	  	},

	  	// 判断元素中是否含有指定的class
	  	hasClass: function( className ) {
	  	    
	  	    for( var i = 0, len = this.length; i < len; i++ ) {

	  	        // 只要有一个元素存在指定的className，那么就可以true了
	  	        if ( (' ' + this[ i ].className + ' ').indexOf(' ' + className + ' ') > -1 ) {
	  	            return true;
	  	        }
	  	    }

	  	    // 所有的元素都没有，那么返回false
	  	    return false;
	  	},

	  	// 给所有的元素添加指定的class
	  	addClass: function( className ) {
	  	   
	  	    this.each( function() {

	  	        // 包装遍历到的每一个元素，
	  	        // 然后复用hasClass判断这个元素有没有要添加的class
	  	        // 没有则添加，有则忽略
	  	        if( !jQuery( this ).hasClass( className ) ) {
	  	            this.className += ' ' + className;
	  	        }
	  	    });

	  	    // 链式编程返回this
	  	    return this;
	  	},
	  
	  	// 删除所有的元素指定的class
	  	removeClass: function( className ) {
	  	    

	  	    // 没有传参，遍历所有元素清除他们的class
	  	    if( arguments.length === 0 ) {
	  	        this.each( function() {
	  	            this.className = '';
	  	        });
	  	    }

	  	    // 传参，遍历所有元素分别删除指定的class
	  	    else {
	  	        this.each( function() {
	  	            this.className = (' ' + this.className + ' ').replace(' ' + className  + ' ', ' ');
	  	        });
	  	    }

	  	    // 链式编程
	  	    return this;
	  	},

	  	// 有则删除，没有则添加
	  	toggleClass: function( className ) {
	  	  
	  	    this.each( function() {
	  	        // 这里的this是遍历到的每一个原生DOM，
	  	        // 先包装成JQ对象，就可以复用之前写好的方法了
	  	        var $this = jQuery( this );

	  	        // 有则删除，没有则添加
	  	        if( $this.hasClass( className ) ) {
	  	            $this.removeClass( className );
	  	        }else {
	  	            $this.addClass( className );
	  	        }
	  	    });

	  	    // 链式编程
	  	    return this;
	  	},

	  	// 设置或者获取样式
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
	    },
	   
	  // 3 事件的绑定与解除

	  	// 事件绑定
	  	on: function( type, fn ) {
	  	 
	  	    this.each( function() {

	  	        // 这里的this代表遍历到的每一个元素
	  	        // 如果这个元素已经有了$_event_cache，
	  	        // 就用以前的，否则赋值一个新对象
	  	        var self = this;
	  	        this.$_event_cache = this.$_event_cache || {};

	  	        // 如果之前没有对应事件的数组，说明是第一次绑定该事件
	  	        if( !this.$_event_cache[ type ] ) {
	  	            this.$_event_cache[ type ] = [];
	  	            this.$_event_cache[ type ].push( fn );

	  	            // 如果是第一个绑定该事件，那么需要真正调用浏览器的方法进行事件绑定
	  	            jQuery.addEvent( this, type, function( e ) {
	  	                for( var i = 0, len = self.$_event_cache[ type ].length; i < len; i++ ) {
	  	                    self.$_event_cache[ type ][ i ].call( self, e );
	  	                }
	  	            } );

	  	        }else {
	  	            this.$_event_cache[ type ].push( fn );
	  	        }
	  	    });

	  	    // 链式编程
	  	    return this;
	  	},

	  	// 事件移除
	  	off: function( type, fn ) {
	  	  
	  	    var argLen = arguments.length;

	  	    this.each( function() {

	  	        // 没有绑定过任何事件，就不用处理了
	  	        if( !this.$_event_cache ) {
	  	            return;
	  	        }

	  	        // 如果绑过事件，需要进一步处理
	  	        else {

	  	            // 如果没有传参，遍历所有的事件数组，分别清空
	  	            if( argLen === 0 ) {
	  	                for( var key in this.$_event_cache ) {
	  	                    this.$_event_cache[ key ] = [];
	  	                }
	  	                // 不能这个干，这叫销毁证据
	  	                //this.$_event_cache = {};
	  	            }

	  	            // 如果传如一个参数，则清空指定事件类型的数组
	  	            else if( argLen === 1 ) {
	  	                this.$_event_cache[ type ] = [];
	  	            }

	  	            // 如果传入多个参数，则清空指定事件类型数组中指定的回调函数
	  	            else {

	  	                // 遍历对应事件类型的数组，得到每一个回调
	  	                for( var i = this.$_event_cache[ type ].length - 1; i >= 0; i-- ) {

	  	                    // 依次和传入的回调比较，如果相等，则从数组中剔除
	  	                    if( this.$_event_cache[ type ][ i ] === fn ) {
	  	                        this.$_event_cache[ type ].splice( i, 1 );
	  	                    }
	  	                }
	  	            }
	  	        }
	  	    });

	  	    // 链式编程
	  	    return this;
	  	}，
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




	
	

	