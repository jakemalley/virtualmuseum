// Define Global Variables
var camera;
var scene;
var mouse;
var controls;
var renderer;
var raycaster;
var geometry, material, mesh;
var controlsEnabled = false;
var moveForward, moveBackward, moveLeft, moveRight;
var prevTime = performance.now();
var velocity = new THREE.Vector3();
var objects = [];
var prefabPosition;

// Get the blocker, instructions, landing and information elements.
var blocker = document.getElementById('blocker');
var continue_button = document.getElementById('continue_button');
var landing = document.getElementById('landing')
var information = document.getElementById('information')

function test(){
// Check to see if pointer lock is enabled.
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
if (havePointerLock){
    
    // Get the document body.
    var element = document.body;
    
    // Pointer Lock Exchange.
    var pointerLockExchange = function (event) {
        if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
            controlsEnabled = true;
            controls.enabled = true;
            blocker.style.display = 'none';
        } else {
            moveForward = moveBackward = moveLeft = moveRight = false;
            controlsEnabled = false;
            controls.enabled = false;
            blocker.style.display = '-webkit-box';
			blocker.style.display = '-moz-box';
			blocker.style.display = 'box';

			instructions.style.display = '';
        }
    };
    // Point Lock Error.
    var pointerLockError = function (event) {
        console.log('Pointer Lock Error');
    };
    
    // Add pointer listeners.
    document.addEventListener( 'pointerlockchange', pointerLockExchange, false );
	document.addEventListener( 'mozpointerlockchange', pointerLockExchange, false );
	document.addEventListener( 'webkitpointerlockchange', pointerLockExchange, false );

	document.addEventListener( 'pointerlockerror', pointerLockError, false );
	document.addEventListener( 'mozpointerlockerror', pointerLockError, false );
	document.addEventListener( 'webkitpointerlockerror', pointerLockError, false );
	
	// Callback for click events on the instructions or landing div.
	function clickEventCallback (event) {
	    // When clicked set display to none.
        instructions.style.display = 'none';
        // Lock the pointer.
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        
        if (/Firefox/i.test( navigator.userAgent )) {
            var fullscreenchange = function (event) {
                if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {
                    document.removeEventListener( 'fullscreenchange', fullscreenchange );
                    document.removeEventListener( 'mozfullscreenchange', fullscreenchange );
                    element.requestPointerLock();
                }
            };

            document.addEventListener( 'fullscreenchange', fullscreenchange, false );
            document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );
            element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
            element.requestFullscreen();
		} else {
			element.requestPointerLock();
		}
	}
	// Add the clickEventCallback to the click event on the instructions div.
	continue_button.addEventListener('click', clickEventCallback, false);
	// Add a click event listener for the landing div.
	document.getElementById('im_feeling_lucky').addEventListener('click', function (event) {
        
        // Set the landing div none.
        landing.style.display = 'none';
        clickEventCallback(event);
	}, false);
	
} else {
    instructions.innerHTML = 'I can\'t run? Your browser doesn\'t seem to support pointer lock? :(';
}
}
test();


