<?php
/**
 * Copyright © MageWorx. All rights reserved.
 * See LICENSE.txt for license details.
 */
declare(strict_types=1);

namespace MageWorx\DeliveryDateCheckout\Observer;

use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;

/**
 * Class CheckoutLayoutModifier
 *
 * Move delivery date elements on the MageWorx_Checkout page;
 * Change templates;
 */
class CheckoutLayoutModifier implements ObserverInterface
{
    /**
     * @inheritDoc
     */
    public function execute(Observer $observer)
    {
        /** @var \MageWorx\Checkout\Api\LayoutModifierAccessInterface $subject */
        $subject = $observer->getSubject();
        /** @var array $jsLayout */
        $jsLayout = &$subject->getJsLayout();

        $nameInLayout = 'delivery_date';
        // Copy element
        $originalElement = $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']
        ['shippingAddress']['children']['shippingAdditional']['children'][$nameInLayout];

        // Remove original element from layout
        unset(
            $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']
            ['shippingAddress']['children']['shippingAdditional']['children'][$nameInLayout]
        );

        $originalElement['config']['template'] = 'MageWorx_DeliveryDateCheckout/container';

        // Remove DD comments
        unset($originalElement['children']['comment_container']);

        // Update Date component
        $originalElement['children']['datetime_container']['childTemplates']['delivery_day']['config']['template'] =
            'MageWorx_DeliveryDateCheckout/form/field';
        if (isset($originalElement['children']['datetime_container']['children']['delivery_day']['config']['elementTmpl'])
            && $originalElement['children']['datetime_container']['children']['delivery_day']['config']['elementTmpl'] ===
            'MageWorx_DeliveryDate/checkout/form/element/date/calendar') {
            $originalElement['children']['datetime_container']['children']['delivery_day']['config']['elementTmpl'] =
                $this->getDeliveryDayInputTemplate();
        }

        $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']
        ['shippingMethods']['children']['shipping_method_additional_data']['children'][$nameInLayout] =
            $originalElement;
    }

    /**
     * @return string
     */
    public function getDeliveryDayInputTemplate(): string
    {
        return 'MageWorx_DeliveryDateCheckout/form/element/date/calendar';
    }
}
