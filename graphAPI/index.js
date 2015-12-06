var request = require('request');
var FacebokGraph = module.exports = function(version){
  var url,authToken;
  if(!version){
    return "Version must be numeric and the latest version of facebook.";
  }
  // check if this is instance of this function
  if( !(this instanceof FacebokGraph) ){
    return new FacebokGraph('v2.5');
  }
  // facebook graph api url
  url = 'https://graph.facebook.com/' + version;
  // authToken can be pageToken or user access token
  authToken = '';

  /**
   * (public) 對物件設定access_token
   **/
   this.setAuthToken = function(accessToken){
     this.authToken = accessToken;
   };

  /**
   * (public) 將access_token設定到url上
   **/
  this.setAuthTokenToUrl = function(apiUrl){
    if(this.authToken === '' || this.authToken === undefined){
      return "Please set up authToken first.";
    }
    return (apiUrl.indexOf('?') == -1)? apiUrl + '?access_token=' + this.authToken : apiUrl + '&access_token=' + this.authToken ;
  };

  /**
   * (public) 取得自己的物件
   * @param string fields 所要查詢的特定欄位
   * @param function callback 當取得到資料後,將資料透過回呼回送
   **/
   this.getMe = function(fields,callback){
     var apiUrl;
     if(fields === '' || fields === undefined){
       fields = 'id,name,first_name,birthday,email';
     }
     apiUrl = this.setAuthTokenToUrl(url+'/me?fields='+fields);

     request(apiUrl,function(err,response,body){
       callback(response.statusCode,body,err,apiUrl);
     });
   };

  /**
   * 提供呼叫facebook api 的function
   * @param string apiPath 臉書提供的graph api 的路徑
   * @param object setUp 設定檔
   * @param function callback 當取得資料後,將資料透過回呼傳送
   **/
   this.api = function(apiPath,setUp,callback){
     var apiUrl;
     if(!apiPath){
       return "Please set the api path like '/me' ";
     }

     apiUrl = this.setAuthTokenToUrl(url + apiPath );

     if(setUp.fields){
       apiUrl += '&fields=' + setUp.fields;
     }
     if(setUp.limit){
       apiUrl += '&limit=' + setUp.limit;
     }

     request(apiUrl,function(err,response,body){
       callback(response.statusCode,body,err,apiUrl);
     });
   };
};
