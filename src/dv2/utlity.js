function deep_merge(origin, update) {
   // note: does not work for array, avoid use array as attribute
   // console.log(origin,update, Object.keys(update))
   Object.keys(update).forEach(k => {
       // console.log(update[k], typeof(update[k]))
       if (typeof(update[k])!="object" || origin[k] == undefined) {
           Object.assign(origin, {
               [k]: update[k]
           })
       } else {
           deep_merge(origin[k], update[k])
       }
   })
}

export default{
   deep_merge
}