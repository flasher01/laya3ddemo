var MatrixUtil=function(){function n(){}return n.transformPosition=function(n,r,t){void 0===t&&(t=null);var i=n;t||(t=new Laya.Vector3);var o=r[0],a=r[1],u=r[2];return t.x=o*i[0]+a*i[4]+u*i[8]+i[12],t.y=o*i[1]+a*i[5]+u*i[9]+i[13],t.z=o*i[2]+a*i[6]+u*i[10]+i[14],t},n}();