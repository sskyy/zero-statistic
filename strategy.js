var _ = require('lodash')

module.exports = {
  route : {
    daily : function(url, req){
      var module = this,
        key = makeKey(url),
        type = makeType(url)

      ZERO.mlog("statistic","daily log",url)
      return module.dep.model.models['statistic'].findOne({key:key,type:type}).then(function( record ){
        return record ?  module.dep.model.models['statistic'].update({key:key,type:type},{value:record.value+1}) :
          module.dep.model.models['statistic'].create({key:key,type:type,value:1})
      })

      function makeKey( url ){
        return url
      }

      function makeType(url){
        return [url, 'dailyView'].join('-')
      }
    }
  },
  listener : {
    feed : function( nodeType ){
      return function( event, modelEvent, modelEventArgs){
        var bus = this
        if( modelEvent == nodeType +".findOne" ){
          var node = bus.data( nodeType+".findOne"),
            originStatistic,updateObj

          if( node ){
              originStatistic = _.cloneDeep(node.statistic) || { view : 0}
              updateObj = {statistic : _.extend( originStatistic,{view:originStatistic.view+1})}
            //this is not important, so we do not return the promise
            console.log(  nodeType+".update", {id:modelEventArgs.id}, updateObj )
            bus.fire( nodeType+".update", {id:modelEventArgs.id}, updateObj )
          }

        }
      }
    }
  }
}