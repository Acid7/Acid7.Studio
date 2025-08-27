import { Pane } from 'tweakpane'
import settings from '@/app-settings.js'

export default class Debug {
	constructor() {
		if (settings.debug) {
			settings.debug = {
				isActive: true,
				tweakpane: new Pane()
			}
		}
	}
}