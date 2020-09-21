/*jshint browser:true jquery:true*/
/*global alert*/
define([
    'mage/utils/wrapper',
    'underscore'
], function (wrapper, _) {
    'use strict';

    console.log('INITIALIZE TIME COMPONENT MIXIN');

    return function (originalComponent) {

        if (window.isMageWorxCheckout) {
            window.checkoutConfig.mageworx.delivery_date.time.template = 'MageWorx_DeliveryDateCheckout/form/field';
        }

        return originalComponent;
    };
});
