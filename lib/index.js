// Import helper functions from outside files
import {
  createCubeMaterials,
  sampleData
} from './utils';

function getConstructor() {
  /**
   * Construct the component and return exposed functions and objects
   * @param  {String} id that identifies instance of constructed component
   * @return {Object} THREE.js Group, Draw fn, id
   */
  function construct(id) {
    var opt = {
      size: {
        width: 1,
        height: 1,
        depth: 1
      },
      position: {
        x: 0,
        y: 0,
        z: -2.5
      }
    };
    var geometry  = new THREE.CubeGeometry(
      opt.size.width, opt.size.height, opt.size.depth
    );
    // We create a frame to capture the position and size of our display
    // This will be reused for moving the instance to camera focus
    var frame     = new THREE.Mesh(
      new THREE.PlaneGeometry(opt.size.width * 1.2, opt.size.height * 1.3), 
      new THREE.MeshBasicMaterial({ color: '#0000ff', wireframe: true })
    );

    // In this case, frame is positioned right at the front face of our cube
    frame.position.set(0, 0, (opt.size.depth / 2) + 0.05);

    var materials = createCubeMaterials(sampleData.main);
    var box       = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    var component = new THREE.Group();

    component.add(box);
    component.add(frame);
    component.position.set(opt.position.x, opt.position.y, opt.position.z);

    let drawables = {
      main: data => {
        switch (data.type) {
          case 'text': object.material = createCubeMaterials(data); break;
          case 'image': object.material = createCubeMaterials(data); break;
        }
      }
    };

    /**
     * Draw data point value onto drawable.
     * @param  {Object} value: '', drawableId: String, draw_type: String
     * @return {void}
     */
    function draw(data) {
      if (data.drawableId && drawables[data.drawableId]) {
        drawables[data.drawableId](data);
      }
    }

    function deactivate() {
      draw(sampleData);
    }


    return {
      draw,
      component,
      deactivate,
      id,
      frame,
      timeStamp: Date.now()  
    };
  }

  console.log('timeStamp:', Date.now());

  return construct;
}

// Required for the rollup to export our functionality
let componentConstructor = getConstructor();