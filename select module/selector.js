

		//定义全局

		var support={}

		support.getElementsByClassName=!!document.getElementsByClassName;
			
			// 对基本方法的封装

			var getTag=function(tag,results) {
				results=results||[]
				results.push.apply( results, context.getElementsByTagName( tag ) )
				return results
			}

			var getClass=function(className,results) {
				results=results||[]
				if (support.getElementsByClassName) {
					[].push.apply(results,document.getElementsByClassName(className)) 
					return results
				} else {
					
					var elm=document.getElementsByTagName("*")
					for (var i = 0; i < elm.length; i++) {
						if (elm[i].className.split(/\s+/)===className) {
							results.push(elm[i])
						}  
					}
					return results
				}
			};

			var getId=function(id,results) {
				results=results||[]
				results.push(document.getElementById(id)) 
				return results
			};

			
		    // 通用方法

			var get=function(selector,context, results) {
				
				results = results || [];
				context = context || document;
          
            var rquickExpr = /^(?:#([\w-]+)|\.([\w-]+)|([\w]+)|(\*))$/,
                m = rquickExpr.exec( selector );
             
            if ( m ) {
            	if ( context.nodeType ) {
            		context = [ context ];
            	}
            	// 如果 context 是一个 dom 数组就没有问题了
            	// 但是 context 是一个选择器字符串. 有可能是 '.c'
            	
            	if ( typeof context == 'string' ) {
            		context = get( context );
            	}
            	each( context, function ( i, v ) {
            		if ( m[ 1 ] ) {
            			results = getId( m[ 1 ], results );
            		} else if ( m[ 2 ] ) {
            			results = getClass( m[ 2 ], v, results );
            		} else if ( m[ 3 ] ) {
            			results = getTag( m[ 3 ], this, results );
            		} else if ( m[ 4 ] ) {
            			results = getTag( m[ 4 ], this, results );
            		}
            	} )
            }

        	}

        	//迭代封装
	    

	      var each = function ( arr, fn ) {
			for ( var i = 0; i < arr.length; i++ ) {
				if ( fn.call( arr[ i ], i, arr[ i ] ) === false ) {
					break;
				}
			}
		};