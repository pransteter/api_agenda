import R from 'ramda';

/**
 * ContactFilterQueryBuilder class
 */
export class ContactQueryBuilder {
  /**
   * Constructor method
   * @param {Object} rawQuery
   */
  constructor(rawQuery) {
    this.rawQuery = rawQuery;

    this.contactQueryParams = [
      'name',
      'email',
      'phones',
    ];

    this.addressQueryParams = [
      'address_street',
      'address_localNumber',
      'address_postalCode',
      'address_city',
      'address_state',
      'address_country',
    ];
  }

  /**
   * Build the contact data query
   * @return {Object}
   */
  buildContactPart() {
    const contactQuery = R.pick(this.contactQueryParams, this.rawQuery);

    if (contactQuery.phones) {
      contactQuery.phones = {
        $in: Array.isArray(contactQuery.phones) ?
                  contactQuery.phones :
                  [contactQuery.phones],
      };
    }

    return contactQuery;
  }

  /**
   * Build the contact address data query
   * @return {Object}
   */
  buildContactAddressPart() {
    const rawAddressQuery = R.pick(this.addressQueryParams, this.rawQuery);
    const addressQuery = {};

    const prefix = 'address';

    if (rawAddressQuery.address_street) {
      addressQuery[`${prefix}.street`] = rawAddressQuery.address_street;
    }
    if (rawAddressQuery.address_localNumber) {
      addressQuery[
          `${prefix}.localNumber`
      ] = rawAddressQuery.address_localNumber;
    }
    if (rawAddressQuery.address_postalCode) {
      addressQuery[`${prefix}.postalCode`] = rawAddressQuery.address_postalCode;
    }
    if (rawAddressQuery.address_city) {
      addressQuery[`${prefix}.city`] = rawAddressQuery.address_city;
    }
    if (rawAddressQuery.address_state) {
      addressQuery[`${prefix}.state`] = rawAddressQuery.address_state;
    }
    if (rawAddressQuery.address_country) {
      addressQuery[`${prefix}.country`] = rawAddressQuery.address_country;
    }

    return addressQuery;
  }

  /**
   * Build the object that can be used like a query on repository.
   * @return {Object}
   */
  build() {
    const contactQuery = this.buildContactPart();
    const addressQuery = this.buildContactAddressPart();

    return {...contactQuery, ...addressQuery};
  }
}
