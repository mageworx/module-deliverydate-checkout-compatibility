/*jshint browser:true jquery:true*/
/*global alert*/
define([
    'mage/utils/wrapper',
    'uiRegistry',
    'underscore'
], function (wrapper, registry, _) {
    'use strict';

    console.log('INITIALIZE PAYLOAD EXTENDER MIXIN');

    return function (originalPayloadExtender) {

        return wrapper.wrap(originalPayloadExtender, function (originalAction) {
            if (!_.isEmpty(mwDeliveryDateConfig) && mwDeliveryDateConfig.enabled) {
                console.log('Mageworx Delivery Date payload extender.');

                let payload = originalAction(),
                    shippingAddress = payload.addressInformation.shipping_address,
                    deliveryDateSource = registry.get('deliveryDateProvider'),
                    deliveryDateData = deliveryDateSource.delivery_date || {};

                if (shippingAddress['extensionAttributes'] === undefined) {
                    shippingAddress['extensionAttributes'] = {};
                }

                shippingAddress['extensionAttributes']['delivery_comment'] = deliveryDateData['delivery_comment'];
                shippingAddress['extensionAttributes']['delivery_day'] = deliveryDateData['delivery_day'];
                shippingAddress['extensionAttributes']['delivery_option_id'] = deliveryDateData['delivery_option_id'];
                shippingAddress['extensionAttributes']['delivery_time'] = deliveryDateData['delivery_time'];

                // Validate custom attributes and
                // pass execution to original action ('Magento_Checkout/js/action/set-shipping-information')
                deliveryDateSource.set('params.invalid', false);
                deliveryDateSource.trigger('delivery_date.data.validate');

                if (deliveryDateSource.get('params.invalid')) {
                    console.log('DELIVERY DATE ERROR!!!');
                } else {
                    return payload;
                }
            }
        });

    }
});
