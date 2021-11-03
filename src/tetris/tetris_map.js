const TetrisMap = class {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.blocks = Array(height).fill(0); // width bit * height bit
    }

    getBlock(x, y){
        return (this.blocks[y] >> (x) & 1);
    }

    getBlocks(i){ 
        if(i === undefined) {
            return this.blocks;
        }
        else {
            return this.blocks[i];
        }
    }

    setBlock(x, y) {
        this.blocks[y] |= (1 << x)
    }

    makeHashData() {
        let hashcode = 0xffff;

        for(let n of this.blocks){
            hashcode += n;
            hashcode ^= n;
        }

        return hashcode;
    }
}