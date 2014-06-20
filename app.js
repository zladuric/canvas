(function(){
    window.onload = function() {

        // setup canvas
        var canvas = document.getElementById('canvas');
        var c = canvas.getContext('2d');

        canvas.width = 640;
        canvas.height = 280;
        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);

        // setup particles to show on screen
        var particles = [];
        var numParticles = 10;
        var particleIndex = 0;

        // setup Particle model
        function Particle() {
            this.x = canvas.width / 2;
            this.y = canvas.height  / 2;
            this.vx = Math.random() * 10 - 5;
            this.vy = Math.random() * 10 - 5;
            this.bounces = 3;
            particles[particleIndex++] = this;
        }

        Particle.prototype.draw = function() {
            this.x += this.vx;
            this.y += this.vy;
            c.fillStyle = 'white';
            c.fillRect(this.x, this.y, 5, 5);
            if (this.x >= canvas.width || this.x <= 0) {
                this.vx = this.vx * -1;
            }
            if (this.y >= canvas.height || this.y <= 0) {
                this.vy = this.vy * -1;
            }
        }
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