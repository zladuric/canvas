(function(){
    window.onload = function() {

        // setup canvas
        var canvas = document.getElementById('canvas');
        var c = canvas.getContext('2d');

        canvas.width = 640;
        canvas.height = 280;
        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);

        var numOfParticles = document.getElementById('num-of-particles');
        // setup particles to show on screen
        var particles = [];
        var numParticles = 10;
        var particleIndex = 0;
        var liveParticles = 0;
        var gravity = 0.4;

        // setup Particle model
        function Particle() {
            if(liveParticles > 50 || liveParticles < -50) {
                return;
            }
            this.size = 5;
            this.x = canvas.width / 2;
            this.y = 11;
            this.vx = Math.random() * 10 - 5;
            this.vy = Math.random() * 10;
            this.color = 'white';
            this.bounces = 0;
            this.maxBounces = Math.random() * 10;
            this.id = particleIndex;
            particles[particleIndex++] = this;
            console.log('inc liveParticles');
            liveParticles = liveParticles + 1;
            numOfParticles.innerHTML = liveParticles;
        }

        Particle.prototype.draw = function() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy = this.vy + gravity;
            //this.vx = this.vx + (gravity / 2);
            this.vy = this.vy * 0.98;
            c.fillStyle = this.color;
            c.fillRect(this.x, this.y, this.size, this.size);
            if (this.x >= (canvas.width - 10) || this.x <= 10) {
                this.vx = this.vx * -1;
                this.bounces++;
                this.color = 'rgb(' + parseInt(Math.random() * 255) + ', ' +
                                        parseInt(Math.random() * 255) + ', ' +
                                        parseInt(Math.random() * 255) + ')';
            }
            if (this.y >= (canvas.height - 10) || this.y <= 10) {
                this.vy = this.vy * -1;
                this.bounces++;
            }

            if(this.bounces > this.maxBounces) {
                this.destroy();
            }
        }

        Particle.prototype.destroy = function() {
            c.fillStyle = 'red';
            var self = this;

            if (this.size < 20) {
                setTimeout(function(){
                    self.size++;
                    c.fillRect(self.x, self.y, self.size, self.size);
                    self.destroy();
                }, 45);
                return;
            };
            console.log('dec liveParticles')
            liveParticles = liveParticles - 1;
            delete particles[self.id];
            var reload = Math.random();
            console.log(reload);
            if(reload > 0.5) {
                console.log('new particle after old died', liveParticles);
                new Particle();
            } else {
                console.log('no new particle');
            }
            if(reload > 0.8) {
                console.log('second new particle');
                new Particle();
            }

        }

        // start with 10 particles
        for (var i = 0; i < numParticles; i++) {
            new Particle();
        }


        // main loop
        setInterval(function() {
            c.fillStyle = 'black';
            c.fillRect(0, 0, canvas.width, canvas.height);
            for (var i in particles) {
                particles[i].draw();
            }
        }, 30);

        document.body.appendChild(canvas);
    };
})();