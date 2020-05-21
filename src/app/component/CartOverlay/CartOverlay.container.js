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

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { CART, CART_EDITING } from 'Component/Header';
import { hideActiveOverlay } from 'Store/Overlay';
import { CartDispatcher } from 'Store/Cart';
import { TotalsType } from 'Type/MiniCart';

import CartOverlay from './CartOverlay.component';

export const mapStateToProps = middleware(
    state => ({
        totals: state.CartReducer.cartTotals
    }),
    'Component/CartOverlay/Container/mapStateToProps'
);

export const mapDispatchToProps = middleware(
    dispatch => ({
        hideActiveOverlay: () => dispatch(hideActiveOverlay()),
        goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE)),
        changeHeaderState: state => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state)),
        updateTotals: options => CartDispatcher.updateTotals(dispatch, options)
    }),
    'Component/CartOverlay/Container/mapDispatchToProps'
);

export class CartOverlayContainer extends ExtensiblePureComponent {
    static propTypes = {
        totals: TotalsType.isRequired,
        changeHeaderState: PropTypes.func.isRequired
    };

    state = { isEditing: false };

    containerFunctions = {
        changeHeaderState: this.changeHeaderState.bind(this)
    };

    changeHeaderState() {
        const { changeHeaderState, totals: { count = 0 } } = this.props;
        const title = __('%s Items', count || 0);

        changeHeaderState({
            name: CART,
            title,
            onEditClick: () => {
                this.setState({ isEditing: true });
                changeHeaderState({
                    name: CART_EDITING,
                    title,
                    onOkClick: () => this.setState({ isEditing: false }),
                    onCancelClick: () => this.setState({ isEditing: false })
                });
            },
            onCloseClick: () => this.setState({ isEditing: false })
        });
    }

    render() {
        return (
            <CartOverlay
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    middleware(CartOverlayContainer, 'Component/CartOverlay/Container')
);
