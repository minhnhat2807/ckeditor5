/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module table/ui/formrowview
 */

import { View, type LabelView, type ViewCollection } from 'ckeditor5/src/ui.js';
import type { Locale } from 'ckeditor5/src/utils.js';

import '../../theme/formrow.css';

/**
 * The class representing a single row in a complex form,
 * used by {@link module:table/tablecellproperties/ui/tablecellpropertiesview~TableCellPropertiesView}.
 *
 * **Note**: For now this class is private. When more use cases arrive (beyond ckeditor5-table),
 * it will become a component in ckeditor5-ui.
 *
 * @internal
 */
export default class FormRowView extends View {
	/**
	 * An additional CSS class added to the {@link #element}.
	 *
	 * @observable
	 */
	public declare class: string | null;

	/**
	 * A collection of row items (buttons, dropdowns, etc.).
	 */
	public readonly children: ViewCollection;

	/**
	 * The role property reflected by the `role` DOM attribute of the {@link #element}.
	 *
	 * **Note**: Used only when a `labelView` is passed to constructor `options`.
	 *
	 * @observable
	 * @internal
	 */
	public declare _role: string | null;

	/**
	 * The ARIA property reflected by the `aria-labelledby` DOM attribute of the {@link #element}.
	 *
	 * **Note**: Used only when a `labelView` is passed to constructor `options`.
	 *
	 * @observable
	 * @internal
	 */
	public declare _ariaLabelledBy: string | null;

	/**
	 * Creates an instance of the form row class.
	 *
	 * @param locale The locale instance.
	 * @param options.labelView When passed, the row gets the `group` and `aria-labelledby`
	 * DOM attributes and gets described by the label.
	 */
	constructor( locale: Locale, options: { children?: Array<View>; class?: string; labelView?: LabelView } = {} ) {
		super( locale );

		const bind = this.bindTemplate;

		this.set( 'class', options.class || null );
		this.children = this.createCollection();

		if ( options.children ) {
			options.children.forEach( child => this.children.add( child ) );
		}

		this.set( '_role', null );
		this.set( '_ariaLabelledBy', null );

		if ( options.labelView ) {
			this.set( {
				_role: 'group',
				_ariaLabelledBy: options.labelView.id
			} );
		}

		this.setTemplate( {
			tag: 'div',
			attributes: {
				class: [
					'ck',
					'ck-form__row',
					bind.to( 'class' )
				],
				role: bind.to( '_role' ),
				'aria-labelledby': bind.to( '_ariaLabelledBy' )
			},
			children: this.children
		} );
	}
}
