import BaseScene from '../BaseScene';
import GroundController from '../controllers/GroundController';
import GolfBallController from '../custom/GolfBallController';
import LightController, {LightTypes} from '../controllers/LightController';
import { setRotation } from '../../utils/THREEHelpers';
export default class GameScene extends BaseScene{
    constructor(el){
        super(el);
        this.ball = null;
    }
    initialize(){
        const lightController = new LightController({environment: this.environment});
        lightController.addLight({type: LightTypes.DIRECTIONAL, color: 0xffffff, intensity: 1.5, target: {x: 10, y: 0, z: -15}});
        lightController.addLight({type: LightTypes.DIRECTIONAL, color: 0xffffff, intensity: .5, target: {x: -5, y: 0, z: -22}});

        new GroundController({environment: this.environment}, 'https://danielpatrickkoenig.github.io/spirit-of-kovak/dist/dirt_row.png');

        this.ball = new GolfBallController({environment: this.environment}, 'https://danielpatrickkoenig.github.io/shared-app-resources/golf-ball-1.glb');

        this.environment.cameraContainer.position.y = 4;
        this.environment.cameraContainer.position.z = 4;
        setRotation(this.environment.camera, 'x', -20);

    }
}