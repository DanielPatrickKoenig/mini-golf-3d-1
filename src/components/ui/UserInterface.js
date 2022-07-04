import './UserInterface.css';
const UserInterface = ({scene}) => {
    const processAction = (data, type) => {
        // handle actions here
    }
    scene.setActionHandler(processAction);
    const clicked = () => {
        scene.ball.moveBall();
    };
    return (
        <div>
            <button onClick={clicked}>Test Button</button>
        </div>
    );
}
export default UserInterface;