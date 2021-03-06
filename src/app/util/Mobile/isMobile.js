/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
export const isUsingClientHints = 'userAgentData' in navigator;

export const isMobile = {
    android: (agent = navigator.userAgent) => /android/i.test(agent),
    blackBerry: (agent = navigator.userAgent) => /blackberry/i.test(agent),
    iOS: (agent = navigator.userAgent) => /iphone|ipod/i.test(agent),
    opera: (agent = navigator.userAgent) => /opera mini/i.test(agent),
    windows: (agent = navigator.userAgent) => /iemobile/i.test(agent),
    // eslint-disable-next-line max-len
    any: () => (isMobile.android() || isMobile.blackBerry() || isMobile.iOS() || isMobile.opera() || isMobile.windows()),
    // eslint-disable-next-line max-len
    tablet: (agent = navigator.userAgent) => /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(agent),
    standaloneMode: () => window.matchMedia('(display-mode: standalone)').matches
};

// https://medium.com/@galmeiri/get-ready-for-chrome-user-agent-string-phase-out-c6840da1c31e
export const isMobileClientHints = {
    any: () => navigator.userAgentData.mobile,
    getDeviceData: () => navigator.userAgentData.getHighEntropyValues(['platform', 'model'])
};

export default isMobile;
