/* ✨ UI ✨ */
const UI = {
    ELEMENTS: {
        fireParticleCanvas: document.querySelector("canvas#fire")
    }
}

// Fire particles animation 🔥

{
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = UI.ELEMENTS.fireParticleCanvas, ctx = canvas.getContext("2d")
    let w = canvas.width = window.outerWidth, h = canvas.height = window.outerHeight, isMouseDown = false, mouse

    /**
     * @type {{ pos:{ x:number,y:number,noiseX:number,noiseY:number }, color:number[], opacity:number, size:number, decreaseOpacityBy:number, decreaseSizeBy:number }[]}
     */
    const particles = new Array(250)    
    const MAX_PARTICLE_SIZE = 6
    const MAX_PARTICLE_SPEED_Y = 8
    const MAX_PARTICLE_SPEED_X = 1

    // /**
    //  * @type {{ pos:{ x:number,y:number,noiseX:number,noiseY:number }, color:number[], colorFrom:number[], colorTo:number[], opacity:number, size:number, decreaseOpacityBy:number, decreaseSizeBy:number }[]}
    //  */
    // const fireball = []
    // fireball.maxWidth = 30
    // fireball.particles = 20

    for (let i = 0; i < particles.length; i++) {
        particles[i] = {
            pos: {
                x: Math.floor(Math.random() * w),
                y: Math.floor(h + (Math.random() * h/2)),
                noiseX: Math.random(),
                noiseY: Math.random()
            },
            color: [253, 212, 6],
            opacity: 0.3 + Math.random() * 0.7,
            size: Math.random() * MAX_PARTICLE_SIZE,
            decreaseOpacityBy: Math.random() / 75,
            decreaseSizeBy: Math.random() * MAX_PARTICLE_SIZE / 50
        }
    }

    window.addEventListener("mousedown", e => (isMouseDown = true) && (mouse = e))
    window.addEventListener("mousemove", e => mouse = e)
    window.addEventListener("mouseup", e => (isMouseDown = false) && (mouse = e))

    function draw() {
        ctx.clearRect(0, 0, w, h)
        particles.forEach((p, i) => {
            ctx.beginPath()
            ctx.ellipse(Math.floor(p.pos.x), Math.floor(p.pos.y), Math.floor(p.size), Math.floor(p.size), 0, 0, Math.PI * 2)
            ctx.closePath()
            ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.opacity})`
            ctx.fill()

            p.opacity = Math.max(0, p.opacity - p.decreaseOpacityBy)
            p.size = Math.max(0, p.size - p.decreaseSizeBy)
            p.pos.y -= (perlinNoise(p.pos.noiseY) * MAX_PARTICLE_SPEED_Y/2) + MAX_PARTICLE_SPEED_Y/2
            p.pos.x += (perlinNoise(p.pos.noiseX) - 0.5) * 2 * MAX_PARTICLE_SPEED_X
            p.pos.noiseX += 0.01
            p.pos.noiseY += 0.01

            if (p.opacity <= 0 || p.size <= 0 || p.pos.y < 0 || p.pos.x < 0 || p.pos.x > w) {
                particles[i] = {
                    pos: {
                        x: Math.floor(Math.random() * w),
                        y: Math.floor(h + (Math.random() * h/2)),
                        noiseX: Math.random(),
                        noiseY: Math.random()
                    },
                    color: [253, 212, 6],
                    opacity: 0.3 + Math.random() * 0.7,
                    size: Math.random() * MAX_PARTICLE_SIZE,
                    decreaseOpacityBy: Math.random() / 50,
                    decreaseSizeBy: Math.random() * MAX_PARTICLE_SIZE / 50
                }
            }
        })

        // Fireball 🔥
        // isMouseDown && (() => {
        //     for (var i = 0; i < fireball.particles; i++) {
        //         fireball.push({
        //             pos: {
        //                 x: mouse.x + (Math.random() * fireball.maxWidth - fireball.maxWidth/2),
        //                 y: mouse.y + (Math.random() * fireball.maxWidth - fireball.maxWidth/2),
        //                 noiseX: Math.random(),
        //                 noiseY: Math.random()
        //             },
        //             color: [253, 212, 6],
        //             colorFrom: [253, 212, 6],
        //             colorTo: [255, 14, 5],
        //             opacity: 0.3+Math.random()*0.7,
        //             size: Math.random() * MAX_PARTICLE_SIZE * 1.5,
        //             decreaseOpacityBy: Math.random() / 10,
        //             decreaseSizeBy: Math.random() * MAX_PARTICLE_SIZE / 25
        //         })
        //     }
        // })()

        // fireball.forEach((p, i) => {
        //     ctx.beginPath()
        //     ctx.ellipse(Math.floor(p.pos.x), Math.floor(p.pos.y), Math.floor(p.size), Math.floor(p.size), 0, 0, Math.PI * 2)
        //     ctx.closePath()
        //     ctx.fillStyle = `rgba(${Math.floor(p.color[0])}, ${Math.floor(p.color[1])}, ${Math.floor(p.color[2])}, ${p.opacity})`
        //     ctx.fill()

        //     p.opacity = Math.max(0, p.opacity - p.decreaseOpacityBy)
        //     p.size = Math.max(0, p.size - p.decreaseSizeBy)
        //     p.pos.y -= (perlinNoise(p.pos.noiseY) * MAX_PARTICLE_SPEED_Y/2) + MAX_PARTICLE_SPEED_Y/2
        //     p.pos.x += (perlinNoise(p.pos.noiseX) - 0.5) * 2 * MAX_PARTICLE_SPEED_X
        //     p.pos.noiseX += 0.01
        //     p.pos.noiseY += 0.01
        //     p.color.forEach((v, i) => {
        //         p.color[i] += Math.abs((p.colorFrom[i] - p.colorTo[i])/30) * Math.sign(p.colorTo[i] - p.colorFrom[i])
        //     })

        //     if (p.opacity <= 0 || p.size <= 0 || p.pos.y < 0 || p.pos.x < 0 || p.pos.x > w) {
        //         fireball.splice(i, 1)
        //     }
        // })
    }
    window.addEventListener("load", () => setInterval(draw, 33))
}