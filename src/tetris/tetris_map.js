const TetrisMap = class {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.blocks = Array(height).fill(0); // width bit * height bit
    }

    getBlock(x, y){
        return (this.blocks[y] >> x) & 1;
    }

    getBlocks(i){ 
        if(i === undefined) {
            return this.blocks;
        }
        else {
            return this.blocks[i];
        }
    }

    setBlock(x, y, bool) {
        if (this.getBlock(x, y) == bool) return;
        this.blocks[y] ^= (1 << x)
    }

    setBlocks(y, num) {
        this.blocks[y] = num;
    }

    deleteLine(i){
        if(i === undefined) {
            this.blocks.pop();
        }
        else {
            this.blocks.splice(i,1);
        }

        this.blocks.unshift(0);
    }

    makeHashData() {
        let hashcode = 0;

        for(let i = 0; i< this.blocks.length; i++) {
            hashcode += this.getBlocks(i) + i * 0xff;
        }

        return hashcode;
    }

    process() {
        for(let i = 0; i< this.blocks.length; i++) {
            if(this.getBlocks(i) == 0) {
                this.deleteLine(i);
            }
            this.blocks.unshift(0);
        }
    }
}

module.exports = TetrisMap;