// Init Function.
function init() {
    // Create a new Camera Object.
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set(1,1,1);
    // Create a new Scene Object.
    scene = new THREE.Scene();
    mouse = new THREE.Vector2();
    // Add fog to the screen.
    scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
    // Create a new Ambiernt
    var light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);
    // Create the controls object.
    controls = new THREE.PointerLockControls(camera);
    scene.add(controls.getObject());
    // document event listeners for keydown and keyup
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    
    // Key Down Function.
    var onKeyDown = function (event) {
        switch (event.keyCode) {
        // if up or w
        case 38:
        case 87:
            // move forward
            moveForward = true;
            break;
        // if left or a
        case 37:
        case 65:
            // move left
            moveLeft = true;
            break;
        // if down or s
        case 40:
        case 83:
            // move backwards
            moveBackward = true;
            break;
        // if right or d
        case 39:
        case 68:
            // move right
            moveRight = true;
            break;
        }    
    };
    // Key Up Function.
    var onKeyUp = function (event) {
        switch (event.keyCode) {
        // if up or w
        case 38:
        case 87:
            // stop moving forward
            moveForward = false;
            break;
        // if left or a
        case 37:
        case 65:
            // stop moving left
            moveLeft = false;
            break;
        // if down or s
        case 40:
        case 83:
            // stop moving backwards
            moveBackward = false;
            break;
        // if right or d
        case 39:
        case 68:
            // stop moving right
            moveRight = false;
            break;
        }
    };



    var onWindowResize = function () {
        // Reset camera aspect ratio.
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        // Reset renderer size.
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    // Add event listeners for keyup and keydown.
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    
    // Create raycaster.
    raycaster = new THREE.Raycaster();
    
    var material = new THREE.LineBasicMaterial({ color: 0xAAFFAA });
    
    // Create Floor.
    geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
	geometry.rotateX( - Math.PI / 2 );
	var texture = new THREE.TextureLoader().load("/static/floor.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(150,150);
	material = new THREE.MeshBasicMaterial( { color: 0xffffff, map:texture} );
	///0xbdbdbd
	floor = new THREE.Mesh( geometry, material ); 
	scene.add(floor);
	
	// Create renderer.
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setClearColor( 0xffffff );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	
	// Add resize listener.
	window.addEventListener( 'resize', onWindowResize, false );
}
function addStand(fields, x, y, z){
    var loader = new THREE.ObjectLoader();
    var randomBit = Math.floor(Math.random() * 2) + 1;
    loader.load( '/static/js/wall-0' + randomBit.toString() + '.js', function (geometry) {
        // Set stand to the generated position.
        geometry.position.x = x;
        geometry.position.y = y;
        geometry.position.z = z;
        // Add scene geometry.
        scene.add(geometry);
        // Define the position of the prefab cube for painting.
        prefab = geometry.children[0];
        // Function to get image in base64.
        function getBase64(fields, prefab, callback){
            var image = new Image();
            image.setAttribute('crossOrigin', 'anonymous');
            image.onload = function () {
                var canvas = document.createElement('canvas');
                canvas.width = this.naturalWidth;
                canvas.height = this.naturalHeight;
                canvas.getContext('2d').drawImage(this, 0, 0);
                
                callback(canvas.toDataURL('image/png'), prefab, fields);
            };
            image.src = fields.image_uri;
        }
        
        // Create painting function.
        function createPainting(image_data, prefab, fields){
            var texture = new THREE.TextureLoader().load(image_data);
            var geometry = new THREE.PlaneGeometry( 6, 6, 100, 100 );
            var material = new THREE.MeshBasicMaterial( { color: 0xffffff, map:texture } );
            
            var cube = new THREE.Mesh( geometry, material );
            objects.push(cube);
            // set the userdata for the cube
            cube.userData = {type:"painting", title:fields.title, artist:fields.artist, date:fields.date_text};
            cube.position.set(x + prefab.position.x, y+ prefab.position.y, z + prefab.position.z + 1);    
            cube.rotation.y = prefab.rotation.y;
            scene.add(cube);
        }
        // For each prefab create a painting.
        for(var i=0;i<prefab.children.length;i++){
            getBase64(fields[i], prefab.children[i], createPainting);
        }
    });
}

function checkIntersects() {
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length <= 0){
        information.style.display = 'none';
    } else {
        information.style.display = 'block';
        for ( var i = 0; i < intersects.length; i++ ) {
            
            if (intersects[ i ].object.userData.title.length <= 0){
                intersects[ i ].object.userData.title = "This artefact doesn't have a title.";
            }
            if (intersects[ i ].object.userData.artist.length <= 0){
                intersects[ i ].object.userData.artist = "Unkown";
            }
            if (intersects[ i ].object.userData.date.length <= 0){
                intersects[ i ].object.userData.date = "Unkown";
            }
            information.innerHTML = "<h2>"+intersects[ i ].object.userData.title+"</h2><h4>Artist: "+intersects[ i ].object.userData.artist+" Date: "+intersects[ i ].object.userData.date+"</h4>";
        }
    }
}

function render(){
    requestAnimationFrame( render );
    
    if (controlsEnabled) {
        raycaster.setFromCamera(mouse, camera);
        checkIntersects()
        
        var time = performance.now();
        var delta = (time - prevTime) / 1000;
        
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        
        velocity.y -= 9.81 * 100.0 * delta;
        
        if (moveForward) velocity.z -= 400.0 * delta;
        if (moveBackward) velocity.z += 400.0 * delta;
        
        if (moveLeft) velocity.x -= 400.0 * delta;
        if (moveRight) velocity.x += 400.0 * delta;
        
        controls.getObject().translateX(velocity.x * delta);
        controls.getObject().translateY(velocity.y * delta);
        controls.getObject().translateZ(velocity.z * delta);
        
        if ( controls.getObject().position.y < 10 ) {

			velocity.y = 0;
			controls.getObject().position.y = 10;

		}
        prevTime = time;
    }
    renderer.render(scene, camera);
}

