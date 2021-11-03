!function main(){
    class Canvas {

        constructor(id) {
            this.canvas = new TetrisMap(10,20);
            this.ctx = document.getElementById(id)?.getContext('2d');
    
            ctx.canvas.width = 250;
            ctx.canvas.height = 500;
        }
    
        get(x, y) {
            return this.canvas.getBlock(x,y)
        }
    
        set(x, y, bool) {
            this.canvas.setBlock(x,y, bool);
        }
    
        draw(x, y, color) {
            this.ctx.fillStyle = color;
            let args = [x * 25, (19 - y) * 25];
            this.ctx.fillRect(...args, 25, 25);
        }

        setWindowSize(width, height) {
            
        }
    
    }
}()