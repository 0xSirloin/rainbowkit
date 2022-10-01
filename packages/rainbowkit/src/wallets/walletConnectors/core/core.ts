/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface CoreOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const core = ({ chains, shimDisconnect }: CoreOptions): Wallet => ({
  id: 'core',
  name: 'Core',
  iconUrl: async () => (await import('./core.svg')).default,
  iconBackground: '#fff',
  installed:
    typeof window !== 'undefined' && window.ethereum?.isCore === true,
  downloadUrls: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/core/agoakfejjabomempkjlepdflaleeobhb',
  },
  createConnector: () => {
    return {
      connector: new InjectedConnector({
        chains,
        options: { shimDisconnect },
      }),
    };
  },
});