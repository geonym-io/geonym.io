/**
 * Space
 * 
 * The base class for things to display.
 */
class Space {

  /**
   * Get the dimensionality of the present Space.
   *
   * @return this.dimensions, an array of dimensions in the present Space.
   */
  static getDimensions() {
    return this.dimensions;
  }

  /**
   * Add a dimension to the present Space.
   *
   * @return this.dimensions, an array of dimensions in the present Space.
   */
  static addDimension(space){
    if (! this.dimensions) {
      this.dimensions = [ space ];
    } else {
      this.dimensions.push(space);
    }
    return this.dimensions;
  }

  /**
   * Gets the unique identifier of this space
   */
  static getIdentifier() {
    if (! this.identifier) {
      this.identifier = '';
    }
    return this.identifier;
  }

  /**
   * Gets the title of this space
   */
  static getTitle() {
    if (! this.title) {
      this.title = '';
    }
    return this.title;
  }

  /**
   *  Gets the summary of this space
   */
  static getSummary() {
    if (! this.summary) {
      this.summary = '';
    }
    return this.summary;
  }
}

/**
 * Geonym
 * 
 * A computational geometry playground.
 */
class Geonym {

  /**
   * Find the DOM elements we interact with.
   * 
   * @return elements = {
   *    header:    The <header> container,
   *    site:      The site name <div>,
   *    tagline:   The tagline <div>,
   *    nav:       The <nav> container on the left,
   *    title:     The <h1> title of the current space,
   *    canvas:    The <canvas> element we draw on,
   *    summary:   The <div> summarizing the current space,
   *    tagline:   The <div> "shaping names" tagline,
   *    structure: The <code> element persisting session data,
   *    spaces:    The <ul> element linking to active spaces
   * }
   */
  static elements() {
    return {
      header:    document.getElementById('header'),
      site:      document.getElementById('site'),
      tagline:   document.getElementById('tagline'),
      nav:       document.getElementById('nav'),
      title:     document.getElementById('title'),
      canvas:    document.getElementById('canvas'),
      summary:   document.getElementById('summary'),
      tagline:   document.getElementById('tagline'),
      structure: document.getElementById('structure'),
      spaces:    document.getElementById('spaces'),
    };
  }

  /**
   * Arrange the elements within the window.
   *
   * @param elements A hash of all relevant DOM objects.
   */
  static arrange(elements = this.elements()){
    var canvasSize = (window.innerWidth - 422);
    elements["canvas"].style.width = elements["canvas"].style.height = canvasSize + 'px';
    elements["summary"].style.top = (canvasSize + 94) + 'px';
    elements["summary"].style.width = (canvasSize - 36) + 'px';
    elements["structure"].style.height = (canvasSize - 20) + 'px';
  }

  /**
   * Scale a vector to the dimensions of the canvas.
   *
   * @param vector  A float between -1 and 1.
   * @returns       A float between 0 and canvas.width / 2.
   */
  static scale(vector, canvas) {
    var unit_vector = (canvas.width / 2);
    return vector * unit_vector;
  }

  /**
   * Place a vector relative to the dimensions of the canvas.
   *
   * @param vector  A float between -1 and 1.
   * @returns       A float between 0 and canvas.width / 2.
   */
  static place(vector, canvas) {
    return canvas.width / 2 + this.scale(vector,canvas);
  }

  /**
   * Calibrate a coordinate (-1..1) into a position (0..canvas.width).
   *
   * Note that this flips the y-axis to increase upward (i.e. higher
   * numbers are to the top of the canvas) rather than downward (i.e.
   * higher numbers are lower, towards the bottom of the canvas).
   *
   * @param coordinate  Array of floats between -1 and 1.
   * @returns           Array of floats scaled to the canvas.
   */
  static calibrate(coordinate, canvas){
    coordinate[1] = coordinate[1] * -1;
    var point = [];
    for (var i = 0; i < coordinate.length; i++) {
      point.push(
        this.place(coordinate[i], canvas)
      );
    }
    return point;
  }

  /**
   * Choose a nice color.
   *
   * @returns a random, muted CSS-compatible color declaration.
   */
  static niceColor(){
    return 'hsl(' + 360 * Math.random() + ', 50%, 25%)';
  }

