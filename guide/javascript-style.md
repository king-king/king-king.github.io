# JavaScript�淶

## <a name='TOC'>�����б�</a>

  1. [����](#types)
  1. [����](#objects)
  1. [����](#arrays)
  1. [�ַ���](#strings)
  1. [����](#functions)
  1. [����](#properties)
  1. [����](#variables)
  1. [�������ʽ���߼����ʽ](#conditionals)
  1. [��](#blocks)
  1. [ע��](#comments)
  1. [�հ�](#whitespace)
  1. [����](#commas)
  1. [�ֺ�](#semicolons)
  1. [����ת��](#type-coercion)
  1. [����Լ��](#naming-conventions)
  1. [��ȡ��](#accessors)
  1. [������](#constructors)
  1. [ģ��](#modules)
  1. [jQuery](#jquery)
  1. [����](#performance)


## <a name='types'>����</a>

  - **ԭʼֵ**: ����ֵ��

    + `string`
    + `number`
    + `boolean`
    + `null`
    + `undefined`

    ```javascript
    var num = 1,
        bar = foo;

    bar = 9;

    console.log(num, bar); // => 1, 9
    ```
  - **��������**: �������ã�

    + `object`
    + `array`
    + `function`

    ```javascript
    var foo = [1, 2],
        bar = foo;

    bar[0] = 9;

    console.log(foo[0], bar[0]); // => 9, 9
    ```



## <a name='objects'>����</a>

  - ʹ������ֵ��������

    ```javascript
    // bad
    var item = new Object();

    // good
    var item = {};
    ```

  - ��Ҫʹ�ñ�����( [reserved words](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Reserved_Words)) ��Ϊ��

    ```javascript
    // bad
    var example = {
      class: 'superhero',
      default: { clark: 'kent' },
      private: true
    };

    // good
    var example = {
      klass: 'superhero',
      defaults: { clark: 'kent' },
      hidden: true
    };
    ```


## <a name='arrays'>����</a>

  - ʹ������ֵ��������

    ```javascript
    // bad
    var items = new Array();

    // good
    var items = [];
    ```

  - ĩβ��ֵʹ��push

    ```javascript
    var someStack = [];


    // bad
    someStack[someStack.length] = 'abracadabra';

    // good
    someStack.push('abracadabra');
    ```

  - ���鿽��ʹ��slice.

    ```javascript
    var len = items.length,
        itemsCopy = [],
        i;

    // bad
    for (i = 0; i < len; i++) {
      itemsCopy[i] = items[i];
    }

    // good
    itemsCopy = items.slice();
    ```

  - ʹ��slice�����������ת������.

    ```javascript
    function trigger() {
      var args = Array.prototype.slice.call(arguments);
      ...
    }
    ```


## <a name='strings'>�ַ���</a>

  - ���ַ���ʹ�õ����� `''`

    ```javascript
    // bad
    var name = "Bob Parr";

    // good
    var name = 'Bob Parr';

    // bad
    var fullName = "Bob " + this.lastName;

    // good
    var fullName = 'Bob ' + this.lastName;
    ```

  - ����80���ַ����ַ���Ӧ��ʹ���ַ������ӻ���

    ``` javascript
    // bad
    var errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
    // bad
    var errorMessage = 'This is a super long error that \
    was thrown because of Batman. \
    When you stop to think about \
    how Batman had anything to do \
    with this, you would get nowhere \
    fast.';
    // good
    var errorMessage = 'This is a super long error that ' +
      'was thrown because of Batman.' +
      'When you stop to think about ' +
      'how Batman had anything to do ' +
      'with this, you would get nowhere ' +
      'fast.';
    ```

  - ���ʱʹ��join�������ַ��������������ַ������ر���IE

    ```javascript
    var items, messages,length,i;

    messages = [{
        state: 'success',
        message: 'This one worked.'
    },{
        state: 'success',
        message: 'This one worked as well.'
    },{
        state: 'error',
        message: 'This one did not work.'
    }];

    length = messages.length;

    // bad
    function inbox(messages) {
      items = '<ul>';

      for (i = 0; i < length; i++) {
        items += '<li>' + messages[i].message + '</li>';
      }

      return items + '</ul>';
    }

    // good
    function inbox(messages) {
      items = [];

      for (i = 0; i < length; i++) {
        items[i] = messages[i].message;
      }

      return '<ul><li>' + items.join('</li><li>') + '</li></ul>';
    }
    ```



## <a name='functions'>����</a>

  - �������ʽ:

    ```javascript
    // �����������ʽ
    var anonymous = function() {
      return true;
    };

    // �����������ʽ
    var named = function named() {
      return true;
    };

    // �������ú������ʽ
    (function() {
      console.log('Welcome to the Internet. Please follow me.');
    })();
    ```

  - �ڷǺ���������������������������������

    ```javascript
    // bad
    if (currentUser) {
      function test() {
        console.log('Nope.');
      }
    }

    // good
    if (currentUser) {
      var test = function test() {
        console.log('Yup.');
      };
    }
    ```



## <a name='properties'>����</a>

  - ��ʹ�ñ�����������ʱʹ��������.

    ```javascript
    var luke = {
      jedi: true,
      age: 28
    };

    function getProp(prop) {
      return luke[prop];
    }

    var isJedi = getProp('jedi');
    ```



## <a name='variables'>����</a>

  - ����ʹ�� `var` �������������������ô�������²���ȫ�ֱ���������Ҫ������Ⱦȫ�������ռ䡣

    ```javascript
    // bad
    foo = new Foo();

    // good
    var foo = new Foo();
    ```

  - ʹ��һ�� `var` �Լ����������������������4���ո�

    ```javascript
    // bad
    var items = getItems();
    var goSportsTeam = true;
    var dragonball = 'z';

    // good
    var items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';
    ```

  - ���������δ��ֵ�ı���������������֮ǰ�Ѹ�ֵ������ʱ������á�

    ```javascript
    // bad
    var i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;

    // bad
    var i, items = getItems(),
        dragonball,
        goSportsTeam = true,
        len;

    // good
    var items = getItems(),
        goSportsTeam = true,
        dragonball,
        length,
        i;
    ```

  - �������򶥲�����������������������͸�ֵ�����������⡣

    ```javascript
    // bad
    function() {
      test();
      console.log('doing stuff..');

      //..other stuff..

      var name = getName();

      if (name === 'test') {
        return false;
      }

      return name;
    }

    // good
    function() {
      var name = getName();

      test();
      console.log('doing stuff..');

      //..other stuff..

      if (name === 'test') {
        return false;
      }

      return name;
    }

    // bad
    function() {
      var name = getName();

      if (!arguments.length) {
        return false;
      }

      return true;
    }

    // good
    function() {
      if (!arguments.length) {
        return false;
      }

      var name = getName();

      return true;
    }
    ```



## <a name='conditionals'>�������ʽ���߼����ʽ</a>

  - �ʵ�ʹ�� `===` �� `!==` �� `==` �� `!=`��`&&`��`||`
  - �������ʽ��ǿ������ת����ѭ���¹���

    + ���󱻼���Ϊ true
    + Undefined������Ϊ false
    + Null ������Ϊ false
    + ����ֵ ������Ϊ ������ֵ
    + ���� ����� +0, -0, or NaN ������Ϊ false , ����Ϊ true
    + �ַ��� ����ǿ��ַ��� `''` �򱻼���Ϊ false, ����Ϊ true

    ```javascript
    if ([0]) {
      // true
      // An array is an object, objects evaluate to true
    }
    ```

  - ��������������ʱ���м�

    ```javascript

    // bad
    var foo,a=32;
       if(a>30){
        foo = true;
    }else{
        foo = false;
   }

    // good
    var a=32,foo = a>32;

    // bad
    if(boolean){
        express();
    }

    // good
    boolean && express();

    // bad
    if (name !== '') {
      // ...stuff...
    }

    // good
    if (name) {
      // ...stuff...
    }

    // bad
    if (collection.length > 0) {
      // ...stuff...
    }

    // good
    if (collection.length) {
      // ...stuff...
    }
    ```



## <a name='blocks'>��</a>

  - �����ж��еĿ�ʹ�ô�����

    ```javascript
    // bad
    if (test)
      return false;

    // good
    if (test) return false;

    // good
    if (test) {
      return false;
    }

    // bad
    function() { return false; }

    // good
    function() {
      return false;
    }
    ```



## <a name='comments'>ע��</a>

  - ʹ�� `/** ... **/` ���ж���ע�ͣ�����������ָ�������Լ�����ֵ�ͷ���ֵ

    ```javascript
    // bad
    // make() returns a new element
    // based on the passed in tag name
    //
    // @param <String> tag
    // @return <Element> element
    function make(tag) {

      // ...stuff...

      return element;
    }

    // good
    /**
     * make() returns a new element
     * based on the passed in tag name
     *
     * @param <String> tag
     * @return <Element> element
     **/
    function make(tag) {

      // ...stuff...

      return element;
    }
    ```

  - ʹ�� `//` ���е���ע�ͣ������۶����������е���ע�ͣ�ע��ǰ��һ������.

    ```javascript
    // bad
    var active = true;  // is current tab

    // good
    // is current tab
    var active = true;

    // bad
    function getType() {
      console.log('fetching type...');
      // set the default type to 'no type'
      var type = this._type || 'no type';

      return type;
    }

    // good
    function getType() {
      console.log('fetching type...');

      // set the default type to 'no type'
      var type = this._type || 'no type';

      return type;
    }
    ```

  - �����һ��������Ҫ�������߹����д���д��ʹ�� `FIXME` �� `TODO` ��ע�԰������������

    ```javascript
    function Calculator() {

      // FIXME: shouldn't use a global here
      total = 0;

      return this;
    }
    ```

    ```javascript
    function Calculator() {

      // TODO: total should be configurable by an options param
      this.total = 0;

      return this;
    }
  ```



## <a name='whitespace'>�հ�</a>

  - ��tab��Ϊ4���ո�

    ```javascript
    // bad
    function() {
    ??var name;
    }

    // bad
    function() {
    ?var name;
    }

    // good
    function() {
    ????var name;
    }
    ```
  - ������ǰ��һ���ո�

    ```javascript
    // bad
    function test(){
      console.log('test');
    }

    // good
    function test() {
      console.log('test');
    }

    // bad
    dog.set('attr',{
      age: '1 year',
      breed: 'Bernese Mountain Dog'
    });

    // good
    dog.set('attr', {
      age: '1 year',
      breed: 'Bernese Mountain Dog'
    });
    ```

  - ������������ʱʹ������.

    ```javascript
    // bad
    $('#items').find('.selected').highlight().end().find('.open').updateCount();

    // good
    $('#items')
      .find('.selected')
        .highlight()
        .end()
      .find('.open')
        .updateCount();

    // bad
    var leds = stage.selectAll('.led').data(data).enter().append('svg:svg').class('led', true)
        .attr('width',  (radius + margin) * 2).append('svg:g')
        .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
        .call(tron.led);

    // good
    var leds = stage.selectAll('.led')
        .data(data)
      .enter().append('svg:svg')
        .class('led', true)
        .attr('width',  (radius + margin) * 2)
      .append('svg:g')
        .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
        .call(tron.led);
    ```


## <a name='commas'>����</a>

  - ��Ҫ�����ŷ�ǰ��

    ```javascript
    // bad
    var once
      , upon
      , aTime;

    // good
    var once,
        upon,
        aTime;

    // bad
    var hero = {
        firstName: 'Bob'
      , lastName: 'Parr'
      , heroName: 'Mr. Incredible'
      , superPower: 'strength'
    };

    // good
    var hero = {
      firstName: 'Bob',
      lastName: 'Parr',
      heroName: 'Mr. Incredible',
      superPower: 'strength'
    };
    ```

  - ��Ҫ�Ӷ���Ķ��ţ�����ܻ���IE���������ͬʱ�����һ������ĳЩES3��ʵ�ֻ���������ĳ��ȡ�

    ```javascript
    // bad
    var hero = {
      firstName: 'Kevin',
      lastName: 'Flynn',
    };

    var heroes = [
      'Batman',
      'Superman',
    ];

    // good
    var hero = {
      firstName: 'Kevin',
      lastName: 'Flynn'
    };

    var heroes = [
      'Batman',
      'Superman'
    ];
    ```



## <a name='semicolons'>�ֺ�</a>

  - ������һ��Ҫ�ӷֺ�

    ```javascript
    // bad
    (function() {
      var name = 'Skywalker'
      return name
    })()

    // good
    (function() {
      var name = 'Skywalker';
      return name;
    })();

    // good
    ;(function() {
      var name = 'Skywalker';
      return name;
    })();
    ```


## <a name='type-coercion'>����ת��</a>

  - �����Ŀ�ʼִ������ת��.
  - �ַ���:

    ```javascript
    //  => this.reviewScore = 9;

    // bad
    var totalScore = this.reviewScore + '';

    // good
    var totalScore = '' + this.reviewScore;

    // bad
    var totalScore = '' + this.reviewScore + ' total score';

    // good
    var totalScore = this.reviewScore + ' total score';
    ```

  - ������ʹ�� `parseInt` �������Ǵ�������ת���Ļ���.

    ```javascript
    var inputValue = '4';

    // bad
    var val = new Number(inputValue);

    // bad
    var val = +inputValue;

    // bad
    var val = inputValue >> 0;

    // bad
    var val = parseInt(inputValue);

    // good
    var val = Number(inputValue);

    // good
    var val = parseInt(inputValue, 10);

    // good
    /**
     * parseInt was the reason my code was slow.
     * Bitshifting the String to coerce it to a
     * Number made it a lot faster.
     */
    var val = inputValue >> 0;
    ```

  - ����ֵ:

    ```javascript
    var age = 0;

    // bad
    var hasAge = new Boolean(age);

    // good
    var hasAge = Boolean(age);

    // good
    var hasAge = !!age;
    ```


## <a name='naming-conventions'>����Լ��</a>

  - ���ⵥ���ַ���������ı��������������塣

    ```javascript
    // bad
    function q() {
      // ...stuff...
    }

    // good
    function query() {
      // ..stuff..
    }
    ```

  - ���������󡢺�����ʵ��ʱʹ���շ���������

    ```javascript
    // bad
    var OBJEcttsssss = {};
    var this_is_my_object = {};
    var this-is-my-object = {};
    function c() {};
    var u = new user({
      name: 'Bob Parr'
    });

    // good
    var thisIsMyObject = {};
    function thisIsMyFunction() {};
    var user = new User({
      name: 'Bob Parr'
    });
    ```

  - ���������캯������ʱʹ���շ�ʽ��д

    ```javascript
    // bad
    function user(options) {
      this.name = options.name;
    }

    var bad = new user({
      name: 'nope'
    });

    // good
    function User(options) {
      this.name = options.name;
    }

    var good = new User({
      name: 'yup'
    });
    ```

  - ����˽������ʱǰ��Ӹ��»��� `_`

    ```javascript
    // bad
    this.__firstName__ = 'Panda';
    this.firstName_ = 'Panda';

    // good
    this._firstName = 'Panda';
    ```

  - ������� `this` ������ʱʹ�� `_this`.

    ```javascript
    // bad
    function() {
      var self = this;
      return function() {
        console.log(self);
      };
    }

    // bad
    function() {
      var that = this;
      return function() {
        console.log(that);
      };
    }

    // good
    function() {
      var _this = this;
      return function() {
        console.log(_this);
      };
    }
    ```



## <a name='accessors'>��ȡ��</a>

  - ���ԵĴ�ȡ���������Ǳ����
  - ���ȷʵ��Ҫʹ�ô�ȡ�������Ļ�ʹ��getVal() �� setVal('hello')

    ```javascript
    // bad
    dragon.age();

    // good
    dragon.getAge();

    // bad
    dragon.age(25);

    // good
    dragon.setAge(25);
    ```

  - ��������ǲ���ֵ��ʹ��isVal() �� hasVal()

    ```javascript
    // bad
    if (!dragon.age()) {
      return false;
    }

    // good
    if (!dragon.hasAge()) {
      return false;
    }
    ```

  - ���Դ���get()��set()����������Ҫ����һ��

    ```javascript
    function Jedi(options) {
      options || (options = {});
      var lightsaber = options.lightsaber || 'blue';
      this.set('lightsaber', lightsaber);
    }

    Jedi.prototype.set = function(key, val) {
      this[key] = val;
    };

    Jedi.prototype.get = function(key) {
      return this[key];
    };
    ```



## <a name='constructors'>������</a>

  - ������ԭ�ͷ��䷽������������һ���µĶ��󸲸�ԭ�ͣ�����ԭ�ͻ�ʹ�̳г������⡣

    ```javascript
    function Jedi() {
      console.log('new jedi');
    }

    // bad
    Jedi.prototype = {
      fight: function fight() {
        console.log('fighting');
      },

      block: function block() {
        console.log('blocking');
      }
    };

    // good
    Jedi.prototype.fight = function fight() {
      console.log('fighting');
    };

    Jedi.prototype.block = function block() {
      console.log('blocking');
    };
    ```

  - �������Է��� `this` ��������������

    ```javascript
    // bad
    Jedi.prototype.jump = function() {
      this.jumping = true;
      return true;
    };

    Jedi.prototype.setHeight = function(height) {
      this.height = height;
    };

    var luke = new Jedi();
    luke.jump(); // => true
    luke.setHeight(20) // => undefined

    // good
    Jedi.prototype.jump = function() {
      this.jumping = true;
      return this;
    };

    Jedi.prototype.setHeight = function(height) {
      this.height = height;
      return this;
    };

    var luke = new Jedi();

    luke.jump()
      .setHeight(20);
    ```


  - ����дһ���Զ����toString()����������ȷ���������������Ҳ����и����á�

    ```javascript
    function Jedi(options) {
      options || (options = {});
      this.name = options.name || 'no name';
    }

    Jedi.prototype.getName = function getName() {
      return this.name;
    };

    Jedi.prototype.toString = function toString() {
      return 'Jedi - ' + this.getName();
    };
    ```


## <a name='modules'>ģ��</a>

  -  ��Ŀģ�����ʹ��[*RequireJS*](http://www.baidu.com/link?url=_ipnROeiKNO0H65AOHyVEBGnz5xCq3aAzmPtAAtHGpq)



## <a name='jquery'>jQuery</a>

  - ��Ŀ��jquery�汾Ϊ1.10.2

  - ����jQuery��ѯ

    ```javascript
    // bad
    function setSidebar() {
      $('.sidebar').hide();

      // ...stuff...

      $('.sidebar').css({
        'background-color': 'pink'
      });
    }

    // good
    function setSidebar() {
      var $sidebar = $('.sidebar');
      $sidebar.hide();

      // ...stuff...

      $sidebar.css({
        'background-color': 'pink'
      });
    }
    ```

  - ��DOM��ѯʹ�ü����� `$('.sidebar ul')` �� `$('.sidebar ul')`��[jsPerf](http://jsperf.com/jquery-find-vs-context-sel/16)
  - �����������jQuery�����ѯʹ�� `find`

    ```javascript
    // bad
    $('.sidebar', 'ul').hide();

    // bad
    $('.sidebar').find('ul').hide();

    // good
    $('.sidebar ul').hide();

    // good
    $('.sidebar > ul').hide();

    // good (slower)
    $sidebar.find('ul');

    // good (faster)
    $($sidebar[0]).find('ul');
    ```




## <a name='performance'>����</a>

  - [On Layout & Web Performance](http://kellegous.com/j/2013/01/26/layout-performance/)
  - [String vs Array Concat](http://jsperf.com/string-vs-array-concat/2)
  - [Try/Catch Cost In a Loop](http://jsperf.com/try-catch-in-loop-cost)
  - [Bang Function](http://jsperf.com/bang-function)
  - [jQuery Find vs Context, Selector](http://jsperf.com/jquery-find-vs-context-sel/13)
  - [innerHTML vs textContent for script text](http://jsperf.com/innerhtml-vs-textcontent-for-script-text)
  - [Long String Concatenation](http://jsperf.com/ya-string-concat)