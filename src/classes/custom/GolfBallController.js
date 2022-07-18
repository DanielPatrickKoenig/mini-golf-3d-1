import CustomMeshController from '../controllers/CustomMeshController';
import CANNON from 'cannon';
import * as THREE from 'three';
import gsap from 'gsap';
export default class GolfBallController extends CustomMeshController{
    constructor(data){
        super(data, 'https://danielpatrickkoenig.github.io/shared-app-resources/golf-ball-1.glb');
        this.ball = null;
    }
    modelLoaded(model){
        const material1 = new THREE.MeshPhongMaterial( {color: 0xff6d0b, emissive: 0x000000} );
        const customMesh = this.environment.selector(model, {type: 'Mesh'})[0];
        customMesh.scale.x = .5;
        customMesh.scale.y = .5;
        customMesh.scale.z = .5;
        customMesh.material = material1;
        this.ball = this.environment.createSphere({size: {r: .5}, position: { x: 0, y: 12, z: 0 }, mass: 2, customMesh });
        customMesh.castShadow = true;
        customMesh.receiveShadow = false;
        // this.positionCamera();
        // this.environment.createBox({size: {x: 1, y: 1, z: 2}, position: { x: 0, y: -.5, z: 0 }, material: material1 });
    }
    moveBall(){
        const worldPoint = new CANNON.Vec3(this.ball.body.position.x,this.ball.body.position.y,this.ball.body.position.z);
        const force = new CANNON.Vec3(0, 0, -1800);
        this.ball.body.applyForce(force,worldPoint);

        const camProxy = { y: this.environment.cameraContainer.position.y };
        gsap.to(camProxy, {
            y: this.environment.cameraContainer.position.z + 2,
            duration: 3,
            onUpdate: () => this.environment.cameraContainer.position.y = camProxy.y
        });
    }
    positionCamera(){
        const d = { n: 0 };
        console.log('positionCamera called');
        gsap.to(d, {
            n: 1,
            duration: 1,
            onComplete: () => this.positionCamera(),
            onUpdate: () => this.environment.cameraContainer.position.z = this.ball.mesh.position.z + 6
        });
    }
}