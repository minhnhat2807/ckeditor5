/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module list/list/listui
 */

import { createUIComponent } from './utils.js';

import { icons, Plugin } from 'ckeditor5/src/core.js';

/**
 * The list UI feature. It introduces the `'numberedList'` and `'bulletedList'` buttons that
 * allow to convert paragraphs to and from list items and indent or outdent them.
 */
export default class ListUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	public static get pluginName() {
		return 'ListUI' as const;
	}

	/**
	 * @inheritDoc
	 */
	public init(): void {
		const t = this.editor.t;

		// Create two buttons and link them with numberedList and bulletedList commands.
		createUIComponent( this.editor, 'numberedList', t( 'Numbered List' ), icons.numberedList );
		createUIComponent( this.editor, 'bulletedList', t( 'Bulleted List' ), icons.bulletedList );
	}
}