  /**
   * Draw a circle.
   *
   * @example drawCircle(context,[-0.8,0.8], 0.1);
   *
   * @param context  The HTML Canvas Context object.
   * @param position An Array [x,y] of the center (from -1 to 1).
   * @param size     The radius (unit vector 1) of the circle.
   * @param color    The color to fill the circle with, CSS format.
   * @param border   The color to stroke the circle with, CSS format.
   */
  static drawCircle(context, position, size, color = 'black', border){
    var point = this.calibrate(position, canvas);
    var radius = this.scale(size, canvas);
    context.beginPath();
    context.arc( point[0], point[1], radius, 0, 2 * Math.PI );
    context.fillStyle = color;
    context.fill();
    if (border) {
      context.lineWidth = size*3;
      context.strokeStyle = '#555';
      context.stroke();
    }
  }

  /**
   * Draw a line.
   *
   * @example drawLine(context,[-0.8,0.8],[0.8,0.8]);
   * 
   * @param context  The HTML Canvas Context object.
   * @param from     An Array [x,y] of the beginning (from -1 to 1).
   * @param to       An Array [x,y] of the end (from -1 to 1).
   * @param color    The color to stroke the line with, CSS format.
   */
  static drawLine(context, from, to, color = 'black'){
    var beginning = this.calibrate(from, canvas);
    var end = this.calibrate(to, canvas);
    context.beginPath();
    context.moveTo(beginning[0],beginning[1]);
    context.lineTo(end[0],end[1]);
    context.lineWidth = 1;
    context.strokeStyle = color;
    context.stroke();
  }

  /**
   * Gets the list of available spaces.
   * 
   * @returns A hash of classes that extend Space.
   */
  static getAvailableSpaces() {
    if (! this.availableSpaces) {
      this.availableSpaces = {};
    }
    return this.availableSpaces;
  }

  /** 
   * Records that a given space is available.
   * 
   * @param space A class that extends Space.
   */
  static setAvailableSpace(space) {
    this.getAvailableSpaces()[
      space.getIdentifier()
    ] = space;
  }

  /**
   * Returns the currently ative space.
   * 
   * @returns A class that extends space.
   */
  static getActiveSpace() {
    return this.activeSpace;
  }

  /**
   * Sets which space we're currently looking at.
   * 
   * @param space A class that extends space
   */
  static setActiveSpace(space){
    this.activeSpace = space;

    // Set this space's link to active in the sidebar
    var dimensions = Space.getDimensions();
    for (var i = 0; i < dimensions.length; i++) {
      var identifier = dimensions[i].getIdentifier();
      var link = document.getElementById(identifier);
      if(link){
        if(space.getIdentifier() == identifier) {
          link.className += ' active';
        } else {
          link.className = '';
        }
      }
    }
  }

  /**
   * Registers a new space.
   * 
   * @param space A class that extends Space.
   */
  static register(space) {
    this.setAvailableSpace(space);
    
    var link = document.createElement('a');
    link.appendChild(document.createTextNode(space.getIdentifier()));
    link.href=`#${space.getIdentifier()}`;
    link.id=`${space.getIdentifier()}`;

    var listItem = document.createElement("li");
    listItem.appendChild(link);

    var elements = this.elements();
    elements['spaces'].appendChild(listItem);
    document.getElementById(space.getIdentifier()).addEventListener('click',  
      function() { 
        event.preventDefault();
        Geonym.render(space);
      }
    );
  }

  /**
   * Transcribe a structure to the DOM from the generator.
   *
   * @param notepad   A DOM object referencing the notepad <div>.
   * @return         The structure the active space will render.
   */
  static transcribe(notepad){
    var structure = this.getActiveSpace().generate();
    notepad.innerHTML = JSON.stringify(structure,null,2);
    return structure;
  }

  /**
   * Render a structure through the active space to the present context.
   *
   * @param space A class that extends Space.
   */
  static render(space) {
    var elements = this.elements();
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.setActiveSpace(space);

    var structure = this.transcribe(elements["structure"]);
    elements['title'].innerHTML = this.getActiveSpace().getTitle();
    elements['summary'].innerHTML = this.getActiveSpace().getSummary();
    this.getActiveSpace().render(context, structure);
  }

  /**
   * Express the active space to a canvas and a notepad
   */
  static express() {
    this.arrange();
    var dimensions = Space.getDimensions();
    if(dimensions && dimensions.length > 0){
      for (var i = 0; i < dimensions.length; i++) {
        this.register(dimensions[i]);
      }
      this.render(dimensions[0]);
    }
  }
}