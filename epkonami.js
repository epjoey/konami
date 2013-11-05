// insert dependency modules in the list
define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {   // or, you could use these deps in a separate module using define

    var epkonami = {

        darkness: null,

        init: function() {

            this.darkness = $(document.createElement('div'));
            this.darkness.addClass('darkness');
            $('body').append(this.darkness);

            $(document).keydown(function(e) {
                if (e.keyCode == 27) { // escape
                    //this.stop();
                    this.darkness && this.darkness.remove();
                }
                if (e.keyCode == 32) { // space
                    //this.stop();
                }                
            }.bind(this));

            this.start();

        },

        start: function() {
            var darkness = this.darkness;
            
            darkness.fadeIn(1500);

            _.delay(function() {
                this.sparkFlashLight();
            }.bind(this), 1500);
            
            this.putCenterText();

            this.putHints();
        },

        putCenterText: function() {
            
            var elem = $(document.createElement('span'));
            elem.html('Hooray! We Like The Way You Think. But wait, there\'s more, so much more ...');
            elem.css({
                'position': 'absolute',
                'opacity': 0,
                'top': this.darkness.height()/2,
                'left': this.darkness.width()/4,
                'font-size': '20px'
            });
            this.darkness.append(elem);
            elem.animate({
                'opacity': 1
            }, 1000);
        },

        activateKey: function(keyElem) {
            var timeoutId = null;
            keyElem.hover(function() {
                keyElem.animate({
                    'font-size': '40px'
                }, 2000);
                timeoutId = setTimeout(function() {
                    window.location = "http://www.ep.com/admin/test/sandbox/joey/TermsForToday.php"
                }, 2000);
            }, function() {
                keyElem.stop();
                clearTimeout(timeoutId);
            });
        },

        putHints: function() {
            var hints = ['Show Me The Magic', 'Hello There', 'You have yet to find the magic', 'Make sure you hover long enough', 'You can do it!', 'Almost There', 'Isn\'t this fun?', 'Do come again', 'You can find us from anywhere', 'Nope Not Here'],
                minX = 0,
                maxX = this.darkness.width(),
                minY = 0,
                maxY = this.darkness.height(),
                hintElems = [],
                filledAreas = [];

            _.each(hints, function(hint) {
                var elem = $(document.createElement('span'));
                elem.addClass('hint');
                elem.html(hint);
                this.darkness.append(elem);
                hintElems.push(elem);
            }.bind(this));
            
            _.each(hintElems, function(elem) {
                
                var randX=0,
                    randY=0,
                    area;

                do {
                    randX = Math.round(minX + ((maxX - minX)*(Math.random() % 1)));
                    randY = Math.round(minY + ((maxY - minY)*(Math.random() % 1)));
                    area = {x: randX, y: randY, width: elem.width(), height: elem.height()};
                
                } while(this.checkOverlap(area, filledAreas));
                
                filledAreas.push(area);
                
                elem.css({left:randX, top: randY});
            
            }.bind(this));

            this.activateKey(hintElems[0]);

        },

        checkOverlap: function(area, filledAreas) {
            for (var i = 0; i < filledAreas.length; i++) {
                
                checkArea = filledAreas[i];
                
                var bottom1 = area.y + area.height;
                var bottom2 = checkArea.y + checkArea.height;
                var top1 = area.y;
                var top2 = checkArea.y;
                var left1 = area.x;
                var left2 = checkArea.x;
                var right1 = area.x + area.width;
                var right2 = checkArea.x + checkArea.width;
                if (bottom1 < top2 || top1 > bottom2 || right1 < left2 || left1 > right2) {
                    continue;
                }
                return true;
            }
            return false;
        },       
        
        sparkFlashLight: function() {
            var darkness = this.darkness;
            _.delay(function() {
                darkness.addClass('flash');
                _.delay(function() {
                    darkness.removeClass('flash');
                }, 20);
                _.delay(function() {
                    darkness.addClass('flash');
                }, 240);
                _.delay(function() {
                    darkness.removeClass('flash');
                }, 400);
                _.delay(function() {
                    darkness.addClass('flash');
                }, 640);            
            }, 1000);
            darkness.mousemove(function(e){
                darkness.css('background-position',(e.pageX - 250)+'px '+(e.pageY - 250)+'px');
            });            
        }
    };

    return epkonami;
});