/**
 * Copyright © MageWorx. All rights reserved.
 * See LICENSE.txt for license details.
 */
var config = {
    config: {
        mixins: {
            'Magento_Checkout/js/model/shipping-save-processor/payload-extender': {
                'MageWorx_DeliveryDateCheckout/js/mixin/payload-extender-mixin': true
            }
        }
    }
};
