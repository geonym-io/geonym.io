/**
 * Zen
 * 
 * The absence of attachment.
 */
class Zen extends Space {

  /**
   * Initialize zen space.
   */
  static init() {
    this.identifier = 'zen';
    this.title = 'the absence of attachment';
    this.summary = '';

    Space.addDimension(this);
  }

  /**
   * Generate a structure.
   *
   * @return       a tree of nested trees (Array) and leaves (null).
   */
  static generate(){
    return [];
  }

  /**
   * Render a tree from the generated structure.
   * 
   * @param context   The HTML Canvas Context object.
   * @param structure The structure being presented.
   */
  static render(context, structure){
    Geonym.drawCircle(context,[0,0],0.8,'#F7F7F7','black');
  }
};
Zen.init();
