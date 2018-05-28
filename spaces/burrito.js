/**
 * Burrito
 * 
 * An space-filling exploration of burritos and coolers.
 */
class Burrito extends Space {

  /**
   * Initialize burrito space.
   */
  static init() {
    this.identifier = 'burrito';
    this.title      = 'space filling burritos';
    this.summary    = 'An exploration of space-filling shapes inspired by calculations approximating how many burritos will fit into a cooler.';

    Space.addDimension(this);
  }

  /**
   * Generate a structure.
   *
   * @param depth  desired depth of the tree.
   * @return       a tree of nested trees (Array) and leaves (null).
   */
  static generate(depth = 5){
    if (depth > 0){
      var tree = [];
      for (var i = 0; i < 4; i++){
        if (Math.random() > 3 / depth ** 2) {
          tree.push(this.generate(depth-1));
        } else {
          tree.push(null);
        }
      }
      return tree;
    }
  }

  /**
   * Render a tree from the generated structure.
   * 
   * @param context  The HTML Canvas Context object.
   * @param tree     A tree of nested trees (Array) and leaves (null).
   * @param position The position ([x,y] on -1 .. 1) of the root node.
   * @param size     The size (0..1) of the tree.
   */
  static render(context, tree, position = [0,0], size = 1){
    for (var i = 0; i < tree.length; i++) {
      var rotation = i * (Math.PI/2) + Math.PI / 4;
      var length = Math.SQRT2 * size / 2;
      var x = position[0] + Math.sin(rotation) * length;
      var y = position[1] + Math.cos(rotation) * length;
      if (Array.isArray(tree[i])) {
        this.render(context,tree[i],[x,y],length / Math.SQRT2);
      } else {
        Geonym.drawCircle(context,
          [x,y],
          0.90*(length / Math.SQRT2),
          Geonym.niceColor()
        );
      }
    }
  }
};
Burrito.init();

