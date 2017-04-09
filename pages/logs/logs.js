//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  alert(){

  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  }
})
window.AStar = {};  
(function(aStar){  
  
    //start:起始节点[i,j] ， end:最终节点[i,j]  map:地图数据(2d)arr，marker:可以通过的标识（例子用的是1）  
    aStar.find_path = function(start,end,map,marker){  
        var open = [];  
        var close = [];  
  
        var s_p = start;  
        var e_p = end;  
        var map_arr = map;  
        var tra_marker = marker;  
      
        var G = 0;  
        var H = 0;  
        var F = 0;  
  
        //加入起始节点  [x, y , G ,F ,father]  
        open.push([s_p[0],s_p[1],0,(Math.abs(e_p[0]-s_p[0]) + Math.abs(e_p[1]-s_p[1])),null]);  
  
        return function(obj){  
            //重拍，取最小的一个  
            var count = 0;  
            for(var i = obj[0]-1,ilen = i+3 ; i < ilen ; i++){  
                for(var j = obj[1]-1,jlen = j+3 ;j < jlen; j++){  
                    //遍历周围八节点,排除自己  
                    if(i == obj[0] && j == obj[1])  
                        continue;  
                    //排除穿越的情况  
                    if(!((i == obj[0] ) || ( j == obj[1])) && ( map_arr[i] && map_arr[obj[0]] && map_arr[i][obj[1]] != tra_marker && map_arr[obj[0]][j] != tra_marker))  
                        continue;  
                    if(i == e_p[0] && j == e_p[1]){  
                        open.push([i,j,G,F,obj]);  
                        var ways = [];  
                        var ele = obj;  
                        do{  
                            ways.unshift(ele);  
                            ele = ele[4];  
                        }while(ele[4] != null);  
                        return ways;  
                    }  
                      
                    if(map_arr[i] && map_arr[i][j] && map_arr[i][j] == tra_marker && is_exist(open,[i,j]) == -1 && is_exist(close,[i,j]) == -1){  
                        G = ( i == obj[0] ) || ( j == obj[1] ) ? obj[2]+1.0 : obj[2]+1.4 ;                
                        H = Math.sqrt((e_p[0] - i)*(e_p[0] - i) + (e_p[1] - j)*(e_p[1] - j));  
                        F = G + H;  
  
                        open.push([i,j,G,F,obj]);  
                        count++;  
                    }  
                }  
            }  
            close.push(open.shift());  
            var o;  
            if(open[0] && open[0][4] == obj[4]){  
                o = count == 0 ? get_other(open,obj) : (arr_sort(open),open[0]);  
            }else{  
                o = (arr_sort(open),open[0]);  
            }  
              
            if(o){  
                return arguments.callee(o);  
            }else{  
                return [];  
            }  
        }(open[0])  
    }  
  
      
    //获取其他节点  
    var get_other = function(arr,o){  
        var a = [];  
        for(var i = 0 ; i < arr.length ; i++){  
            if(o && arr[i][4] == o[4]){  
                return arr[i];  
            }  
        }  
        if(o[4]){  
            return arguments.callee(o[4]);  
        }else{  
            return null;  
        }  
    }  
  
      
    //对数组进行重排列  
    var arr_sort = function(){  
        function s(a,b){  
            return a[3] - b[3];  
        }  
        return function(arr){  
            arr.sort(s);  
        }  
    }();  
  
    //数组中是否存在此元素  
    var is_exist = function(arr,p){  
        for(var i = 0 ; i < arr.length ; i++){  
            if(arr[i][0] == p[0] && arr[i][1] == p[1]){  
                return i;  
            }  
        }  
        return -1;  
    }  
})(window.AStar) 