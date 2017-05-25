

		//定义全局

		var support={}

		support.getElementsByClassName=!!document.getElementsByClassName
			

		// 对基本方法的封装

			var getTag=function(tag,results) {
				results=results||[]
				results.push.apply(results,document.getElementsByTagName(tag)) 
				return results
			};

			var getClass=function(className,results) {
				results=results||[]
				if (support.getElementsByClassName) {
					results.push.apply(results,document.getElementsByClassName(className)) 
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
		
			var get=function(selector, results) {
				
				results = results || [];
            //                     1          2        3       4
            var rquickExpr = /^(?:#([\w-]+)|\.([\w-]+)|([\w]+)|(\*))$/,
                m = rquickExpr.exec( selector );
             
            if ( m ) {
                 
                if ( m[ 1 ] ) {
                    results = getId( m[ 1 ], results );
                } else if ( m[ 2 ] ) {
                    results = getClass( m[ 2 ], results );
                } else if ( m[ 3 ] ) {
                    results = getTag( m[ 3 ], results );
                } else if ( m[ 4 ] ) {
                    results = getTag( m[ 4 ], results );
                }
                 
            }
             
            return results;						
			};


		//迭代封装
	       var each=function(arr,fn) {
	       	 for (var i = 0; i < arr.length; i++) {
	       	 	 if ( fn.call(arr[i],i,arr[i])===false) {
	       	 	 	break;
	       	 	 }  
	       	 }
	       };
       