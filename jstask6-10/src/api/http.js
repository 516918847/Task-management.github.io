import axios from 'axios'
import qs from 'qs';
let http = {}
http.getList = function(params){   //列表获取
  return axios.get('/api/a/article/search',{
      params:params
  })

}
http.newly=function(params){      //这是新增获取
  return axios.post('/api/a/u/article',params,{
    
  })
}
http.file=function(fd){           //图片获取
  return axios.post('/api/a/u/img/task',fd,{
    headers:{'Content-Type':'multipart/form-data'}
  })
}
http.id=function(id){              //删除单条，这里有点特殊的地方就是这个他获取的东西在url后台，
     return axios.delete(`/api/a/u/article/${id}`,{     //在加上``这个符号后台才能把id写在后面，这是es6的写法

     })
}
http.statusId=function(statusc){             //上线下线
  return  axios.put('/api/a/u/article/status',qs.stringify(statusc),{
    
  })
}
http.compile=function(id,params){       //编辑
  return  axios.put(`/api/a/u/article/${id}`,qs.stringify(params),{
    
  })
}
http.article=function(id){
  return axios.get(`/api/a/article/${id}`,{
  })
}
export default http