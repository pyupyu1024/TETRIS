class Canvas {

    constructor(id) {
        this.canvas = new Array(20);
        for (let i = 0; i < 20; i++)
            this.canvas[i] = 0;
        
        let can = document.getElementById(id);
        this.ctx = can.getContext('2d');

        can.width = 250;
        can.height = 500;
    }

    get(x, y) {
        let temp = this.canvas[20 - y];
        return (temp >> (9 - x)) & 1;
    }

    set(x, y, bool) {
        if (this.get(x, y) == bool) return;
        this.canvas[20 - y] ^= 1 << (9 - x);
    }

    draw(x, y, color) {
        this.ctx.fillStyle = color;
        let args = [x * 25, (19 - y) * 25];
        this.ctx.fillRect(...args, 25, 25);
    }

}

class BLOCK {

    constructor(map, type, angle) {

        this.block = [
            [[-1, 0], [0, 0], [1, 0], [2, 0]],
            [[-1, 1], [-1, 0], [0, 0], [1, 0]],
            [[1, 0], [1, 1], [0, 0], [0, 1]],
            [[-1, 0], [0, 0], [0, 1], [1, 1]],
            [[-1, 0], [0, 1], [0, 0], [1, 0]],
            [[-1, 0], [0, 0], [1, 0], [1, 1]],
            [[-1, 1], [0, 1], [0, 0], [1, 0]],
            [[-1, 0], [0, 0], [1, 0], [1, 1]]
        ][type % 8];

        type = Math.random();

        this.color = [
            'ORANGE', 'RED',
            'CYAN', 'YELLOW'
        ][type * 4 | 0];

        this.map = map;
        this.pos = [4,19];
        this.turn(angle);

    }

    turn(angle) {

        let a = -1, b = -1, i;
        if (angle == 2) b = 1;
        else if (!angle) a = 1;

        let block = [ ...this.block ];

        for (i = 0; i < 4; i++) {
            let t_value = block[i][0] * b;
            block[i][0] = block[i][1] * a;
            block[i][1] = t_value;
        }

        if (this.can_put(block)) {
            this.del(this.block);
            this.block = block;
            this.put(this.block);
        }

    }

    put(block) {
        for (let i = 0; i < 4; i++) {
            let x = block[i][0] + this.pos[0];
            let y = block[i][1] + this.pos[1];
            this.map.draw(x, y, this.color);
        }
    }

    del(block) {
        for (let i = 0; i < 4; i++) {
            let x = block[i][0] + this.pos[0];
            let y = block[i][1] + this.pos[1];
            this.map.draw(x, y, 'white');
        }
    }

    move(x, y) {

    }

    next_block() {

    }

    can_put(block) {

        block = [ ...block ];

        for (let i = 0; i < 4; i++) {
            let x = this.pos[0] + block[i][0];
            let y = this.pos[1] + block[i][1];
            if (this.map.get(x, y)) return 0;
        }

        return 1;
    }

}

class TETRIS {

    constructor(query) {
        this.map = new Canvas(query);
        const args = [ this.map, type, angle ];
        this.block = new BLOCK(...args);
    }

    clear_line() {

    }

    next_block() {
        
    }

    is_game_over() {
        if (this.map.canvas[19]) {

        }
    }

}