/**
 * Mandala
 * 
 * A mandala generator.
 */
class Mandala extends Space {

  /**
   * Initialize mandala space.
   */
  static init() {
    this.identifier = 'mandala';
    this.title      = 'an exploration of ephemeral symmetries';
    this.summary    = 'Summary.';

    Space.addDimension(this);
  }

  /**
   * Generate a structure.
   *
   * @param depth  desired depth of the tree.
   * @return       a tree of nested trees (Array) and leaves (null).
   */
  static generate(depth){
    return [];
  }

  /**
   * Render a tree from the generated structure.
   * 
   * @param context   The HTML Canvas Context object.
   * @param structure The structure being presented.
   */
  static render(context, tree){
    Geonym.drawCircle(context,[0,0],0.8,'#F7F7F7','black');
  }
};
Mandala.init();