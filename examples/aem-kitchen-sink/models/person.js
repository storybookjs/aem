import { GenericModel } from '@storybook/aem';

/**
 * Defines the {@code Person} Sling Model used for the {@code /xmp/components/person} component.
 *
 * Note that it extends the `GenericModel` which automatically exports all properties defined in the
 * content.
 */
export default class Person extends GenericModel {
  /**
   * Full name of the person, composed of first and last name.
   * @returns {string}
   */
  get fullName() {
    return `${this.content.firstName} ${this.content.lastName}`
  }
}
