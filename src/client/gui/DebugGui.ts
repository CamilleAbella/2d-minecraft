import { game } from '../../main';
import PIXI from '../../PIXI';
import TilePosition from '../../utils/TilePosition';
import Gui from './Gui';

export default class DebugGui extends Gui {
	public mouseCoordsText: PIXI.Text;
	public fpsCounter: PIXI.Text;
	public debugText: PIXI.Text;

	public constructor(public app: PIXI.Application) {
		super(app);
		this.mouseCoordsText = new PIXI.Text('', new PIXI.TextStyle({ fill: '#ffffff' }));
		this.fpsCounter = new PIXI.Text('', new PIXI.TextStyle({ fill: '#ffffff' }));
		this.debugText = new PIXI.Text(
			'',
			new PIXI.TextStyle({
				fill: '#ffffff',
				fontSize: 16,
			})
		);
		this.fpsCounter.position.set(window.innerWidth - 200, 20);
		this.mouseCoordsText.position.set(window.innerWidth - 200, 50);
		this.debugText.position.set(10, 50);
		this.addPIXISprite('mouseCoordsText', this.mouseCoordsText);
		this.addPIXISprite('fpsCounter', this.fpsCounter);
		this.addPIXISprite('debugText', this.debugText);
	}

	public update(): void {
		const mousePosition = TilePosition.fromPositionToTilePosition(game.mouseManager.getMousePosition());
		this.mouseCoordsText.text = `x: ${mousePosition.x}, y: ${mousePosition.y}`;
		this.fpsCounter.text = `FPS: ${game.app.ticker.FPS.toFixed()}`;
	}
}
