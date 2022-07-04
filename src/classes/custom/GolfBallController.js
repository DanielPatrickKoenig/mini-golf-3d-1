import CustomMeshController from '../controllers/CustomMeshController';
import CANNON from 'cannon';
import * as THREE from 'three';
export default class GolfBallController extends CustomMeshController{
    constructor(data){
        super(data, 'https://danielpatrickkoenig.github.io/shared-app-resources/golf-ball-1.glb');
        this.ball = null;
    }
    modelLoaded(model){
        const material1 = new THREE.MeshLambertMaterial( {color: 0xff6d0b, reflectivity: 0} );
        const customMesh = this.environment.selector(model, {type: 'Mesh'})[0];
        customMesh.material = material1;
        this.ball = this.environment.createSphere({size: {r: 1}, position: { x: 0, y: 12, z: 0 }, mass: 2, customMesh });
    }
    moveBall(){
        const worldPoint = new CANNON.Vec3(this.ball.body.position.x,this.ball.body.position.y,this.ball.body.position.z);
        const force = new CANNON.Vec3(200, 0, -900);
        this.ball.body.applyForce(force,worldPoint);
    }
}