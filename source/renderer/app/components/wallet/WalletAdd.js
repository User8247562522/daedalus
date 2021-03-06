// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import { defineMessages, intlShape, FormattedHTMLMessage } from 'react-intl';
import styles from './WalletAdd.scss';
import BigButtonForDialogs from '../widgets/BigButtonForDialogs';
import createIcon from '../../assets/images/create-ic.inline.svg';
import importIcon from '../../assets/images/import-ic.inline.svg';
import joinSharedIcon from '../../assets/images/join-shared-ic.inline.svg';
import restoreIcon from '../../assets/images/restore-ic.inline.svg';
import environment from '../../../../common/environment';
import { MAX_ADA_WALLETS_COUNT } from '../../config/numbersConfig';

const messages = defineMessages({
  title: {
    id: 'wallet.add.dialog.title.label',
    defaultMessage: '!!!Add wallet',
    description: 'Label for the "Add wallet" title on the wallet add dialog.',
  },
  createLabel: {
    id: 'wallet.add.dialog.create.label',
    defaultMessage: '!!!Create',
    description: 'Label for the "Create" button on the wallet add dialog.',
  },
  createDescription: {
    id: 'wallet.add.dialog.create.description',
    defaultMessage: '!!!Create a new wallet',
    description: 'Description for the "Create" button on the wallet add dialog.',
  },
  joinLabel: {
    id: 'wallet.add.dialog.join.label',
    defaultMessage: '!!!Join',
    description: 'Label for the "Join" button on the wallet add dialog.',
  },
  joinDescription: {
    id: 'wallet.add.dialog.join.description',
    defaultMessage: '!!!Join a shared wallet with up to 5 people',
    description: 'Description for the "Join" button on the wallet add dialog.',
  },
  restoreLabel: {
    id: 'wallet.add.dialog.restore.label',
    defaultMessage: '!!!Restore',
    description: 'Label for the "Restore" button on the wallet add dialog.',
  },
  restoreWithCertificateDescription: {
    id: 'wallet.add.dialog.restore.withCertificate.description',
    defaultMessage: '!!!Restore using backup-recovery phrase or paper wallet certificate.',
    description: 'Description for the "Restore" button with paper wallet certificate on the wallet add dialog.',
  },
  restoreWithoutCertificateDescription: {
    id: 'wallet.add.dialog.restore.withoutCertificate.description',
    defaultMessage: '!!!Restore wallet from backup',
    description: 'Description for the "Restore" button without paper wallet certificate on the wallet add dialog.',
  },
  importLabel: {
    id: 'wallet.add.dialog.import.label',
    defaultMessage: '!!!Import',
    description: 'Label for the "Import" button on the wallet add dialog.',
  },
  importDescription: {
    id: 'wallet.add.dialog.import.description',
    defaultMessage: '!!!Import wallet from a file',
    description: 'Description for the "Import" button on the wallet add dialog.',
  },
  restoreNotificationMessage: {
    id: 'wallet.add.dialog.restoreNotificationMessage',
    defaultMessage: '!!!Wallet restoration is currently in progress. Until it completes, it is not possible to restore or import new wallets.',
    description: 'Restore notification message shown during async wallet restore on the wallet add screen.',
  },
  maxNumberOfWalletsNotificationMessage: {
    id: 'wallet.add.dialog.maxNumberOfWalletsNotificationMessage',
    defaultMessage: '!!!You have reached the maximum of 50 wallets.<br>No more wallets can be added.',
    description: '"Maximum number of wallets reached" notification message shown on the wallet add screen if user has 50 wallets.',
  },
});

type Props = {
  onCreate: Function,
  onRestore: Function,
  onImportFile: Function,
  isRestoreActive: boolean,
  isMaxNumberOfWalletsReached: boolean,
};

@observer
export default class WalletAdd extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;
    const {
      onCreate, onRestore, onImportFile,
      isRestoreActive, isMaxNumberOfWalletsReached,
    } = this.props;

    const componentClasses = classnames([styles.component, 'WalletAdd']);

    let activeNotification = null;
    if (isMaxNumberOfWalletsReached) {
      activeNotification = 'maxNumberOfWalletsNotificationMessage';
    } else if (isRestoreActive) {
      activeNotification = 'restoreNotificationMessage';
    }

    return (
      <div className={componentClasses}>
        <div className={styles.buttonsContainer}>
          <div className={styles.firstRow}>
            <BigButtonForDialogs
              className="createWalletButton"
              onClick={onCreate}
              icon={createIcon}
              label={intl.formatMessage(messages.createLabel)}
              description={intl.formatMessage(messages.createDescription)}
              isDisabled={isMaxNumberOfWalletsReached}
            />
            <BigButtonForDialogs
              className="joinWalletButton"
              icon={joinSharedIcon}
              label={intl.formatMessage(messages.joinLabel)}
              description={intl.formatMessage(messages.joinDescription)}
              isDisabled
            />
          </div>
          <div className={styles.secondRow}>
            <BigButtonForDialogs
              className="restoreWalletButton"
              onClick={onRestore}
              icon={restoreIcon}
              label={intl.formatMessage(messages.restoreLabel)}
              description={intl.formatMessage(messages.restoreWithCertificateDescription)}
              isDisabled={isMaxNumberOfWalletsReached || isRestoreActive}
            />
            <BigButtonForDialogs
              className="importWalletButton"
              onClick={onImportFile}
              icon={importIcon}
              label={intl.formatMessage(messages.importLabel)}
              description={intl.formatMessage(messages.importDescription)}
              isDisabled={
                isMaxNumberOfWalletsReached ||
                isRestoreActive ||
                environment.isMainnet() ||
                environment.isTestnet()
              }
            />
          </div>
          {activeNotification ? (
            <div className={styles.notification}>
              <FormattedHTMLMessage
                {...messages[activeNotification]}
                values={{ maxWalletsCount: MAX_ADA_WALLETS_COUNT }}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

}
