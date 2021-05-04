/*jshint browser:true jquery:true*/
/*global alert*/
define([
    'mage/utils/wrapper',
    'underscore',
    'Magento_Checkout/js/model/quote'
], function (wrapper, _, quote) {
    'use strict';

    console.log('INITIALIZE DELIVERY DATE MANAGER COMPONENT MIXIN');

    var mixin = {
        getCalendarId: function () {
            var method = quote.shippingMethod(),
                selectedMethod = method != null ? method.carrier_code + '_' + method.method_code : null;

            return selectedMethod ? 'delivery-day-' + selectedMethod : this._super();
        }
    };

    return function (target) {
        return target.extend(mixin);
    };
});
