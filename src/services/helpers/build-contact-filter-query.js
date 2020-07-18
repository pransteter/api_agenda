import R from 'ramda';

const contactQueryParams = [
    'name',
    'email',
    'phones'
];
const addressQueryParams = [
    'address_street',
    'address_localNumber',
    'address_postalCode',
    'address_city',
    'address_state',
    'address_country'
];

const transformContactQuery = query => {
    const contactQuery = R.pick(contactQueryParams, query);

    if (contactQuery.phones) {
        contactQuery.phones = {
            $in: Array.isArray(contactQuery.phones)
                ? contactQuery.phones
                : [contactQuery.phones]
        };
    }

    return contactQuery;
}

const transformAddressQuery = query => {
    const rawAddressQuery = R.pick(addressQueryParams, query);
    const addressQuery = {};

    const prefix = 'address';

    if (rawAddressQuery.address_street) {
        addressQuery[`${prefix}.street`] = rawAddressQuery.address_street;
    }
    if (rawAddressQuery.address_localNumber) {
        addressQuery[`${prefix}.localNumber`] = rawAddressQuery.address_localNumber;
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

export default rawQuery => {
    const contactQuery = transformContactQuery(rawQuery);
    const addressQuery = transformAddressQuery(rawQuery);

    return { ...contactQuery, ...addressQuery };
};
