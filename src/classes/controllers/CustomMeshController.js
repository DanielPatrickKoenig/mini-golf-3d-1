import {ControllerTypes} from './BaseController';
import LocatableController from './LocatableController';
import ModelLoader from '../ModelLoader';
export default class CustomMeshController extends LocatableController{
    constructor(data, glbFile, startPosition){
        super(data, startPosition);
        this.glbFile = glbFile;
        this.onLoaded = null;
        this.loadModel();
    }
    async loadModel (){ 
        const model = await new ModelLoader(this.glbFile).load();
        this.scene.add(model);
        this.modelLoaded(model);
        if(this.onLoaded){
            this.onLoaded(model);
        }
    }
    modelLoaded(model){
        console.log(model);
    }
    getControllerType(){
        return ControllerTypes.CUSTOM_MESH;
    }
}