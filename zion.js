const OP = Object.prototype;
class Zion {
  constructor(obj, callback) {

      if(OP.toString.call(obj) !== '[object Object]') {
        console.error('This parameter must be am object:' + obj);
      }
      // 缓存回调函数
      this.$callback = callback;
      this.observe(obj);
  }
  observe(obj) {
      let keys = Object.keys(obj);
      keys.forEach(function(key, index, keyArray) {
          let oldVal = obj[key];
          Object.defineProperty(obj, key, {
            get: function() {
              return oldVal;
            },
            set: (function(newVal) {
              if(newVal !== oldVal) {
                if(this.$callback) {
                  this.$callback(newVal);
                }
                oldVal = newVal;
              }
            }).bind(this)
          });
          if(OP.toString.call(oldVal) === '[object Object]') {
            this.observe(oldVal);
          }
      }, this);
  }
}