// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import type { StoresMap } from '../../../stores/index';
import type { ActionsMap } from '../../../actions/index';
import WalletSendConfirmationDialog from '../../../components/wallet/WalletSendConfirmationDialog';

type Props = {
  stores: any | StoresMap,
  actions: any | ActionsMap,
  amount: string,
  receiver: string,
  totalAmount: ?string,
  transactionFee: ?string,
  amountToNaturalUnits: (amountWithFractions: string) => string,
  currencyUnit: string,
};

@inject('actions', 'stores') @observer
export default class WalletSendConfirmationDialogContainer extends Component<Props> {

  static defaultProps = { actions: null, stores: null };

  handleWalletSendFormSubmit = (values: Object) => {
    this.props.actions.wallets.sendMoney.trigger(values);
  };

  render() {
    const {
      actions, amount, receiver, totalAmount,
      transactionFee, amountToNaturalUnits, currencyUnit
    } = this.props;
    const { wallets } = this.props.stores;
    const { sendMoneyRequest, active: activeWallet } = wallets;

    if (!activeWallet) throw new Error('Active wallet required for WalletSendPage.');

    return (
      <WalletSendConfirmationDialog
        isSpendingPasswordSet={activeWallet.hasPassword}
        amount={amount}
        receiver={receiver}
        totalAmount={totalAmount}
        transactionFee={transactionFee}
        amountToNaturalUnits={amountToNaturalUnits}
        onSubmit={this.handleWalletSendFormSubmit}
        isSubmitting={sendMoneyRequest.isExecuting}
        onCancel={() => {
          actions.dialogs.closeActiveDialog.trigger();
          sendMoneyRequest.reset();
        }}
        error={sendMoneyRequest.error}
        currencyUnit={currencyUnit}
      />
    );
  }

}
