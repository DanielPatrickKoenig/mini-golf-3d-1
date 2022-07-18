import BaseScene from '../BaseScene';
import GroundController from '../controllers/GroundController';
import GolfBallController from '../custom/GolfBallController';
import CustomMeshController from '../controllers/CustomMeshController';
import LightController, {LightTypes} from '../controllers/LightController';
import ShadowController from '../controllers/ShadowController';
import { setRotation, basicImageMaterial } from '../../utils/THREEHelpers';
import gsap from 'gsap';
import * as THREE from 'three';
export default class GameScene extends BaseScene{
    constructor(el){
        super(el);
        this.ballController = null;
        this.shadowLight = null;
    }
    initialize(){
        const lightController = new LightController({environment: this.environment});
        this.shadowLight = lightController.addLight({type: LightTypes.DIRECTIONAL, color: 0x000000, intensity: 1.5, target: {x: 0, y: -2, z: 0}});
        lightController.addLight({type: LightTypes.DIRECTIONAL, color: 0xffffff, intensity: .5, target: {x: 1, y: -8, z: -3}});
        lightController.addLight({type: LightTypes.DIRECTIONAL, color: 0xffffff, intensity: .5, target: {x: -1.5, y: -8, z: -6}});
        const shadowController = new ShadowController({environment: this.environment});
        shadowController.registerLight(this.shadowLight, { width: 512, height: 512 * 2, near: .5, far: 5000 });
        // shadowController.registerLight(light2, { width: 5120, height: 5120, near: .5, far: 5000 });
        new GroundController({environment: this.environment}, 'https://danielpatrickkoenig.github.io/spirit-of-kovak/dist/dirt_row.png');
        this.ballController = new GolfBallController({environment: this.environment});

        this.environment.cameraContainer.position.y = 2;
        this.environment.cameraContainer.position.z = 3;
        setRotation(this.environment.camera, 'x', -10);

        const wallMaterial = new THREE.MeshLambertMaterial( {color: 0xcccccc, reflectivity: 0} );
        this.environment.createBox({size: {x: .5, y: 3, z: 50}, position: { x: 6, y: 0, z: -18 }, mass: 0, material: wallMaterial });
        this.environment.createBox({size: {x: .5, y: 3, z: 50}, position: { x: -6, y: 0, z: -18 }, mass: 0, material: wallMaterial });
        const grassMaterial = new THREE.MeshLambertMaterial( {color: 0x00ff00, reflectivity: 0, transparent: true, opacity: .2} );
        const floor = this.environment.createBox({size: {x: 12, y: .125, z: 50}, position: { x: 0, y: 0, z: -18 }, mass: 0, material: grassMaterial });
        this.loadGrass(-2);
        this.loadGrass(-11);
        this.loadGrass(-20);
        this.loadGrass(-29);
        this.loadGrass(-38);
        // floor.mesh.receiveShadow = true;

        this.trackBall();

        this.loadBacker();

    }
    loadGrass(z){
        const grassMaterial = new THREE.MeshLambertMaterial( {color: 0x407625, reflectivity: 0} );
        const grass = new CustomMeshController({environment: this.environment}, 'https://danielpatrickkoenig.github.io/shared-app-resources/grass-1.glb');
        grass.onLoaded = (m) => {
            const grassModel = this.environment.selector(m, {type: 'Mesh'})[0];
            grassModel.material = grassMaterial;
            grassModel.scale.x = 6;
            grassModel.scale.y = 6;
            grassModel.scale.z = 6;
            grassModel.position.z = z;
            grassModel.receiveShadow = true;
        };
    }
    loadBacker(){
        const backerMaterial = new THREE.MeshLambertMaterial( {color: 0x0000cc, reflectivity: 0} );
        const backer = new CustomMeshController({environment: this.environment}, 'https://danielpatrickkoenig.github.io/shared-app-resources/backer.glb');
        backer.onLoaded = (m) => {
            const backerModel = this.environment.selector(m, {type: 'Mesh'})[0];
            backerModel.material = backerMaterial;
            backerModel.position.z = -40;
            backerModel.position.y = 6;
            backerModel.scale.x = 6;
            backerModel.scale.y = 6;
            backerModel.scale.z = 6;
        };
    }
    trackBall(){
        const d = { n: 0 };
        console.log('positionCamera called');
        gsap.to(d, {
            n: 1,
            duration: 1,
            onComplete: () => this.trackBall(),
            onUpdate: () => {
                if(this.ballController.ball){
                    this.shadowLight.position.z = this.ballController.ball.body.position.z;
                    this.shadowLight.target.position.z = this.ballController.ball.body.position.z;
                }
            }
        });
    }
}