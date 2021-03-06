import PIXI from '../../PIXI';
import Collection from '../../utils/Collection';
import IDisplayable from '../../utils/IDisplayable';
import Sprite from '../renderer/Sprite';

export default class Gui implements IDisplayable {
	private _displayed: boolean;

	public get displayed(): boolean {
		return this._displayed;
	}

	public set displayed(displayed: boolean) {
		if (this._displayed !== displayed) {
			this._displayed = displayed;
			this.app.stage[(displayed ? 'add' : 'remove') + 'Child'](this.container);
		}
	}

	private readonly container: PIXI.Container;
	protected sprites: Collection<string, PIXI.DisplayObject> = new Collection();
	protected guiObjects: Collection<string, PIXI.Container> = new Collection();

	constructor(public readonly app: PIXI.Application) {
		this.container = new PIXI.Container();
	}

	public addPIXISprite(name: string, sprite: PIXI.DisplayObject) {
		this.sprites.set(name, sprite);
		this.container.addChild(sprite);
	}

	public addObject(name: string, object: PIXI.Container) {
		this.guiObjects.set(name, object);
		this.container.addChild(object);
	}

	public addSprite(name: string, sprite: Sprite): void {
		this.addPIXISprite(name, sprite.getAsSprite());
	}

	public removeObject(name: string) {
		if (this.guiObjects.has(name)) {
			this.sprites.delete(name);
			this.container.removeChild(this.guiObjects.get(name));
		}
	}

	public removeSprite(name: string): void {
		if (this.sprites.has(name)) {
			this.container.removeChild(this.sprites.get(name));
			this.sprites.delete(name);
		}
	}

	public update() {
		this.app.stage.removeChild(this.container);
		this.app.stage.addChild(this.container);
	}
}
