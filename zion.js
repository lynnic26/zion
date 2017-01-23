// http://www.open-open.com/lib/view/open1465520159472.html
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
  /**
   * [observe description]
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   */
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
                if(OP.toString.call(newVal) === '[object Object]') {
                  this.observe(newVal);
                }
                if(this.$callback) {
                  this.$callback(newVal, oldVal);
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